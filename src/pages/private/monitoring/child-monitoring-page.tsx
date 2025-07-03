import { Children, useChildren } from "@/app/children";
import { useChildrenStore } from "@/app/children/store";
import { useSession as useChildrenSession } from '@/services/session/store';
import { Card, CardContent, CardTitle, Typography } from "@/components";
import UserAvatar from "@/components/atoms/view/user-avatar";
import { useEffect, useMemo } from "react";
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
import { CircularProgress } from '@/components/atoms/view/circular-progress';
import { useGamesStats } from '@/app/children/hooks/use-games-stats';
import { useTranslation } from 'react-i18next';
import StatusPieChart, { StatusPieData } from '@/components/atoms/view/progress-pie-chart';
import ChildStatsSection from '@/app/children/components/child-stats-section';


function ChildMonitoringPage() {
  const { data: avatars, invalidate } = useChildren();
  const { selectedChild } = useChildrenSession();
  const currentChild = useChildrenStore(state => state.currentChild);
  const clearCurrentChild = useChildrenStore((state) => state.clearCurrentChild);
  const { switchCurrentChild } = useChildMonitoringSwitch();

  const handleCloseEdit = () => {
    clearCurrentChild();
    invalidate();
  };

  const formatted = useMemo(() => {
    const data = avatars?.data ? avatars.data : [];
    return data.map((v) => ({
      ...v,
      avatarUrl: v.avatarUrl ? v.avatarUrl : ''
    }));
  }, [avatars?.data]);

  useEffect(() => {
    if (formatted.length > 0) {
      if (currentChild) {
        // Mettre à jour l'enfant actuel s'il existe déjà
        const updatedChild = formatted.find(child => child.id === currentChild.id);
        if (updatedChild) {
          switchCurrentChild(updatedChild);
        }
      } else {
        // Par défaut, sélectionner l'enfant de la session, sinon le premier
        const defaultChild = selectedChild
          ? formatted.find(child => child.id === selectedChild.id) || formatted[0]
          : formatted[0];
        switchCurrentChild(defaultChild);
      }
    }
  }, [formatted, currentChild, selectedChild, switchCurrentChild]);

  const { data: lastActivityData } = useLastActivity(currentChild?.id || '');
  const { data: progressSummary } = useProgressSummary(currentChild?.id);
  const { data: gamesStats } = useGamesStats(currentChild?.id);
  const { t } = useTranslation();

  // Mapping des statuts pour le pie chart
  const statusColors = {
    blocked: '#f87171',
    completed: '#60a5fa',
    in_progress: '#fbbf24',
    not_started: '#a3a3a3'
  };
  const statusLabels = {
    blocked: t('modules.status.blocked', 'Bloqué'),
    completed: t('modules.status.completed', 'Terminé'),
    in_progress: t('modules.status.in_progress', 'En cours'),
    not_started: t('modules.status.not_started', 'Non commencé')
  };
  const pieData: StatusPieData[] = gamesStats?.data?.byStatus
    ? Object.entries(gamesStats.data.byStatus).map(([name, value]) => ({
      name,
      value: Number(value),
      color: statusColors[name as keyof typeof statusColors] || '#ccc',
      label: statusLabels[name as keyof typeof statusLabels] || name
    }))
    : [];

  return <div className="min-h-screen text-white p-4 md:p-8">
    <div className="flex flex-col md:flex-row gap-6">
      <aside className="w-20 md:w-32 flex flex-col items-center gap-4 ">
        <div className="child-item-wrapper flex flex-col items-center justify-center">
          {formatted.map((children: Children, index: number) => (
            <div key={children.id} className="mb-5  flex flex-col items-center justify-center">
              <div onClick={() => switchCurrentChild(children)} className={`shadow-lg rounded-full w-[50px] overflow-hidden cursor-pointer ${children.id == currentChild?.id ? 'border-2 border-white' : ''}`}>
                <UserAvatar avatarUrl={children.avatarUrl} size={50} username={`${children.firstname} ${children.lastname}`} alt={`Avatar ${index + 1}`} />
              </div>
              <div className="text-center max-w-[70px]">
                <Typography
                  as="span"
                  styleCase={"uppercase"}
                  weight={"bold"}
                  color={"secondary"}
                  className="text-sm truncate block"
                  title={children.firstname}
                >
                  {truncateText(children.firstname, 12)}
                </Typography>
              </div>
            </div>
          ))}



          <div className="flex flex-col items-center">
            <CreateChild />
            <div className="account-label text-center">
              <Typography as="span" styleCase={"uppercase"} weight={"bold"} color={"secondary"} className="text-sm">
                Ajouter
              </Typography>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1">
        {currentChild && (
          <Card className="text-white px-8 py-4 flex" style={{ boxShadow: "rgb(255 255 255 / 19%) 0px -1px 1px" }}>
            <div className="flex items-center space-x-4 flex-1">
              {currentChild && (
                <UserAvatar avatarUrl={currentChild?.avatarUrl} size={100} username={currentChild.firstname} alt={`Avatar`} />
              )}

              <div className="space-y-2 flex-1 px-4">
                <div className="w-full">
                  <Typography as="span" className="block text-sm" color={"secondary"} styleCase={"uppercase"} weight={"bold"}>
                    Prénom
                  </Typography>
                  <p className="bg-meko-blue-transparent-2 rounded-xl focus:border-meko-blue-light-1 focus:border-2 outline-none py-2 px-5">
                    {currentChild?.firstname || ''}
                  </p>
                </div>
                <div className="w-full">
                  <Typography as="span" className="block text-sm" color={"secondary"} styleCase={"uppercase"} weight={"bold"}>
                    Date de naissance
                  </Typography>
                  <p className="bg-meko-blue-transparent-2 rounded-xl focus:border-meko-blue-light-1 focus:border-2 outline-none py-2 px-5">
                    {currentChild?.birthday
                      ? format(new Date(currentChild.birthday), 'dd MMMM yyyy', { locale: fr })
                      : ''}
                  </p>
                </div>
              </div>

            </div>

            <div className="flex items-center space-x-2">
              {currentChild && (
                <EditChild
                  key={currentChild.id}
                  childToEdit={currentChild}
                  setChildToEdit={switchCurrentChild}
                  onClose={handleCloseEdit}
                />
              )}
              <DeleteChildDialog
                childId={currentChild?.id || ''}
              />
            </div>
          </Card>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <Card className="bg-[#000F4799] p-4">
            <Typography as="span" styleCase={"uppercase"} color={"secondary"} weight={"bold"}>
              {t('monitoring.children.progress.gamesCompleted')}
            </Typography>
            <Typography as="span" color={"default"} weight={"bold"} className="block text-[20px]">
              {progressSummary?.data?.gamesCompleted ?? '-'}
            </Typography>
          </Card>
          <Card className="bg-[#000F4799] p-4">
            <Typography as="span" styleCase={"uppercase"} color={"secondary"} weight={"bold"}>
              {t('monitoring.children.progress.gamesInProgress')}
            </Typography>
            <Typography as="span" color={"default"} weight={"bold"} className="block text-[20px]">
              {progressSummary?.data?.gamesInProgress ?? '-'}
            </Typography>
          </Card>
          <Card className="bg-[#000F4799] p-4 flex flex-col items-center justify-center">
            <Typography as="span" styleCase={"uppercase"} color={"secondary"} weight={"bold"}>
              {t('monitoring.children.progress.progressPercent')}
            </Typography>
            <div className="flex items-center justify-center mt-2">
              {progressSummary?.data?.progressPercent != null ? `${progressSummary.data.progressPercent}%` : '-'}
            </div>
          </Card>
          <Card className="bg-[#000F4799] p-4">
            <Typography as="span" styleCase={"uppercase"} color={"secondary"} weight={"bold"}>
              {t('monitoring.children.progress.totalTimeSpent')}
            </Typography>
            <div className="flex items-center justify-center mt-2">
              {progressSummary?.data?.totalTimeSpent != null ? `${progressSummary.data.totalTimeSpent} min` : '-'}

            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Card className="w-full bg-meko-blue-darker transition-all duration-300">
            <CardTitle
              title={"Dernière activité"}
              className="flex  justify-between items-center text-sm"
              titleColor={"default"}
            />
            <CardContent className="flex flex-col justify-center">
              {lastActivityData?.data ? (
                <LastActivitySummary
                  lastActivity={lastActivityData.data}
                  showActions={true}
                />
              ) : (
                <Typography className="text-white text-center py-8">Aucune activité récente</Typography>
              )}
            </CardContent>
          </Card>
          <Card className="w-full bg-[#0040B6] transition-all duration-300">
            <CardTitle
              title={"Taux de progression"}
              className="flex  justify-between items-center text-sm"
              titleColor={"default"}
            />

            <CardContent className="flex flex-col justify-center">

              <StatusPieChart data={pieData} />
            </CardContent>

          </Card>


        </div>

        <Card className="bg-[#000F4799] p-4 mt-4">
          <ChildStatsSection />
        </Card>

        <Card className="w-full bg-[#0040B6] transition-all duration-300 mt-4">
          <CardTitle
            title={"Progression par module"}
            className="flex  justify-between items-center text-sm"
            titleColor={"default"}
          />
          <CardContent className="flex flex-col justify-center">
            {/* ...contenu progression par module... */}
          </CardContent>
        </Card>


      </main>
    </div>
  </div>;
}

export { ChildMonitoringPage };
