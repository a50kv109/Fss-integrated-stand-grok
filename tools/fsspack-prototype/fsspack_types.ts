/**
 * FSSPACK v1.0.0 TypeScript Type Definitions
 * 
 * Formal interfaces matching normative specification docs/design/FSSPACK_SPEC.md.
 */

export interface RationalDTO {
  numerator: number;
  denominator: number;
}

export interface FsspackOperationDTO {
  index: number;
  W: number[][]; // 3x3 integer matrix
  w: [RationalDTO, RationalDTO, RationalDTO];
  triplet?: string;
  order?: number;
}

export interface FsspackManifestFileEntry {
  path: string;
  sha256: string;
  byteSize: number;
  isMandatory: boolean;
}

export interface FsspackCoordinateConventions {
  basisType: 'standard_crystallographic';
  originChoice?: number;
  uniqueAxis?: 'a' | 'b' | 'c';
  cellChoice?: number;
  originShiftFromIta?: [RationalDTO, RationalDTO, RationalDTO];
}

export interface FsspackManifest {
  fsspackVersion: '1.0.0';
  packageId: string;
  spaceGroupNumber: number;
  settingId: string;
  hmSymbol: string;
  hallSymbol: string;
  crystalSystem?: string;
  conventions: FsspackCoordinateConventions;
  files: FsspackManifestFileEntry[];
  contentSha256: string;
  createdAt: string;
}

export interface FsspackMathModel {
  arithmeticModel: 'ExactRational_BigInt';
  order: number;
  latticeCentering: 'P' | 'A' | 'B' | 'C' | 'I' | 'F' | 'R';
  latticeTranslations: RationalDTO[][];
  translationEquivalence: 'modulo_Z3';
  operations: FsspackOperationDTO[];
}

export type CheckStatus = 'PASS' | 'FAIL' | 'NOT_CHECKED' | 'INCONCLUSIVE' | 'PARTIAL';
export type EvidenceLevel =
  | 'MATHEMATICALLY_PROVEN'
  | 'COMPUTED_AND_VERIFIED'
  | 'SELF_CONSISTENCY_CHECKED'
  | 'EXTERNAL_REFERENCE_MATCH';

export interface FsspackCheckEntry {
  checkId: string;
  targetProperty: string;
  inputsReference: string;
  algorithm: {
    name: string;
    version: string;
  };
  evidenceLevel: EvidenceLevel;
  status: CheckStatus;
  resultDetails?: Record<string, any>;
  limitsAndDisclaimers?: string;
}

export interface FsspackVerificationPassport {
  packageId: string;
  checksLedger: FsspackCheckEntry[];
  summaryStatus: 'ALL_PASS' | 'HAS_UNCHECKED' | 'FAILED';
}

export interface FsspackProvenance {
  sourceDatabase: string;
  sourceVersionOrCommit: string;
  sourceLicense: string;
  sourceTablePath?: string;
  exportTimestamp: string;
  exporterSoftware: {
    name: string;
    version: string;
  };
  requiredKernelCapabilities: string[];
}

export interface FsspackResearchProfile {
  algebraicOrdersHistogram?: Record<string, number>;
  traceHistogram?: Record<string, number>;
  isCentrosymmetric?: boolean;
  isChiral?: boolean;
  isPolar?: boolean;
  notes?: string[];
}

export type GatekeeperAdmissionStatus =
  | 'VERIFIED_ACTIVE'
  | 'QUARANTINE_DIAGNOSTIC'
  | 'REJECTED';

export interface GatekeeperStageResult {
  stage: number;
  name: string;
  passed: boolean;
  error?: string;
  details?: Record<string, any>;
}

export interface GatekeeperReport {
  packageId?: string;
  admissionStatus: GatekeeperAdmissionStatus;
  stages: GatekeeperStageResult[];
  reasons: string[];
  quarantineDisclaimers: string[];
  mathVerified: boolean;
  contentSha256Expected?: string;
  contentSha256Actual?: string;
}
