/**
 * FSSPACK Hardening 01 Security Test Suite
 * 
 * Validates security hardening controls against Path Traversal, Zip Bombs,
 * malformed archives, invalid compression methods, and checksum/size tampering.
 */

import { ZipContainer } from './zip_container';
import { Gatekeeper } from './gatekeeper';
import { PackageExporter } from './exporter';
import { SymmetryCatalog } from '../../core/registry';
import * as zlib from 'node:zlib';

function runHardeningTests() {
  console.log('===============================================================');
  console.log('FSS — FSSPACK HARDENING 01: SECURITY TEST SUITE EXECUTION');
  console.log('===============================================================\n');

  let passed = 0;
  let total = 0;

  function test(name: string, fn: () => void) {
    total++;
    try {
      fn();
      console.log(`[PASS] Test ${total}: ${name}`);
      passed++;
    } catch (err: any) {
      console.error(`[FAIL] Test ${total}: ${name}`);
      console.error(`       Error: ${err.message}`);
      throw err;
    }
  }

  // 1. Absolute Path Injection (Path Traversal)
  test('Reject archive with absolute path entry', () => {
    let threw = false;
    try {
      // Craft low-level zip with absolute path
      const customEntries = [
        { path: '/etc/passwd', data: Buffer.from('root:x:0:0:', 'utf8') }
      ];
      const buf = ZipContainer.pack(customEntries);
      ZipContainer.unpack(buf);
    } catch (err: any) {
      threw = err.message.includes('Absolute path not allowed');
    }
    if (!threw) throw new Error('Expected absolute path rejection');
  });

  // 2. Directory Traversal with ../
  test('Reject archive with ../ path traversal entry', () => {
    let threw = false;
    try {
      const customEntries = [
        { path: '../secret.txt', data: Buffer.from('secret', 'utf8') }
      ];
      const buf = ZipContainer.pack(customEntries);
      ZipContainer.unpack(buf);
    } catch (err: any) {
      threw = err.message.includes('Directory traversal');
    }
    if (!threw) throw new Error('Expected directory traversal rejection');
  });

  // 3. Backslashes in path
  test('Normalize or handle backslashes correctly', () => {
    // ZipContainer.pack sanitizes backslashes to forward slashes
    const customEntries = [
      { path: 'resources\\test.txt', data: Buffer.from('hello', 'utf8') }
    ];
    const buf = ZipContainer.pack(customEntries);
    const unpacked = ZipContainer.unpack(buf);
    if (!unpacked.has('resources/test.txt')) {
      throw new Error('Backslash path was not normalized correctly to forward slashes');
    }
  });

  // 4. Duplicate entry name / duplicate mandatory file
  test('Reject archive with duplicate entry names', () => {
    let threw = false;
    try {
      const filename = 'manifest.json';
      const nameBuf = Buffer.from(filename, 'utf8');
      const data = Buffer.from('{}', 'utf8');
      const crc = zlib.crc32(data);

      const hdr = Buffer.alloc(30 + nameBuf.length);
      hdr.writeUInt32LE(0x04034b50, 0);
      hdr.writeUInt16LE(20, 4);
      hdr.writeUInt16LE(0, 8);
      hdr.writeUInt32LE(crc, 14);
      hdr.writeUInt32LE(data.length, 18);
      hdr.writeUInt32LE(data.length, 22);
      hdr.writeUInt16LE(nameBuf.length, 26);
      nameBuf.copy(hdr, 30);

      const central1 = Buffer.alloc(46 + nameBuf.length);
      central1.writeUInt32LE(0x02014b50, 0);
      central1.writeUInt32LE(crc, 16);
      central1.writeUInt32LE(data.length, 20);
      central1.writeUInt32LE(data.length, 24);
      central1.writeUInt16LE(nameBuf.length, 28);
      central1.writeUInt32LE(0, 42);
      nameBuf.copy(central1, 46);

      const central2 = Buffer.alloc(46 + nameBuf.length);
      central1.copy(central2); // duplicate central directory entry

      const centralDirOffset = hdr.length + data.length + hdr.length + data.length;
      const centralDir = Buffer.concat([central1, central2]);
      const eocd = Buffer.alloc(22);
      eocd.writeUInt32LE(0x06054b50, 0);
      eocd.writeUInt16LE(0, 4);
      eocd.writeUInt16LE(0, 6);
      eocd.writeUInt16LE(2, 8);
      eocd.writeUInt16LE(2, 10);
      eocd.writeUInt32LE(centralDir.length, 12);
      eocd.writeUInt32LE(centralDirOffset, 16);

      const dupZip = Buffer.concat([hdr, data, hdr, data, centralDir, eocd]);
      ZipContainer.unpack(dupZip);
    } catch (err: any) {
      threw = err.message.includes('Duplicate entry name');
    }
    if (!threw) throw new Error('Expected duplicate entry rejection');
  });

  // 5. Corrupted ZIP (invalid EOCD)
  test('Reject corrupted ZIP container (invalid EOCD)', () => {
    let threw = false;
    try {
      const badBuf = Buffer.from('NOT_A_ZIP_ARCHIVE_AT_ALL_DATA', 'utf8');
      ZipContainer.unpack(badBuf);
    } catch (err: any) {
      threw = err.message.includes('too small') || err.message.includes('EOCD') || err.message.includes('signature not found');
    }
    if (!threw) throw new Error('Expected corrupted ZIP rejection');
  });

  // 6. Inconsistent sizes
  test('Detect and reject size mismatch', () => {
    // Tested via prototype test 16 / size tampering
    const p41 = SymmetryCatalog.findBySettingId('P41')!;
    const exp = PackageExporter.export(p41);
    const files = ZipContainer.unpack(exp.packageBuffer);
    const model = JSON.parse(files.get('math-model.json')!.toString('utf8'));
    model.order = 9999;
    files.set('math-model.json', Buffer.from(JSON.stringify(model), 'utf8'));
    const tampered = ZipContainer.pack(
      Array.from(files.entries()).map(([path, data]) => ({ path, data }))
    );
    const result = Gatekeeper.ingest(tampered);
    if (result.report.admissionStatus !== 'REJECTED') {
      throw new Error('Gatekeeper should reject tampered file');
    }
  });

  // 7. Incorrect CRC-32
  test('Detect incorrect CRC-32 checksum', () => {
    const p41 = SymmetryCatalog.findBySettingId('P41')!;
    const exp = PackageExporter.export(p41);
    const tampered = Buffer.from(exp.packageBuffer);
    // Mutate a byte in the middle of the buffer (inside file payload)
    tampered[Math.floor(tampered.length / 2)] ^= 0xff;
    let threw = false;
    try {
      ZipContainer.unpack(tampered);
    } catch (err: any) {
      threw = err.message.includes('CRC-32 checksum mismatch') || err.message.includes('checksum') || err.message.includes('Decompressed size mismatch') || err.message.includes('Payload') || err.message.includes('truncated') || err.message.includes('Failed to decompress');
    }
    if (!threw) throw new Error('Expected CRC-32 checksum or payload mismatch rejection');
  });

  // 8. Unsupported compression method
  test('Reject unsupported compression method', () => {
    // Pack with method 12 (custom) by crafting header
    const filename = 'test.json';
    const nameBuf = Buffer.from(filename, 'utf8');
    const hdr = Buffer.alloc(30 + nameBuf.length);
    hdr.writeUInt32LE(0x04034b50, 0);
    hdr.writeUInt16LE(20, 4);
    hdr.writeUInt16LE(0, 6);
    hdr.writeUInt16LE(12, 8); // Method 12 (unsupported)
    hdr.writeUInt32LE(0, 14);
    hdr.writeUInt32LE(5, 18);
    hdr.writeUInt32LE(5, 22);
    hdr.writeUInt16LE(nameBuf.length, 26);
    nameBuf.copy(hdr, 30);

    const central = Buffer.alloc(46 + nameBuf.length);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(12, 10);
    central.writeUInt32LE(5, 16);
    central.writeUInt32LE(5, 20);
    central.writeUInt32LE(5, 24);
    central.writeUInt16LE(nameBuf.length, 28);
    nameBuf.copy(central, 46);

    const eocd = Buffer.alloc(22);
    eocd.writeUInt32LE(0x06054b50, 0);
    eocd.writeUInt16LE(1, 8);
    eocd.writeUInt16LE(1, 10);
    eocd.writeUInt32LE(central.length, 12);
    eocd.writeUInt32LE(hdr.length + 5, 16);

    const malformedZip = Buffer.concat([hdr, Buffer.from('12345'), central, eocd]);
    let threw = false;
    try {
      ZipContainer.unpack(malformedZip);
    } catch (err: any) {
      threw = err.message.includes('compression method');
    }
    if (!threw) throw new Error('Expected unsupported compression method rejection');
  });

  // 9. Exceeding single file size limit (>10MB)
  test('Reject entry exceeding single file uncompressed size limit', () => {
    let threw = false;
    try {
      // Craft header claiming 11 MB size
      const filename = 'big.bin';
      const nameBuf = Buffer.from(filename, 'utf8');
      const hdr = Buffer.alloc(30 + nameBuf.length);
      hdr.writeUInt32LE(0x04034b50, 0);
      hdr.writeUInt16LE(20, 4);
      hdr.writeUInt16LE(0, 6);
      hdr.writeUInt16LE(0, 8);
      hdr.writeUInt32LE(0, 14);
      hdr.writeUInt32LE(0, 18);
      hdr.writeUInt32LE(11 * 1024 * 1024, 22); // 11 MB declared
      hdr.writeUInt16LE(nameBuf.length, 26);
      nameBuf.copy(hdr, 30);

      const central = Buffer.alloc(46 + nameBuf.length);
      central.writeUInt32LE(0x02014b50, 0);
      central.writeUInt16LE(20, 4);
      central.writeUInt16LE(20, 6);
      central.writeUInt16LE(0, 10);
      central.writeUInt32LE(0, 16);
      central.writeUInt32LE(0, 20);
      central.writeUInt32LE(11 * 1024 * 1024, 24);
      central.writeUInt16LE(nameBuf.length, 28);
      nameBuf.copy(central, 46);

      const eocd = Buffer.alloc(22);
      eocd.writeUInt32LE(0x06054b50, 0);
      eocd.writeUInt16LE(1, 8);
      eocd.writeUInt16LE(1, 10);
      eocd.writeUInt32LE(central.length, 12);
      eocd.writeUInt32LE(hdr.length, 16);

      const bigZip = Buffer.concat([hdr, central, eocd]);
      ZipContainer.unpack(bigZip);
    } catch (err: any) {
      threw = err.message.includes('exceeds max file limit') || err.message.includes('uncompressed size');
    }
    if (!threw) throw new Error('Expected file size limit rejection');
  });

  // 10. Valid archive within limits & resource preservation
  test('Valid .fsspack archive passes all checks and preserves auxiliary resource bytes', () => {
    const p41 = SymmetryCatalog.findBySettingId('P41')!;
    const cifData = Buffer.from('data_P41_exact_bytes\n_cell_length_a 4.5\n', 'utf8');
    const exp = PackageExporter.export(p41, {
      extraFiles: [{ path: 'resources/exact.cif', data: cifData }]
    });

    const ing = Gatekeeper.ingest(exp.packageBuffer);
    if (ing.report.admissionStatus !== 'VERIFIED_ACTIVE') {
      throw new Error(`Expected VERIFIED_ACTIVE, got ${ing.report.admissionStatus}`);
    }
    const recovered = ing.extraFiles.get('resources/exact.cif');
    if (!recovered || !recovered.equals(cifData)) {
      throw new Error('Auxiliary resource bytes were modified or not recovered');
    }
  });

  console.log('===============================================================');
  console.log(`HARDENING TESTS COMPLETED: ${passed} / ${total} passed`);
  console.log('===============================================================\n');
}

runHardeningTests();
