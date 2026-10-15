import React, { useState, useMemo } from 'react';
import { SpaceGroupCatalogItem } from '../core/space_group_data_230';
import { useI18n } from '../core/i18n';
import { Search, Filter, CheckSquare, Square, Download, FileText, CheckCircle2, Clock, Sparkles, Compass } from 'lucide-react';

interface SpaceGroupCatalogViewProps {
  groups: SpaceGroupCatalogItem[];
  selectedGroupNumbers: number[];
  onToggleSelect: (num: number) => void;
  onSelectAllVerified: () => void;
  onClearSelection: () => void;
  onViewPassport: (num: number) => void;
  onQuickExport: (num: number) => void;
  onNavigateToMigration: () => void;
  onLoadDemoP41?: () => void;
}

export const SpaceGroupCatalogView: React.FC<SpaceGroupCatalogViewProps> = ({
  groups,
  selectedGroupNumbers,
  onToggleSelect,
  onSelectAllVerified,
  onClearSelection,
  onViewPassport,
  onQuickExport,
  onNavigateToMigration,
  onLoadDemoP41
}) => {
  const { t, lang } = useI18n();
  const [searchTerm, setSearchTerm] = useState('');
  const [systemFilter, setSystemFilter] = useState('ALL');
  const [centeringFilter, setCenteringFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredGroups = useMemo(() => {
    return groups.filter(g => {
      if (searchTerm.trim()) {
        const q = searchTerm.trim().toLowerCase();
        const matchesNum = String(g.number) === q;
        const matchesHm = g.standardHm.toLowerCase().includes(q) || g.standardHm.replace(/\s+/g, '').toLowerCase().includes(q);
        const matchesHall = g.standardHall.toLowerCase().includes(q);
        const matchesSettings = g.settings.some(s =>
          s.hm.toLowerCase().includes(q) || s.hall.toLowerCase().includes(q) || s.settingId.toLowerCase().includes(q)
        );
        if (!matchesNum && !matchesHm && !matchesHall && !matchesSettings) return false;
      }
      if (systemFilter !== 'ALL' && g.crystalSystem.toLowerCase() !== systemFilter.toLowerCase()) {
        return false;
      }
      if (centeringFilter !== 'ALL' && g.centering.toUpperCase() !== centeringFilter.toUpperCase()) {
        return false;
      }
      if (statusFilter !== 'ALL' && g.status !== statusFilter) {
        return false;
      }
      return true;
    });
  }, [groups, searchTerm, systemFilter, centeringFilter, statusFilter]);

  const verifiedCount = groups.filter(g => g.hasVerifiedModel).length;

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

  return (
    <div className="flex flex-col gap-5">
      {/* Search and Filters Bar */}
      <div className="bg-[#080d1a] border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          {/* Quick Selection Actions */}
          <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
            {onLoadDemoP41 && (
              <button
                onClick={onLoadDemoP41}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/40 hover:bg-indigo-900/50 text-indigo-300 border border-indigo-800/50 transition cursor-pointer"
                title={t('loadDemoP41')}
              >
                <Compass className="w-3.5 h-3.5 text-indigo-400" />
                <span>{t('loadDemoP41')}</span>
              </button>
            )}

            <button
              onClick={onSelectAllVerified}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/50 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/60 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('selectAllVerified')}</span>
            </button>

            {selectedGroupNumbers.length > 0 && (
              <>
                <button
                  onClick={onClearSelection}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800 transition cursor-pointer"
                >
                  {t('clearSelection')} ({selectedGroupNumbers.length})
                </button>
                <button
                  onClick={onNavigateToMigration}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition cursor-pointer shadow-lg shadow-indigo-500/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t('migrateBatch')} ({selectedGroupNumbers.length})</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80 text-xs font-mono">
          <div className="flex items-center gap-1 text-slate-500 mr-2">
            <Filter className="w-3.5 h-3.5" />
            <span>{t('filtersLabel')}</span>
          </div>

          {/* Crystal System Selector */}
          <select
            value={systemFilter}
            onChange={(e) => setSystemFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1 text-xs font-mono focus:border-indigo-500 focus:outline-none"
          >
            <option value="ALL">{t('allSystems')}</option>
            <option value="triclinic">{t('systemTriclinic')}</option>
            <option value="monoclinic">{t('systemMonoclinic')}</option>
            <option value="orthorhombic">{t('systemOrthorhombic')}</option>
            <option value="tetragonal">{t('systemTetragonal')}</option>
            <option value="trigonal">{t('systemTrigonal')}</option>
            <option value="hexagonal">{t('systemHexagonal')}</option>
            <option value="cubic">{t('systemCubic')}</option>
          </select>

          {/* Centering Filter */}
          <select
            value={centeringFilter}
            onChange={(e) => setCenteringFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1 text-xs font-mono focus:border-indigo-500 focus:outline-none"
          >
            <option value="ALL">{t('allCenterings')}</option>
            <option value="P">{t('centeringP')}</option>
            <option value="I">{t('centeringI')}</option>
            <option value="F">{t('centeringF')}</option>
            <option value="C">{t('centeringC')}</option>
            <option value="A">{t('centeringA')}</option>
            <option value="B">{t('centeringB')}</option>
            <option value="R">{t('centeringR')}</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1 text-xs font-mono focus:border-indigo-500 focus:outline-none"
          >
            <option value="ALL">{t('allStatuses')}</option>
            <option value="MODEL_VERIFIED">{t('statusVerifiedOption')} ({verifiedCount})</option>
            <option value="CATALOG_METADATA_AVAILABLE">{t('statusMetadataOption')} (221)</option>
          </select>

          <span className="ml-auto text-[11px] text-slate-500">
            {t('showingCount', { count: filteredGroups.length })}
          </span>
        </div>
      </div>

      {/* Space Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
        {filteredGroups.map(group => {
          const isSelected = selectedGroupNumbers.includes(group.number);
          const isVerified = group.hasVerifiedModel;

          return (
            <div
              key={group.number}
              className={`p-4 rounded-xl border transition flex flex-col justify-between gap-3 ${
                isSelected
                  ? 'bg-indigo-950/20 border-indigo-500/50 shadow-md shadow-indigo-950/30'
                  : 'bg-[#080d1a] border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {/* Header Info */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => onToggleSelect(group.number)}
                    className="text-slate-400 hover:text-indigo-400 cursor-pointer p-0.5"
                    title={isSelected ? 'Deselect group' : 'Select group for migration'}
                  >
                    {isSelected ? (
                      <CheckSquare className="w-4 h-4 text-indigo-400" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-600" />
                    )}
                  </button>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-400">
                        № {group.number}
                      </span>
                      <h3 className="font-mono text-sm font-bold text-white">
                        {group.standardHm}
                      </h3>
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                      Hall: <span className="text-slate-400">{group.standardHall}</span>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                {isVerified ? (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {t('badgeVerified')}
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-800 text-slate-400 border border-slate-700 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {t('badgeMetadata')}
                  </span>
                )}
              </div>

              {/* Group Attributes */}
              <div className="grid grid-cols-3 gap-1.5 text-[10px] font-mono bg-slate-950/60 p-2 rounded-lg border border-slate-800/60">
                <div>
                  <span className="text-slate-500 block">{t('cardSystem')}</span>
                  <span className="text-slate-300 capitalize">{getSystemName(group.crystalSystem)}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">{t('cardLattice')}</span>
                  <span className="text-slate-300 font-bold">{group.centering}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">{t('cardSettings')}</span>
                  <span className="text-slate-300">{group.settings.length} {t('availableSettingsSuffix')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/60 text-xs font-mono">
                <button
                  onClick={() => onViewPassport(group.number)}
                  className="flex items-center gap-1 text-slate-300 hover:text-indigo-300 px-2.5 py-1 rounded-lg hover:bg-slate-900 border border-slate-800 transition cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{t('passportBtn')}</span>
                </button>

                {isVerified ? (
                  <button
                    onClick={() => onQuickExport(group.number)}
                    className="flex items-center gap-1 text-emerald-300 hover:text-emerald-200 px-2.5 py-1 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/50 transition cursor-pointer"
                    title={t('exportBtn')}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{t('exportBtn')}</span>
                  </button>
                ) : (
                  <span className="text-[10px] text-slate-600 italic">
                    {t('modelPending')}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
