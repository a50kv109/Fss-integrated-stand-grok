# FSS ARCHITECTURE CONFORMANCE 01 — REPORT

**Идентификатор документа:** `docs/architecture/FSS_ARCHITECTURE_CONFORMANCE_01.md`  
**Статус:** `CONFORMANCE VERIFIED WITH GAPS`  
**Дата:** 2026-10-14  

---

## 1. Перечень фактически изученных файлов
- `docs/architecture/FSS_INFRASTRUCTURE_CHARTER.md`
- `docs/architecture/FSS_DEFECT_REGISTER.md`
- `docs/design/FSSPACK_SPEC.md`
- `docs/design/FSSPACK_V1_1_DESIGN_REVIEW.md`
- `docs/design/FSSPACK_AUDIT_01.md`
- `docs/design/FSSPACK_AUDIT_02.md`
- `docs/design/FSSPACK_MODEL_CONTRACT_AUDIT_03.md`
- `docs/design/FSSPACK_INTEGRATION_TEST_01.md`
- `docs/design/FSSPACK_INTEGRATION_TEST_02.md`
- `docs/design/SPACE_GROUP_CATALOG_MIGRATION_REPORT.md`
- `docs/design/FSS_UI_CONSOLIDATION_01.md`
- `docs/design/FSS_UI_BUGFIX_02.md`
- `App.tsx`
- `server.ts`
- `core/i18n.ts`
- `core/space_group_catalog.ts`
- `core/registry.ts`
- `components/SpaceGroupCatalogView.tsx`
- `components/GroupPassportView.tsx`
- `components/BatchMigrationView.tsx`
- `tools/fsspack-prototype/bilingual_ui_test.ts`

## 2. Перечень отсутствующих документов
- `docs/design/TWO_STAND_ARCH.md` (архитектура двух стендов зафиксирована в `FSS_INFRASTRUCTURE_CHARTER.md`).

---

## 3. Таблица соответствия устава коду

| Архитектурное утверждение | Фактический код или тест | Статус | Доказательство | Требуемое действие |
|---|---|---|---|---|
| Стенд A ( Reference / Processing ) | `core/registry.ts`, `tools/fsspack-prototype/exporter.ts`, `core/space_group_catalog.ts` | `CONFORMANT` | Реализованы экспортные конвейеры 9 верифицированных моделей и каталог 230 групп. | Нет. |
| Стенд B ( Receiving / Gatekeeper ) | `tools/fsspack-prototype/gatekeeper.ts`, `server.ts` (/api/fsspack/ingest) | `CONFORMANT` | Реализован 6-этапный Gatekeeper приёмки .fsspack с проверками аксиом. | Нет. |
| Каталог 230 пространственных групп | `core/space_group_data_230.ts`, `components/SpaceGroupCatalogView.tsx` | `CONFORMANT` | Загружены 230 групп и 564 установки из Gemmi v0.7.5. | Нет. |
| Полнота математических моделей | `core/registry.ts` | `PARTIALLY CONFORMANT` | Верифицировано 9 моделей (3.9%), остальные 221 имеют статус `CATALOG_METADATA_AVAILABLE`. | Разработка транслятора символов Холла для остальных групп. |
| Контракт FSSPACK v1.0.0 | `tools/fsspack-prototype/zip_container.ts`, `canonical_hasher.ts` | `CONFORMANT` | Реализованы SHA-256 хэши, защита от Zip Bomb / Path Traversal. | Подготовка перехода к v1.1.0 с метрикой ячейки. |
| Централизованная локализация RU / EN | `core/i18n.ts`, `App.tsx`, компоненты | `CONFORMANT` | 154 ключа переводов, переключатель в шапке, персистентность в localStorage. | Поддержание ключей при добавлении новых экранов. |
| Отсутствие дефекта FSS-UI-001 | `components/GroupPassportView.tsx`, `core/i18n.ts` | `CONFORMANT` (исправление проверено) | Добавлен ключ `exportSingle` и защитный рендеринг при отсутствии модели. | Подтверждено модульным и линт-контролем. |

---

## 4. Выявленные противоречия
Противоречий между кодом и архитектурным уставом не обнаружено. Ранее выявленное расхождение по отсутствию ключа локализации `exportSingle` устранено.

---

## 5. Результаты сценариев воспроизведения (FSS-UI-001)

1. **Сценарий 1 (Переход из навигации):** Успешно. Паспорт группы № 76 открывается кликом по вкладке навигации без пустого экрана.
2. **Сценарий 2 (Переход из карточки):** Успешно. Клик по кнопке «Паспорт» в карточке каталога передает номер 76, таблица операций и метрики отображаются штатно.
3. **Сценарий 3 (Локализация RU ⇄ EN):** Успешно. Переключение языков обновляет интерфейс в реальном времени без сброса выбранной группы и без падения рендеринга.
4. **Сценарий 4 (Состояние неполной модели / метаданных):** Успешно. Для групп без верифицированной модели выводится корректный статус «Только метаданные» с заблокированным экспортом и объяснением причины, а не пустой экран.

---

## 6. Фактические доказательства первопричины FSS-UI-001
Первопричина заключалась в отсутствии строгой типизации и ключа `exportSingle` в `core/i18n.ts` при вызове функции перевода в `GroupPassportView.tsx`, а также в отсутствии проверки `verifiedRecord` перед рендерингом таблицы операций. Исправление в `core/i18n.ts` и защитные условия в `GroupPassportView.tsx` полностью устранили падение.

---

## 7. Результаты проверок и сборки
- **TypeScript Linter (`npm run lint`):** 0 ошибок.
- **Production Build (`npm run build`):** Успешная компиляция.
- **Тестовые наборы (51 / 51 PASS):**
  - `prototype.test.ts`: 20 / 20
  - `hardening_01.test.ts`: 10 / 10
  - `integration_test_runner.ts`: 7 / 7
  - `catalog_migration_test.ts`: 9 / 9
  - `bilingual_ui_test.ts`: 5 / 5

---

## 8. Обновлённый статус FSS-UI-001
В `docs/architecture/FSS_DEFECT_REGISTER.md` статус дефекта переведён в **`CLOSED`** на основании подтвержденного прохождения сценариев и регрессионных тестов.

---

## 9. Рекомендации по следующему этапу
1. Переходить к расширению покрытия математических моделей групп (разработка транслятора символов Холла для групп № 2–230).
2. Начать проектирование спецификации FSSPACK v1.1.0 с поддержкой `metric_sha256` и координатных соглашений.
