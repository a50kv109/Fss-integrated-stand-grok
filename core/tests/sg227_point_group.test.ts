/**
 * Diagnostic Audit for SG 227 (Fd-3m) Point Group
 */

import { SymmetryCatalog } from '../registry';
import { closeGroupFromGenerators } from '../group_closure';

const sg227 = SymmetryCatalog.findByGroupNumber(227)[0];
if (!sg227) throw new Error("SG 227 not found");

const result = closeGroupFromGenerators(sg227.operations, { maxSize: 512 });
if (result.status !== 'CLOSED') throw new Error("Group not closed");

const ops = result.operations;

const distinctR = new Set(ops.map(op => JSON.stringify(op.W)));

console.log('Total operations:', ops.length);
console.log('Distinct rotation matrices:', distinctR.size);

// Check if 48 rotations are present
if (distinctR.size === 48) {
    console.log('✓ Point group order is 48');
} else {
    console.error('✗ Point group order is:', distinctR.size);
}
