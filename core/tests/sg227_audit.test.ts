/**
 * Diagnostic Audit for SG 227 (Fd-3m) Generators
 */

import { SymmetryCatalog } from '../registry';
import { closeGroupFromGenerators } from '../group_closure';
import { ExchangeSymmetryOperation } from './schema/crystallographic_exchange';

const sg227 = SymmetryCatalog.findByGroupNumber(227)[0];
if (!sg227) throw new Error("SG 227 not found");

console.log('--- SG 227 Generator Audit ---');
console.log('Number of generators provided:', sg227.operations.length);

// Try to generate the group with a higher limit just in case
const result = closeGroupFromGenerators(sg227.operations, { maxSize: 512 });

if (result.status !== 'CLOSED') {
    console.error('Group closure failed:', result.notes.join('; '));
} else {
    console.log('Group closed with order:', result.order);
    
    // Check for F-centering translations in the result
    const F_vectors = [
        [0, 0, 0],
        [0, 1/2, 1/2],
        [1/2, 0, 1/2],
        [1/2, 1/2, 0]
    ];
    
    const foundF = F_vectors.map(f => result.operations.some(op => 
        Math.abs(op.w[0].numerator / op.w[0].denominator - f[0]) < 1e-6 &&
        Math.abs(op.w[1].numerator / op.w[1].denominator - f[1]) < 1e-6 &&
        Math.abs(op.w[2].numerator / op.w[2].denominator - f[2]) < 1e-6
    ));
    
    console.log('F-centering translations found:', foundF);
}
