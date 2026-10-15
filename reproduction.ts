import { SymmetryCatalog } from './core/registry.ts';
import { closeGroupFromGenerators } from './core/group_closure.ts';
import { REFERENCE_OPERATIONS_COUNT } from './core/reference/sg227_reference.ts';

const sg227 = SymmetryCatalog.findByGroupNumber(227)[0];
const result = closeGroupFromGenerators(sg227.operations, { maxSize: 512 });

console.log('FSS operations count (mod Z3):', result.order);
console.log('Reference operations count (mod Z3):', REFERENCE_OPERATIONS_COUNT);
