import React, { useState } from 'react';
import { runSymmetryExperiment } from './core/engine';
import {
  CANONICAL_TETRAHEDRON,
  OPERATION_C3_120,
  OPERATION_NEGATIVE_45,
  OPERATION_REFLECTION_XY
} from './core/canonical';
import { Evidence, VerificationPredicate } from './core/types';
import { TetrahedronViewport } from './components/TetrahedronViewport';
import { SpaceGroupCatalogView } from './components/SpaceGroupCatalogView';
import { GroupPassportView } from './components/GroupPassportView';
import { BatchMigrationView } from './components/BatchMigrationView';
import { SpaceGroupCatalogService } from './core/space_group_catalog';
import { SPACE_GROUPS_230_DATA } from './core/space_group_data_230';
import { I18nProvider, useI18n, TranslationKey } from './core/i18n';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Copy,
  Check,
  Terminal,
  Play,
  Microscope,
  Upload,
  X,
  ShieldCheck,
  BookOpen,
  Layers,
  Sparkles,
  FileText
} from 'lucide-react';

const FedorovWorkbench: React.FC = () => {
  const { t, lang, setLang } = useI18n();

  const [evidence, setEvidence] = useState<Evidence | null>(null);
  const [predicate, setPredicate] = useState<VerificationPredicate>('PRESERVES_STRUCTURE');
  const [epsilon, setEpsilon] = useState<number>(1e-5);
  const [copied, setCopied] = useState(false);
  const [activeOpId, setActiveOpId] = useState<string | null>(null);
  const [view, setView] = useState<'catalog' | 'passport' | 'migration' | 'experiment'>('catalog');
  const [selectedGroupNumbers, setSelectedGroupNumbers] = useState<number[]>([76]);
  const [activePassportNumber, setActivePassportNumber] = useState<number>(76);
  const [customGroupExperiment, setCustomGroupExperiment] = useState<{
    groupName: string;
    operations: any[];
  } | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [ingestionModalOpen, setIngestionModalOpen] = useState(false);
  const [ingestionResult, setIngestionResult] = useState<any | null>(null);
  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  const handleFileImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    setImportError(null);
    try {
      const buffer = await file.arrayBuffer();
      const res = await fetch('/api/fsspack/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/octet-stream' },
        body: buffer
      });
      if (!res.ok) {
        throw new Error(lang === 'ru'
          ? `Ошибка приёмки на сервере (код ${res.status})`
          : `Server ingestion failed with status ${res.status}`);
      }
      const data = await res.json();
      setIngestionResult(data);
      setIngestionModalOpen(true);
    } catch (err: any) {
      setImportError(err.message || (lang === 'ru' ? 'Не удалось импортировать пакет' : 'Failed to import package'));
    } finally {
      setImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleToggleSelectGroup = (num: number) => {
    setSelectedGroupNumbers(prev =>
      prev.includes(num) ? prev.filter(n => n !== num) : [...prev, num]
    );
  };

  const handleSelectAllVerified = () => {
    const verifiedNums = SPACE_GROUPS_230_DATA.filter(g => g.hasVerifiedModel).map(g => g.number);
    setSelectedGroupNumbers(verifiedNums);
  };

  const handleClearSelection = () => {
    setSelectedGroupNumbers([]);
  };

  const handleViewPassport = (num: number) => {
    setActivePassportNumber(num);
    setView('passport');
  };

  const handleLoadDemoP41 = () => {
    if (!selectedGroupNumbers.includes(76)) {
      setSelectedGroupNumbers(prev => [...prev, 76]);
    }
    setActivePassportNumber(76);
    setView('passport');
  };

  const handleQuickExportSetting = (settingId: string) => {
    window.location.href = `/api/fsspack/export/${encodeURIComponent(settingId)}`;
  };

  const handleQuickExportGroup = (num: number) => {
    const group = SpaceGroupCatalogService.getGroup(num);
    if (!group || !group.hasVerifiedModel) {
      setImportError(lang === 'ru'
        ? `Пространственная группа #${num} пока не имеет проверенной модели.`
        : `Space group #${num} does not have a verified mathematical model yet.`);
      return;
    }
    const settingId = group.verifiedSettings[0] || group.settings[0]?.settingId;
    handleQuickExportSetting(settingId);
  };

  const handleSendToExperiment = (operations: any[], groupName: string) => {
    setCustomGroupExperiment({ groupName, operations });
    setView('experiment');
  };

  const handleRunCustomOp = (op: any, idx: number) => {
    setActiveOpId(`custom_op_${idx}`);
    const mat4x4: [
      [number, number, number, number],
      [number, number, number, number],
      [number, number, number, number],
      [number, number, number, number]
    ] = [
      [op.W[0][0], op.W[0][1], op.W[0][2], op.w[0].numerator / op.w[0].denominator],
      [op.W[1][0], op.W[1][1], op.W[1][2], op.w[1].numerator / op.w[1].denominator],
      [op.W[2][0], op.W[2][1], op.W[2][2], op.w[2].numerator / op.w[2].denominator],
      [0, 0, 0, 1]
    ];
    const det =
      op.W[0][0] * (op.W[1][1] * op.W[2][2] - op.W[1][2] * op.W[2][1]) -
      op.W[0][1] * (op.W[1][0] * op.W[2][2] - op.W[1][2] * op.W[2][0]) +
      op.W[0][2] * (op.W[1][0] * op.W[2][1] - op.W[1][1] * op.W[2][0]);

    const result = runSymmetryExperiment({
      structureId: CANONICAL_TETRAHEDRON.id,
      operationId: `custom_op_${idx}`,
      predicate,
      epsilon,
      operation: {
        id: `custom_op_${idx}`,
        name: `SG Op #${idx} (${customGroupExperiment?.groupName})`,
        type: det > 0 ? 'ROTATION' : 'REFLECTION',
        matrix4x4: mat4x4
      }
    });
    setEvidence(result);
  };

  const handleRunPositive = (pred?: VerificationPredicate) => {
    const activePred = pred || predicate;
    setActiveOpId(OPERATION_C3_120.id);
    const result = runSymmetryExperiment({
      structureId: CANONICAL_TETRAHEDRON.id,
      operationId: OPERATION_C3_120.id,
      predicate: activePred,
      epsilon
    });
    setEvidence(result);
  };

  const handleRunNegative = (pred?: VerificationPredicate) => {
    const activePred = pred || predicate;
    setActiveOpId(OPERATION_NEGATIVE_45.id);
    const result = runSymmetryExperiment({
      structureId: CANONICAL_TETRAHEDRON.id,
      operationId: OPERATION_NEGATIVE_45.id,
      predicate: activePred,
      epsilon
    });
    setEvidence(result);
  };

  const handleRunReflection = (pred?: VerificationPredicate) => {
    const activePred = pred || predicate;
    setActiveOpId(OPERATION_REFLECTION_XY.id);
    const result = runSymmetryExperiment({
      structureId: CANONICAL_TETRAHEDRON.id,
      operationId: OPERATION_REFLECTION_XY.id,
      predicate: activePred,
      epsilon
    });
    setEvidence(result);
  };

  const handleReset = () => {
    setActiveOpId(null);
    setEvidence(null);
  };

  const copyEvidenceJson = () => {
    if (!evidence) return;
    navigator.clipboard.writeText(JSON.stringify(evidence, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getAdmissionStatusDisplay = (status: string) => {
    const key = `status_${status}` as TranslationKey;
    return t(key) || status;
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Application Header */}
      <header className="border-b border-slate-800 bg-[#040814]/90 backdrop-blur-md sticky top-0 z-40 px-6 py-3.5 flex items-center justify-between shadow-sm">
        <div className="flex flex-col">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
            <h1 className="text-base font-bold tracking-tight text-white font-mono uppercase">
              {t('appTitle')}
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            {t('appSubtitle')}
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileImport}
            accept=".fsspack,application/zip"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={importing}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-3.5 py-2 rounded-lg transition shadow-sm cursor-pointer disabled:opacity-50"
            title={t('importPassport')}
          >
            <Upload className="w-4 h-4" />
            <span>{importing ? t('importing') : t('importPassport')}</span>
          </button>

          <div className="hidden lg:flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-300">
            <span className="text-slate-500">{t('coreEngineStatus')}</span>
          </div>

          {/* RU / EN Language Toggle Switcher */}
          <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5 text-xs font-mono">
            <button
              onClick={() => setLang('ru')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                lang === 'ru'
                  ? 'bg-indigo-600 text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              RU
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                lang === 'en'
                  ? 'bg-indigo-600 text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Sub-Header with Unified Tabs */}
      <nav className="border-b border-slate-800/80 bg-[#070b16] px-6 py-2.5 flex items-center justify-between gap-3 overflow-x-auto text-xs font-mono">
        <div className="flex items-center gap-2">
          {/* 1. Space-Group Catalog */}
          <button
            onClick={() => setView('catalog')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition font-medium cursor-pointer ${
              view === 'catalog'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t('navCatalog')}</span>
          </button>

          {/* 2. Group Passport */}
          <button
            onClick={() => setView('passport')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition font-medium cursor-pointer ${
              view === 'passport'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{t('navPassport')} #{activePassportNumber}</span>
          </button>

          {/* 3. Export / Migration */}
          <button
            onClick={() => setView('migration')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition font-medium cursor-pointer ${
              view === 'migration'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{t('navMigration')}</span>
            {selectedGroupNumbers.length > 0 && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                view === 'migration' ? 'bg-white text-indigo-700 font-bold' : 'bg-indigo-600 text-white'
              }`}>
                {selectedGroupNumbers.length}
              </span>
            )}
          </button>

          {/* 4. Experiments */}
          <button
            onClick={() => setView('experiment')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition font-medium cursor-pointer ${
              view === 'experiment'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <Microscope className="w-3.5 h-3.5" />
            <span>{t('navExperiments')}</span>
            {customGroupExperiment && (
              <span className="w-2 h-2 rounded-full bg-emerald-400" title={t('customGroupLoaded')} />
            )}
          </button>
        </div>

        <div className="flex items-center gap-3 text-slate-500 text-[11px] whitespace-nowrap">
          <span>{t('catalogSummary')}</span>
        </div>
      </nav>

      {/* Main View Router */}
      <main className="flex-1 p-6 max-w-[1700px] w-full mx-auto">
        {view === 'catalog' && (
          <SpaceGroupCatalogView
            groups={SPACE_GROUPS_230_DATA}
            selectedGroupNumbers={selectedGroupNumbers}
            onToggleSelect={handleToggleSelectGroup}
            onSelectAllVerified={handleSelectAllVerified}
            onClearSelection={handleClearSelection}
            onViewPassport={handleViewPassport}
            onQuickExport={handleQuickExportGroup}
            onNavigateToMigration={() => setView('migration')}
            onLoadDemoP41={handleLoadDemoP41}
          />
        )}

        {view === 'passport' && (
          <GroupPassportView
            passport={SpaceGroupCatalogService.getPassport(activePassportNumber) || SpaceGroupCatalogService.getPassport(76)!}
            onBackToCatalog={() => setView('catalog')}
            onExportFsspack={handleQuickExportSetting}
            onSendToExperiment={handleSendToExperiment}
            onToggleSelectForBatch={handleToggleSelectGroup}
            isSelectedForBatch={selectedGroupNumbers.includes(activePassportNumber)}
          />
        )}

        {view === 'migration' && (
          <BatchMigrationView
            selectedGroups={SPACE_GROUPS_230_DATA.filter(g => selectedGroupNumbers.includes(g.number))}
            onRemoveGroup={handleToggleSelectGroup}
            onClearAll={handleClearSelection}
            onDownloadSingle={handleQuickExportSetting}
            onNavigateToCatalog={() => setView('catalog')}
          />
        )}

        {view === 'experiment' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Control & Evidence Column (5 cols) */}
            <section className="lg:col-span-5 flex flex-col gap-4 overflow-y-auto pr-1">
              {/* Custom Space Group Operations Banner if Loaded */}
              {customGroupExperiment && (
                <div className="bg-gradient-to-r from-indigo-950/60 to-purple-950/40 border border-indigo-500/40 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-indigo-500/20 pb-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-400" />
                      <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                        {t('customGroupLoaded')} {customGroupExperiment.groupName}
                      </span>
                    </div>
                    <button
                      onClick={() => setCustomGroupExperiment(null)}
                      className="text-[10px] font-mono text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-900 border border-slate-800 transition cursor-pointer"
                    >
                      {t('resetToStandard')}
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-slate-400 block">
                      {t('selectOpToApply')}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-mono">
                      {customGroupExperiment.operations.map((op: any, idx: number) => {
                        const isSelected = activeOpId === `custom_op_${idx}`;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleRunCustomOp(op, idx)}
                            className={`p-2 rounded-lg border text-left flex flex-col gap-0.5 transition cursor-pointer ${
                              isSelected
                                ? 'bg-indigo-600/30 border-indigo-500 text-white'
                                : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-indigo-400 text-[11px]">Op #{idx + 1}</span>
                              <span className="text-[10px] text-emerald-400 font-mono">
                                w: {op.w.map((t: any) => `${t.numerator}/${t.denominator}`).join(',')}
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-400 truncate">
                              W: [{op.W.map((r: any) => `[${r.join(',')}]`).join(' ')}]
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Structure Specification Card */}
              <div className="bg-[#080d1a] border border-slate-800/80 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                    {t('canonicalStructure')}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {CANONICAL_TETRAHEDRON.id}
                  </span>
                </div>

                <div className="flex items-baseline justify-between">
                  <span className="font-semibold text-sm text-slate-200">{CANONICAL_TETRAHEDRON.name}</span>
                  <span className="text-xs text-slate-400 font-mono">{t('structureVertices')}</span>
                </div>

                {/* Vertices coordinates grid */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {CANONICAL_TETRAHEDRON.vertices.map(v => (
                    <div key={v.id} className="bg-slate-900/80 px-2.5 py-1.5 rounded border border-slate-800/60 flex items-center justify-between">
                      <span className="text-indigo-400 font-bold">{v.id}:</span>
                      <span className="text-slate-300">[{v.coords.join(', ')}]</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experiment Actions & Predicate */}
              <div className="bg-[#080d1a] border border-slate-800/80 rounded-xl p-4 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                    {t('verificationExperiment')}
                  </span>
                  <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[10px] font-mono">
                    <button
                      type="button"
                      onClick={() => {
                        setPredicate('PRESERVES_STRUCTURE');
                        if (activeOpId) {
                          const res = runSymmetryExperiment({
                            structureId: CANONICAL_TETRAHEDRON.id,
                            operationId: activeOpId,
                            predicate: 'PRESERVES_STRUCTURE',
                            epsilon
                          });
                          setEvidence(res);
                        }
                      }}
                      className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                        predicate === 'PRESERVES_STRUCTURE'
                          ? 'bg-indigo-600 text-white font-bold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      PRESERVES_STRUCTURE
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPredicate('PROPER_ROTATION');
                        if (activeOpId) {
                          const res = runSymmetryExperiment({
                            structureId: CANONICAL_TETRAHEDRON.id,
                            operationId: activeOpId,
                            predicate: 'PROPER_ROTATION',
                            epsilon
                          });
                          setEvidence(res);
                        }
                      }}
                      className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                        predicate === 'PROPER_ROTATION'
                          ? 'bg-indigo-600 text-white font-bold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      PROPER_ROTATION
                    </button>
                  </div>
                </div>

                {/* Epsilon configuration */}
                <div className="flex items-center justify-between bg-slate-900/60 px-3 py-2 rounded-lg border border-slate-800 text-xs font-mono">
                  <label htmlFor="epsilonInput" className="text-slate-400">
                    {t('toleranceThreshold')}
                  </label>
                  <input
                    id="epsilonInput"
                    type="number"
                    step="0.000001"
                    min="0.0000001"
                    value={epsilon}
                    onChange={(e) => setEpsilon(parseFloat(e.target.value) || 1e-5)}
                    className="w-28 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-right text-indigo-300 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>

                {/* Primary Action Buttons */}
                <div className="space-y-2">
                  {/* Positive Control Button */}
                  <button
                    onClick={() => handleRunPositive()}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                      activeOpId === OPERATION_C3_120.id
                        ? 'bg-emerald-600/20 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950/40'
                        : 'bg-slate-900 hover:bg-slate-850 border-slate-700 text-slate-200 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                      <div className="text-left">
                        <div>{t('applyPositiveClaim')}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{t('applyPositiveSub')}</div>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 uppercase">
                      {t('expectedPass')}
                    </span>
                  </button>

                  {/* Mirror Reflection Control Button */}
                  <button
                    onClick={() => handleRunReflection()}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                      activeOpId === OPERATION_REFLECTION_XY.id
                        ? 'bg-cyan-600/20 border-cyan-500 text-cyan-200 shadow-lg shadow-cyan-950/40'
                        : 'bg-slate-900 hover:bg-slate-850 border-slate-700 text-slate-200 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Play className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
                      <div className="text-left">
                        <div>{t('applyMirrorClaim')}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{t('applyMirrorSub')}</div>
                      </div>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded border uppercase ${
                      predicate === 'PRESERVES_STRUCTURE'
                        ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60'
                        : 'bg-red-950/80 text-red-400 border-red-800/60'
                    }`}>
                      {predicate === 'PRESERVES_STRUCTURE' ? t('expectedPass') : t('expectedFail')}
                    </span>
                  </button>

                  {/* Negative Control Button */}
                  <button
                    onClick={() => handleRunNegative()}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                      activeOpId === OPERATION_NEGATIVE_45.id
                        ? 'bg-red-600/20 border-red-500 text-red-200 shadow-lg shadow-red-950/40'
                        : 'bg-slate-900 hover:bg-slate-850 border-slate-700 text-slate-200 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Play className="w-3.5 h-3.5 text-red-400 fill-red-400" />
                      <div className="text-left">
                        <div>{t('applyNegativeClaim')}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{t('applyNegativeSub')}</div>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-red-950/80 text-red-400 border border-red-800/60 uppercase">
                      {t('expectedFail')}
                    </span>
                  </button>

                  {evidence && (
                    <button
                      onClick={handleReset}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-400 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{t('resetScene')}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Verdict Banner & Measurement */}
              {evidence && (
                <div className={`rounded-xl p-4 border transition-all ${
                  evidence.verdict === 'VERIFIED'
                    ? 'bg-emerald-950/20 border-emerald-500/60 text-emerald-200'
                    : 'bg-red-950/20 border-red-500/60 text-red-200'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 font-mono font-bold text-sm">
                      {evidence.verdict === 'VERIFIED' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400" />
                      )}
                      <span>{t('verdictLabel')} {evidence.verdict}</span>
                    </div>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-black/40">
                      {evidence.verdict === 'VERIFIED' ? 'PASS' : 'FAIL'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono bg-black/30 p-3 rounded-lg border border-white/5 mb-3">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">{t('isometryLabel')}</span>
                      <span className={`text-sm font-bold ${evidence.is_isometric ? 'text-emerald-400' : 'text-red-400'}`}>
                        {evidence.is_isometric ? t('preserved') : t('violated')}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">{t('linearDet')}</span>
                      <span className={`text-sm font-bold ${evidence.determinant === 1.0 ? 'text-indigo-400' : 'text-amber-400'}`}>
                        {evidence.determinant > 0 ? `+${evidence.determinant.toFixed(4)}` : evidence.determinant.toFixed(4)}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">{t('maxDelta')}</span>
                      <span className={`text-sm font-bold ${evidence.max_delta <= evidence.epsilon ? 'text-emerald-400' : 'text-red-400'}`}>
                        {evidence.max_delta.toFixed(8)}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">{t('toleranceThreshold')}</span>
                      <span className="text-slate-200 text-sm font-bold">
                        {evidence.epsilon}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">{t('bijectivePerm')}</span>
                      <span className="text-slate-200 font-bold">
                        {evidence.is_bijective ? t('bijYes') : t('bijNo')}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">{t('meanDelta')}</span>
                      <span className="text-slate-200 font-bold">
                        {evidence.mean_delta.toFixed(8)}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">{t('edgeTopology', { count: evidence.edge_count })}</span>
                      <span className={`text-sm font-bold ${
                        evidence.edge_topology_preserved === true
                          ? 'text-emerald-400'
                          : evidence.edge_topology_preserved === false
                          ? 'text-red-400'
                          : 'text-slate-400'
                      }`}>
                        {evidence.edge_topology_preserved === true
                          ? t('preserved')
                          : evidence.edge_topology_preserved === false
                          ? t('violated')
                          : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Evidence JSON Drawer */}
              {evidence && (
                <div className="bg-[#080d1a] border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                      {t('evidenceArtifact')}
                    </span>
                    <button
                      onClick={copyEvidenceJson}
                      className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? t('copied') : t('copyJson')}</span>
                    </button>
                  </div>
                  <pre className="text-[11px] font-mono bg-black/60 p-3 rounded-lg border border-slate-800/80 text-slate-300 max-h-48 overflow-y-auto leading-relaxed custom-scrollbar">
                    {JSON.stringify(evidence, null, 2)}
                  </pre>
                </div>
              )}
            </section>

            {/* Right 3D Visualizer & Agent API Column (7 cols) */}
            <section className="lg:col-span-7 flex flex-col gap-4 min-h-[500px]">
              {/* 3D Viewport Component */}
              <div className="flex-1 w-full min-h-[460px]">
                <TetrahedronViewport
                  structure={CANONICAL_TETRAHEDRON}
                  evidence={evidence}
                />
              </div>

              {/* Dual Interface Documentation (Agent Path) */}
              <div className="bg-[#080d1a] border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-400 space-y-2">
                <div className="flex items-center gap-2 text-slate-300 font-bold border-b border-slate-800 pb-2">
                  <Terminal className="w-4 h-4 text-indigo-400" />
                  <span>{t('agentToolPath')}</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-400">
                  {t('agentToolDesc')}
                </p>
                <div className="bg-black/60 p-2.5 rounded-lg border border-slate-800 text-[11px] text-slate-300 overflow-x-auto">
                  <code>
                    curl -X POST http://localhost:3000/api/experiment \<br />
                    &nbsp;&nbsp;-H "Content-Type: application/json" \<br />
                    &nbsp;&nbsp;-d '{JSON.stringify({ structureId: "struct_tetra_01", operationId: activeOpId || "op_rot_c3_120", epsilon: 1e-5 })}'
                  </code>
                </div>
                <div className="text-[10px] text-slate-500 flex justify-between pt-1">
                  <span>{t('sharedEngine')}</span>
                  <span>{t('bitIdentical')}</span>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Ingestion Report Modal */}
      {ingestionModalOpen && ingestionResult && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#080d1a] border border-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-[#060913]">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${ingestionResult.report.admissionStatus === 'VERIFIED_ACTIVE' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white font-mono flex items-center gap-2">
                    {t('gatekeeperReportTitle')}
                  </h2>
                  <p className="text-xs text-slate-400 font-mono">
                    {t('admissionStatusLabel')} <span className={ingestionResult.report.admissionStatus === 'VERIFIED_ACTIVE' ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                      {getAdmissionStatusDisplay(ingestionResult.report.admissionStatus)}
                    </span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIngestionModalOpen(false)}
                className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs font-mono">
              {/* Stages Ledger */}
              <div className="space-y-2">
                <h3 className="text-slate-300 font-bold uppercase tracking-wider text-[11px]">
                  {t('stagesLedgerTitle')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {ingestionResult.report.stages.map((stage: any) => (
                    <div key={stage.stage} className={`p-3 rounded-xl border flex items-center justify-between ${stage.passed ? 'bg-slate-900/60 border-emerald-500/30' : 'bg-rose-950/20 border-rose-500/30'}`}>
                      <div className="flex items-center gap-2.5">
                        <span className="text-slate-500 font-bold">#{stage.stage}</span>
                        <span className="text-slate-200">{stage.name}</span>
                      </div>
                      {stage.passed ? (
                        <span className="text-emerald-400 flex items-center gap-1 font-semibold">{t('stagePassed')}</span>
                      ) : (
                        <span className="text-rose-400 flex items-center gap-1 font-semibold" title={stage.error}>{t('stageFailed')}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Manifest & Provenance */}
              {ingestionResult.manifest && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-2">
                    <h4 className="text-indigo-400 font-bold">{t('packageManifestTitle')}</h4>
                    <div className="text-slate-300 space-y-1">
                      <div><span className="text-slate-500">{t('packageId')}</span> {ingestionResult.manifest.packageId}</div>
                      <div><span className="text-slate-500">{t('specVersion')}</span> {ingestionResult.manifest.fsspackVersion}</div>
                      <div><span className="text-slate-500">{t('createdAt')}</span> {ingestionResult.manifest.createdAt}</div>
                      <div><span className="text-slate-500">{t('contentSha')}</span> <span className="truncate block font-mono text-[10px] text-slate-400">{ingestionResult.manifest.contentSha256}</span></div>
                    </div>
                  </div>

                  {ingestionResult.provenance && (
                    <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-2">
                      <h4 className="text-indigo-400 font-bold">{t('provenanceTitleModal')}</h4>
                      <div className="text-slate-300 space-y-1">
                        <div><span className="text-slate-500">{t('sourceDatabase')}</span> {ingestionResult.provenance.sourceDatabase}</div>
                        <div><span className="text-slate-500">{t('sourceCommit')}</span> {ingestionResult.provenance.sourceVersionOrCommit}</div>
                        <div><span className="text-slate-500">{t('sourceLicense')}</span> {ingestionResult.provenance.sourceLicense}</div>
                        <div><span className="text-slate-500">{t('exporterSoftware')}</span> {ingestionResult.provenance.exporterSoftware?.name} v{ingestionResult.provenance.exporterSoftware?.version}</div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Math Model Summary */}
              {ingestionResult.mathModel && (
                <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-3">
                  <h4 className="text-indigo-400 font-bold">
                    {t('mathModelTitleModal', { count: ingestionResult.mathModel.operations.length })}
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                      <div className="text-slate-500">{t('arithmeticModel')}</div>
                      <div className="text-slate-200 font-semibold">{ingestionResult.mathModel.arithmeticModel}</div>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                      <div className="text-slate-500">{t('centeringModel')}</div>
                      <div className="text-slate-200 font-semibold">{ingestionResult.mathModel.latticeCentering}</div>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                      <div className="text-slate-500">{t('equivalenceModel')}</div>
                      <div className="text-slate-200 font-semibold">{ingestionResult.mathModel.translationEquivalence}</div>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                      <div className="text-slate-500">{t('mathVerifiedLabel')}</div>
                      <div className={ingestionResult.report.mathVerified ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                        {ingestionResult.report.mathVerified ? t('yes') : t('no')}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Reasons / Disclaimers */}
              {ingestionResult.report.reasons?.length > 0 && (
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-1">
                  <h4 className="text-slate-400 font-bold">{t('diagnosticNotes')}</h4>
                  <ul className="list-disc list-inside text-slate-300 space-y-1">
                    {ingestionResult.report.reasons.map((r: string, idx: number) => (
                      <li key={idx}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-800 bg-[#060913] flex justify-end">
              <button
                onClick={() => setIngestionModalOpen(false)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition cursor-pointer"
              >
                {t('closeReport')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Error Banner if any */}
      {importError && (
        <div className="fixed bottom-4 right-4 z-50 bg-rose-950 border border-rose-800 text-rose-200 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3">
          <span>{importError}</span>
          <button onClick={() => setImportError(null)} className="text-rose-400 hover:text-rose-100 font-bold cursor-pointer">×</button>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <I18nProvider>
      <FedorovWorkbench />
    </I18nProvider>
  );
};

export default App;
