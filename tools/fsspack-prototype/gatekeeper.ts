/**
 * Stand B Gatekeeper Admission Pipeline Prototype
 * 
 * Implements 6-stage ingestion verification:
 * 1. Physical Container Check
 * 2. Mandatory Structure Check
 * 3. Checksum Integrity Check
 * 4. Capability Compatibility Check
 * 5. Independent Mathematical Group Re-Check
 * 6. Epistemic Admission Decision (VERIFIED_ACTIVE, QUARANTINE_DIAGNOSTIC, REJECTED)
 */

import {
  SpaceGroupRecord,
  validateMathematicalGroup
} from '../../core/schema/crystallographic_exchange';
import { CanonicalHasher } from './canonical_hasher';
import {
  FsspackManifest,
  FsspackMathModel,
  FsspackProvenance,
  FsspackVerificationPassport,
  GatekeeperReport,
  GatekeeperStageResult
} from './fsspack_types';
import { ZipContainer } from './zip_container';

const SUPPORTED_MAJOR_VERSIONS = ['1'];
const SUPPORTED_CAPABILITIES = new Set([
  'ExactRational_BigInt',
  'AffineComposition_Mod1_Z3',
  'MatrixGroup_3x3_Integer',
  'Dimension_3D'
]);

export interface IngestionResult {
  report: GatekeeperReport;
  manifest?: FsspackManifest;
  mathModel?: FsspackMathModel;
  verificationPassport?: FsspackVerificationPassport;
  provenance?: FsspackProvenance;
  extraFiles: Map<string, Buffer>;
}

export class Gatekeeper {
  /**
   * Executes the 6-stage gatekeeper ingestion pipeline on a raw package buffer.
   */
  static ingest(packageBuffer: Buffer): IngestionResult {
    const stages: GatekeeperStageResult[] = [];
    const reasons: string[] = [];
    const quarantineDisclaimers: string[] = [];
    const extraFiles = new Map<string, Buffer>();

    // ==========================================
    // Stage 1: Container Check (PKZIP Headers)
    // ==========================================
    let extractedFiles: Map<string, Buffer>;
    try {
      extractedFiles = ZipContainer.unpack(packageBuffer);
      stages.push({ stage: 1, name: 'Container Check (PKZIP)', passed: true });
    } catch (err: any) {
      stages.push({
        stage: 1,
        name: 'Container Check (PKZIP)',
        passed: false,
        error: `CORRUPT_ZIP_CONTAINER: ${err.message}`
      });
      reasons.push(`Physical ZIP container could not be unpacked: ${err.message}`);
      return {
        report: {
          admissionStatus: 'REJECTED',
          stages,
          reasons,
          quarantineDisclaimers,
          mathVerified: false
        },
        extraFiles
      };
    }

    // ==========================================
    // Stage 2: Structure Check (Mandatory Files)
    // ==========================================
    const mandatoryFiles = ['manifest.json', 'math-model.json', 'verification.json', 'provenance.json'];
    const missing = mandatoryFiles.filter(f => !extractedFiles.has(f));

    if (missing.length > 0) {
      stages.push({
        stage: 2,
        name: 'Structure Check',
        passed: false,
        error: `MISSING_MANDATORY_FILE: ${missing.join(', ')}`
      });
      reasons.push(`Mandatory files missing from archive root: ${missing.join(', ')}`);
      return {
        report: {
          admissionStatus: 'REJECTED',
          stages,
          reasons,
          quarantineDisclaimers,
          mathVerified: false
        },
        extraFiles
      };
    }

    // Parse JSON documents
    let manifest: FsspackManifest;
    let mathModel: FsspackMathModel;
    let verification: FsspackVerificationPassport;
    let provenance: FsspackProvenance;

    try {
      manifest = JSON.parse(extractedFiles.get('manifest.json')!.toString('utf8'));
      mathModel = JSON.parse(extractedFiles.get('math-model.json')!.toString('utf8'));
      verification = JSON.parse(extractedFiles.get('verification.json')!.toString('utf8'));
      provenance = JSON.parse(extractedFiles.get('provenance.json')!.toString('utf8'));
      stages.push({ stage: 2, name: 'Structure Check', passed: true });
    } catch (parseErr: any) {
      stages.push({
        stage: 2,
        name: 'Structure Check',
        passed: false,
        error: `INVALID_JSON_SYNTAX: ${parseErr.message}`
      });
      reasons.push(`Failed to parse required JSON document: ${parseErr.message}`);
      return {
        report: {
          admissionStatus: 'REJECTED',
          stages,
          reasons,
          quarantineDisclaimers,
          mathVerified: false
        },
        extraFiles
      };
    }

    // Isolate extra files (resources/*)
    for (const [path, buf] of extractedFiles.entries()) {
      if (!mandatoryFiles.includes(path)) {
        extraFiles.set(path, buf);
      }
    }

    // ==========================================
    // Stage 3: Integrity Check (Per-file SHA-256)
    // ==========================================
    let integrityPassed = true;
    const checksumFailures: string[] = [];

    for (const manifestEntry of manifest.files) {
      const actualBuf = extractedFiles.get(manifestEntry.path);
      if (!actualBuf) {
        if (manifestEntry.isMandatory) {
          integrityPassed = false;
          checksumFailures.push(`Mandatory file ${manifestEntry.path} registered in manifest but missing`);
        }
        continue;
      }

      const actualSha256 = CanonicalHasher.sha256(actualBuf);
      if (actualSha256 !== manifestEntry.sha256) {
        integrityPassed = false;
        checksumFailures.push(
          `Checksum mismatch for ${manifestEntry.path}: expected ${manifestEntry.sha256}, calculated ${actualSha256}`
        );
      }
    }

    if (!integrityPassed) {
      stages.push({
        stage: 3,
        name: 'Integrity Check',
        passed: false,
        error: `CHECKSUM_MISMATCH: ${checksumFailures.join('; ')}`
      });
      reasons.push(...checksumFailures);
      return {
        report: {
          packageId: manifest.packageId,
          admissionStatus: 'REJECTED',
          stages,
          reasons,
          quarantineDisclaimers,
          mathVerified: false
        },
        manifest,
        mathModel,
        verificationPassport: verification,
        provenance,
        extraFiles
      };
    }
    stages.push({ stage: 3, name: 'Integrity Check', passed: true });

    // ==========================================
    // Stage 4: Compatibility Check
    // ==========================================
    const versionParts = (manifest.fsspackVersion || '').split('.');
    const majorVer = versionParts[0];

    if (!SUPPORTED_MAJOR_VERSIONS.includes(majorVer)) {
      const errorMsg = `UNSUPPORTED_SCHEMA_VERSION: package version ${manifest.fsspackVersion} is not supported (supported major: ${SUPPORTED_MAJOR_VERSIONS.join(', ')})`;
      stages.push({ stage: 4, name: 'Compatibility Check', passed: false, error: errorMsg });
      reasons.push(errorMsg);
      return {
        report: {
          packageId: manifest.packageId,
          admissionStatus: 'REJECTED',
          stages,
          reasons,
          quarantineDisclaimers,
          mathVerified: false
        },
        manifest,
        mathModel,
        verificationPassport: verification,
        provenance,
        extraFiles
      };
    }

    // Check required kernel capabilities
    const unsupportedCaps = (provenance.requiredKernelCapabilities || []).filter(
      cap => !SUPPORTED_CAPABILITIES.has(cap)
    );

    if (unsupportedCaps.length > 0) {
      const errorMsg = `INCOMPATIBLE_KERNEL_CAPABILITY: Stand B lacks required capabilities: ${unsupportedCaps.join(', ')}`;
      stages.push({ stage: 4, name: 'Compatibility Check', passed: false, error: errorMsg });
      reasons.push(errorMsg);
      return {
        report: {
          packageId: manifest.packageId,
          admissionStatus: 'REJECTED',
          stages,
          reasons,
          quarantineDisclaimers,
          mathVerified: false
        },
        manifest,
        mathModel,
        verificationPassport: verification,
        provenance,
        extraFiles
      };
    }
    stages.push({ stage: 4, name: 'Compatibility Check', passed: true });

    // ==========================================
    // Stage 5: Independent Mathematical Group Re-Check
    // ==========================================
    const exchangeRecord: SpaceGroupRecord = {
      spaceGroupNumber: manifest.spaceGroupNumber,
      settingId: manifest.settingId,
      hmSymbol: manifest.hmSymbol,
      hallSymbol: manifest.hallSymbol,
      operationsCount: mathModel.operations.length,
      operations: mathModel.operations.map(op => ({
        W: op.W.map(row => [...row]),
        w: op.w.map(r => ({ numerator: r.numerator, denominator: r.denominator }))
      }))
    };

    const mathResult = validateMathematicalGroup(exchangeRecord);
    const calculatedContentSha = CanonicalHasher.computeContentSha256(mathModel);

    let mathStagePassed = true;
    const mathErrors: string[] = [];

    if (!mathResult.valid) {
      mathStagePassed = false;
      mathErrors.push(`Group axioms violated: ${mathResult.errors.join('; ')}`);
    }

    if (calculatedContentSha !== manifest.contentSha256) {
      mathStagePassed = false;
      mathErrors.push(
        `Canonical mathematical content digest mismatch: manifest claims ${manifest.contentSha256}, calculated ${calculatedContentSha}`
      );
    }

    if (!mathStagePassed) {
      stages.push({
        stage: 5,
        name: 'Independent Mathematical Re-Check',
        passed: false,
        error: `MATHEMATICAL_AXIOM_VIOLATION: ${mathErrors.join('; ')}`
      });
      reasons.push(...mathErrors);
      return {
        report: {
          packageId: manifest.packageId,
          admissionStatus: 'REJECTED',
          stages,
          reasons,
          quarantineDisclaimers,
          mathVerified: false,
          contentSha256Expected: manifest.contentSha256,
          contentSha256Actual: calculatedContentSha
        },
        manifest,
        mathModel,
        verificationPassport: verification,
        provenance,
        extraFiles
      };
    }
    stages.push({
      stage: 5,
      name: 'Independent Mathematical Re-Check',
      passed: true,
      details: {
        hasIdentity: mathResult.hasIdentity,
        hasInverses: mathResult.hasInverses,
        isClosed: mathResult.isClosed,
        contentSha256: calculatedContentSha
      }
    });

    // ==========================================
    // Stage 6: Epistemic Admission Decision
    // ==========================================
    const hasUnchecked = verification.checksLedger.some(
      c => c.status === 'NOT_CHECKED' || c.status === 'INCONCLUSIVE' || c.status === 'PARTIAL'
    );
    const hasFail = verification.checksLedger.some(c => c.status === 'FAIL');

    if (hasFail) {
      stages.push({
        stage: 6,
        name: 'Admission Decision',
        passed: false,
        error: 'Passport contains failed verification items'
      });
      reasons.push('verification.json records one or more FAIL statuses');
      return {
        report: {
          packageId: manifest.packageId,
          admissionStatus: 'REJECTED',
          stages,
          reasons,
          quarantineDisclaimers,
          mathVerified: true,
          contentSha256Expected: manifest.contentSha256,
          contentSha256Actual: calculatedContentSha
        },
        manifest,
        mathModel,
        verificationPassport: verification,
        provenance,
        extraFiles
      };
    }

    if (hasUnchecked) {
      const uncheckedItems = verification.checksLedger
        .filter(c => c.status !== 'PASS')
        .map(c => `${c.checkId} (${c.targetProperty}: ${c.status})`);

      stages.push({
        stage: 6,
        name: 'Admission Decision',
        passed: true,
        details: { admission: 'QUARANTINE_DIAGNOSTIC', unchecked: uncheckedItems }
      });
      quarantineDisclaimers.push(
        `Package contains unverified or partial properties: ${uncheckedItems.join(', ')}. Group admitted in QUARANTINE mode (inspection allowed, comparative experiments restricted).`
      );

      return {
        report: {
          packageId: manifest.packageId,
          admissionStatus: 'QUARANTINE_DIAGNOSTIC',
          stages,
          reasons: [],
          quarantineDisclaimers,
          mathVerified: true,
          contentSha256Expected: manifest.contentSha256,
          contentSha256Actual: calculatedContentSha
        },
        manifest,
        mathModel,
        verificationPassport: verification,
        provenance,
        extraFiles
      };
    }

    stages.push({
      stage: 6,
      name: 'Admission Decision',
      passed: true,
      details: { admission: 'VERIFIED_ACTIVE' }
    });

    return {
      report: {
        packageId: manifest.packageId,
        admissionStatus: 'VERIFIED_ACTIVE',
        stages,
        reasons: [],
        quarantineDisclaimers: [],
        mathVerified: true,
        contentSha256Expected: manifest.contentSha256,
        contentSha256Actual: calculatedContentSha
      },
      manifest,
      mathModel,
      verificationPassport: verification,
      provenance,
      extraFiles
    };
  }
}
