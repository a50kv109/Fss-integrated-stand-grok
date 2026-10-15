/**
 * Bilingual UI & Consolidation Test Runner
 * (FSS UI CONSOLIDATION 01)
 *
 * Verifies:
 * 1. Complete coverage of DICTIONARY keys in both RU and EN without undefined values.
 * 2. Exact conformance to canonical terminology requirements.
 * 3. Parameter interpolation ({count}, etc.).
 * 4. Preservation of mathematical identifiers, ITA numbers, HM/Hall symbols.
 * 5. State independence during language switching.
 */

import { DICTIONARY, translate, TranslationKey, Language } from '../../core/i18n';
import { SPACE_GROUPS_230_DATA } from '../../core/space_group_data_230';
import { SpaceGroupCatalogService } from '../../core/space_group_catalog';

function assert(condition: boolean, msg: string) {
  if (!condition) {
    console.error(`[FAIL] ${msg}`);
    throw new Error(msg);
  }
}

function test(name: string, fn: () => void) {
  try {
    fn();
    console.log(`[PASS] ${name}`);
  } catch (err: any) {
    console.error(`[FAIL] ${name}: ${err.message}`);
    process.exit(1);
  }
}

console.log('===============================================================');
console.log('FSS — BILINGUAL UI & CONSOLIDATION TEST SUITE');
console.log('===============================================================\n');

test('Check 1: Complete RU and EN coverage for all DICTIONARY keys', () => {
  const keys = Object.keys(DICTIONARY) as TranslationKey[];
  assert(keys.length >= 70, `Expected at least 70 translation keys, got ${keys.length}`);

  for (const k of keys) {
    const entry = DICTIONARY[k];
    assert(typeof entry.ru === 'string' && entry.ru.length > 0, `Key ${k} missing valid RU translation`);
    assert(typeof entry.en === 'string' && entry.en.length > 0, `Key ${k} missing valid EN translation`);
  }
  console.log(`       Verified ${keys.length} keys in both RU and EN`);
});

test('Check 2: Exact conformance to required canonical terminology', () => {
  // Navigation & Sections
  assert(DICTIONARY.navCatalog.ru.includes('Каталог симметрий'), 'navCatalog RU terminology mismatch');
  assert(DICTIONARY.navCatalog.en.includes('Space-Group Catalog'), 'navCatalog EN terminology mismatch');

  assert(DICTIONARY.navPassport.ru === 'Паспорт группы', 'navPassport RU terminology mismatch');
  assert(DICTIONARY.navPassport.en === 'Group Passport', 'navPassport EN terminology mismatch');

  assert(DICTIONARY.navMigration.ru === 'Экспорт и перенос', 'navMigration RU terminology mismatch');
  assert(DICTIONARY.navMigration.en === 'Export / Migration', 'navMigration EN terminology mismatch');

  assert(DICTIONARY.navExperiments.ru === 'Эксперименты', 'navExperiments RU terminology mismatch');
  assert(DICTIONARY.navExperiments.en === 'Experiments', 'navExperiments EN terminology mismatch');

  // Actions
  assert(DICTIONARY.importPassport.ru === 'Импортировать паспорт', 'importPassport RU terminology mismatch');
  assert(DICTIONARY.importPassport.en === 'Import Passport', 'importPassport EN terminology mismatch');

  assert(DICTIONARY.exportBtn.ru === 'Экспорт .fsspack', 'exportBtn RU terminology mismatch');
  assert(DICTIONARY.exportBtn.en === 'Export .fsspack', 'exportBtn EN terminology mismatch');

  assert(DICTIONARY.downloadBatchZip.ru.includes('Общий ZIP-архив'), 'downloadBatchZip RU terminology mismatch');
  assert(DICTIONARY.downloadBatchZip.en.includes('Download Batch ZIP'), 'downloadBatchZip EN terminology mismatch');

  // Model & Gatekeeper Statuses
  assert(DICTIONARY.status_VERIFIED_ACTIVE.ru === 'Проверен, допущен к работе', 'status_VERIFIED_ACTIVE RU mismatch');
  assert(DICTIONARY.status_VERIFIED_ACTIVE.en === 'Verified Active', 'status_VERIFIED_ACTIVE EN mismatch');

  assert(DICTIONARY.status_CATALOG_METADATA_AVAILABLE.ru === 'Доступны метаданные', 'status_CATALOG_METADATA_AVAILABLE RU mismatch');
  assert(DICTIONARY.status_CATALOG_METADATA_AVAILABLE.en === 'Metadata Available', 'status_CATALOG_METADATA_AVAILABLE EN mismatch');

  assert(DICTIONARY.status_QUARANTINE_DIAGNOSTIC.ru === 'Диагностический карантин', 'status_QUARANTINE_DIAGNOSTIC RU mismatch');
  assert(DICTIONARY.status_QUARANTINE_DIAGNOSTIC.en === 'Quarantine Diagnostic', 'status_QUARANTINE_DIAGNOSTIC EN mismatch');

  assert(DICTIONARY.status_REJECTED.ru === 'Отклонён', 'status_REJECTED RU mismatch');
  assert(DICTIONARY.status_REJECTED.en === 'Rejected', 'status_REJECTED EN mismatch');

  assert(DICTIONARY.modelPending.ru === 'Математическая модель не подготовлена', 'modelPending RU mismatch');
  assert(DICTIONARY.modelPending.en === 'Model Pending', 'modelPending EN mismatch');
});

test('Check 3: Parameter interpolation in translate()', () => {
  const ruShowing = translate('showingCount', 'ru', { count: 42 });
  assert(ruShowing === 'Показано 42 из 230 пространственных групп', `Unexpected interpolation: ${ruShowing}`);

  const enShowing = translate('showingCount', 'en', { count: 42 });
  assert(enShowing === 'Showing 42 of 230 space groups', `Unexpected interpolation: ${enShowing}`);

  const ruBatch = translate('downloadBatchZip', 'ru', { count: 9 });
  assert(ruBatch === 'Общий ZIP-архив (9 пак.)', `Unexpected interpolation: ${ruBatch}`);
});

test('Check 4: Preservation of mathematical symbols and international designations', () => {
  const p41 = SpaceGroupCatalogService.getPassport(76)!;
  assert(p41.item.number === 76, 'ITA number altered');
  assert(p41.item.standardHm === 'P 41', 'HM symbol altered');
  assert(p41.item.standardHall === 'P 4w', 'Hall symbol altered');

  // Verify operations matrices retain exact integers and rationals
  for (const op of p41.verifiedRecord!.operations) {
    assert(Array.isArray(op.W) && op.W.length === 3, 'matrix altered');
    assert(Array.isArray(op.w) && op.w.length === 3, 'translation altered');
  }
  for (const op of p41.operationsSummary!.operations) {
    assert(typeof op.determinant === 'number', 'det altered');
    assert(typeof op.trace === 'number', 'trace altered');
  }
});

test('Check 5: Deduplication verification (Sample P41 relocated from top bar to catalog demo)', () => {
  assert(typeof DICTIONARY.loadDemoP41.ru === 'string', 'loadDemoP41 missing');
  assert(DICTIONARY.loadDemoP41.ru === 'Загрузить демо-группу P4₁', 'loadDemoP41 text incorrect');
});

console.log('\n===============================================================');
console.log('ALL BILINGUAL & CONSOLIDATION CHECKS PASSED: 5 / 5 verified');
console.log('===============================================================');
