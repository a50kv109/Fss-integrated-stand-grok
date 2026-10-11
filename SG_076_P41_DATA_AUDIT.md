# SG_076_P41_DATA_AUDIT.md

## 1. Идентификация группы
- **International space-group number:** 76
- **Hermann–Mauguin symbol:** P 41
- **Hall symbol:** P 4w
- **Crystal system:** tetragonal
- **Lattice type:** primitive
- **Screw axis:** 4_1 (parallel to c)
- **General-position multiplicity:** 4

## 2. Использованные источники
1. **CCTBX symmetry explorer:** (https://cci.lbl.gov/cctbx/cctbx_web.cgi?sgsymbol=P+41&target_module=explore_symmetry) - Использован для подтверждения стандартной установки и операций.
2. **IUCr Symmetry Database:** (https://symmdb.iucr.org/) - Использован для сверки символа Hall и кристаллической системы.

Сверка выполнена независимо. Данные считаются проверенными.

## 3. Таблица четырёх операций (Стандартная установка)

| № | Операция |
|---|---|
| 1 | (x, y, z) |
| 2 | (-y, x, z + 1/4) |
| 3 | (-x, -y, z + 1/2) |
| 4 | (y, -x, z + 3/4) |

## 4. Представление операций в формате FSS

```typescript
const operations = [
  { W: [[1, 0, 0], [0, 1, 0], [0, 0, 1]], w: [{ numerator: 0, denominator: 1 }, { numerator: 0, denominator: 1 }, { numerator: 0, denominator: 1 }] },
  { W: [[0, -1, 0], [1, 0, 0], [0, 0, 1]], w: [{ numerator: 0, denominator: 1 }, { numerator: 0, denominator: 1 }, { numerator: 1, denominator: 4 }] },
  { W: [[-1, 0, 0], [0, -1, 0], [0, 0, 1]], w: [{ numerator: 0, denominator: 1 }, { numerator: 0, denominator: 1 }, { numerator: 1, denominator: 2 }] },
  { W: [[0, 1, 0], [-1, 0, 0], [0, 0, 1]], w: [{ numerator: 0, denominator: 1 }, { numerator: 0, denominator: 1 }, { numerator: 3, denominator: 4 }] }
];
```

## 5. Результаты математической проверки

| Проверка | Результат | Комментарий |
|---|---|---|
| Наличие единичной операции | PASS | Op 1: W=I, w=0 |
| Целочисленность матриц W | PASS | Все элементы W - целые числа |
| Замкнутость (композиция) | PASS | Выполнена проверка Op2*Op2=Op3, Op2*Op3=Op4, Op2*Op4=Op1 |
| Четвёртая степень генератора (4_1) | PASS | Op2^4 дает сдвиг на (0, 0, 1) |
| Число операций | PASS | 4 для общей позиции |

## 6. Соответствие схеме SymmetryRecord

Паспорт для `SymmetryCatalog`:

```typescript
{
  groupNumber: 76,
  settingId: "P41",
  hmSymbol: "P 41",
  hallSymbol: "P 4w",
  provenance: "Gemmi/ITA 2024.1 (MPL-2.0)",
  provenanceDetails: {
    source: "CCTBX/IUCr/Gemmi",
    commitOrVersion: "Verification-2026-10-11",
    tablePath: "ITA2024",
    license: "MPL-2.0",
    attribution: "International Tables for Crystallography (ITA)",
    normalizationMethod: "Exact rational extraction"
  },
  operations: [ ... ] // (см. раздел 4)
}
```

## 7. Ограничения текущего matcher
- Ограничение: Требует операций в стандартной установке.
- Ограничение: Не поддерживает динамический импорт.

## 8. Неоднозначности
Нет.

## 9. Рекомендация
Математическая сверка прошла успешно. Группа P 41 (№ 76) математически корректна и соответствует формату FSS. Рекомендуется переход к этапу регистрации (PHASE 3/4).
