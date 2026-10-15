/**
 * FSSPACK Integration Test Runner (FSSPACK_INTEGRATION_TEST_01)
 * 
 * Tests Express API endpoints (/api/fsspack/export/P41 and /api/fsspack/ingest),
 * simulated UI file import, Gatekeeper pipeline verification, and negative test cases
 * (corrupted zip, missing mandatory files, checksum mismatch, version mismatch, math violations).
 */

import { app } from '../../server';
import { PackageExporter } from './exporter';
import { Gatekeeper } from './gatekeeper';
import { ZipContainer } from './zip_container';
import { SymmetryCatalog } from '../../core/registry';
import * as http from 'node:http';
import * as zlib from 'node:zlib';

async function runIntegrationTests() {
  console.log('===============================================================');
  console.log('FSS — FSSPACK INTEGRATION TEST 01: END-TO-END VALIDATION');
  console.log('===============================================================\n');

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

  let passed = 0;
  let total = 0;

  async function testAsync(name: string, fn: () => Promise<void>) {
    total++;
    try {
      await fn();
      console.log(`[PASS] Test ${total}: ${name}`);
      passed++;
    } catch (err: any) {
      console.error(`[FAIL] Test ${total}: ${name}`);
      console.error(`       Error: ${err.message}`);
      throw err;
    }
  }

  try {
    // Test 1: Export API endpoint for P41
    await testAsync('GET /api/fsspack/export/P41 returns valid .fsspack ZIP container', async () => {
      const res = await fetch(`${baseUrl}/api/fsspack/export/P41`);
      if (res.status !== 200) throw new Error(`Expected status 200, got ${res.status}`);
      const contentType = res.headers.get('content-type');
      if (!contentType?.includes('application/zip')) {
        throw new Error(`Expected application/zip content type, got ${contentType}`);
      }
      const arrayBuf = await res.arrayBuffer();
      const buf = Buffer.from(arrayBuf);
      if (buf.length === 0) throw new Error('Received empty buffer');
      
      // Verify via Gatekeeper
      const result = Gatekeeper.ingest(buf);
      if (result.report.admissionStatus !== 'VERIFIED_ACTIVE') {
        throw new Error(`Expected VERIFIED_ACTIVE admission status, got ${result.report.admissionStatus}`);
      }
    });

    // Test 2: Ingest valid exported package via POST /api/fsspack/ingest
    await testAsync('POST /api/fsspack/ingest successfully ingests exported P41 package', async () => {
      const record = SymmetryCatalog.findBySettingId('P41');
      if (!record) throw new Error('P41 record not found');
      const exportRes = PackageExporter.export(record);

      const res = await fetch(`${baseUrl}/api/fsspack/ingest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/octet-stream' },
        body: exportRes.packageBuffer
      });

      if (res.status !== 200) throw new Error(`Expected status 200, got ${res.status}`);
      const data = await res.json() as any;
      if (data.report.admissionStatus !== 'VERIFIED_ACTIVE') {
        throw new Error(`Expected VERIFIED_ACTIVE, got ${data.report.admissionStatus}`);
      }
      if (!data.manifest || data.manifest.packageId !== 'SG076_P41') {
        throw new Error('Manifest packageId mismatch');
      }
      if (!data.mathModel || data.mathModel.operations.length !== 4) {
        throw new Error('Math model operations count mismatch');
      }
    });

    // Test 3: Negative test - Corrupted ZIP container (Stage 1)
    await testAsync('POST /api/fsspack/ingest rejects corrupted ZIP container at Stage 1', async () => {
      const corruptBuf = Buffer.from('NOT_A_ZIP_CONTAINER_DATA_XYZ_12345', 'utf8');
      const res = await fetch(`${baseUrl}/api/fsspack/ingest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/octet-stream' },
        body: corruptBuf
      });

      if (res.status !== 200) throw new Error(`Expected status 200 with rejection report, got ${res.status}`);
      const data = await res.json() as any;
      if (data.report.admissionStatus !== 'REJECTED') {
        throw new Error(`Expected REJECTED, got ${data.report.admissionStatus}`);
      }
      const stage1 = data.report.stages.find((s: any) => s.stage === 1);
      if (!stage1 || stage1.passed) {
        throw new Error('Expected Stage 1 to fail');
      }
    });

    // Test 4: Negative test - Missing mandatory file (Stage 2)
    await testAsync('POST /api/fsspack/ingest rejects package missing manifest.json at Stage 2', async () => {
      const record = SymmetryCatalog.findBySettingId('P41')!;
      const exportRes = PackageExporter.export(record);
      // Unpack, delete manifest.json, repack
      const files = ZipContainer.unpack(exportRes.packageBuffer);
      files.delete('manifest.json');
      const entries = Array.from(files.entries()).map(([path, data]) => ({ path, data }));
      const tamperedBuf = ZipContainer.pack(entries);

      const res = await fetch(`${baseUrl}/api/fsspack/ingest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/octet-stream' },
        body: tamperedBuf
      });

      const data = await res.json() as any;
      if (data.report.admissionStatus !== 'REJECTED') {
        throw new Error(`Expected REJECTED, got ${data.report.admissionStatus}`);
      }
      const stage2 = data.report.stages.find((s: any) => s.stage === 2);
      if (!stage2 || stage2.passed) {
        throw new Error('Expected Stage 2 structure check to fail');
      }
    });

    // Test 5: Negative test - Checksum mismatch (Stage 3)
    await testAsync('POST /api/fsspack/ingest rejects tampered file checksum at Stage 3', async () => {
      const record = SymmetryCatalog.findBySettingId('P41')!;
      const exportRes = PackageExporter.export(record);
      const files = ZipContainer.unpack(exportRes.packageBuffer);
      // Tamper math-model.json content without updating manifest
      files.set('math-model.json', Buffer.from(JSON.stringify({ tampered: true }), 'utf8'));
      const entries = Array.from(files.entries()).map(([path, data]) => ({ path, data }));
      const tamperedBuf = ZipContainer.pack(entries);

      const res = await fetch(`${baseUrl}/api/fsspack/ingest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/octet-stream' },
        body: tamperedBuf
      });

      const data = await res.json() as any;
      if (data.report.admissionStatus !== 'REJECTED') {
        throw new Error(`Expected REJECTED, got ${data.report.admissionStatus}`);
      }
      const stage3 = data.report.stages.find((s: any) => s.stage === 3);
      if (!stage3 || stage3.passed) {
        throw new Error('Expected Stage 3 integrity check to fail');
      }
    });

    // Test 6: Negative test - Unsupported schema version (Stage 4)
    await testAsync('POST /api/fsspack/ingest rejects unsupported spec version at Stage 4', async () => {
      const record = SymmetryCatalog.findBySettingId('P41')!;
      const exportRes = PackageExporter.export(record);
      const files = ZipContainer.unpack(exportRes.packageBuffer);
      const manifest = JSON.parse(files.get('manifest.json')!.toString('utf8'));
      manifest.fsspackVersion = '99.0' as any;
      files.set('manifest.json', Buffer.from(JSON.stringify(manifest), 'utf8'));
      const entries = Array.from(files.entries()).map(([path, data]) => ({ path, data }));
      const tamperedBuf = ZipContainer.pack(entries);

      const res = await fetch(`${baseUrl}/api/fsspack/ingest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/octet-stream' },
        body: tamperedBuf
      });

      const data = await res.json() as any;
      if (data.report.admissionStatus !== 'REJECTED') {
        throw new Error(`Expected REJECTED, got ${data.report.admissionStatus}`);
      }
      const stage4 = data.report.stages.find((s: any) => s.stage === 4);
      if (!stage4 || stage4.passed) {
        throw new Error('Expected Stage 4 compatibility check to fail');
      }
    });

    // Test 7: Negative test - Mathematical violation (Stage 5)
    await testAsync('POST /api/fsspack/ingest rejects invalid group axioms at Stage 5', async () => {
      const record = SymmetryCatalog.findBySettingId('P41')!;
      const exportRes = PackageExporter.export(record);
      const files = ZipContainer.unpack(exportRes.packageBuffer);
      const mathModel = JSON.parse(files.get('math-model.json')!.toString('utf8'));
      // Mutate operation matrix to violate group axioms
      mathModel.operations[1].W = [[2, 0, 0], [0, 1, 0], [0, 0, 1]];
      files.set('math-model.json', Buffer.from(JSON.stringify(mathModel), 'utf8'));

      // Recompute checksum for math-model.json in manifest
      const manifest = JSON.parse(files.get('manifest.json')!.toString('utf8'));
      const newMathModelBuf = files.get('math-model.json')!;
      const crypto = await import('node:crypto');
      const newHash = crypto.createHash('sha256').update(newMathModelBuf).digest('hex');
      for (const entry of manifest.files) {
        if (entry.path === 'math-model.json') {
          entry.sha256 = newHash;
          entry.byteSize = newMathModelBuf.length;
        }
      }
      files.set('manifest.json', Buffer.from(JSON.stringify(manifest), 'utf8'));

      const entries = Array.from(files.entries()).map(([path, data]) => ({ path, data }));
      const tamperedBuf = ZipContainer.pack(entries);

      const res = await fetch(`${baseUrl}/api/fsspack/ingest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/octet-stream' },
        body: tamperedBuf
      });

      const data = await res.json() as any;
      if (data.report.admissionStatus !== 'REJECTED') {
        throw new Error(`Expected REJECTED, got ${data.report.admissionStatus}`);
      }
      const stage5 = data.report.stages.find((s: any) => s.stage === 5);
      if (!stage5 || stage5.passed) {
        throw new Error('Expected Stage 5 mathematical validation to fail');
      }
    });

    console.log(`\n===============================================================`);
    console.log(`ALL INTEGRATION TESTS PASSED: ${passed} / ${total} verified`);
    console.log(`===============================================================\n`);
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
}

runIntegrationTests()
  .then(() => {
    process.exit(0);
  })
  .catch(err => {
    console.error('Integration test runner failed:', err);
    process.exit(1);
  });
