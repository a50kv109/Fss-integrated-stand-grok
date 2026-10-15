/**
 * Test Comparison: FSS SG 227 vs. Reference
 */

import { SymmetryCatalog } from '../registry.ts';
import { closeGroupFromGenerators } from '../group_closure.ts';
import { REFERENCE_OPERATIONS_COUNT } from '../reference/sg227_reference.ts';

console.log('--- Comparison Test: FSS vs Reference ---');

const sg227 = SymmetryCatalog.findByGroupNumber(227)[0];
const result = closeGroupFromGenerators(sg227.operations, { maxSize: 512 });

console.log('FSS operations count (mod Z3):', result.order);
console.log('Reference operations count (mod Z3):', REFERENCE_OPERATIONS_COUNT);

if (result.order === REFERENCE_OPERATIONS_COUNT) {
    console.log('Status: FSS matches reference operation count.');
} else {
    console.log('Status: FSS does not match reference operation count.');
}
