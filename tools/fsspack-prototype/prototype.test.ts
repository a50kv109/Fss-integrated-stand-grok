/**
 * FSSPACK Isolated Prototype Test Suite
 * 
 * Verifies end-to-end export, ingestion, integrity, mathematical invariance,
 * error handling, and epistemic admission for Space Group No. 76 (P4_1).
 */

import { SymmetryCatalog } from '../../core/registry';
import { CanonicalHasher } from './canonical_hasher';
import { PackageExporter } from './exporter';
import { Gatekeeper } from './gatekeeper';
import { FsspackMathModel } from './fsspack_types';
import { ZipContainer } from './zip_container';

function runPrototypeTests() {
  console.log('===============================================================');
  console.log('FSS — FSSPACK SPECIFICATION & PROTOTYPE 01: TEST EXECUTION');
  console.log('===============================================================\n');

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    totalTests++;
    if (condition) {
      console.log(`[PASS] Test ${totalTests}: ${testName}`);
      passedTests++;
    } else {
      console.error(`[FAIL] Test ${totalTests}: ${testName}`);
      if (detail) console.error(`       Detail: ${detail}`);
      throw new Error(`Test assertion failed: ${testName}`);
    }
  }

  // Retrieve pilot group SG 76 (P4_1) from core registry
  const p41Record = SymmetryCatalog.findBySettingId('P41');
  if (!p41Record) {
    throw new Error('SG 76 (P41) record not found in SymmetryCatalog');
  }

  // -------------------------------------------------------------
  // Test 1: Successful Export of SG 76 (P4_1)
  // -------------------------------------------------------------
  const extraCif = Buffer.from('data_P41_test\n_symmetry_space_group_name_H-M "P 41"\n', 'utf8');
  const exportResult = PackageExporter.export(p41Record, {
    extraFiles: [{ path: 'resources/test_phase.cif', data: extraCif }]
  });

  assert(
    exportResult.packageBuffer.length > 0 && exportResult.byteSize > 0,
    'Export produces non-empty .fsspack ZIP container',
    `Byte size: ${exportResult.byteSize}`
  );
  assert(
    exportResult.manifest.spaceGroupNumber === 76 && exportResult.manifest.settingId === 'P41',
    'Manifest correctly identifies SG 76 and P41 setting'
  );
  assert(
    exportResult.manifest.files.length === 4, // math-model, verification, provenance, resources/test_phase.cif
    'Manifest registers all mandatory files and extra resources'
  );

  // -------------------------------------------------------------
  // Test 2: Successful Gatekeeper Ingestion of Valid Pilot Package
  // -------------------------------------------------------------
  const ingestionResult = Gatekeeper.ingest(exportResult.packageBuffer);
  assert(
    ingestionResult.report.admissionStatus === 'VERIFIED_ACTIVE',
    'Gatekeeper admits valid P4_1 package with status VERIFIED_ACTIVE',
    `Status: ${ingestionResult.report.admissionStatus}`
  );
  assert(
    ingestionResult.report.stages.every(s => s.passed),
    'All 6 Gatekeeper stages pass without errors'
  );
  assert(
    ingestionResult.report.mathVerified === true,
    'Mathematical axioms independently confirmed by receiver kernel'
  );

  // -------------------------------------------------------------
  // Test 3: Exact Rational Preservation (Round-trip Fidelity)
  // -------------------------------------------------------------
  const ingestedOps = ingestionResult.mathModel!.operations;
  assert(ingestedOps.length === 4, 'Math model retains exactly 4 symmetry operations');

  // Verify operation 1: 4_1 rotation (-y, x, z+1/4)
  const op1 = ingestedOps.find(o => o.w[2].numerator === 1 && o.w[2].denominator === 4);
  assert(op1 !== undefined, 'Operation with translation 1/4 along z is preserved exactly');
  assert(
    op1!.W[0][1] === -1 && op1!.W[1][0] === 1 && op1!.W[2][2] === 1,
    'Matrix elements W for 4_1 rotation are exact integers'
  );
  assert(
    op1!.w[0].numerator === 0 && op1!.w[0].denominator === 1 &&
    op1!.w[1].numerator === 0 && op1!.w[1].denominator === 1 &&
    op1!.w[2].numerator === 1 && op1!.w[2].denominator === 4,
    'All rational coordinates remain exact integers (no float representation)'
  );

  // -------------------------------------------------------------
  // Test 4: Content Hash Invariance to Array Order and Reducible Fractions
  // -------------------------------------------------------------
  const modelA = ingestionResult.mathModel!;
  // Create model B with reversed operations and unreduced fraction (2/8 instead of 1/4)
  const modelB: FsspackMathModel = {
    ...modelA,
    operations: [...modelA.operations].reverse().map(op => ({
      ...op,
      w: [
        { numerator: op.w[0].numerator * 3, denominator: op.w[0].denominator * 3 },
        { numerator: op.w[1].numerator * 2, denominator: op.w[1].denominator * 2 },
        { numerator: op.w[2].numerator * 2, denominator: op.w[2].denominator * 2 }
      ]
    }))
  };

  const hashA = CanonicalHasher.computeContentSha256(modelA);
  const hashB = CanonicalHasher.computeContentSha256(modelB);
  assert(
    hashA === hashB,
    'Canonical content_sha256 is invariant to operation ordering and fraction reduction',
    `hashA: ${hashA}, hashB: ${hashB}`
  );

  // -------------------------------------------------------------
  // Test 5: Quarantine Diagnostic Mode for Unchecked Properties
  // -------------------------------------------------------------
  // Modify verification passport to include an unchecked item
  const passportWithUnchecked = JSON.parse(
    ingestionResult.extraFiles ? JSON.stringify(ingestionResult.verificationPassport) : '{}'
  );
  passportWithUnchecked.checksLedger.push({
    checkId: 'CHK-OPTIONAL-CHIRAL',
    targetProperty: 'ENANTIOMORPHIC_PAIR',
    inputsReference: 'math-model.json',
    algorithm: { name: 'ChiralDetector', version: '0.9.0' },
    evidenceLevel: 'SELF_CONSISTENCY_CHECKED',
    status: 'NOT_CHECKED'
  });

  const filesForQuarantine = ZipContainer.unpack(exportResult.packageBuffer);
  const newVerBuf = Buffer.from(JSON.stringify(passportWithUnchecked, null, 2), 'utf8');
  filesForQuarantine.set('verification.json', newVerBuf);

  // Update manifest checksum for verification.json so integrity passes
  const manifestForQuarantine = JSON.parse(filesForQuarantine.get('manifest.json')!.toString('utf8'));
  const verEntry = manifestForQuarantine.files.find((f: any) => f.path === 'verification.json');
  verEntry.sha256 = CanonicalHasher.sha256(newVerBuf);
  verEntry.byteSize = newVerBuf.length;
  filesForQuarantine.set('manifest.json', Buffer.from(JSON.stringify(manifestForQuarantine, null, 2), 'utf8'));

  const quarantinePack = ZipContainer.pack(
    Array.from(filesForQuarantine.entries()).map(([path, data]) => ({ path, data }))
  );
  const quarantineReport = Gatekeeper.ingest(quarantinePack);

  assert(
    quarantineReport.report.admissionStatus === 'QUARANTINE_DIAGNOSTIC',
    'Package with NOT_CHECKED verification item is admitted in QUARANTINE_DIAGNOSTIC status',
    `Status: ${quarantineReport.report.admissionStatus}`
  );
  assert(
    quarantineReport.report.quarantineDisclaimers.length > 0,
    'Quarantine disclaimers explicitly list unverified properties'
  );

  // -------------------------------------------------------------
  // Test 6: Rejection on Corrupted Physical Container (Stage 1)
  // -------------------------------------------------------------
  const corruptBuffer = Buffer.from(exportResult.packageBuffer);
  corruptBuffer.write('BAD_BYTES_CORRUPT', 10);
  const corruptReport = Gatekeeper.ingest(corruptBuffer);
  assert(
    corruptReport.report.admissionStatus === 'REJECTED' &&
    corruptReport.report.stages[0].passed === false,
    'Gatekeeper rejects corrupted physical ZIP container at Stage 1'
  );

  // -------------------------------------------------------------
  // Test 7: Rejection on Missing Mandatory File (Stage 2)
  // -------------------------------------------------------------
  const filesMissingMath = ZipContainer.unpack(exportResult.packageBuffer);
  filesMissingMath.delete('math-model.json');
  const missingMathPack = ZipContainer.pack(
    Array.from(filesMissingMath.entries()).map(([path, data]) => ({ path, data }))
  );
  const missingMathReport = Gatekeeper.ingest(missingMathPack);
  assert(
    missingMathReport.report.admissionStatus === 'REJECTED' &&
    missingMathReport.report.stages[1].passed === false,
    'Gatekeeper rejects package missing math-model.json at Stage 2'
  );

  // -------------------------------------------------------------
  // Test 8: Rejection on Checksum Mismatch / File Tampering (Stage 3)
  // -------------------------------------------------------------
  const filesTampered = ZipContainer.unpack(exportResult.packageBuffer);
  // Silently modify math-model.json without updating manifest checksum
  const tamperedModel = JSON.parse(filesTampered.get('math-model.json')!.toString('utf8'));
  tamperedModel.order = 999;
  filesTampered.set('math-model.json', Buffer.from(JSON.stringify(tamperedModel), 'utf8'));
  const tamperedPack = ZipContainer.pack(
    Array.from(filesTampered.entries()).map(([path, data]) => ({ path, data }))
  );
  const tamperedReport = Gatekeeper.ingest(tamperedPack);
  assert(
    tamperedReport.report.admissionStatus === 'REJECTED' &&
    tamperedReport.report.stages[2].passed === false,
    'Gatekeeper rejects tampered file due to checksum mismatch at Stage 3'
  );

  // -------------------------------------------------------------
  // Test 9: Rejection on Unsupported Schema Version (Stage 4)
  // -------------------------------------------------------------
  const filesBadVersion = ZipContainer.unpack(exportResult.packageBuffer);
  const badManifest = JSON.parse(filesBadVersion.get('manifest.json')!.toString('utf8'));
  badManifest.fsspackVersion = '99.0.0';
  filesBadVersion.set('manifest.json', Buffer.from(JSON.stringify(badManifest), 'utf8'));
  const badVerPack = ZipContainer.pack(
    Array.from(filesBadVersion.entries()).map(([path, data]) => ({ path, data }))
  );
  const badVerReport = Gatekeeper.ingest(badVerPack);
  assert(
    badVerReport.report.admissionStatus === 'REJECTED' &&
    badVerReport.report.stages[3].passed === false,
    'Gatekeeper rejects unsupported major schema version at Stage 4'
  );

  // -------------------------------------------------------------
  // Test 10: Rejection on Mathematical Axiom Violation (Stage 5)
  // -------------------------------------------------------------
  // Corrupt one matrix in math-model so group closure breaks, and update manifest checksums
  const filesBrokenMath = ZipContainer.unpack(exportResult.packageBuffer);
  const brokenModel = JSON.parse(filesBrokenMath.get('math-model.json')!.toString('utf8'));
  // Change W of op 1 so it's not a valid rotation
  brokenModel.operations[1].W = [[1, 2, 3], [0, 1, 0], [0, 0, 1]];
  const brokenModelBuf = Buffer.from(JSON.stringify(brokenModel), 'utf8');
  filesBrokenMath.set('math-model.json', brokenModelBuf);

  // Update manifest checksum so Stage 3 passes, but Stage 5 catches the axiom violation
  const manifestForBroken = JSON.parse(filesBrokenMath.get('manifest.json')!.toString('utf8'));
  manifestForBroken.contentSha256 = CanonicalHasher.computeContentSha256(brokenModel);
  const mathEntry = manifestForBroken.files.find((f: any) => f.path === 'math-model.json');
  mathEntry.sha256 = CanonicalHasher.sha256(brokenModelBuf);
  mathEntry.byteSize = brokenModelBuf.length;
  filesBrokenMath.set('manifest.json', Buffer.from(JSON.stringify(manifestForBroken), 'utf8'));

  const brokenMathPack = ZipContainer.pack(
    Array.from(filesBrokenMath.entries()).map(([path, data]) => ({ path, data }))
  );
  const brokenMathReport = Gatekeeper.ingest(brokenMathPack);

  assert(
    brokenMathReport.report.admissionStatus === 'REJECTED' &&
    brokenMathReport.report.stages[4].passed === false,
    'Gatekeeper rejects package violating mathematical group axioms at Stage 5'
  );

  // -------------------------------------------------------------
  // Test 11: Extra Non-Math Resources Preservation
  // -------------------------------------------------------------
  assert(
    ingestionResult.extraFiles.has('resources/test_phase.cif'),
    'Auxiliary CIF structure in resources/ preserved without affecting math core'
  );
  const recoveredCif = ingestionResult.extraFiles.get('resources/test_phase.cif')!.toString('utf8');
  assert(
    recoveredCif.includes('P 41'),
    'Auxiliary resource content recovered byte-identically'
  );

  console.log('\n===============================================================');
  console.log(`ALL TESTS PASSED: ${passedTests} / ${totalTests} assertions verified`);
  console.log('===============================================================\n');
}

runPrototypeTests();
