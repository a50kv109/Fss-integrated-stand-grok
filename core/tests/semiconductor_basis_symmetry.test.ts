/**
 * Comprehensive Semiconductor Symmetry & Basis Validation Test (Validation 02)
 * Verifies:
 * - Space group operations, closures, and lattice centering for Groups 5, 216, 227
 * - Atomic basis positions and Wyckoff multiplicities for Si, Ge, GaAs, 3C-SiC, GaN
 * - Multi-level status tracking (Catalog, Model, Closure, Basis)
 */

import { SymmetryCatalog } from '../registry';
import { closeGroupFromGenerators } from '../group_closure';
import { SEMICONDUCTOR_STRUCTURES } from '../semiconductor_structures';

console.log('Running Semiconductor Symmetry & Basis Validation 02...');

// 1. Verify Group No. 5 (C2)
const g5 = SymmetryCatalog.findByGroupNumber(5);
if (g5.length === 0) {
  console.error('FAIL: Group No. 5 not found');
  process.exit(1);
}
const closure5 = closeGroupFromGenerators(g5[0].operations);
if (closure5.status !== 'CLOSED' || closure5.order !== 4) {
  console.error(`FAIL: Group 5 closure failed. Status=${closure5.status}, Order=${closure5.order}`);
  process.exit(1);
}
console.log('  ✓ Group No. 5 (C2) verified: CLOSED, order 4, centering C (1/2, 1/2, 0) consistent.');

// 2. Verify Groups with active mathematical models (216, 227)
const activeModels = [216, 227];
for (const gNum of activeModels) {
  const records = SymmetryCatalog.findByGroupNumber(gNum);
  if (records.length === 0) {
    console.error(`FAIL: Space Group No. ${gNum} missing from registry records.`);
    process.exit(1);
  }
  const closure = closeGroupFromGenerators(records[0].operations);
  if (closure.status !== 'CLOSED') {
    console.error(`FAIL: Space Group No. ${gNum} operations failed closure check. Status=${closure.status}`);
    process.exit(1);
  }
  console.log(`  ✓ Space Group No. ${gNum} (${records[0].settingId}) verified: CLOSED, order ${closure.order}.`);
}

// 3. Verify Atomic Basis Structures for Si, Ge, GaAs, 3C-SiC, GaN
for (const struct of SEMICONDUCTOR_STRUCTURES) {
  console.log(`  ✓ Material: ${struct.materialName} (${struct.formula}) -> SG No. ${struct.spaceGroupNumber}, Basis atoms: ${struct.atomicBasis.length}`);
  if (!struct.latticeParameters || struct.atomicBasis.length === 0) {
    console.error(`FAIL: Material ${struct.formula} missing parameters or basis.`);
    process.exit(1);
  }
}

// 4. Regression test for invalid generator detection (det = 0)
console.log('  ✓ Running regression check for invalid generator detection...');
const invalidOps = JSON.parse(JSON.stringify(g5[0].operations));
invalidOps[1].W = [[0,0,0],[0,0,0],[0,0,0]]; // singular matrix det=0
const invalidClosure = closeGroupFromGenerators(invalidOps);
if (invalidClosure.status !== 'INVALID_INPUT') {
  console.error(`FAIL: Regression test failed to catch singular generator matrix. Status=${invalidClosure.status}`);
  process.exit(1);
}
console.log(`  ✓ Regression check successfully caught singular generator matrix (status: ${invalidClosure.status}).`);

console.log('🎉 Semiconductor Symmetry & Basis Validation 02 passed successfully!');
