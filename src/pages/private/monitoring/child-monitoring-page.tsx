import { Children, useChildren } from "@/app/children";
import { useChildrenStore } from "@/app/children/store";
import { useSession as useChildrenSession } from '@/services/session/store';
import { Card, CardContent, CardTitle, Typography } from "@/components";
import UserAvatar from "@/components/atoms/view/user-avatar";
import { useCallback, useEffect, useMemo, useState } from "react";
import CreateChild from "./components/create-child";
import EditChild from "./components/edit-child";
import { DeleteChildDialog } from "@/app/children/components";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { truncateText } from "@/utils/text";
import { useChildMonitoringSwitch } from "./hooks/use-child-monitoring-switch";
import { useLastActivity } from '@/app/game-sessions';
import { LastActivitySummary } from '@/app/game-sessions/components/last-activity-summary';
import { useProgressSummary } from '@/app/children/hooks/use-progress-summary';
import { useGamesStats } from '@/app/children/hooks/use-games-stats';
import { useTranslation } from 'react-i18next';
import StatusPieChart, { StatusPieData } from '@/components/atoms/view/progress-pie-chart';
import ChildStatsSection from '@/app/children/components/child-stats-section';
import { useChildActivityStats } from '@/app/children/hooks/use-child-activity-stats';
import { LoadingSpinner } from '@/components/atoms/loading-spinner';
import ModuleProgressTable from '@/app/children/components/module-progress-table';
import { useModules } from '@/app/modules/hooks/use-modules';


function ChildMonitoringPage() {
  const { data: avatars, invalidate } = useChildren();
  const { selectedChild } = useChildrenSession();
  const currentChild = useChildrenStore(state => state.currentChild);
  const clearCurrentChild = useChildrenStore((state) => state.clearCurrentChild);
  const { switchCurrentChild } = useChildMonitoringSwitch();
  const [period, setPeriod] = useState<'7d' | '30d' | '6m'>('7d');
  const { data: activityStats, isLoading: isStatsLoading } = useChildActivityStats(currentChild?.id, period);
  const { data: modulesData, isLoading: isModulesLoading } = useModules(currentChild?.id || '');
  const { t } = useTranslation();

  const handleChildSwitch = useCallback((child: Children) => {
    // Éviter les changements inutiles si c'est déjà l'enfant sélectionné
    if (currentChild?.id !== child.id) {
      switchCurrentChild(child);
    }
  }, [currentChild?.id, switchCurrentChild]);

  const handleCloseEdit = useCallback(() => {
    clearCurrentChild();
    invalidate();
  }, [clearCurrentChild, invalidate]);

  const formatted = useMemo(() => {
    const data = avatars?.data ? avatars.data : [];
    return data.map((v) => ({
      ...v,
      avatarUrl: v.avatarUrl ? v.avatarUrl : ''
    }));
  }, [avatars?.data]);

  useEffect(() => {
    if (formatted.length > 0) {
      // Éviter les re-renders inutiles en vérifiant si l'enfant courant existe déjà dans la liste
      const currentChildExists = currentChild && formatted.some(child => child.id === currentChild.id);
      
      if (!currentChildExists) {
        // Sélectionner l'enfant de la session, sinon le premier disponible
        const targetChild = selectedChild 
          ? formatted.find(child => child.id === selectedChild.id) 
          : null;
        
        const defaultChild = targetChild || formatted[0];
        
        if (defaultChild && defaultChild.id !== currentChild?.id) {
          switchCurrentChild(defaultChild);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formatted.length, currentChild?.id, selectedChild?.id]);

  const { data: lastActivityData } = useLastActivity(currentChild?.id || '');
  const { data: progressSummary } = useProgressSummary(currentChild?.id);
  const { data: gamesStats } = useGamesStats(currentChild?.id);

  // Mapping des statuts pour le pie chart - Mémorisé pour éviter les re-renders
  const statusConfig = useMemo(() => ({
    colors: {
      blocked: '#f87171',
      completed: '#60a5fa',
      in_progress: '#fbbf24',
      not_started: '#a3a3a3'
    },
    labels: {
      blocked: t('modules.status.blocked', 'Bloqué'),
      completed: t('modules.status.completed', 'Terminé'),
      in_progress: t('modules.status.in_progress', 'En cours'),
      not_started: t('modules.status.not_started', 'Non commencé')
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

  const handlePeriodChange = useCallback((p: string) => {
    if (p === '7d' || p === '30d' || p === '6m') setPeriod(p);
  }, []);

  // Utilitaire pour formater les durées en secondes en format humain (ex: 1h 12m 5s)
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

  return <div className="min-h-screen text-white p-4 md:p-8">
    <div className="flex flex-col md:flex-row gap-6">
      <aside className="w-20 md:w-32 flex flex-col items-center gap-4">
        <div className="child-item-wrapper flex flex-col items-center justify-center">
          {formatted.map((children: Children, index: number) => (
            <div key={`child-${children.id}`} className="mb-5 flex flex-col items-center justify-center">
              <div
                onClick={() => handleChildSwitch(children)}
                className={`shadow-lg rounded-full w-[50px] overflow-hidden cursor-pointer ${children.id === currentChild?.id ? 'border-2 border-white' : ''
                  }`}
              >
                <UserAvatar
                  key={`avatar-${children.id}`}
                  avatarUrl={children.avatarUrl}
                  size={50}
                  username={`${children.firstname} ${children.lastname}`}
                  alt={`Avatar ${index + 1}`}
                />
              </div>
              <div className="text-center max-w-[70px]">
                <Typography
                  as="span"
                  styleCase={"uppercase"}
                  weight={"bold"}
                  color={"secondary"}
                  className="text-sm truncate block"
                  title={children.firstname}
                  label={`Sélectionner ${children.firstname}`}
                >
                  {truncateText(children.firstname, 12)}
                </Typography>
              </div>
            </div>
          ))}

          <div className="flex flex-col items-center">
            <CreateChild />
            <div className="account-label text-center">
              <Typography
                as="span"
                styleCase={"uppercase"}
                weight={"bold"}
                color={"secondary"}
                className="text-sm"
                label="Ajouter un enfant"
              >
                Ajouter
              </Typography>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1">
        {!currentChild ? (
          <div className="text-center py-8">
            <Typography className="text-white" label="Message de sélection d'enfant">
              Sélectionnez un enfant pour voir ses statistiques
            </Typography>
          </div>
        ) : (
          <>
            <Card className="text-white px-8 py-4 flex" style={{ boxShadow: "rgb(255 255 255 / 19%) 0px -1px 1px" }}>
              <div className="flex items-center space-x-4 flex-1">
                <UserAvatar
                  key={`main-avatar-${currentChild.id}`}
                  avatarUrl={currentChild.avatarUrl}
                  size={100}
                  username={currentChild.firstname}
                  alt={`Avatar de ${currentChild.firstname}`}
                />

                <div className="space-y-2 flex-1 px-4">
                  <div className="w-full">
                    <Typography
                      as="span"
                      className="block text-sm"
                      color={"secondary"}
                      styleCase={"uppercase"}
                      weight={"bold"}
                      label="Prénom de l'enfant"
                    >
                      Prénom
                    </Typography>
                    <p className="bg-meko-blue-transparent-2 rounded-xl focus:border-meko-blue-light-1 focus:border-2 outline-none py-2 px-5">
                      {currentChild.firstname || ''}
                    </p>
                  </div>
                  <div className="w-full">
                    <Typography
                      as="span"
                      className="block text-sm"
                      color={"secondary"}
                      styleCase={"uppercase"}
                      weight={"bold"}
                      label="Date de naissance de l'enfant"
                    >
                      Date de naissance
                    </Typography>
                    <p className="bg-meko-blue-transparent-2 rounded-xl focus:border-meko-blue-light-1 focus:border-2 outline-none py-2 px-5">
                      {currentChild.birthday
                        ? format(new Date(currentChild.birthday), 'dd MMMM yyyy', { locale: fr })
                        : ''}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <EditChild
                  key={currentChild.id}
                  childToEdit={currentChild}
                  setChildToEdit={switchCurrentChild}
                  onClose={handleCloseEdit}
                />
                <DeleteChildDialog
                  childId={currentChild.id}
                />
              </div>

            </Card>
          </>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <Card className="bg-[#000F4799] p-4">
            <Typography
              as="span"
              styleCase={"uppercase"}
              color={"secondary"}
              weight={"bold"}
              label="Nombre de jeux terminés"
            >
              {t('monitoring.children.progress.gamesCompleted')}
            </Typography>
            <Typography
              as="span"
              color={"default"}
              weight={"bold"}
              className="block text-[20px]"
              label={`${progressSummary?.data?.gamesCompleted || 0} jeux terminés`}
            >
              {progressSummary?.data?.gamesCompleted ?? '-'}
            </Typography>
          </Card>
          <Card className="bg-[#000F4799] p-4">
            <Typography
              as="span"
              styleCase={"uppercase"}
              color={"secondary"}
              weight={"bold"}
              label="Nombre de jeux en cours"
            >
              {t('monitoring.children.progress.gamesInProgress')}
            </Typography>
            <Typography
              as="span"
              color={"default"}
              weight={"bold"}
              className="block text-[20px]"
              label={`${progressSummary?.data?.gamesInProgress || 0} jeux en cours`}
            >
              {progressSummary?.data?.gamesInProgress ?? '-'}
            </Typography>
          </Card>
          <Card className="bg-[#000F4799] p-4 flex flex-col items-center justify-center">
            <Typography
              as="span"
              styleCase={"uppercase"}
              color={"secondary"}
              weight={"bold"}
              label="Pourcentage de progression global"
            >
              {t('monitoring.children.progress.progressPercent')}
            </Typography>
            <Typography
              as="span"
              color={"default"}
              weight={"bold"}
              className="block text-[20px]"
              label={`${progressSummary?.data?.progressPercent || 0}% de progression`}
            >
              {progressSummary?.data?.progressPercent != null ? `${progressSummary.data.progressPercent}%` : '-'}
            </Typography>
          </Card>
          <Card className="bg-[#000F4799] p-4">
            <Typography
              as="span"
              styleCase={"uppercase"}
              color={"secondary"}
              weight={"bold"}
              label="Temps total passé à jouer"
            >
              {t('monitoring.children.progress.totalTimeSpent')}
            </Typography>
            <Typography
              as="span"
              color={"default"}
              weight={"bold"}
              className="block text-[20px]"
              label={`Temps total: ${formatDuration(progressSummary?.data?.totalTimeSpent)}`}
            >
              {progressSummary?.data?.totalTimeSpent != null ? `${formatDuration(progressSummary.data.totalTimeSpent)}` : '-'}
            </Typography>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Card className="w-full bg-meko-blue-darker transition-all duration-300">
            <CardTitle
              title={"Dernière activité"}
              className="flex justify-between items-center text-sm"
              titleColor={"default"}
            />
            <CardContent className="flex flex-col items-center justify-center">
              {lastActivityData?.data ? (
                <LastActivitySummary
                  lastActivity={lastActivityData.data}
                  showActions={true}
                />
              ) : (
                <Typography
                  className="text-white text-center py-8"
                  label="Aucune activité récente trouvée"
                >
                  {t('monitoring.children.lastActivity.none', 'Aucune activité récente')}
                </Typography>
              )}
            </CardContent>
          </Card>
          <Card className="w-full bg-[#0040B6] transition-all duration-300">
            <CardTitle
              title={"Taux de progression"}
              className="flex justify-between items-center text-sm"
              titleColor={"default"}
            />
            <CardContent className="flex flex-col justify-center">
              <StatusPieChart data={pieData} showPercentLabels={true} />
            </CardContent>
          </Card>
        </div>

        <Card className="bg-[#000F4799] p-4 mt-4">
          {isStatsLoading ? (
            <div className="flex justify-center items-center py-8">
              <LoadingSpinner size={32} />
            </div>
          ) : (
            <ChildStatsSection
              period={period}
              onPeriodChange={handlePeriodChange}
              topStats={[
                { label: 'Modules terminés', value: activityStats ? String(activityStats.completedModules) : '-' },
                { label: 'Leçons complétées', value: activityStats ? String(activityStats.completedLessons) : '-' },
                { label: 'Réussite aux jeux', value: activityStats ? `${activityStats.successRate ?? '-'}%` : '-' },
                { label: 'Jeux joués', value: activityStats ? String(activityStats.gamesPlayed) : '-' },
              ]}
              bottomStats={[
                { label: 'Temps de jeu (moy/jour)', value: activityStats ? formatDuration(activityStats.avgTimePerDay) : '-' },
                { label: 'Nb. sessions', value: activityStats ? String(activityStats.sessionsCount) : '-' },
                { label: 'Durée moyenne session', value: activityStats ? formatDuration(activityStats.avgSessionDuration) : '-' },
                { label: '', value: '' },
              ]}
            />
          )}
        </Card>

        <Card className="w-full bg-[#0040B6] transition-all duration-300 mt-4">
          <CardTitle
            title={t('monitoring.children.progress.modules', 'Progression par module')}
            className="flex justify-between items-center text-sm"
            titleColor={"default"}
          />
          <CardContent className="flex flex-col justify-center">
            {isModulesLoading ? (
              <div className="flex justify-center items-center py-8">
                <LoadingSpinner size={32} />
              </div>
            ) : (
              <ModuleProgressTable
                modules={
                  modulesData?.modules?.map((mod) => ({
                    name: mod.name,
                    coverUrl: mod.coverUrl,
                    availableGames: mod.availableGames,
                    inProgressGames: mod.inProgressGames ?? 0,
                    completedGames: mod.completedGames,
                    progressPercentage: mod.progressPercentage,
                  })) || []
                }
              />
            )}
          </CardContent>
        </Card>

      </main>
    </div>
  </div>;
}

export { ChildMonitoringPage };
