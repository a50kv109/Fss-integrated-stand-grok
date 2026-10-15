import React, { useState } from 'react';
import { SpaceGroupPassport } from '../core/space_group_catalog';
import { useI18n } from '../core/i18n';
import {
  Download,
  Play,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles
} from 'lucide-react';

interface GroupPassportViewProps {
  passport: SpaceGroupPassport;
  onBackToCatalog: () => void;
  onExportFsspack: (settingId: string) => void;
  onSendToExperiment: (operations: any[], groupName: string) => void;
  onToggleSelectForBatch: (num: number) => void;
  isSelectedForBatch: boolean;
}

export const GroupPassportView: React.FC<GroupPassportViewProps> = ({
  passport,
  onBackToCatalog,
  onExportFsspack,
  onSendToExperiment,
  onToggleSelectForBatch,
  isSelectedForBatch
}) => {
  const { t, lang } = useI18n();
  const { item, verifiedRecord, hasVerifiedModel, operationsSummary, provenance } = passport;
  const [selectedSettingId, setSelectedSettingId] = useState(
    verifiedRecord?.settingId || item.settings[0]?.settingId || item.standardHm.replace(/\s+/g, '')
  );

  const getSystemName = (sys: string) => {
    switch (sys.toLowerCase()) {
      case 'triclinic': return lang === 'ru' ? 'триклинная' : 'triclinic';
      case 'monoclinic': return lang === 'ru' ? 'моноклинная' : 'monoclinic';
      case 'orthorhombic': return lang === 'ru' ? 'ромбическая' : 'orthorhombic';
      case 'tetragonal': return lang === 'ru' ? 'тетрагональная' : 'tetragonal';
      case 'trigonal': return lang === 'ru' ? 'тригональная' : 'trigonal';
      case 'hexagonal': return lang === 'ru' ? 'гексагональная' : 'hexagonal';
      case 'cubic': return lang === 'ru' ? 'кубическая' : 'cubic';
      default: return sys;
    }
  };

  const getOpTypeName = (type: string) => {
    switch (type.toUpperCase()) {
      case 'IDENTITY': return t('opIdentity');
      case 'ROTATION': return t('opRotation');
      case 'ROTOINVERSION': return t('opRotoinversion');
      case 'INVERSION': return t('opInversion');
      case 'REFLECTION': return t('opReflection');
      default: return type;
    }
  };

  const operations = verifiedRecord?.operations || [];

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToCatalog}
          className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 transition cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t('backToCatalog')}</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => onToggleSelectForBatch(item.number)}
            className={`px-3 py-1.5 rounded-lg border transition cursor-pointer flex items-center gap-1.5 ${
              isSelectedForBatch
                ? 'bg-indigo-950/60 border-indigo-500 text-indigo-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isSelectedForBatch ? t('inBatch') : t('addToBatch')}</span>
          </button>

          {hasVerifiedModel ? (
            <button
              onClick={() => onExportFsspack(selectedSettingId)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition cursor-pointer shadow-lg shadow-indigo-500/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t('exportSingle')}</span>
            </button>
          ) : (
            <span className="text-xs text-amber-400/80 bg-amber-950/30 border border-amber-900/50 px-3 py-1.5 rounded-lg font-mono">
              {t('metadataOnlyBlocked')}
            </span>
          )}
        </div>
      </div>

      {/* Main Passport Header Card */}
      <div className="bg-[#080d1a] border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-indigo-400 font-mono font-bold text-sm">
                № {item.number}
              </span>
              <h1 className="text-2xl font-bold font-mono text-white tracking-tight">
                {item.standardHm}
              </h1>
              {hasVerifiedModel ? (
                <span className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {t('badgeVerified')}
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-slate-800 text-slate-400 border border-slate-700 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {t('badgeMetadata')}
                </span>
              )}
            </div>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Hall: <span className="text-slate-200 font-bold">{item.standardHall}</span>
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <div className="bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[10px]">{t('cardSystem')}</span>
              <span className="text-slate-200 font-bold capitalize">{getSystemName(item.crystalSystem)}</span>
            </div>
            <div className="bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[10px]">{t('cardLattice')}</span>
              <span className="text-slate-200 font-bold">{item.centering}</span>
            </div>
            <div className="bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[10px]">{t('cardSettings')}</span>
              <span className="text-slate-200 font-bold">{item.settings.length}</span>
            </div>
          </div>
        </div>

        {/* Setting Selector */}
        {item.settings.length > 1 && (
          <div className="flex items-center gap-3 text-xs font-mono pt-1">
            <span className="text-slate-500 font-bold">{t('selectSettingLabel')}</span>
            <select
              value={selectedSettingId}
              onChange={(e) => setSelectedSettingId(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-200 rounded-lg px-3 py-1.5 text-xs font-mono focus:border-indigo-500 focus:outline-none"
            >
              {item.settings.map(s => (
                <option key={s.settingId} value={s.settingId}>
                  Setting ID: {s.settingId} | HM: {s.hm} | Hall: {s.hall}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Symmetry Operations Table (if verified) */}
      {hasVerifiedModel && operations.length > 0 ? (
        <div className="bg-[#080d1a] border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div>
              <h2 className="text-base font-bold font-mono text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>{t('symmetryOperationsTitle')} ({operations.length})</span>
              </h2>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                {t('exactFractionsDesc')}
              </p>
            </div>

            <button
              onClick={() => onSendToExperiment(operations, item.standardHm)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-medium transition cursor-pointer shadow-md"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{t('testInExperimentBtn')}</span>
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 text-[11px]">
                  <th className="py-2 px-3">{t('thIndex')}</th>
                  <th className="py-2 px-3">{t('thSymbol')}</th>
                  <th className="py-2 px-3">{t('thRotation')}</th>
                  <th className="py-2 px-3">{t('thTranslation')}</th>
                  <th className="py-2 px-3">{t('thDet')}</th>
                  <th className="py-2 px-3">{t('thTrace')}</th>
                  <th className="py-2 px-3">{t('thType')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {operations.map((op, idx) => {
                  const det =
                    op.W[0][0] * (op.W[1][1] * op.W[2][2] - op.W[1][2] * op.W[2][1]) -
                    op.W[0][1] * (op.W[1][0] * op.W[2][2] - op.W[1][2] * op.W[2][0]) +
                    op.W[0][2] * (op.W[1][0] * op.W[2][1] - op.W[1][1] * op.W[2][0]);
                  const trace = op.W[0][0] + op.W[1][1] + op.W[2][2];

                  return (
                    <tr key={idx} className="hover:bg-slate-900/40 transition">
                      <td className="py-2 px-3 text-slate-500">{idx + 1}</td>
                      <td className="py-2 px-3 font-bold text-slate-200">{op.symbol}</td>
                      <td className="py-2 px-3 text-slate-400">
                        [{op.W.map(r => `[${r.join(',')}]`).join(' ')}]
                      </td>
                      <td className="py-2 px-3 text-emerald-400 font-bold">
                        [{op.w.map(f => `${f.numerator}/${f.denominator}`).join(', ')}]
                      </td>
                      <td className="py-2 px-3 text-slate-300">{det}</td>
                      <td className="py-2 px-3 text-slate-300">{trace}</td>
                      <td className="py-2 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-slate-900 border border-slate-800 text-indigo-300">
                          {getOpTypeName(op.type)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-[#080d1a] border border-slate-800 rounded-2xl p-6 space-y-3">
          <h2 className="text-sm font-bold font-mono text-slate-300">{t('symmetryOperationsTitle')}</h2>
          <p className="text-xs font-mono text-slate-500 leading-relaxed">
            {t('modelPending')}
          </p>
        </div>
      )}

      {/* Mathematical Verification Proofs */}
      {hasVerifiedModel && (
        <div className="bg-[#080d1a] border border-slate-800 rounded-2xl p-6 space-y-3">
          <h2 className="text-sm font-bold font-mono text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{t('mathEvidenceTitle')}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
            <div className="bg-slate-950 p-3 rounded-xl border border-emerald-950/60">
              <span className="text-slate-500 block text-[10px]">{t('evidenceIdentity')}</span>
              <span className="text-emerald-400 font-bold">{t('evidenceConfirmed')}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-emerald-950/60">
              <span className="text-slate-500 block text-[10px]">{t('evidenceInverses')}</span>
              <span className="text-emerald-400 font-bold">{t('evidenceConfirmed')}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-emerald-950/60">
              <span className="text-slate-500 block text-[10px]">{t('evidenceClosure')}</span>
              <span className="text-emerald-400 font-bold">{t('evidenceConfirmed')}</span>
            </div>
          </div>
        </div>
      )}

      {/* Provenance Card */}
      <div className="bg-[#080d1a] border border-slate-800 rounded-2xl p-6 space-y-3">
        <h2 className="text-sm font-bold font-mono text-white flex items-center gap-2">
          <span>{t('provenanceTitle')}</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono bg-slate-950/80 p-4 rounded-xl border border-slate-800/80">
          <div>
            <span className="text-slate-500 block text-[10px]">{t('sourceDatabase')}</span>
            <span className="text-slate-200">{provenance.database}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">{t('sourceCommit')}</span>
            <span className="text-slate-200">{provenance.commitOrVersion}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">{t('sourceFile')}</span>
            <span className="text-slate-200">{provenance.sourceFile}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">{t('sourceLicense')}</span>
            <span className="text-slate-200">{provenance.license}</span>
          </div>
          <div className="md:col-span-2">
            <span className="text-slate-500 block text-[10px]">{t('sourceAttribution')}</span>
            <span className="text-slate-400">{provenance.attribution}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
