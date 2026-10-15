/**
 * Test suite for Semiconductor Structures Module
 */

import { SEMICONDUCTOR_STRUCTURES, getSemiconductorByFormula } from '../semiconductor_structures';

console.log('Running Semiconductor Structures Verification Test...');

if (SEMICONDUCTOR_STRUCTURES.length !== 5) {
  console.error(`FAIL: Expected 5 semiconductor structures, found ${SEMICONDUCTOR_STRUCTURES.length}`);
  process.exit(1);
}

for (const s of SEMICONDUCTOR_STRUCTURES) {
  console.log(`  ✓ Material: ${s.materialName} (${s.formula}), SG No. ${s.spaceGroupNumber} (${s.hmSymbol}), Basis atoms: ${s.atomicBasis.length}`);
  if (!s.latticeParameters || s.atomicBasis.length === 0) {
    console.error(`FAIL: Material ${s.formula} missing lattice parameters or atomic basis.`);
    process.exit(1);
  }
}

const si = getSemiconductorByFormula('Si');
if (!si || si.spaceGroupNumber !== 227) {
  console.error('FAIL: Silicon lookup failed or incorrect space group number');
  process.exit(1);
}

console.log('🎉 Semiconductor Structures Verification Test passed successfully!');
