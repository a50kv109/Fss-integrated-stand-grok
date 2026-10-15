import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'ru' | 'en';

export const DICTIONARY = {
  // Global Header & Brand
  appTitle: {
    ru: 'FEDOROV SYMMETRY REASONING STAND',
    en: 'FEDOROV SYMMETRY REASONING STAND'
  },
  appSubtitle: {
    ru: 'Универсальное рабочее место по 230 пространственным группам Фёдорова и центр криптографической миграции FSSPACK',
    en: 'Universal Space-Group Workbench & FSSPACK Cryptographic Migration Hub'
  },
  importPassport: {
    ru: 'Импортировать паспорт',
    en: 'Import Passport'
  },
  importing: {
    ru: 'Импорт...',
    en: 'Importing...'
  },
  coreEngineStatus: {
    ru: 'Ядро: Активно и детерминировано',
    en: 'Core Engine: Active & Deterministic'
  },

  // Navigation
  navCatalog: {
    ru: 'Каталог симметрий (230)',
    en: 'Space-Group Catalog (230)'
  },
  navPassport: {
    ru: 'Паспорт группы',
    en: 'Group Passport'
  },
  navMigration: {
    ru: 'Экспорт и перенос',
    en: 'Export / Migration'
  },
  navExperiments: {
    ru: 'Эксперименты',
    en: 'Experiments'
  },
  catalogSummary: {
    ru: 'Каталог: 230 групп (9 проверенных моделей)',
    en: 'Catalog: 230 Groups (9 Verified Models)'
  },

  // Catalog View
  searchPlaceholder: {
    ru: 'Поиск по № ITA (1–230), символу Германа — Могена (напр. P41, Fm-3m) или Холла...',
    en: 'Search by ITA № (1-230), HM symbol (e.g. P41, Fm-3m), or Hall...'
  },
  selectAllVerified: {
    ru: 'Выбрать все 9 проверенных',
    en: 'Select All 9 Verified'
  },
  clearSelection: {
    ru: 'Очистить выбор',
    en: 'Clear Selection'
  },
  migrateBatch: {
    ru: 'Перейти к переносу',
    en: 'Go to Migration'
  },
  loadDemoP41: {
    ru: 'Загрузить демо-группу P4₁',
    en: 'Load Demo Group P4₁'
  },
  filtersLabel: {
    ru: 'Фильтры:',
    en: 'Filters:'
  },
  allSystems: {
    ru: 'Все сингонии (230)',
    en: 'All Crystal Systems (230)'
  },
  systemTriclinic: {
    ru: 'Триклинная (1–2)',
    en: 'Triclinic (1–2)'
  },
  systemMonoclinic: {
    ru: 'Моноклинная (3–15)',
    en: 'Monoclinic (3–15)'
  },
  systemOrthorhombic: {
    ru: 'Ромбическая (16–74)',
    en: 'Orthorhombic (16–74)'
  },
  systemTetragonal: {
    ru: 'Тетрагональная (75–142)',
    en: 'Tetragonal (75–142)'
  },
  systemTrigonal: {
    ru: 'Тригональная (143–167)',
    en: 'Trigonal (143–167)'
  },
  systemHexagonal: {
    ru: 'Гексагональная (168–194)',
    en: 'Hexagonal (168–194)'
  },
  systemCubic: {
    ru: 'Кубическая (195–230)',
    en: 'Cubic (195–230)'
  },
  allCenterings: {
    ru: 'Все решётки Браве',
    en: 'All Centerings'
  },
  centeringP: {
    ru: 'P — Примитивная',
    en: 'P — Primitive'
  },
  centeringI: {
    ru: 'I — Объёмноцентрированная',
    en: 'I — Body-centered'
  },
  centeringF: {
    ru: 'F — Гранецентрированная',
    en: 'F — Face-centered'
  },
  centeringC: {
    ru: 'C — Базоцентрированная C',
    en: 'C — C-centered'
  },
  centeringA: {
    ru: 'A — Базоцентрированная A',
    en: 'A — A-centered'
  },
  centeringB: {
    ru: 'B — Базоцентрированная B',
    en: 'B — B-centered'
  },
  centeringR: {
    ru: 'R — Ромбоэдрическая',
    en: 'R — Rhombohedral'
  },
  allStatuses: {
    ru: 'Все статусы покрытия',
    en: 'All Coverage Statuses'
  },
  statusVerifiedOption: {
    ru: 'Проверен, допущен к работе',
    en: 'Verified Active'
  },
  statusMetadataOption: {
    ru: 'Доступны метаданные',
    en: 'Metadata Available'
  },
  showingCount: {
    ru: 'Показано {count} из 230 пространственных групп',
    en: 'Showing {count} of 230 space groups'
  },
  badgeVerified: {
    ru: 'ПРОВЕРЕН',
    en: 'VERIFIED'
  },
  badgeMetadata: {
    ru: 'МЕТАДАННЫЕ',
    en: 'METADATA'
  },
  cardSystem: {
    ru: 'Сингония:',
    en: 'System:'
  },
  cardLattice: {
    ru: 'Решётка:',
    en: 'Lattice:'
  },
  cardSettings: {
    ru: 'Установки:',
    en: 'Settings:'
  },
  availableSettingsSuffix: {
    ru: 'доступно',
    en: 'available'
  },
  passportBtn: {
    ru: 'Паспорт',
    en: 'Passport'
  },
  exportBtn: {
    ru: 'Экспорт .fsspack',
    en: 'Export .fsspack'
  },
  exportSingle: {
    ru: 'Экспортировать .fsspack',
    en: 'Export .fsspack'
  },
  modelPending: {
    ru: 'Математическая модель не подготовлена',
    en: 'Model Pending'
  },

  // Group Passport View
  backToCatalog: {
    ru: 'Назад в каталог',
    en: 'Back to Catalog'
  },
  addToBatch: {
    ru: 'В очередь переноса',
    en: 'Add to Migration Queue'
  },
  inBatch: {
    ru: 'В очереди переноса ✓',
    en: 'In Migration Queue ✓'
  },
  metadataOnlyBlocked: {
    ru: 'Только метаданные (экспорт заблокирован)',
    en: 'Metadata Only (Export Blocked)'
  },
  selectSettingLabel: {
    ru: 'Выбор кристаллографической установки / начала координат:',
    en: 'Select Setting / Origin Choice:'
  },
  symmetryOperationsTitle: {
    ru: 'Операции симметрии',
    en: 'Symmetry Operations'
  },
  exactFractionsDesc: {
    ru: 'Точные целочисленные матрицы W и рациональные сдвиги w',
    en: 'Exact integer matrices W and rational translations w'
  },
  testInExperimentBtn: {
    ru: 'Проверить операции в эксперименте',
    en: 'Test Operations in Experiments'
  },
  thIndex: {
    ru: '№',
    en: '№'
  },
  thSymbol: {
    ru: 'Символ',
    en: 'Symbol'
  },
  thRotation: {
    ru: 'Матрица поворота W (3×3 целые)',
    en: 'Rotation Matrix W (3×3 integer)'
  },
  thTranslation: {
    ru: 'Сдвиг w (рациональный)',
    en: 'Translation w (rational)'
  },
  thDet: {
    ru: 'det(W)',
    en: 'det(W)'
  },
  thTrace: {
    ru: 'Tr(W)',
    en: 'Tr(W)'
  },
  thType: {
    ru: 'Тип',
    en: 'Type'
  },
  opIdentity: {
    ru: 'Тождество',
    en: 'Identity'
  },
  opRotation: {
    ru: 'Поворот',
    en: 'Rotation'
  },
  opRotoinversion: {
    ru: 'Инверсионный поворот',
    en: 'Rotoinversion'
  },
  opInversion: {
    ru: 'Инверсия',
    en: 'Inversion'
  },
  opReflection: {
    ru: 'Отражение',
    en: 'Reflection'
  },
  mathEvidenceTitle: {
    ru: 'Свидетельства математической проверки',
    en: 'Mathematical Verification Evidence'
  },
  evidenceIdentity: {
    ru: 'Нейтральный элемент (Identity):',
    en: 'Identity Element (W=I, w=0):'
  },
  evidenceInverses: {
    ru: 'Существование обратных элементов (Inverses):',
    en: 'Inverse Elements Exist (∀g ∃g⁻¹):'
  },
  evidenceClosure: {
    ru: 'Замкнутость группы modulo 1 (Closure):',
    en: 'Group Closure Modulo 1 (g₁·g₂ ∈ G):'
  },
  evidenceConfirmed: {
    ru: 'ПОДТВЕРЖДЕНО',
    en: 'CONFIRMED'
  },
  provenanceTitle: {
    ru: 'Происхождение и атрибуция',
    en: 'Provenance & Attribution'
  },
  sourceDatabase: {
    ru: 'База данных источника:',
    en: 'Source Database:'
  },
  sourceCommit: {
    ru: 'Зафиксированный коммит / версия:',
    en: 'Source Commit / Version:'
  },
  sourceFile: {
    ru: 'Исходный файл:',
    en: 'Source File:'
  },
  sourceLicense: {
    ru: 'Лицензия:',
    en: 'License:'
  },
  sourceAttribution: {
    ru: 'Атрибуция:',
    en: 'Attribution:'
  },

  // Export / Migration Workbench
  migrationTitle: {
    ru: 'Экспорт и перенос криптографических паспортов',
    en: 'FSSPACK Migration & Batch Export Workbench'
  },
  migrationSubtitle: {
    ru: 'Управление выбранными группами, скачивание отдельных контейнеров .fsspack и формирование общего транспортного архива',
    en: 'Bundle multiple crystallographic space groups into standalone .fsspack objects and outer migration archives.'
  },
  clearAllBtn: {
    ru: 'Очистить очередь',
    en: 'Clear All'
  },
  downloadBatchZip: {
    ru: 'Общий ZIP-архив ({count} пак.)',
    en: 'Download Batch ZIP ({count} pkgs)'
  },
  packingArchive: {
    ru: 'Формирование архива...',
    en: 'Packing Archive...'
  },
  totalSelected: {
    ru: 'Всего выбрано групп:',
    en: 'Total Selected Groups:'
  },
  readyForExport: {
    ru: 'Готовы к экспорту .fsspack:',
    en: 'Ready for .fsspack Export:'
  },
  pendingExport: {
    ru: 'Только метаданные (экспорт заблокирован):',
    en: 'Metadata Only (Export Blocked):'
  },
  verifiedSuffix: {
    ru: 'Проверено',
    en: 'Verified'
  },
  pendingSuffix: {
    ru: 'Ожидает модель',
    en: 'Pending'
  },
  emptyQueueTitle: {
    ru: 'Очередь переноса пуста',
    en: 'No Groups Selected for Migration'
  },
  emptyQueueDesc: {
    ru: 'Перейдите в каталог симметрий и выберите группы флажками для добавления в очередь миграции.',
    en: 'Go to the space-group catalog and select groups with checkboxes to add them to the migration queue.'
  },
  goToCatalog: {
    ru: 'Перейти в каталог',
    en: 'Go to Catalog'
  },
  queueListTitle: {
    ru: 'Очередь выбранных объектов миграции',
    en: 'Migration Queue Items'
  },
  readyBadge: {
    ru: 'Готов к экспорту',
    en: 'Ready to Export'
  },
  archivePreviewTitle: {
    ru: 'Предпросмотр структуры общего ZIP-архива',
    en: 'Batch ZIP Archive Structure Preview'
  },
  archiveDesc: {
    ru: 'Внешний транспортный архив содержит пакеты .fsspack, файл сверки INDEX.json и сопроводительную инструкцию README.txt.',
    en: 'The outer transport archive contains standalone .fsspack packages, an INDEX.json checksum registry, and a README.txt guide.'
  },

  // Experiments View
  customGroupLoaded: {
    ru: 'Загруженная пространственная группа:',
    en: 'Loaded Space Group:'
  },
  resetToStandard: {
    ru: 'Сбросить к стандарту',
    en: 'Reset to Standard'
  },
  selectOpToApply: {
    ru: 'Выберите кристаллографическую операцию для применения к структуре:',
    en: 'Select crystallographic operation to apply to structure:'
  },
  canonicalStructure: {
    ru: '1. Каноническая структура',
    en: '1. Canonical Structure'
  },
  structureVertices: {
    ru: 'Вершин: 4 | Рёбер: 6',
    en: 'Vertices: 4 | Edges: 6'
  },
  verificationExperiment: {
    ru: '2. Проверочный эксперимент',
    en: '2. Verification Experiment'
  },
  toleranceThreshold: {
    ru: 'Порог погрешности (ε):',
    en: 'Verification Tolerance (ε):'
  },
  applyPositiveClaim: {
    ru: 'Позитивный контроль: поворот C3 (120°)',
    en: 'Apply Positive Claim: C3 Rotation (120°)'
  },
  applyPositiveSub: {
    ru: 'Ось [1, 1, 1] • Перестановка (z, x, y)',
    en: 'Axis [1, 1, 1] • Permutation (z, x, y)'
  },
  applyMirrorClaim: {
    ru: 'Зеркальное отражение: плоскость x = y',
    en: 'Apply Mirror Reflection: Plane x = y'
  },
  applyMirrorSub: {
    ru: 'det(Q) = -1.0 • Обращает ориентацию',
    en: 'det(Q) = -1.0 • Inverts Orientation'
  },
  applyNegativeClaim: {
    ru: 'Негативный контроль: поворот (45°)',
    en: 'Apply Negative Control: Rotation (45°)'
  },
  applyNegativeSub: {
    ru: 'Та же ось [1, 1, 1] • Несимметричный угол',
    en: 'Same Axis [1, 1, 1] • Asymmetric Angle'
  },
  expectedPass: {
    ru: 'Ожидается: ПРОЙДЕН',
    en: 'Expected: PASS'
  },
  expectedFail: {
    ru: 'Ожидается: ОТКЛОНЁН',
    en: 'Expected: FAIL'
  },
  resetScene: {
    ru: 'Сбросить сцену к базовому состоянию',
    en: 'Reset Scene to Canonical Base State'
  },
  verdictLabel: {
    ru: 'ВЕРДИКТ:',
    en: 'VERDICT:'
  },
  isometryLabel: {
    ru: 'Изометрия (QᵀQ ≈ I):',
    en: 'Isometry (QᵀQ ≈ I):'
  },
  preserved: {
    ru: 'СОХРАНЕНА',
    en: 'PRESERVED'
  },
  violated: {
    ru: 'НАРУШЕНА',
    en: 'VIOLATED'
  },
  linearDet: {
    ru: 'Линейный det(Q):',
    en: 'Linear Det det(Q):'
  },
  maxDelta: {
    ru: 'Макс. дельта (δ_max):',
    en: 'Max Delta (δ_max):'
  },
  bijectivePerm: {
    ru: 'Биективная перестановка:',
    en: 'Bijective Permutation:'
  },
  bijYes: {
    ru: 'ДА (взаимно-однозначная)',
    en: 'YES (1-to-1 bijection)'
  },
  bijNo: {
    ru: 'НЕТ (схлопывание)',
    en: 'NO (collapsed)'
  },
  meanDelta: {
    ru: 'Средняя дельта (δ_mean):',
    en: 'Mean Delta (δ_mean):'
  },
  edgeTopology: {
    ru: 'Топология рёбер ({count} рёбер):',
    en: 'Edge Topology ({count} edges):'
  },
  evidenceArtifact: {
    ru: '3. Детерминированное свидетельство (Evidence JSON)',
    en: '3. Deterministic Evidence Artifact'
  },
  copied: {
    ru: 'Скопировано',
    en: 'Copied'
  },
  copyJson: {
    ru: 'Копировать JSON',
    en: 'Copy JSON'
  },
  agentToolPath: {
    ru: 'ШИНА АГЕНТА (HTTP POST /api/experiment)',
    en: 'AGENT TOOL PATH (HTTP POST /api/experiment)'
  },
  agentToolDesc: {
    ru: 'ИИ-агенты запускают точно такой же эксперимент через вызов инструментов или HTTP POST с идентичным детерминизмом:',
    en: 'AI-Agents execute the exact same experiment via Tool Call or HTTP POST with identical determinism:'
  },
  sharedEngine: {
    ru: 'Единое детерминированное ядро: 100% паритет',
    en: 'Core parity: 100% Shared Deterministic Engine'
  },
  bitIdentical: {
    ru: 'Эталон: побитово идентичные результаты',
    en: 'Ground Truth: Bit-identical outputs'
  },

  // Gatekeeper Ingestion Modal
  gatekeeperReportTitle: {
    ru: 'Отчёт о приёмке паспорта FSSPACK Gatekeeper',
    en: 'FSSPACK Gatekeeper Ingestion Report'
  },
  admissionStatusLabel: {
    ru: 'Статус приёмки:',
    en: 'Status:'
  },
  stagesLedgerTitle: {
    ru: '1. Этапы верификации приёмки',
    en: '1. Ingestion Verification Stages'
  },
  stagePassed: {
    ru: 'Пройден',
    en: 'Passed'
  },
  stageFailed: {
    ru: 'Отклонён',
    en: 'Failed'
  },
  packageManifestTitle: {
    ru: 'Манифест пакета',
    en: 'Package Manifest'
  },
  packageId: {
    ru: 'Идентификатор пакета:',
    en: 'Package ID:'
  },
  specVersion: {
    ru: 'Версия спецификации:',
    en: 'Spec Version:'
  },
  createdAt: {
    ru: 'Дата создания:',
    en: 'Created At:'
  },
  contentSha: {
    ru: 'Канонический хэш SHA-256:',
    en: 'Content SHA-256:'
  },
  provenanceTitleModal: {
    ru: 'Происхождение и авторство',
    en: 'Provenance & Attribution'
  },
  exporterSoftware: {
    ru: 'ПО экспортёра:',
    en: 'Exporter Software:'
  },
  mathModelTitleModal: {
    ru: 'Математическая модель ({count} операций)',
    en: 'Mathematical Model ({count} Operations)'
  },
  arithmeticModel: {
    ru: 'Арифметика:',
    en: 'Arithmetic:'
  },
  centeringModel: {
    ru: 'Центрирование:',
    en: 'Centering:'
  },
  equivalenceModel: {
    ru: 'Эквивалентность:',
    en: 'Equivalence:'
  },
  mathVerifiedLabel: {
    ru: 'Мат. проверка:',
    en: 'Math Verified:'
  },
  yes: {
    ru: 'ДА',
    en: 'YES'
  },
  no: {
    ru: 'НЕТ',
    en: 'NO'
  },
  diagnosticNotes: {
    ru: 'Диагностические примечания',
    en: 'Diagnostic Notes'
  },
  closeReport: {
    ru: 'Закрыть отчёт',
    en: 'Close Report'
  },

  // Status mapping
  status_VERIFIED_ACTIVE: {
    ru: 'Проверен, допущен к работе',
    en: 'Verified Active'
  },
  status_QUARANTINE_DIAGNOSTIC: {
    ru: 'Диагностический карантин',
    en: 'Quarantine Diagnostic'
  },
  status_REJECTED: {
    ru: 'Отклонён',
    en: 'Rejected'
  },
  status_MODEL_VERIFIED: {
    ru: 'Проверен, допущен к работе',
    en: 'Verified Active'
  },
  status_CATALOG_METADATA_AVAILABLE: {
    ru: 'Доступны метаданные',
    en: 'Metadata Available'
  }
} as const;

export type TranslationKey = keyof typeof DICTIONARY;

export function translate(key: TranslationKey, lang: Language, params?: Record<string, string | number>): string {
  const item = DICTIONARY[key];
  if (!item) return key;
  let text: string = item[lang] || item.en || key;
  if (params) {
    for (const [pKey, pVal] of Object.entries(params)) {
      text = text.replace(new RegExp(`\\{${pKey}\\}`, 'g'), String(pVal));
    }
  }
  return text;
}

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextType>({
  lang: 'ru',
  setLang: () => {},
  t: (key) => key
});

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('fss_lang');
      if (saved === 'ru' || saved === 'en') return saved;
    } catch {
      // ignore
    }
    return 'ru';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('fss_lang', newLang);
    } catch {
      // ignore
    }
  };

  const t = (key: TranslationKey, params?: Record<string, string | number>) => {
    return translate(key, lang, params);
  };

  return React.createElement(
    I18nContext.Provider,
    { value: { lang, setLang, t } },
    children
  );
};

export const useI18n = () => useContext(I18nContext);
