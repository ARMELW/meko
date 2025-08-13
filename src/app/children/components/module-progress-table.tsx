import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Typography, ExpandableTableRow } from '@/components';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { useModuleGames } from '../hooks/use-module-games';
import ModuleGamesDetail from './module-games-detail';
import { useChildrenStore } from '../store';

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
  );
};

export default ModuleProgressTable;
