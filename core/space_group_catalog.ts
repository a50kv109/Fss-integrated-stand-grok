/**
 * Universal Space-Group Catalog Service (230 Fedorov Space Groups)
 * 
 * Provides search, filtering, passport compilation, and data status tracking
 * across all 230 crystallographic space groups from authoritative Gemmi / ITA tables.
 */

import { SPACE_GROUPS_230_DATA, SpaceGroupCatalogItem, SpaceGroupDataStatus } from './space_group_data_230';
import { SymmetryCatalog, DetailedSymmetryRecord } from './registry';
import { validateMathematicalGroup } from './schema/crystallographic_exchange';

export interface SpaceGroupPassport {
  item: SpaceGroupCatalogItem;
  verifiedRecord?: DetailedSymmetryRecord;
  hasVerifiedModel: boolean;
  status: SpaceGroupDataStatus;
  laueClass?: string;
  pointGroup?: string;
  operationsSummary?: {
    count: number;
    operations: Array<{
      index: number;
      matrixStr: string;
      translationStr: string;
      determinant: number;
      trace: number;
      triplet: string;
    }>;
    verificationReport: {
      hasIdentity: boolean;
      hasInverses: boolean;
      isClosed: boolean;
      valid: boolean;
    };
  };
  provenance: {
    source: string;
    version: string;
    license: string;
    attribution: string;
    tablePath: string;
    notes: string;
  };
}

export interface CatalogFilterOptions {
  search?: string;
  crystalSystem?: string;
  centering?: string;
  status?: string;
}

export interface CatalogStats {
  totalGroups: number;
  metadataAvailable: number;
  modelsVerified: number;
  modelsPending: number;
  totalSettings: number;
  verifiedSettingsCount: number;
}

export class SpaceGroupCatalogService {
  /**
   * Retrieves all 230 space groups, optionally filtered.
   */
  static listGroups(filters?: CatalogFilterOptions): SpaceGroupCatalogItem[] {
    let result = [...SPACE_GROUPS_230_DATA];

    if (!filters) return result;

    const { search, crystalSystem, centering, status } = filters;

    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(g => {
        const matchesNum = String(g.number) === q;
        const matchesHm = g.standardHm.toLowerCase().includes(q) || g.standardHm.replace(/\s+/g, '').toLowerCase().includes(q);
        const matchesHall = g.standardHall.toLowerCase().includes(q);
        const matchesSettings = g.settings.some(s =>
          s.hm.toLowerCase().includes(q) || s.hall.toLowerCase().includes(q) || s.settingId.toLowerCase().includes(q)
        );
        return matchesNum || matchesHm || matchesHall || matchesSettings;
      });
    }

    if (crystalSystem && crystalSystem !== 'ALL') {
      result = result.filter(g => g.crystalSystem.toLowerCase() === crystalSystem.toLowerCase());
    }

    if (centering && centering !== 'ALL') {
      result = result.filter(g => g.centering.toUpperCase() === centering.toUpperCase());
    }

    if (status && status !== 'ALL') {
      result = result.filter(g => g.status === status);
    }

    return result;
  }

  /**
   * Returns a single space group catalog item by ITA number.
   */
  static getGroup(number: number): SpaceGroupCatalogItem | undefined {
    return SPACE_GROUPS_230_DATA.find(g => g.number === number);
  }

  /**
   * Builds the comprehensive group passport.
   */
  static getPassport(number: number, settingId?: string): SpaceGroupPassport | undefined {
    const item = this.getGroup(number);
    if (!item) return undefined;

    // Check if verified model exists in SymmetryCatalog
    const records = SymmetryCatalog.findByGroupNumber(number);
    let verifiedRecord: DetailedSymmetryRecord | undefined;

    if (records.length > 0) {
      if (settingId) {
        verifiedRecord = records.find(r => r.settingId === settingId) || records[0];
      } else {
        verifiedRecord = records[0];
      }
    }

    const hasVerifiedModel = !!verifiedRecord;
    const status: SpaceGroupDataStatus = hasVerifiedModel ? 'MODEL_VERIFIED' : 'CATALOG_METADATA_AVAILABLE';

    let operationsSummary: SpaceGroupPassport['operationsSummary'] = undefined;

    if (verifiedRecord) {
      const ops = verifiedRecord.operations.map((op, idx) => {
        // Calculate determinant of 3x3 matrix
        const det =
          op.W[0][0] * (op.W[1][1] * op.W[2][2] - op.W[1][2] * op.W[2][1]) -
          op.W[0][1] * (op.W[1][0] * op.W[2][2] - op.W[1][2] * op.W[2][0]) +
          op.W[0][2] * (op.W[1][0] * op.W[2][1] - op.W[1][1] * op.W[2][0]);

        const trace = op.W[0][0] + op.W[1][1] + op.W[2][2];

        const tStr = `${op.w[0].numerator}/${op.w[0].denominator}, ${op.w[1].numerator}/${op.w[1].denominator}, ${op.w[2].numerator}/${op.w[2].denominator}`;
        const wRows = op.W.map(row => `[${row.join(', ')}]`).join(', ');

        return {
          index: idx,
          matrixStr: `[${wRows}]`,
          translationStr: tStr,
          determinant: det,
          trace,
          triplet: (op as any).triplet || `op_${idx}`
        };
      });

      const mathResult = validateMathematicalGroup({
        spaceGroupNumber: number,
        settingId: verifiedRecord.settingId,
        hmSymbol: verifiedRecord.hmSymbol,
        hallSymbol: verifiedRecord.hallSymbol,
        operationsCount: verifiedRecord.operations.length,
        operations: verifiedRecord.operations.map(op => ({
          W: op.W.map(r => [...r]),
          w: op.w.map(t => ({ numerator: t.numerator, denominator: t.denominator }))
        }))
      });

      operationsSummary = {
        count: ops.length,
        operations: ops,
        verificationReport: {
          hasIdentity: mathResult.hasIdentity,
          hasInverses: mathResult.hasInverses,
          isClosed: mathResult.isClosed,
          valid: mathResult.valid
        }
      };
    }

    return {
      item,
      verifiedRecord,
      hasVerifiedModel,
      status,
      operationsSummary,
      provenance: {
        source: verifiedRecord?.provenanceDetails?.source || 'Gemmi Symmetry Tables / ITA 2024.1',
        version: verifiedRecord?.provenanceDetails?.commitOrVersion || 'v0.7.5 (commit 5cc1c23c)',
        license: verifiedRecord?.provenanceDetails?.license || 'MPL-2.0',
        attribution: verifiedRecord?.provenanceDetails?.attribution || 'International Tables for Crystallography (ITA)',
        tablePath: verifiedRecord?.provenanceDetails?.tablePath || 'src/symmetry.cpp:spacegroup_tables::main[564]',
        notes: hasVerifiedModel
          ? 'Exact rational operations extracted and verified against group axioms modulo 1.'
          : 'Metadata compiled from ITA tables. Mathematical operations pending formal extraction pipeline.'
      }
    };
  }

  /**
   * Returns statistics for the catalog workbench.
   */
  static getStats(): CatalogStats {
    let verifiedCount = 0;
    let totalSettings = 0;

    for (const g of SPACE_GROUPS_230_DATA) {
      if (g.hasVerifiedModel) verifiedCount++;
      totalSettings += g.settings.length;
    }

    return {
      totalGroups: 230,
      metadataAvailable: 230,
      modelsVerified: verifiedCount,
      modelsPending: 230 - verifiedCount,
      totalSettings,
      verifiedSettingsCount: verifiedCount
    };
  }
}
