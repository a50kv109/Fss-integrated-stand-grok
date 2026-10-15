/**
 * Post-Fix Audit for SG 227 (Fd-3m)
 */

import { SymmetryCatalog } from '../registry';
import { closeGroupFromGenerators } from '../group_closure';
import { generateCrystalStructure, Operation, AtomBasis } from '../crystal_structure_generator';

const sg227 = SymmetryCatalog.findByGroupNumber(227)[0];
const result = closeGroupFromGenerators(sg227.operations, { maxSize: 1024 });
const ops = result.operations;

console.log('--- Post-Fix Audit SG 227 ---');
console.log('Order of generated group:', result.order);

// Coordinate generation from 1/8, 1/8, 1/8
const basis: AtomBasis[] = [{
    element: 'Si',
    coords: [{numerator: 1, denominator: 8}, {numerator: 1, denominator: 8}, {numerator: 1, denominator: 8}]
}];

const operations: Operation[] = ops.map(op => ({ W: op.W, w: op.w }));
const structure = generateCrystalStructure(operations, basis);

console.log('Generated unique positions:', structure.length);
structure.forEach((a, i) => console.log(`Atom ${i}:`, a.coords.map(c => c.numerator + '/' + c.denominator)));
