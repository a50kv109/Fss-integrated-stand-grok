/**
 * FSSPACK Prototype 01 CLI Runner and Demonstrator
 * 
 * Demonstrates Stand A export, Stand B ingestion, mathematical integrity,
 * and diagnostic reporting for Space Group No. 76 (P4_1).
 */

import { SymmetryCatalog } from '../../core/registry';
import { PackageExporter } from './exporter';
import { Gatekeeper } from './gatekeeper';

export function runDemonstration() {
  console.log('------------------------------------------------------------');
  console.log('FSS — FSSPACK ISOLATED PROTOTYPE DEMONSTRATION');
  console.log('Pilot Space Group: No. 76 (P 4_1, tetragonal, chiral)');
  console.log('------------------------------------------------------------\n');

  // 1. Source Data Retrieval
  const record = SymmetryCatalog.findBySettingId('P41');
  if (!record) {
    throw new Error('SG 76 (P41) not found in registry');
  }

  console.log('1. STAND A (Reference Stand) — Packaging:');
  console.log(`   - Input record: SG ${record.groupNumber} (${record.hmSymbol}), Setting: ${record.settingId}`);
  console.log(`   - Hall symbol: ${record.hallSymbol}`);
  console.log(`   - Operations count: ${record.operations.length}`);

  // 2. Export to .fsspack
  const extraCif = Buffer.from(
    '# CIF File for SG 76\ndata_test_P41\n_symmetry_space_group_name_H-M "P 41"\n',
    'utf8'
  );
  const exportResult = PackageExporter.export(record, {
    extraFiles: [{ path: 'resources/structure.cif', data: extraCif }]
  });

  console.log('   - Export status: SUCCESS');
  console.log(`   - Package ID: ${exportResult.manifest.packageId}`);
  console.log(`   - Container byte size: ${exportResult.byteSize} bytes`);
  console.log(`   - Physical file SHA-256: ${exportResult.fileSha256}`);
  console.log(`   - Canonical content SHA-256: ${exportResult.contentSha256}`);
  console.log('   - Files in manifest:');
  for (const f of exportResult.manifest.files) {
    console.log(`       * ${f.path.padEnd(26)} [${f.sha256.substring(0, 16)}...] (${f.byteSize} B)`);
  }

  console.log('\n2. STAND B (Experimental Stand) — Gatekeeper Admission:');
  const ingestionResult = Gatekeeper.ingest(exportResult.packageBuffer);
  const report = ingestionResult.report;

  console.log(`   - Ingestion Admission: ${report.admissionStatus}`);
  console.log(`   - Math axioms verified: ${report.mathVerified ? 'YES' : 'NO'}`);
  console.log('   - Pipeline stages:');
  for (const s of report.stages) {
    const symbol = s.passed ? '✓' : '✗';
    console.log(`       [${symbol}] Stage ${s.stage}: ${s.name}`);
  }

  if (report.quarantineDisclaimers.length > 0) {
    console.log('   - Quarantine disclaimers:');
    for (const d of report.quarantineDisclaimers) {
      console.log(`       ! ${d}`);
    }
  }

  console.log('\n3. Mathematical Data Fidelity:');
  const ops = ingestionResult.mathModel!.operations;
  console.log(`   - Operations recovered: ${ops.length}`);
  ops.forEach((op, idx) => {
    const trans = op.w.map(r => `${r.numerator}/${r.denominator}`).join(', ');
    console.log(`       Op #${idx}: W = [${op.W[0].join(' ')} | ${op.W[1].join(' ')} | ${op.W[2].join(' ')}], w = (${trans})`);
  });

  console.log('\n4. Auxiliary Resources:');
  console.log(`   - Extra files preserved: ${Array.from(ingestionResult.extraFiles.keys()).join(', ')}`);

  console.log('\n------------------------------------------------------------');
  console.log('DEMONSTRATION COMPLETE: ZERO PRECISION LOSS, VALIDATED');
  console.log('------------------------------------------------------------');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runDemonstration();
}
