import React, { useState } from 'react';
import { SpaceGroupCatalogItem } from '../core/space_group_data_230';
import { useI18n } from '../core/i18n';
import { Download, Layers, CheckCircle2, AlertTriangle, FileArchive, ArrowRight, Trash2 } from 'lucide-react';

interface BatchMigrationViewProps {
  selectedGroups: SpaceGroupCatalogItem[];
  onRemoveGroup: (num: number) => void;
  onClearAll: () => void;
  onDownloadSingle: (settingId: string) => void;
  onNavigateToCatalog: () => void;
}

export const BatchMigrationView: React.FC<BatchMigrationViewProps> = ({
  selectedGroups,
  onRemoveGroup,
  onClearAll,
  onDownloadSingle,
  onNavigateToCatalog
}) => {
  const { t, lang } = useI18n();
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const verifiedGroups = selectedGroups.filter(g => g.hasVerifiedModel);
  const pendingGroups = selectedGroups.filter(g => !g.hasVerifiedModel);

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

  const handleDownloadBatch = async () => {
    if (selectedGroups.length === 0) return;
    setDownloading(true);
    setDownloadError(null);

    try {
      const targets = selectedGroups.map(g => ({
        groupNumber: g.number,
        settingId: g.verifiedSettings[0] || g.settings[0]?.settingId
      }));

      const res = await fetch('/api/fsspack/batch-export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targets })
      });

      if (!res.ok) {
        throw new Error(`Batch export failed with status ${res.status}`);
      }

      // Download binary zip buffer
      const blob = await res.blob();
      const contentDisp = res.headers.get('content-disposition');
      let filename = 'fsspack_batch_export.zip';
      if (contentDisp && contentDisp.includes('filename="')) {
        filename = contentDisp.split('filename="')[1].split('"')[0];
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err: any) {
      setDownloadError(err.message || 'Batch download failed');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full">
      {/* Header and Stats */}
      <div className="bg-[#080d1a] border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-indigo-400" />
              <h1 className="text-xl font-bold font-mono text-white tracking-tight">
                {t('migrationTitle')}
              </h1>
            </div>
            <p className="text-xs font-mono text-slate-400 mt-1">
              {t('migrationSubtitle')}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 text-xs font-mono">
            {selectedGroups.length > 0 && (
              <button
                onClick={onClearAll}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800 transition cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t('clearAllBtn')}</span>
              </button>
            )}

            <button
              onClick={handleDownloadBatch}
              disabled={downloading || verifiedGroups.length === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition cursor-pointer shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileArchive className="w-4 h-4" />
              <span>
                {downloading ? t('packingArchive') : t('downloadBatchZip', { count: verifiedGroups.length })}
              </span>
            </button>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-500 block text-[10px]">{t('totalSelected')}</span>
            <span className="text-white font-bold text-lg">{selectedGroups.length}</span>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-emerald-900/40">
            <span className="text-emerald-500 block text-[10px]">{t('readyForExport')}</span>
            <span className="text-emerald-400 font-bold text-lg">{verifiedGroups.length} {t('verifiedSuffix')}</span>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-amber-900/40">
            <span className="text-amber-500 block text-[10px]">{t('pendingExport')}</span>
            <span className="text-amber-400 font-bold text-lg">{pendingGroups.length} {t('pendingSuffix')}</span>
          </div>
        </div>
      </div>

      {downloadError && (
        <div className="bg-rose-950/60 border border-rose-800 text-rose-200 p-4 rounded-xl text-xs font-mono">
          {downloadError}
        </div>
      )}

      {/* Selected Groups List */}
      {selectedGroups.length === 0 ? (
        <div className="bg-[#080d1a] border border-slate-800 rounded-2xl p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center mx-auto text-slate-500">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-mono text-sm font-bold text-white">{t('emptyQueueTitle')}</h3>
            <p className="text-xs font-mono text-slate-400 mt-1 max-w-md mx-auto">
              {t('emptyQueueDesc')}
            </p>
          </div>
          <button
            onClick={onNavigateToCatalog}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs px-4 py-2 rounded-lg transition cursor-pointer"
          >
            <span>{t('goToCatalog')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="bg-[#080d1a] border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-bold font-mono text-white flex items-center gap-2">
            <span>{t('queueListTitle')}</span>
            <span className="text-slate-500 text-xs">({selectedGroups.length})</span>
          </h2>

          <div className="divide-y divide-slate-850">
            {selectedGroups.map(group => {
              const isVerified = group.hasVerifiedModel;
              const settingId = group.verifiedSettings[0] || group.settings[0]?.settingId;

              return (
                <div key={group.number} className="py-3 flex items-center justify-between gap-4 font-mono text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500 font-bold w-12">№ {group.number}</span>
                    <span className="text-white font-bold text-sm w-24">{group.standardHm}</span>
                    <span className="text-slate-400 text-[11px] hidden sm:inline">Hall: {group.standardHall}</span>
                    <span className="text-slate-500 text-[11px] capitalize hidden md:inline">
                      {getSystemName(group.crystalSystem)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {isVerified ? (
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{t('readyBadge')}</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        <span>{t('pendingBadge')}</span>
                      </span>
                    )}

                    {isVerified && (
                      <button
                        onClick={() => onDownloadSingle(settingId)}
                        className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-800 transition cursor-pointer"
                        title={t('exportBtn')}
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      onClick={() => onRemoveGroup(group.number)}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-500 hover:text-rose-400 border border-slate-800 transition cursor-pointer"
                      title="Remove from batch"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Transport Zip Preview info */}
      <div className="bg-[#080d1a] border border-slate-800 rounded-2xl p-6 space-y-3 font-mono text-xs">
        <h3 className="text-slate-300 font-bold flex items-center gap-2">
          <FileArchive className="w-4 h-4 text-indigo-400" />
          <span>{t('archivePreviewTitle')}</span>
        </h3>
        <p className="text-slate-400 text-[11px] leading-relaxed">
          {t('archiveDesc')}
        </p>
        <pre className="p-3 bg-black/60 rounded-xl border border-slate-800 text-[11px] text-slate-300 leading-relaxed overflow-x-auto">
{`fsspack_batch_${new Date().toISOString().slice(0, 10)}_${verifiedGroups.length}pkg.zip
├── INDEX.json             # Manifest registry with SHA-256 hashes of all packages
├── README.txt             # Ingestion protocol and Stand B migration instructions
└── packages/              # Self-contained cryptographic .fsspack containers
${verifiedGroups.map(g => `    ├── SG${String(g.number).padStart(3, '0')}_${(g.verifiedSettings[0] || g.standardHm).replace(/\\s+/g, '')}.fsspack`).join('\n') || '    └── (no verified packages selected)'}`}
        </pre>
      </div>
    </div>
  );
};
