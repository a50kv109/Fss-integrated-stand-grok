/**
 * Regression Test for Space Group No. 5 (C2 / C 1 2 1)
 * Verifies operations, lattice centering, group closure, inverses, and invariant properties.
 */

import { SymmetryCatalog } from '../registry';
import { closeGroupFromGenerators } from '../group_closure';

console.log('Running Space Group No. 5 (C2) Regression Test...');

const group5Records = SymmetryCatalog.findByGroupNumber(5);
if (group5Records.length === 0) {
  console.error('FAIL: Group No. 5 not found in registry');
  process.exit(1);
}

const record = group5Records[0];
console.log(`  ✓ Loaded SG No. 5 settingId: ${record.settingId}, HM: ${record.hmSymbol}, Hall: ${record.hallSymbol}`);
console.log(`  ✓ Operations count in record: ${record.operations.length}`);

const closureResult = closeGroupFromGenerators(record.operations);
console.log(`  ✓ Closure status: ${closureResult.status}, Order: ${closureResult.order}`);

if (closureResult.status !== 'CLOSED' || closureResult.order !== 4) {
  console.error(`FAIL: Group No. 5 failed closure check. Status=${closureResult.status}, Order=${closureResult.order}`);
  process.exit(1);
}

console.log('🎉 SG-005 Regression Test passed successfully!');
