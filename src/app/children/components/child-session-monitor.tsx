import { Card, CardContent, CardTitle, Typography } from "@/components";
import { useSession as useChildrenSession } from '@/services/session/store';
import { useLastActivity } from '@/app/game-sessions';
import { LastActivitySummary } from '@/app/game-sessions/components/last-activity-summary';
import { useProgressSummary } from '@/app/children/hooks/use-progress-summary';
import { useGamesStats } from '@/app/children/hooks/use-games-stats';
import { useTranslation } from 'react-i18next';
import StatusPieChart, { StatusPieData } from '@/components/atoms/view/progress-pie-chart';
import { useChildActivityStats } from '@/app/children/hooks/use-child-activity-stats';
import { LoadingSpinner } from '@/components/atoms/loading-spinner';
import { useMemo, useCallback } from 'react';
import UserAvatar from '@/components/atoms/view/user-avatar';

interface ChildSessionMonitorProps {
  period?: '7d' | '30d' | '6m';
  onPeriodChange?: (period: '7d' | '30d' | '6m') => void;
}

export function ChildSessionMonitor({ 
  period = '7d', 
  onPeriodChange 
}: ChildSessionMonitorProps) {
  const { t } = useTranslation();
  const { selectedChild } = useChildrenSession();
  
  const { data: lastActivityData } = useLastActivity(selectedChild?.id || '');
  const { data: progressSummary } = useProgressSummary(selectedChild?.id);
  const { data: gamesStats } = useGamesStats(selectedChild?.id);
  const { data: activityStats, isLoading: isStatsLoading } = useChildActivityStats(selectedChild?.id, period);

  // Configuration des statuts pour le pie chart
  const statusConfig = useMemo(() => ({
    colors: {
      blocked: '#f87171',
      completed: '#60a5fa',
      in_progress: '#fbbf24',
      not_started: '#a3a3a3'
    },
    labels: {
      blocked: t('modules.status.blocked'),
      completed: t('modules.status.completed'),
      in_progress: t('modules.status.in_progress'),
      not_started: t('modules.status.not_started')
    }
  }), [t]);

  const pieData: StatusPieData[] = useMemo(() => {
    if (!gamesStats?.data?.byStatus) return [];
    
    return Object.entries(gamesStats.data.byStatus).map(([name, value]) => ({
      name,
      value: Number(value),
      color: statusConfig.colors[name as keyof typeof statusConfig.colors] || '#ccc',
      label: statusConfig.labels[name as keyof typeof statusConfig.labels] || name
    }));
  }, [gamesStats?.data?.byStatus, statusConfig]);

  // Utilitaire pour formater les durées
  const formatDuration = useCallback((seconds?: number | string) => {
    if (!seconds || isNaN(Number(seconds))) return '-';
    const s = Number(seconds);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return [
      h > 0 ? `${h} h` : null,
      m > 0 ? `${m} m` : null,
      sec > 0 || (h === 0 && m === 0) ? `${sec} s` : null
    ].filter(Boolean).join(' ');
  }, []);

  if (!selectedChild) {
    return (
      <div className="text-center py-8">
        <Typography className="text-white" label="Aucun enfant sélectionné">
          Aucun enfant connecté
        </Typography>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête avec informations de l'enfant */}
      <Card className="bg-meko-blue-darker">
        <CardContent className="p-6">
          <div className="flex sm:flex-row flex-col items-center gap-4">
            <UserAvatar
              avatarUrl={selectedChild.avatarUrl}
              size={80}
              username={selectedChild.firstname}
              alt={`Avatar de ${selectedChild.firstname}`}
            />
            <div className="flex-1">
              <Typography 
                as="h2" 
                className="text-2xl font-bold text-white"
                label={`Tableau de bord de ${selectedChild.firstname}`}
              >
                {selectedChild.firstname}
              </Typography>
              <Typography 
                className="text-meko-blue-light-1"
                label="Profil enfant connecté"
              >
                Profil connecté
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-[#000F4799] p-4">
          <Typography 
            as="span" 
            styleCase="uppercase" 
            color="secondary" 
            weight="bold"
            className="text-xs"
            label="Nombre de jeux terminés"
          >
            {t('monitoring.children.progress.gamesCompleted')}
          </Typography>
          <Typography 
            as="span" 
            color="default" 
            weight="bold" 
            className="block text-2xl"
          >
            {progressSummary?.data?.gamesCompleted ?? '-'}
          </Typography>
        </Card>

        <Card className="bg-[#000F4799] p-4">
          <Typography 
            as="span" 
            styleCase="uppercase" 
            color="secondary" 
            weight="bold"
            className="text-xs"
            label="Nombre de jeux en cours"
          >
            {t('monitoring.children.progress.gamesInProgress')}
          </Typography>
          <Typography 
            as="span" 
            color="default" 
            weight="bold" 
            className="block text-2xl"
          >
            {progressSummary?.data?.gamesInProgress ?? '-'}
          </Typography>
        </Card>

        <Card className="bg-[#000F4799] p-4">
          <Typography 
            as="span" 
            styleCase="uppercase" 
            color="secondary" 
            weight="bold"
            className="text-xs"
            label="Pourcentage de progression"
          >
            {t('monitoring.children.progress.progressPercent')}
          </Typography>
          <Typography 
            as="span" 
            color="default" 
            weight="bold" 
            className="block text-2xl"
          >
            {progressSummary?.data?.progressPercent != null 
              ? `${progressSummary.data.progressPercent}%` 
              : '-'
            }
          </Typography>
        </Card>

        <Card className="bg-[#000F4799] p-4">
          <Typography 
            as="span" 
            styleCase="uppercase" 
            color="secondary" 
            weight="bold"
            className="text-xs"
            label="Temps total de jeu"
          >
            {t('monitoring.children.progress.totalTimeSpent')}
          </Typography>
          <Typography 
            as="span" 
            color="default" 
            weight="bold" 
            className="block text-lg"
          >
            {progressSummary?.data?.totalTimeSpent != null 
              ? formatDuration(progressSummary.data.totalTimeSpent)
              : '-'
            }
          </Typography>
        </Card>
      </div>

      {/* Dernière activité et progression */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dernière activité */}
        <Card className="bg-meko-blue-darker">
          <CardTitle
            title="Dernière activité"
            className="flex justify-between items-center text-sm"
            titleColor="default"
          />
          <CardContent className="flex flex-col justify-center">
            {lastActivityData?.data ? (
              <LastActivitySummary
                lastActivity={lastActivityData.data}
                showActions={false}
              />
            ) : (
              <Typography 
                className="text-white text-center py-8"
                label="Aucune activité récente"
              >
                {t('monitoring.children.lastActivity.none')}
              </Typography>
            )}
          </CardContent>
        </Card>

        {/* Graphique de progression */}
        <Card className="bg-[#0040B6]">
          <CardTitle
            title="Répartition des jeux"
            className="flex justify-between items-center text-sm"
            titleColor="default"
          />
          <CardContent className="flex flex-col justify-center">
            <StatusPieChart data={pieData} showPercentLabels={true} />
          </CardContent>
        </Card>
      </div>

      {/* Statistiques détaillées sur la période */}
      {onPeriodChange && (
        <Card className="bg-[#000F4799] p-6">
          <div className="flex justify-between items-center mb-4">
            <Typography 
              as="h3" 
              className="text-lg font-bold"
              label="Statistiques détaillées"
            >
              Statistiques ({period})
            </Typography>
            
            <div className="flex gap-2">
              {(['7d', '30d', '6m'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => onPeriodChange(p)}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    period === p 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                  }`}
                >
                  {p === '7d' ? '7 jours' : p === '30d' ? '30 jours' : '6 mois'}
                </button>
              ))}
            </div>
          </div>

          {isStatsLoading ? (
            <div className="flex justify-center items-center py-8">
              <LoadingSpinner size={32} />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <Typography className="text-2xl font-bold text-white">
                  {activityStats?.gamesPlayed ?? '-'}
                </Typography>
                <Typography className="text-xs text-gray-400 uppercase">
                  Jeux joués
                </Typography>
              </div>
              
              <div className="text-center">
                <Typography className="text-2xl font-bold text-white">
                  {activityStats?.successRate != null ? `${activityStats.successRate}%` : '-'}
                </Typography>
                <Typography className="text-xs text-gray-400 uppercase">
                  Taux de réussite
                </Typography>
              </div>
              
              <div className="text-center">
                <Typography className="text-2xl font-bold text-white">
                  {activityStats?.sessionsCount ?? '-'}
                </Typography>
                <Typography className="text-xs text-gray-400 uppercase">
                  Sessions
                </Typography>
              </div>
              
              <div className="text-center">
                <Typography className="text-lg font-bold text-white">
                  {activityStats ? formatDuration(activityStats.avgTimePerDay) : '-'}
                </Typography>
                <Typography className="text-xs text-gray-400 uppercase">
                  Temps/jour
                </Typography>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
