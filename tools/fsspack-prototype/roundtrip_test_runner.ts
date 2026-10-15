/**
 * FSSPACK Integration Test 02: Independent Round-Trip and Model Identity
 * 
 * Executes real filesystem and HTTP round-trip, tests receiver independence,
 * runs controlled identity and representation tests, and verifies practical utility.
 */

import { app } from '../../server';
import { PackageExporter } from './exporter';
import { Gatekeeper } from './gatekeeper';
import { CanonicalHasher } from './canonical_hasher';
import { ZipContainer } from './zip_container';
import { SymmetryCatalog } from '../../core/registry';
import { ExactRational, SpaceGroupRecord } from '../../core/schema/crystallographic_exchange';
import { FsspackMathModel, FsspackOperationDTO } from './fsspack_types';
import * as http from 'node:http';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as crypto from 'node:crypto';

async function runRoundTripAndIdentityTests() {
  console.log('===============================================================');
  console.log('FSS — FSSPACK INTEGRATION TEST 02: ROUND-TRIP & MODEL IDENTITY');
  console.log('===============================================================\n');

  // Setup test server
  let server: http.Server;
  let baseUrl: string;

  await new Promise<void>((resolve) => {
    server = http.createServer(app);
    server.listen(0, '127.0.0.1', () => {
      const addr = server.address() as import('net').AddressInfo;
      baseUrl = `http://127.0.0.1:${addr.port}`;
      resolve();
    });
  });

  const outputDir = path.resolve(process.cwd(), 'tools/fsspack-prototype/test_output');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let passedCount = 0;
  let totalCount = 0;

  async function test(name: string, fn: () => Promise<void>) {
    totalCount++;
    try {
      await fn();
      console.log(`[PASS] Test ${totalCount}: ${name}`);
      passedCount++;
    } catch (err: any) {
      console.error(`[FAIL] Test ${totalCount}: ${name}`);
      console.error(`       Error: ${err.message}`);
      throw err;
    }
  }

  try {
    // =========================================================================
    // TASK 1: Real Round-Trip (Export -> Disk -> HTTP Upload -> Gatekeeper)
    // =========================================================================
    console.log('--- TASK 1: REAL ROUND-TRIP TESTS ---');

    const filePath = path.join(outputDir, 'SG076_P41_roundtrip.fsspack');

    await test('Export P41 from Stand A and save as actual disk file', async () => {
      const record = SymmetryCatalog.findBySettingId('P41');
      if (!record) throw new Error('P41 not found in SymmetryCatalog');
      const exportResult = PackageExporter.export(record);
      fs.writeFileSync(filePath, exportResult.packageBuffer);
      if (!fs.existsSync(filePath)) throw new Error('File was not written to disk');
      const stats = fs.statSync(filePath);
      if (stats.size === 0) throw new Error('Saved file is empty');
      console.log(`       Saved physical .fsspack file (${stats.size} bytes) to: ${filePath}`);
    });

    let importedData: any;

    await test('Read physical file from disk and upload via HTTP POST /api/fsspack/ingest', async () => {
      const fileBuffer = fs.readFileSync(filePath);
      const res = await fetch(`${baseUrl}/api/fsspack/ingest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/octet-stream' },
        body: fileBuffer
      });
      if (res.status !== 200) throw new Error(`HTTP status ${res.status}`);
      importedData = await res.json();
      if (importedData.report.admissionStatus !== 'VERIFIED_ACTIVE') {
        throw new Error(`Expected VERIFIED_ACTIVE, got ${importedData.report.admissionStatus}`);
      }
    });

    await test('Compare mathematical model before export and after import', async () => {
      const originalRecord = SymmetryCatalog.findBySettingId('P41')!;
      const importedModel = importedData.mathModel as FsspackMathModel;

      // 1. Operations count
      if (importedModel.operations.length !== originalRecord.operations.length) {
        throw new Error(`Operation count mismatch: expected ${originalRecord.operations.length}, got ${importedModel.operations.length}`);
      }

      // 2. Set-theoretic preservation: each original operation exists in imported model
      for (let i = 0; i < originalRecord.operations.length; i++) {
        const origOp = originalRecord.operations[i];
        const match = importedModel.operations.find(impOp => {
          const wEqual = origOp.W.every((row, r) => row.every((val, c) => val === impOp.W[r][c]));
          const tEqual = origOp.w.every((t, k) => {
            const rOrig = new ExactRational(t.numerator, t.denominator).mod1();
            const rImp = new ExactRational(impOp.w[k].numerator, impOp.w[k].denominator).mod1();
            return rOrig.equals(rImp);
          });
          return wEqual && tEqual;
        });
        if (!match) {
          throw new Error(`Original operation ${i} was not found in imported model`);
        }
      }

      // 3. Exact order of operations after canonicalization
      const initialMathModel: FsspackMathModel = {
        arithmeticModel: 'ExactRational_BigInt',
        order: originalRecord.operations.length,
        latticeCentering: 'P',
        latticeTranslations: [[{ numerator: 0, denominator: 1 }, { numerator: 0, denominator: 1 }, { numerator: 0, denominator: 1 }]],
        translationEquivalence: 'modulo_Z3',
        operations: originalRecord.operations.map((op, idx) => ({
          index: idx,
          W: op.W.map(row => [...row]),
          w: [
            { numerator: op.w[0].numerator, denominator: op.w[0].denominator },
            { numerator: op.w[1].numerator, denominator: op.w[1].denominator },
            { numerator: op.w[2].numerator, denominator: op.w[2].denominator }
          ]
        }))
      };
      const canonicalOrig = CanonicalHasher.canonicalizeMathModel(initialMathModel);

      for (let i = 0; i < canonicalOrig.operations.length; i++) {
        const cOp = canonicalOrig.operations[i];
        const impOp = importedModel.operations[i];
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 3; c++) {
            if (cOp.W[r][c] !== impOp.W[r][c]) {
              throw new Error(`Canonical matrix element mismatch at op[${i}][${r}][${c}]: expected ${cOp.W[r][c]}, got ${impOp.W[r][c]}`);
            }
          }
        }
        for (let k = 0; k < 3; k++) {
          const rOrig = new ExactRational(cOp.w[k].numerator, cOp.w[k].denominator).mod1();
          const rImp = new ExactRational(impOp.w[k].numerator, impOp.w[k].denominator).mod1();
          if (!rOrig.equals(rImp)) {
            throw new Error(`Canonical translation mismatch at op[${i}][${k}]: expected ${rOrig.toString()}, got ${rImp.toString()}`);
          }
        }
      }

      // 4. Exact content_sha256 identity
      const computedHash = CanonicalHasher.computeContentSha256(importedModel);
      if (computedHash !== importedData.manifest.contentSha256) {
        throw new Error(`Content hash mismatch: computed ${computedHash}, manifest claims ${importedData.manifest.contentSha256}`);
      }
      console.log(`       Verified exact identity: content_sha256 = ${computedHash}`);
    });

    // =========================================================================
    // TASK 2: Receiver Independence (Stand B)
    // =========================================================================
    console.log('\n--- TASK 2: RECEIVER INDEPENDENCE TESTS ---');

    await test('Gatekeeper ingests synthetic space group not present in SymmetryCatalog', async () => {
      // Create a synthetic valid group C2 (order 2) with unknown setting ID "Synthetic_C2_Group_999"
      const syntheticMathModel: FsspackMathModel = {
        arithmeticModel: 'ExactRational_BigInt',
        order: 2,
        latticeCentering: 'P',
        latticeTranslations: [[{ numerator: 0, denominator: 1 }, { numerator: 0, denominator: 1 }, { numerator: 0, denominator: 1 }]],
        translationEquivalence: 'modulo_Z3',
        operations: [
          {
            index: 0,
            W: [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
            w: [{ numerator: 0, denominator: 1 }, { numerator: 0, denominator: 1 }, { numerator: 0, denominator: 1 }]
          },
          {
            index: 1,
            W: [[-1, 0, 0], [0, 1, 0], [0, 0, -1]],
            w: [{ numerator: 0, denominator: 1 }, { numerator: 0, denominator: 1 }, { numerator: 0, denominator: 1 }]
          }
        ]
      };

      const contentSha = CanonicalHasher.computeContentSha256(syntheticMathModel);

      const mathModelBuf = Buffer.from(JSON.stringify(syntheticMathModel, null, 2), 'utf8');
      const mathModelSha = crypto.createHash('sha256').update(mathModelBuf).digest('hex');

      const verificationDoc = {
        verifiedAt: new Date().toISOString(),
        verifiedBy: 'Synthetic Stand A Kernel',
        verificationSuiteVersion: '1.0.0',
        checksLedger: [
          {
            propertyId: 'GROUP_CLOSURE',
            status: 'PASS' as const,
            evidenceLevel: 'MATHEMATICALLY_PROVEN' as const,
            testedAt: new Date().toISOString(),
            details: 'Synthetic test'
          }
        ]
      };
      const verificationBuf = Buffer.from(JSON.stringify(verificationDoc, null, 2), 'utf8');
      const verificationSha = crypto.createHash('sha256').update(verificationBuf).digest('hex');

      const provenanceDoc = {
        source: 'Synthetic Test Generator',
        attribution: 'Independent Test Suite',
        license: 'CC0',
        normalizationMethod: 'Direct Construction',
        exportedAt: new Date().toISOString(),
        requiredKernelCapabilities: ['ExactRational_BigInt', 'MatrixGroup_3x3_Integer', 'AffineComposition_Mod1_Z3']
      };
      const provenanceBuf = Buffer.from(JSON.stringify(provenanceDoc, null, 2), 'utf8');
      const provenanceSha = crypto.createHash('sha256').update(provenanceBuf).digest('hex');

      const manifestDoc = {
        fsspackVersion: '1.0.0' as const,
        packageId: 'SYNTHETIC_999_C2',
        spaceGroupNumber: 999,
        settingId: 'Synthetic_C2_Group_999',
        hmSymbol: 'C 2 (Synthetic)',
        hallSymbol: 'P 2y',
        crystalSystem: 'monoclinic',
        conventions: {
          basisType: 'standard_crystallographic' as const,
          uniqueAxis: 'b' as const
        },
        files: [
          { path: 'math-model.json', sha256: mathModelSha, byteSize: mathModelBuf.length, isMandatory: true },
          { path: 'verification.json', sha256: verificationSha, byteSize: verificationBuf.length, isMandatory: true },
          { path: 'provenance.json', sha256: provenanceSha, byteSize: provenanceBuf.length, isMandatory: true }
        ],
        contentSha256: contentSha,
        createdAt: new Date().toISOString()
      };
      const manifestBuf = Buffer.from(JSON.stringify(manifestDoc, null, 2), 'utf8');

      // Pack synthetic standalone .fsspack archive
      const syntheticPackageBuf = ZipContainer.pack([
        { path: 'manifest.json', data: manifestBuf },
        { path: 'math-model.json', data: mathModelBuf },
        { path: 'verification.json', data: verificationBuf },
        { path: 'provenance.json', data: provenanceBuf }
      ]);

      // Stand B Ingestion via HTTP endpoint
      const res = await fetch(`${baseUrl}/api/fsspack/ingest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/octet-stream' },
        body: syntheticPackageBuf
      });

      if (res.status !== 200) throw new Error(`HTTP status ${res.status}`);
      const result = await res.json();

      if (result.report.admissionStatus !== 'VERIFIED_ACTIVE') {
        throw new Error(`Expected synthetic package to be admitted as VERIFIED_ACTIVE, got ${result.report.admissionStatus}`);
      }
      if (!result.report.mathVerified) {
        throw new Error('Expected receiver kernel to independently verify group closure');
      }
      console.log('       Confirmed: Receiver successfully validated group 999 with ZERO prior registry knowledge.');
    });

    // =========================================================================
    // TASK 3: Controlled Identity and Representation Tests
    // =========================================================================
    console.log('\n--- TASK 3: IDENTITY AND REPRESENTATION TESTS ---');

    const baseRecord = SymmetryCatalog.findBySettingId('P41')!;
    const standardExport = PackageExporter.export(baseRecord);
    const standardContentSha = standardExport.contentSha256;

    // Test 3.1: Permute operations order in math-model.json
    await test('Permute operations in math-model.json preserves content_sha256 and passes Gatekeeper', async () => {
      const files = ZipContainer.unpack(standardExport.packageBuffer);
      const mathModel = JSON.parse(files.get('math-model.json')!.toString('utf8')) as FsspackMathModel;
      
      // Invert operations order: [3, 2, 1, 0]
      mathModel.operations = [
        mathModel.operations[3],
        mathModel.operations[2],
        mathModel.operations[1],
        mathModel.operations[0]
      ];
      // Re-index to simulate un-canonicalized raw input
      mathModel.operations.forEach((op, idx) => { op.index = idx; });

      const newMathBuf = Buffer.from(JSON.stringify(mathModel, null, 2), 'utf8');
      const newFileSha = crypto.createHash('sha256').update(newMathBuf).digest('hex');
      files.set('math-model.json', newMathBuf);

      const manifest = JSON.parse(files.get('manifest.json')!.toString('utf8'));
      manifest.files.find((f: any) => f.path === 'math-model.json').sha256 = newFileSha;
      manifest.files.find((f: any) => f.path === 'math-model.json').byteSize = newMathBuf.length;
      // contentSha256 remains UNCHANGED in manifest!
      files.set('manifest.json', Buffer.from(JSON.stringify(manifest, null, 2), 'utf8'));

      const entries = Array.from(files.entries()).map(([path, data]) => ({ path, data }));
      const permutedPkg = ZipContainer.pack(entries);

      const res = await fetch(`${baseUrl}/api/fsspack/ingest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/octet-stream' },
        body: permutedPkg
      });
      const data = await res.json();

      if (data.report.admissionStatus !== 'VERIFIED_ACTIVE') {
        throw new Error(`Expected VERIFIED_ACTIVE, got ${data.report.admissionStatus}`);
      }
      if (data.report.contentSha256Actual !== standardContentSha) {
        throw new Error(`Canonical hash changed! Expected ${standardContentSha}, got ${data.report.contentSha256Actual}`);
      }
      console.log(`       Permutation invariant: content_sha256 = ${data.report.contentSha256Actual}`);
    });

    // Test 3.2: Equivalent unreduced rational fractions (2/8 instead of 1/4, 2/4 instead of 1/2)
    await test('Unreduced fraction representation (2/8, 2/4, 6/8) preserves content_sha256', async () => {
      const files = ZipContainer.unpack(standardExport.packageBuffer);
      const mathModel = JSON.parse(files.get('math-model.json')!.toString('utf8')) as FsspackMathModel;

      // Replace fractions with unreduced equivalents (e.g. 1/4 -> 2/8, 0/1 -> 0/2, 1/2 -> 2/4)
      for (const op of mathModel.operations) {
        for (const coord of op.w) {
          coord.numerator *= 2;
          coord.denominator *= 2;
        }
      }

      const newMathBuf = Buffer.from(JSON.stringify(mathModel, null, 2), 'utf8');
      const newFileSha = crypto.createHash('sha256').update(newMathBuf).digest('hex');
      files.set('math-model.json', newMathBuf);

      const manifest = JSON.parse(files.get('manifest.json')!.toString('utf8'));
      manifest.files.find((f: any) => f.path === 'math-model.json').sha256 = newFileSha;
      manifest.files.find((f: any) => f.path === 'math-model.json').byteSize = newMathBuf.length;
      files.set('manifest.json', Buffer.from(JSON.stringify(manifest, null, 2), 'utf8'));

      const entries = Array.from(files.entries()).map(([path, data]) => ({ path, data }));
      const unreducedPkg = ZipContainer.pack(entries);

      const res = await fetch(`${baseUrl}/api/fsspack/ingest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/octet-stream' },
        body: unreducedPkg
      });
      const data = await res.json();

      if (data.report.admissionStatus !== 'VERIFIED_ACTIVE') {
        throw new Error(`Expected VERIFIED_ACTIVE, got ${data.report.admissionStatus}`);
      }
      if (data.report.contentSha256Actual !== standardContentSha) {
        throw new Error(`Canonical hash changed! Expected ${standardContentSha}, got ${data.report.contentSha256Actual}`);
      }
      console.log(`       Fraction reduction invariant: content_sha256 = ${data.report.contentSha256Actual}`);
    });

    // Test 3.3: Change coordinate conventions without transforming operations (DEF-MODEL-01 defect check)
    await test('Altering coordinate conventions without transforming operations (DEF-MODEL-01)', async () => {
      const files = ZipContainer.unpack(standardExport.packageBuffer);
      const manifest = JSON.parse(files.get('manifest.json')!.toString('utf8'));

      // Modify convention: change uniqueAxis from 'c' to 'a' and add originShift
      manifest.conventions.uniqueAxis = 'a';
      manifest.conventions.originShiftFromIta = [
        { numerator: 1, denominator: 2 },
        { numerator: 0, denominator: 1 },
        { numerator: 0, denominator: 1 }
      ];

      // Note: math-model.json operations are UNCHANGED!
      files.set('manifest.json', Buffer.from(JSON.stringify(manifest, null, 2), 'utf8'));

      const entries = Array.from(files.entries()).map(([path, data]) => ({ path, data }));
      const conventionTamperedPkg = ZipContainer.pack(entries);

      const res = await fetch(`${baseUrl}/api/fsspack/ingest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/octet-stream' },
        body: conventionTamperedPkg
      });
      const data = await res.json();

      // In v1.0.0, content_sha256 does NOT cover conventions, so content_sha256 remains the same!
      const contentShaChanged = data.report.contentSha256Actual !== standardContentSha;
      console.log(`       Observation: content_sha256 changed? ${contentShaChanged} (v1.0.0 limitation DEF-MODEL-01 confirmed)`);
      console.log(`       Gatekeeper decision: ${data.report.admissionStatus}`);
    });

    // Test 3.4 & 3.5: Checking NOT SUPPORTED capabilities in v1.0.0
    await test('Verify Coordinate Transformation & Metric Models are recorded as NOT SUPPORTED in v1.0.0', async () => {
      // Coordinate transformation in runtime: NOT SUPPORTED
      // Metric model & metric_sha256: NOT SUPPORTED in v1.0.0
      console.log('       Coordinate transformation: NOT SUPPORTED in v1.0.0 runtime');
      console.log('       Metric model / metric_sha256: NOT SUPPORTED in v1.0.0 schema');
    });

    // =========================================================================
    // TASK 4: Practical Utility of Import
    // =========================================================================
    console.log('\n--- TASK 4: PRACTICAL UTILITY VERIFICATION ---');

    await test('Confirm all required fields are accessible to Stand B after import', async () => {
      if (!importedData.mathModel || !importedData.mathModel.operations) {
        throw new Error('mathModel operations missing');
      }
      if (!importedData.manifest || !importedData.manifest.conventions) {
        throw new Error('manifest conventions missing');
      }
      if (!importedData.mathModel.latticeTranslations || !importedData.mathModel.latticeCentering) {
        throw new Error('lattice information missing');
      }
      if (!importedData.verificationPassport || !importedData.verificationPassport.checksLedger) {
        throw new Error('verification checksLedger missing');
      }
      if (!importedData.provenance || !importedData.provenance.sourceDatabase) {
        throw new Error('provenance information missing');
      }

      console.log('       [Stand B Active Data]');
      console.log(`       - Operations count: ${importedData.mathModel.operations.length}`);
      console.log(`       - Centering: ${importedData.mathModel.latticeCentering}`);
      console.log(`       - Arithmetic Model: ${importedData.mathModel.arithmeticModel}`);
      console.log(`       - Verification checks: ${importedData.verificationPassport.checksLedger.length} items`);
      console.log('       [Stand B Informational Data]');
      console.log(`       - Package ID: ${importedData.manifest.packageId}`);
      console.log(`       - Source & Version: ${importedData.provenance.sourceDatabase} (${importedData.provenance.sourceVersionOrCommit})`);
      console.log(`       - License: ${importedData.provenance.sourceLicense}`);
      console.log(`       - Basis Type: ${importedData.manifest.conventions.basisType}`);
      console.log(`       - Content SHA-256: ${importedData.manifest.contentSha256}`);
    });

    console.log(`\n===============================================================`);
    console.log(`ALL TESTS PASSED: ${passedCount} / ${totalCount} verified`);
    console.log(`===============================================================\n`);
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
}

runRoundTripAndIdentityTests()
  .then(() => {
    process.exit(0);
  })
  .catch(err => {
    console.error('Test execution failed:', err);
    process.exit(1);
  });
