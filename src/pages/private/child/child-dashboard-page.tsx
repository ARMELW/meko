import { Card, CardContent, CardTitle, Typography } from "@/components";
import { useSession as useChildrenSession } from '@/services/session/store';
import { useProgressSummary } from '@/app/children/hooks/use-progress-summary';
import { useLastActivity } from '@/app/game-sessions';
import { useModules } from '@/app/modules/hooks/use-modules';
import { useTranslation } from 'react-i18next';
import { useState, useCallback } from 'react';
import UserAvatar from '@/components/atoms/view/user-avatar';
import { LastActivitySummary } from '@/app/game-sessions/components/last-activity-summary';
import { LoadingSpinner } from '@/components/atoms/loading-spinner';
import { ChildStatsSection } from '@/app/children/components';
import StatusPieChart from '@/components/atoms/view/progress-pie-chart';
import ModuleProgressTable from '@/app/children/components/module-progress-table';
import { SubscriptionRequiredGuard } from "@/routes/components/subscription-required-guard";

function ChildDashboardPage() {
    const { t } = useTranslation();
    const { selectedChild } = useChildrenSession();
    const [period, setPeriod] = useState<'7d' | '30d' | '6m'>('7d');

    const { data: progressSummary } = useProgressSummary(selectedChild?.id);
    const { data: lastActivityData } = useLastActivity(selectedChild?.id || '');
    const { data: modulesData, isLoading: isModulesLoading } = useModules(selectedChild?.id || '');

    const handlePeriodChange = useCallback((p: string) => {
        if (p === '7d' || p === '30d' || p === '6m') setPeriod(p);
    }, []);

    const formatDuration = useCallback((seconds?: number | string) => {
        if (!seconds || isNaN(Number(seconds))) return '-';
        const s = Number(seconds);
        const h = Math.floor(s / 3600);
        const m = Math.floor((s % 3600) / 60);
        return h > 0 ? `${h}h ${m}m` : `${m}m`;
    }, []);

    if (!selectedChild) {
        return (
            <div className="min-h-screen text-white p-4 md:p-8">
                <div className="text-center py-8">
                    <Typography className="text-white" label={t('childDashboard.noChildTitle', 'Aucun enfant sélectionné')}>
                        {t('childDashboard.noChildConnected', 'Aucun enfant connecté')}
                    </Typography>
                </div>
            </div>
        );
    }

    return (

        <SubscriptionRequiredGuard>
            <div className="min-h-screen text-white p-4 md:p-8">

                <div className="max-w-6xl mx-auto">
                    <Card className="text-white px-8 py-4 flex mb-6" style={{ boxShadow: "rgb(255 255 255 / 19%) 0px -1px 1px" }}>
                        <div className="flex items-center space-x-4 flex-1">
                            <UserAvatar
                                key={`child-avatar-${selectedChild.id}`}
                                avatarUrl={selectedChild.avatarUrl}
                                size={100}
                                username={selectedChild.firstname}
                                alt={`Avatar de ${selectedChild.firstname}`}
                            />
                            <div className="space-y-2 flex-1 px-4">
                                <div className="w-full">
                                    <Typography
                                        as="h1"
                                        className="text-2xl font-bold mb-2"
                                        label={t('childDashboard.title', { name: selectedChild.firstname, defaultValue: `Tableau de bord de ${selectedChild.firstname}` })}
                                    >
                                        {t('childDashboard.greeting', { name: selectedChild.firstname, defaultValue: `Bonjour ${selectedChild.firstname} ! 👋` })}
                                    </Typography>
                                    <Typography
                                        as="p"
                                        className="text-meko-blue-light-1"
                                        label={t('childDashboard.welcome', 'Message d\'accueil')}
                                    >
                                        {t('childDashboard.welcome', 'Voici ton tableau de bord personnel')}
                                    </Typography>
                                </div>
                            </div>
                        </div>

                    </Card>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <Card className="bg-[#000F4799] p-4">
                            <Typography
                                as="span"
                                styleCase={"uppercase"}
                                color={"secondary"}
                                weight={"bold"}
                                label={t('childDashboard.finishedGames', 'Nombre de jeux terminés')}
                            >
                                🏆 {t('childDashboard.finishedGames', 'Jeux terminés')}
                            </Typography>
                            <Typography
                                as="span"
                                color={"default"}
                                weight={"bold"}
                                className="block text-[24px]"
                                label={t('childDashboard.finishedGamesCount', { count: progressSummary?.data?.gamesCompleted || 0, defaultValue: '{{count}} jeux terminés' })}
                            >
                                {progressSummary?.data?.gamesCompleted ?? '0'}
                            </Typography>
                        </Card>
                        <Card className="bg-[#000F4799] p-4">
                            <Typography
                                as="span"
                                styleCase={"uppercase"}
                                color={"secondary"}
                                weight={"bold"}
                                label={t('childDashboard.inProgressGames', 'Nombre de jeux en cours')}
                            >
                                🎮 {t('childDashboard.inProgressGames', 'Jeux en cours')}
                            </Typography>
                            <Typography
                                as="span"
                                color={"default"}
                                weight={"bold"}
                                className="block text-[24px]"
                                label={t('childDashboard.inProgressGamesCount', { count: progressSummary?.data?.gamesInProgress || 0, defaultValue: '{{count}} jeux en cours' })}
                            >
                                {progressSummary?.data?.gamesInProgress ?? '0'}
                            </Typography>
                        </Card>
                        <Card className="bg-[#000F4799] p-4 flex flex-col items-center justify-center">
                            <Typography
                                as="span"
                                styleCase={"uppercase"}
                                color={"secondary"}
                                weight={"bold"}
                                label={t('childDashboard.progressPercent', 'Pourcentage de progression global')}
                            >
                                📊 {t('childDashboard.progress', 'Progression')}
                            </Typography>
                            <Typography
                                as="span"
                                color={"default"}
                                weight={"bold"}
                                className="block text-[24px]"
                                label={t('childDashboard.progressPercentLabel', { percent: progressSummary?.data?.progressPercent || 0, defaultValue: '{{percent}}% de progression' })}
                            >
                                {progressSummary?.data?.progressPercent != null ? `${progressSummary.data.progressPercent}%` : '0%'}
                            </Typography>
                        </Card>
                        <Card className="bg-[#000F4799] p-4">
                            <Typography
                                as="span"
                                styleCase={"uppercase"}
                                color={"secondary"}
                                weight={"bold"}
                                label={t('childDashboard.totalTimeSpent', 'Temps total passé à jouer')}
                            >
                                ⏱️ {t('childDashboard.totalTimeSpentShort', 'Temps de jeu')}
                            </Typography>
                            <Typography
                                as="span"
                                color={"default"}
                                weight={"bold"}
                                className="block text-[20px]"
                                label={t('childDashboard.totalTimeSpentLabel', { time: formatDuration(progressSummary?.data?.totalTimeSpent), defaultValue: 'Temps total: {{time}}' })}
                            >
                                {progressSummary?.data?.totalTimeSpent != null ? formatDuration(progressSummary.data.totalTimeSpent) : '0m'}
                            </Typography>
                        </Card>
                    </div>


                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <Card className="w-full bg-meko-blue-darker transition-all duration-300">
                            <div className="p-4 border-b border-meko-blue-transparent-1">
                                <Typography as="h3" weight="bold" color="default">
                                    🎯 {t('childDashboard.lastActivity', 'Dernière activité')}
                                </Typography>
                            </div>
                            <div className="p-4">
                                {lastActivityData?.data ? (
                                    <LastActivitySummary
                                        lastActivity={lastActivityData.data}
                                        showActions={true}
                                    />
                                ) : (
                                    <div className="text-center py-8">
                                        <Typography
                                            className="text-white"
                                            label={t('childDashboard.noRecentActivityLabel', 'Aucune activité récente trouvée')}
                                        >
                                            {t('childDashboard.noRecentActivity', 'Aucune activité récente')}
                                        </Typography>
                                        <Typography
                                            className="text-meko-blue-light-1 text-sm mt-2"
                                            label={t('childDashboard.encouragementLabel', 'Encouragement à jouer')}
                                        >
                                            {t('childDashboard.encouragement', 'Lance ton premier jeu pour commencer !')}
                                        </Typography>
                                    </div>
                                )}
                            </div>
                        </Card>

                        <Card className="bg-[#0040B6]">
                            <CardTitle
                                title={t('childDashboard.gamesDistribution', 'Répartition des jeux')}
                                className="flex justify-between items-center text-sm"
                                titleColor="default"
                            />
                            <CardContent className="flex flex-col justify-center">
                                {progressSummary?.data?.statusPie ? (
                                    <StatusPieChart
                                        data={Object.entries(progressSummary.data.statusPie).map(([name, value]) => ({
                                            name,
                                            value: Number(value),
                                            color: '',
                                            label: name
                                        }))}
                                        showPercentLabels={true}
                                    />
                                ) : (
                                    <Typography className="text-meko-blue-light-1 mt-2" label={t('childDashboard.noProgressDataLabel', 'Aucune donnée de progression')}>
                                        {t('childDashboard.noProgressData', 'Aucune donnée de progression')}
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    </div>



                    <div className="mb-8">
                        <Card className="bg-[#000F4799] p-6 flex flex-col items-center">
                            <ChildStatsSection
                                period={period}
                                onPeriodChange={handlePeriodChange}
                                topStats={[
                                    { label: t('monitoring.children.progress.gamesCompleted', 'Modules terminés'), value: progressSummary?.data?.gamesCompleted != null ? String(progressSummary.data.gamesCompleted) : '-' },
                                    { label: t('monitoring.children.progress.gamesInProgress', 'Jeux en cours'), value: progressSummary?.data?.gamesInProgress != null ? String(progressSummary.data.gamesInProgress) : '-' },
                                    { label: t('monitoring.children.progress.progressPercent', 'Progression'), value: progressSummary?.data?.progressPercent != null ? `${progressSummary.data.progressPercent}%` : '-' },
                                    { label: t('monitoring.children.progress.totalTimeSpent', 'Temps de jeu'), value: progressSummary?.data?.totalTimeSpent != null ? formatDuration(progressSummary.data.totalTimeSpent) : '-' },
                                ]}
                                bottomStats={[
                                    { label: t('monitoring.children.progress.totalSessions', 'Sessions totales'), value: progressSummary?.data?.totalSessions != null ? String(progressSummary.data.totalSessions) : '-' },
                                    { label: t('monitoring.children.progress.avgSessionDuration', 'Durée moyenne des sessions'), value: progressSummary?.data?.avgSessionDuration != null ? formatDuration(progressSummary.data.avgSessionDuration) : '-' },
                                ]}
                            />
                        </Card>
                    </div>

                    <div className="mb-8">
                        <Card className="flex flex-col ">
                            <CardTitle
                                title={t('monitoring.children.progress.modules', 'Progression par module')}
                                className="flex justify-between items-center text-sm"
                                titleColor="default"
                            />
                            <CardContent className="flex flex-col justify-center w-full">
                                {isModulesLoading ? (
                                    <div className="flex justify-center items-center py-8">
                                        <LoadingSpinner size={32} />
                                    </div>
                                ) : (
                                    <ModuleProgressTable
                                        expandable={false}
                                        modules={
                                            modulesData?.modules?.map((mod) => ({
                                                id: mod.id,
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
                    </div>
                </div>
            </div>


        </SubscriptionRequiredGuard>
    );
}

export { ChildDashboardPage };
