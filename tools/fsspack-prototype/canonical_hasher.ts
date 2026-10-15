/**
 * Canonical Math Model Serializer and Content Hasher
 * 
 * Implements canonical normalization, lexicographical sorting of operations,
 * and RFC-8785 JSON canonicalization for deterministic content_sha256 calculation.
 */

import * as crypto from 'node:crypto';
import { ExactRational } from '../../core/schema/crystallographic_exchange';
import { FsspackMathModel, FsspackOperationDTO } from './fsspack_types';

export class CanonicalHasher {
  /**
   * Generates unique canonical key for a single symmetry operation:
   * "${JSON(W)}|${w0_mod1},${w1_mod1},${w2_mod1}"
   */
  static getOperationKey(op: { W: number[][]; w: { numerator: number; denominator: number }[] }): string {
    const WStr = JSON.stringify(op.W);
    const wStr = op.w
      .map(t => new ExactRational(t.numerator, t.denominator).mod1().toString())
      .join(',');
    return `${WStr}|${wStr}`;
  }

  /**
   * Normalizes math model:
   * 1. Reduces all rational translations via ExactRational.mod1().
   * 2. Sorts operations lexicographically by getOperationKey().
   * 3. Re-indexes operations deterministically.
   */
  static canonicalizeMathModel(model: FsspackMathModel): FsspackMathModel {
    const normalizedOps: (FsspackOperationDTO & { _sortKey: string })[] = model.operations.map(op => {
      const canonicalW = op.W.map(row => [...row]);
      const canonicalWVec: [
        { numerator: number; denominator: number },
        { numerator: number; denominator: number },
        { numerator: number; denominator: number }
      ] = [
        new ExactRational(op.w[0].numerator, op.w[0].denominator).mod1().toRational(),
        new ExactRational(op.w[1].numerator, op.w[1].denominator).mod1().toRational(),
        new ExactRational(op.w[2].numerator, op.w[2].denominator).mod1().toRational()
      ];

      const sortKey = this.getOperationKey({ W: canonicalW, w: canonicalWVec });

      return {
        index: 0, // reindexed below
        W: canonicalW,
        w: canonicalWVec,
        triplet: op.triplet,
        order: op.order,
        _sortKey: sortKey
      };
    });

    // Sort operations lexicographically by key
    normalizedOps.sort((a, b) => (a._sortKey < b._sortKey ? -1 : a._sortKey > b._sortKey ? 1 : 0));

    // Assign clean sequential indices
    const sortedOps: FsspackOperationDTO[] = normalizedOps.map((op, idx) => ({
      index: idx,
      W: op.W,
      w: op.w,
      triplet: op.triplet,
      order: op.order
    }));

    return {
      arithmeticModel: 'ExactRational_BigInt',
      order: sortedOps.length,
      latticeCentering: model.latticeCentering,
      latticeTranslations: model.latticeTranslations.map(vec =>
        vec.map(r => new ExactRational(r.numerator, r.denominator).mod1().toRational())
      ),
      translationEquivalence: 'modulo_Z3',
      operations: sortedOps
    };
  }

  /**
   * Recursively canonicalizes JSON object keys (RFC-8785)
   */
  static canonicalizeJson(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map(item => this.canonicalizeJson(item));
    }
    if (obj !== null && typeof obj === 'object') {
      const sorted: Record<string, any> = {};
      Object.keys(obj)
        .sort()
        .forEach(key => {
          sorted[key] = this.canonicalizeJson(obj[key]);
        });
      return sorted;
    }
    return obj;
  }

  /**
   * Computes content_sha256 of the normalized math model.
   * Invariant to input operation ordering, whitespace, and fraction representation (2/4 vs 1/2).
   */
  static computeContentSha256(model: FsspackMathModel): string {
    const canonicalModel = this.canonicalizeMathModel(model);
    const sortedJsonObj = this.canonicalizeJson(canonicalModel);
    const jsonString = JSON.stringify(sortedJsonObj);
    return crypto.createHash('sha256').update(jsonString, 'utf8').digest('hex');
  }

  /**
   * Computes standard SHA-256 hash of any buffer or string.
   */
  static sha256(data: Buffer | string): string {
    const buf = Buffer.isBuffer(data) ? data : Buffer.from(data, 'utf8');
    return crypto.createHash('sha256').update(buf).digest('hex');
  }
}
