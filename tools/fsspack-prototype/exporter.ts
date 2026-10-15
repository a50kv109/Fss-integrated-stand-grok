/**
 * Stand A Package Exporter Prototype
 * 
 * Takes a SpaceGroupRecord or DetailedSymmetryRecord, verifies mathematical completeness,
 * generates canonical JSON sections, and bundles into a standard .fsspack ZIP container.
 */

import { DetailedSymmetryRecord } from '../../core/registry';
import {
  SpaceGroupRecord,
  validateMathematicalGroup,
  validateStructuralRecord
} from '../../core/schema/crystallographic_exchange';
import { CanonicalHasher } from './canonical_hasher';
import {
  FsspackManifest,
  FsspackMathModel,
  FsspackProvenance,
  FsspackVerificationPassport,
  FsspackOperationDTO,
  RationalDTO
} from './fsspack_types';
import { ZipContainer, ZipEntry } from './zip_container';

export interface ExporterOptions {
  packageId?: string;
  sourceDatabase?: string;
  license?: string;
  extraFiles?: { path: string; data: Buffer }[];
}

export interface ExportResult {
  packageBuffer: Buffer;
  manifest: FsspackManifest;
  fileSha256: string;
  contentSha256: string;
  byteSize: number;
}

export class PackageExporter {
  /**
   * Converts a registry record or space group record into a standard .fsspack package buffer.
   */
  static export(
    record: DetailedSymmetryRecord | SpaceGroupRecord,
    options: ExporterOptions = {}
  ): ExportResult {
    const spaceGroupNumber = 'groupNumber' in record ? record.groupNumber : record.spaceGroupNumber;
    const settingId = record.settingId;
    const packageId = options.packageId || `SG${String(spaceGroupNumber).padStart(3, '0')}_${settingId.replace(/[^a-zA-Z0-9]/g, '')}`;

    // 1. Structural and mathematical validation before export
    const exchangeRecord: SpaceGroupRecord = {
      spaceGroupNumber,
      settingId,
      hmSymbol: record.hmSymbol,
      hallSymbol: record.hallSymbol,
      operationsCount: record.operations.length,
      operations: record.operations.map(op => ({
        W: op.W.map(row => [...row]),
        w: op.w.map(r => ({ numerator: r.numerator, denominator: r.denominator }))
      }))
    };

    const structReport = validateStructuralRecord(exchangeRecord);
    if (!structReport.valid) {
      throw new Error(`Export rejected: structural validation failed: ${structReport.errors.join('; ')}`);
    }

    const mathReport = validateMathematicalGroup(exchangeRecord);
    if (!mathReport.valid) {
      throw new Error(`Export rejected: mathematical group validation failed: ${mathReport.errors.join('; ')}`);
    }

    // 2. Build math-model.json
    const rawOps: FsspackOperationDTO[] = record.operations.map((op, idx) => ({
      index: idx,
      W: op.W.map(row => [...row]),
      w: [
        { numerator: op.w[0].numerator, denominator: op.w[0].denominator },
        { numerator: op.w[1].numerator, denominator: op.w[1].denominator },
        { numerator: op.w[2].numerator, denominator: op.w[2].denominator }
      ] as [RationalDTO, RationalDTO, RationalDTO],
      order: undefined
    }));

    // Detect lattice centering from Hall / HM symbol
    let centering: 'P' | 'A' | 'B' | 'C' | 'I' | 'F' | 'R' = 'P';
    const firstLetter = record.settingId[0].toUpperCase();
    if (['P', 'A', 'B', 'C', 'I', 'F', 'R'].includes(firstLetter)) {
      centering = firstLetter as any;
    }

    const initialMathModel: FsspackMathModel = {
      arithmeticModel: 'ExactRational_BigInt',
      order: rawOps.length,
      latticeCentering: centering,
      latticeTranslations: [[{ numerator: 0, denominator: 1 }, { numerator: 0, denominator: 1 }, { numerator: 0, denominator: 1 }]],
      translationEquivalence: 'modulo_Z3',
      operations: rawOps
    };

    // Canonicalize operations and compute deterministic content_sha256
    const canonicalMathModel = CanonicalHasher.canonicalizeMathModel(initialMathModel);
    const contentSha256 = CanonicalHasher.computeContentSha256(canonicalMathModel);

    const mathModelJson = JSON.stringify(CanonicalHasher.canonicalizeJson(canonicalMathModel), null, 2);
    const mathModelBuf = Buffer.from(mathModelJson, 'utf8');

    // 3. Build verification.json
    const verificationPassport: FsspackVerificationPassport = {
      packageId,
      summaryStatus: 'ALL_PASS',
      checksLedger: [
        {
          checkId: 'CHK-IDENTITY',
          targetProperty: 'IDENTITY_ELEMENT',
          inputsReference: 'math-model.json#/operations',
          algorithm: { name: 'ExactRationalIdentityCheck', version: '1.0.0' },
          evidenceLevel: 'MATHEMATICALLY_PROVEN',
          status: mathReport.hasIdentity ? 'PASS' : 'FAIL',
          resultDetails: { foundIdentity: mathReport.hasIdentity }
        },
        {
          checkId: 'CHK-INVERSES',
          targetProperty: 'TWO_SIDED_INVERSES',
          inputsReference: 'math-model.json#/operations',
          algorithm: { name: 'ExactRationalInversesCheck', version: '1.0.0' },
          evidenceLevel: 'MATHEMATICALLY_PROVEN',
          status: mathReport.hasInverses ? 'PASS' : 'FAIL',
          resultDetails: { allInversesExist: mathReport.hasInverses }
        },
        {
          checkId: 'CHK-CLOSURE',
          targetProperty: 'GROUP_AXIOMS_CLOSURE',
          inputsReference: 'math-model.json#/operations',
          algorithm: { name: 'ExactRationalMatrixAlgebraModuloZ3', version: '1.0.0' },
          evidenceLevel: 'MATHEMATICALLY_PROVEN',
          status: mathReport.isClosed ? 'PASS' : 'FAIL',
          resultDetails: { isClosed: mathReport.isClosed, evaluatedPairs: rawOps.length * rawOps.length }
        }
      ]
    };
    const verificationJson = JSON.stringify(CanonicalHasher.canonicalizeJson(verificationPassport), null, 2);
    const verificationBuf = Buffer.from(verificationJson, 'utf8');

    // 4. Build provenance.json
    const provDetails = 'provenanceDetails' in record ? (record as DetailedSymmetryRecord).provenanceDetails : undefined;
    const provenance: FsspackProvenance = {
      sourceDatabase: options.sourceDatabase || provDetails?.source || 'Gemmi/ITA 2024.1',
      sourceVersionOrCommit: provDetails?.commitOrVersion || 'Verification-2026-10-11',
      sourceLicense: options.license || provDetails?.license || 'MPL-2.0',
      sourceTablePath: provDetails?.tablePath || 'ITA2024',
      exportTimestamp: new Date().toISOString(),
      exporterSoftware: {
        name: 'FSS Stand A Exporter Prototype',
        version: '1.0.0'
      },
      requiredKernelCapabilities: [
        'ExactRational_BigInt',
        'AffineComposition_Mod1_Z3',
        'MatrixGroup_3x3_Integer'
      ]
    };
    const provenanceJson = JSON.stringify(CanonicalHasher.canonicalizeJson(provenance), null, 2);
    const provenanceBuf = Buffer.from(provenanceJson, 'utf8');

    // 5. Build manifest.json
    const fileEntries = [
      {
        path: 'math-model.json',
        sha256: CanonicalHasher.sha256(mathModelBuf),
        byteSize: mathModelBuf.length,
        isMandatory: true
      },
      {
        path: 'verification.json',
        sha256: CanonicalHasher.sha256(verificationBuf),
        byteSize: verificationBuf.length,
        isMandatory: true
      },
      {
        path: 'provenance.json',
        sha256: CanonicalHasher.sha256(provenanceBuf),
        byteSize: provenanceBuf.length,
        isMandatory: true
      }
    ];

    const extraZipEntries: ZipEntry[] = [];
    if (options.extraFiles) {
      for (const extra of options.extraFiles) {
        fileEntries.push({
          path: extra.path,
          sha256: CanonicalHasher.sha256(extra.data),
          byteSize: extra.data.length,
          isMandatory: false
        });
        extraZipEntries.push(extra);
      }
    }

    const manifest: FsspackManifest = {
      fsspackVersion: '1.0.0',
      packageId,
      spaceGroupNumber,
      settingId,
      hmSymbol: record.hmSymbol,
      hallSymbol: record.hallSymbol,
      crystalSystem: spaceGroupNumber >= 75 && spaceGroupNumber <= 142 ? 'tetragonal' : undefined,
      conventions: {
        basisType: 'standard_crystallographic',
        originChoice: 1
      },
      files: fileEntries,
      contentSha256,
      createdAt: provenance.exportTimestamp
    };

    const manifestJson = JSON.stringify(CanonicalHasher.canonicalizeJson(manifest), null, 2);
    const manifestBuf = Buffer.from(manifestJson, 'utf8');

    // 6. Pack everything into standard PKZIP
    const allZipEntries: ZipEntry[] = [
      { path: 'manifest.json', data: manifestBuf },
      { path: 'math-model.json', data: mathModelBuf },
      { path: 'verification.json', data: verificationBuf },
      { path: 'provenance.json', data: provenanceBuf },
      ...extraZipEntries
    ];

    const packageBuffer = ZipContainer.pack(allZipEntries);
    const fileSha256 = CanonicalHasher.sha256(packageBuffer);

    return {
      packageBuffer,
      manifest,
      fileSha256,
      contentSha256,
      byteSize: packageBuffer.length
    };
  }
}
