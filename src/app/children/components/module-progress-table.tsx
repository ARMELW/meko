import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Typography, ExpandableTableRow } from '@/components';
import { LoadingButton } from '@/components/atoms/actions/loading-button';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { useModuleGames } from '../hooks/use-module-games';
import ModuleGamesDetail from './module-games-detail';
import { useChildrenStore } from '../store';
import { truncateText } from '@/utils/text';

export interface ModuleProgressTableProps {
  modules: Array<{
    id: string;
    name: string;
    coverUrl: string;
    availableGames: number;
    inProgressGames: number;
    completedGames: number;
    progressPercentage: number;
  }>;
  expandable?: boolean;
}

const ModuleProgressTable: React.FC<ModuleProgressTableProps> = ({ modules, expandable = true }) => {
  const { t } = useTranslation();
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);
  const currentChild = useChildrenStore(state => state.currentChild);
  
  const { data: moduleDetail, isLoading: isLoadingDetail } = useModuleGames(
    currentChild?.id || '',
    expandedModuleId || ''
  );

  const handleToggleExpand = (moduleId: string) => {
    setExpandedModuleId(expandedModuleId === moduleId ? null : moduleId);
  };

  return (
    <div className="w-full">
      {/* Desktop / tablet: keep table layout */}
      <div className="hidden sm:block">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>{t('modules.progress.unlockableGames', 'Jeux à débloquer')}</TableHead>
              <TableHead>{t('modules.progress.inProgressGames', 'Jeux en cours')}</TableHead>
              <TableHead>{t('modules.progress.completedGames', 'Jeux terminés')}</TableHead>
              <TableHead className="text-right">{t('modules.progress.progress', 'Progression')}</TableHead>
              {expandable && <TableHead className="w-12"></TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {modules.map((mod) => (
              <ExpandableTableRow
                key={mod.id}
                disabled={!expandable}
                isExpanded={expandedModuleId === mod.id}
                onToggle={() => handleToggleExpand(mod.id)}
                isLoading={expandedModuleId === mod.id && isLoadingDetail}
                expandedContent={
                  expandedModuleId === mod.id && moduleDetail ? (
                    <ModuleGamesDetail 
                      lessons={moduleDetail.lessons || []}
                      isLoading={isLoadingDetail}
                    />
                  ) : null
                }
              >
                <TableCell align='left'>
                  <div className="flex gap-4">
                    <img
                      src={mod.coverUrl}
                      alt={mod.name}
                      className="w-20 h-20 rounded-2xl"
                    />
                    <Typography
                      color="primary"
                      weight="bold"
                      styleCase="uppercase"
                    >
                      {mod.name}
                    </Typography>
                  </div>
                </TableCell>
                <TableCell className="min-w-[100px]">{mod.availableGames}</TableCell>
                <TableCell className="min-w-[100px]">{mod.inProgressGames}</TableCell>
                <TableCell className="min-w-[100px]">{mod.completedGames}</TableCell>
                <TableCell className="min-w-[100px] text-right">{mod.progressPercentage}%</TableCell>
              </ExpandableTableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile: stacked cards */}
      <div className="block sm:hidden space-y-4">
        {modules.map((mod) => (
          <div key={mod.id} className="bg-meko-blue-transparent-3 rounded-xl shadow-sm p-3 overflow-hidden">
            <div className="flex flex-col items-start gap-3">
              <img src={mod.coverUrl} alt={mod.name} className="w-12 h-12 rounded-md object-cover flex-shrink-0" />
              <div className="flex-1 w-full">
                <Typography weight="bold" variant="h2" className="truncate">
                  {truncateText(mod.name, 24)}
                </Typography>
                <div className="mt-2 space-y-2 text-sm text-white">
                  <div className="">
                    <div className="font-semibold text-base">{mod.availableGames}</div>
                    <div className="text-xs truncate">{t('modules.progress.unlockableGames', 'Jeux à débloquer')}</div>
                  </div>
                  <div className="">
                    <div className="font-semibold text-base">{mod.inProgressGames}</div>
                    <div className="text-xs truncate">{t('modules.progress.inProgressGames', 'Jeux en cours')}</div>
                  </div>
                  <div className="">
                    <div className="font-semibold text-base">{mod.completedGames}</div>
                    <div className="text-xs truncate">{t('modules.progress.completedGames', 'Jeux terminés')}</div>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-2 bg-blue-500"
                      style={{ width: `${mod.progressPercentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-right mt-1 text-white">{mod.progressPercentage}%</div>
                </div>
              </div>
            </div>
              {expandable ? (
                <div className="w-full">
                  <div className="mt-3">
                    <LoadingButton
                      onClick={() => handleToggleExpand(mod.id)}
                      loading={expandedModuleId === mod.id && isLoadingDetail}
                      className="w-full"
                      aria-expanded={expandedModuleId === mod.id}
                      aria-label={expandedModuleId === mod.id ? t('modules.progress.collapse', 'Réduire') : t('modules.progress.viewGames', 'Voir les jeux')}
                    >
                      {expandedModuleId === mod.id ? t('modules.progress.collapse', 'Réduire') : t('modules.progress.viewGames', 'Voir les jeux')}
                    </LoadingButton>
                  </div>
                </div>
              ) : null}
            {expandedModuleId === mod.id && moduleDetail ? (
              <div className="mt-4">
                <ModuleGamesDetail lessons={moduleDetail.lessons || []} isLoading={isLoadingDetail} />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModuleProgressTable;
