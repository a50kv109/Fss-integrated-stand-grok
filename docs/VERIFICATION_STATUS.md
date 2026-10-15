# FSS — Verification Status

| Объект | Реализован | Тест существует | Тест запускался | Результат | Источник доказательства | Ограничения |
| :--- | :---: | :---: | :---: | :--- | :--- | :--- |
| Математическое ядро (`core/engine.ts`, `group_properties.ts`, `dimension.ts`) | Да | Да | Да | TESTED | `npx tsx core/engine.test.ts`, `core/dimension.test.ts` | 31/31 и 64/64 проверок пройдены в среде tsx |
| Замыкание групп (`core/group_closure.ts`) | Да | Да | Да | TESTED | `npx tsx core/group_closure.test.ts` | 15/15 тестов пройдены |
| Классификатор (`core/operation_set_match.ts`, `operation_set_profile.ts`) | Да | Да | Да | TESTED | `npx tsx core/filter_soundness.test.ts`, `core/operation_set_profile.test.ts` | Все тесты профилирования и 16 расширенных сценариев фильтра пройдены |
| SG 227 (`core/registry.ts`) | Да | Да | Да | FAILED | `npx tsx core/tests/sg227_comparison.test.ts` | Замыкание текущих генераторов дает 96 операций вместо эталонных 192 (ITA Origin Choice 2) |
| SG 216 / SG 186 | Да | Да | Да | TESTED | `npx tsx core/tests/semiconductor_basis_symmetry.test.ts` | Генераторы и базисы полупроводников замкнуты и валидированы |
