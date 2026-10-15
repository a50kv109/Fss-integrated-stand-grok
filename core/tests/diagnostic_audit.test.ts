/**
 * Diagnostic Audit for Crystal Structure Generator (Silicon)
 */

import { SymmetryCatalog } from '../registry';
import { SEMICONDUCTOR_STRUCTURES } from '../semiconductor_structures';
import { generateCrystalStructure, Operation, AtomBasis, GeneratedAtom, Rational } from '../crystal_structure_generator';
import { closeGroupFromGenerators } from '../group_closure';

console.log('--- Diagnostic Audit Started ---');

const si = SEMICONDUCTOR_STRUCTURES.find(s => s.materialName === "Silicon");
if (!si) throw new Error("Silicon not found");

const sg227 = SymmetryCatalog.findByGroupNumber(227)[0]; // Assuming Fd-3m
if (!sg227) throw new Error("SG 227 not found");

// Convert data
const result = closeGroupFromGenerators(sg227.operations);
if (result.status !== 'CLOSED') throw new Error("Group not closed: " + result.notes.join('; '));
const fullOps = result.operations;
console.log('Operations count:', fullOps.length);

const operations: Operation[] = fullOps.map(op => ({
  W: op.W,
  w: op.w
}));

const basis: AtomBasis[] = si.atomicBasis.map(atom => ({
  element: atom.element,
  coords: atom.fractionalCoordinates.map(c => {
    // Basic conversion to rational: assuming 0, 0.25, 0.5, 0.75
    if (c === 0) return { numerator: 0, denominator: 1 };
    if (c === 0.25) return { numerator: 1, denominator: 4 };
    if (c === 0.5) return { numerator: 1, denominator: 2 };
    if (c === 0.75) return { numerator: 3, denominator: 4 };
    throw new Error("Unsupported coordinate: " + c);
  })
}));

console.log('Basis atoms count:', basis.length);
basis.forEach((b, i) => console.log(`Basis ${i}: ${b.coords.map(c => c.numerator + '/' + c.denominator)}`));

// Perform generation with tracing
const generated: GeneratedAtom[] = [];

for (const atom of basis) {
    console.log(`\nProcessing basis atom: ${atom.coords.map(c => c.numerator + '/' + c.denominator)}`);
    for (let i = 0; i < operations.length; i++) {
        const op = operations[i];
        
        // Apply op
        const newPos: Rational[] = [
            { numerator: 0, denominator: 1 },
            { numerator: 0, denominator: 1 },
            { numerator: 0, denominator: 1 }
        ];
        // Simplified matrix multiplication
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                // val = W[r][c] * atom.coords[c]
                // Simplest: integer * rational
                const matVal = op.W[r][c];
                const res = { numerator: matVal * atom.coords[c].numerator, denominator: atom.coords[c].denominator };
                // add to newPos[r]
                newPos[r].numerator = newPos[r].numerator * res.denominator + res.numerator * newPos[r].denominator;
                newPos[r].denominator = newPos[r].denominator * res.denominator;
            }
            // add op.w[r]
            newPos[r].numerator = newPos[r].numerator * op.w[r].denominator + op.w[r].numerator * newPos[r].denominator;
            newPos[r].denominator = newPos[r].denominator * op.w[r].denominator;
            
            // Normalize (simple rational)
            const gcdVal = (a: number, b: number): number => b === 0 ? a : gcdVal(b, a % b);
            const common = gcdVal(Math.abs(newPos[r].numerator), Math.abs(newPos[r].denominator));
            newPos[r].numerator /= common;
            newPos[r].denominator /= common;
            
            // Modulo 1
            newPos[r].numerator %= newPos[r].denominator;
            if (newPos[r].numerator < 0) newPos[r].numerator += newPos[r].denominator;
        }

        generated.push({ element: atom.element, coords: newPos });
        // console.log(` Op ${i} -> ${newPos.map(c => c.numerator + '/' + c.denominator)}`);
    }
}

console.log('Total generated (raw):', generated.length);

// Unique positions
function isEquivalent(a: Rational[], b: Rational[]): boolean {
  for (let i = 0; i < 3; i++) {
    const diffNum = a[i].numerator * b[i].denominator - b[i].numerator * a[i].denominator;
    const diffDen = a[i].denominator * b[i].denominator;
    // Check if diff is integer (num % den == 0)
    if (diffNum % diffDen !== 0) return false;
  }
  return true;
}

const unique: GeneratedAtom[] = [];
for (const atom of generated) {
    if (!unique.some(u => u.element === atom.element && isEquivalent(u.coords, atom.coords))) {
        unique.push(atom);
    }
}

console.log('Total unique positions:', unique.length);
unique.forEach((u, i) => console.log(`Unique ${i}: ${u.coords.map(c => c.numerator + '/' + c.denominator)}`));
