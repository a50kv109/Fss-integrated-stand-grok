/**
 * Pilot Test for Crystal Structure Generator (Silicon)
 */

import { SymmetryCatalog } from '../registry';
import { SEMICONDUCTOR_STRUCTURES } from '../semiconductor_structures';
import { generateCrystalStructure, Operation, AtomBasis } from '../crystal_structure_generator';
import { closeGroupFromGenerators } from '../group_closure';

console.log('Running Crystal Structure Generator Pilot (Si)...');

const si = SEMICONDUCTOR_STRUCTURES.find(s => s.materialName === "Silicon");
if (!si) throw new Error("Silicon not found");

const sg227 = SymmetryCatalog.findByGroupNumber(227)[0]; // Assuming Fd-3m
if (!sg227) throw new Error("SG 227 not found");

// Convert data
const result = closeGroupFromGenerators(sg227.operations);
if (result.status !== 'CLOSED') throw new Error("Group not closed: " + result.notes.join('; '));
const fullOps = result.operations;
console.log('Full operations count:', fullOps.length);
const operations: Operation[] = fullOps.map(op => ({
  W: op.W,
  w: op.w
}));

const basis: AtomBasis[] = si.atomicBasis.map(atom => ({
  element: atom.element,
  coords: atom.fractionalCoordinates.map(c => {
    // Basic conversion to rational: assuming 0, 0.125, 0.25, 0.5, 0.75
    if (c === 0) return { numerator: 0, denominator: 1 };
    if (c === 0.125) return { numerator: 1, denominator: 8 };
    if (c === 0.25) return { numerator: 1, denominator: 4 };
    if (c === 0.5) return { numerator: 1, denominator: 2 };
    if (c === 0.75) return { numerator: 3, denominator: 4 };
    throw new Error("Unsupported coordinate: " + c);
  })
}));

const structure = generateCrystalStructure(operations, basis);

console.log('Generated atoms:', structure.length);
structure.forEach((a, i) => console.log(`Atom ${i}:`, a.coords.map(c => c.numerator + '/' + c.denominator)));

// Verification
// Diamond structure Si (SG 227) has 8 atoms in conventional cell.
if (structure.length === 8) {
  console.log('✓ Correct number of atoms (8) for Silicon in Fd-3m');
} else {
  console.error('✗ Incorrect number of atoms:', structure.length);
}
