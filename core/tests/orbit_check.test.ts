/**
 * SG227 Orbit Consistency Check for Silicon (Si)
 */

import { SymmetryCatalog } from '../registry';
import { SEMICONDUCTOR_STRUCTURES } from '../semiconductor_structures';
import { Operation, AtomBasis, Rational } from '../crystal_structure_generator';
import { closeGroupFromGenerators } from '../group_closure';

console.log('--- SG227 Orbit Consistency Check Started ---');

const si = SEMICONDUCTOR_STRUCTURES.find(s => s.materialName === "Silicon");
if (!si) throw new Error("Silicon not found");

const sg227 = SymmetryCatalog.findByGroupNumber(227)[0];
if (!sg227) throw new Error("SG 227 not found");

const result = closeGroupFromGenerators(sg227.operations);
if (result.status !== 'CLOSED') throw new Error("Group not closed");
const operations = result.operations;

console.log('Total operations:', operations.length);

// Rational helpers for comparison
function isEquivalent(a: Rational[], b: Rational[]): boolean {
  for (let i = 0; i < 3; i++) {
    const diffNum = a[i].numerator * b[i].denominator - b[i].numerator * a[i].denominator;
    const diffDen = a[i].denominator * b[i].denominator;
    // Check if diff is integer
    if (diffNum % diffDen !== 0) return false;
  }
  return true;
}

function applyOp(op: Operation, pos: Rational[]): Rational[] {
    const newPos: Rational[] = [{numerator:0,denominator:1}, {numerator:0,denominator:1}, {numerator:0,denominator:1}];
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            const matVal = op.W[r][c];
            newPos[r].numerator = newPos[r].numerator * pos[c].denominator + matVal * pos[c].numerator * newPos[r].denominator;
            newPos[r].denominator = newPos[r].denominator * pos[c].denominator;
        }
        newPos[r].numerator = newPos[r].numerator * op.w[r].denominator + op.w[r].numerator * newPos[r].denominator;
        newPos[r].denominator = newPos[r].denominator * op.w[r].denominator;
        // Simplify and Modulo 1
        const gcdVal = (a: number, b: number): number => b === 0 ? a : gcdVal(b, a % b);
        const common = gcdVal(Math.abs(newPos[r].numerator), Math.abs(newPos[r].denominator));
        newPos[r].numerator /= common;
        newPos[r].denominator /= common;
        newPos[r].numerator %= newPos[r].denominator;
        if (newPos[r].numerator < 0) newPos[r].numerator += newPos[r].denominator;
    }
    return newPos;
}

const pos1 = si.atomicBasis[0].fractionalCoordinates.map(c => ({numerator: c*4, denominator: 4}));
const pos2 = si.atomicBasis[1].fractionalCoordinates.map(c => ({numerator: c*4, denominator: 4}));

function generateOrbit(startPos: Rational[]): Rational[][] {
    const orbit: Rational[][] = [];
    for (const op of operations) {
        const p = applyOp(op, startPos);
        if (!orbit.some(o => isEquivalent(o, p))) orbit.push(p);
    }
    return orbit;
}

const orbit1 = generateOrbit(pos1);
const orbit2 = generateOrbit(pos2);

console.log('Orbit 1 (from 0,0,0) size:', orbit1.length);
orbit1.forEach(p => console.log(' O1:', p.map(c => c.numerator+'/'+c.denominator)));

console.log('Orbit 2 (from 1/4,1/4,1/4) size:', orbit2.length);
orbit2.forEach(p => console.log(' O2:', p.map(c => c.numerator+'/'+c.denominator)));

// Intersection
const intersection = orbit1.filter(p1 => orbit2.some(p2 => isEquivalent(p1, p2)));
console.log('Intersection size:', intersection.length);

// Do pos1 and pos2 belong to same orbit?
const reachable = orbit1.some(p => isEquivalent(p, pos2));
console.log('Is pos2 reachable from pos1?', reachable);
