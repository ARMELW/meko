import { Card, CardContent, Typography } from "@/components";
import { useParams, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { useModuleDetail } from '@/app/modules/hooks/use-module-detail';
import { useSession as useChildrenSession } from '@/services/session/store';
import { LoadingDisplay, ErrorDisplay } from '@/app/modules/components/display-states';
import { LoadingButton } from "@/components/atoms/actions/loading-button";
import { GameSimulationModal } from '@/app/game-sessions/components/game-simulation-modal';
import { useState } from 'react';

function ModuleDetailPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { moduleId } = useParams<{ moduleId: string }>();
  const { selectedChild } = useChildrenSession();

  const [gameModalState, setGameModalState] = useState<{
    isOpen: boolean;
    gameId: string;
    gameTitle: string;
  }>({
    isOpen: false,
    gameId: '',
    gameTitle: ''
  });

  const { data: moduleDetail, isLoading, error } = useModuleDetail(
    selectedChild?.id || '',
    moduleId || ''
  );

  const handleGameClick = (gameId: string, gameTitle: string) => {
    setGameModalState({
      isOpen: true,
      gameId,
      gameTitle
    });
  };

  const handleCloseModal = () => {
    setGameModalState({
      isOpen: false,
      gameId: '',
      gameTitle: ''
    });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) return <LoadingDisplay message={t('modules.loading')} />;
  if (error) return <ErrorDisplay message={t('modules.error')} />;
  if (!moduleDetail) return <ErrorDisplay message={t('modules.detail.notFound')} />;

  const moduleStatus = moduleDetail.status;
  const isModuleNotStarted = moduleStatus === 'not_started';
  const isModuleBlocked = moduleStatus === 'blocked';

  const statusColors = {
    'not_started': 'bg-[#000F4799] text-white',
    'completed': 'bg-[#00AF42] text-white',
    'in_progress': 'bg-[#FF7F32] text-white',
    'blocked': 'bg-[#FF0000] text-white'
  };

  return (
    <div className="min-h-screen text-white sm:w-full lg:w-[70%] mx-auto">
      <div className="flex items-center space-x-4">
        <button
          onClick={handleGoBack}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('common.back')}</span>
        </button>
      </div>

      <div className="py-6 mb-8 flex flex-col md:flex-row gap-6">
        <div className="card-image-detail w-4/12">
          <Card style={{ boxShadow: "rgb(255 255 255 / 19%) 0px -1px 1px" }}>
            <CardContent className="p-2">
              <img
                src={moduleDetail.coverUrl}
                alt={moduleDetail.moduleName}
                className="w-full aspect-square object-cover rounded-xl"
              />
            </CardContent>
          </Card>


        </div>
        <div className="w-8/12 space-y-3">
          <Typography as="h3" shadow={null}>
            {moduleDetail.moduleName}
          </Typography>
          <Typography 
            as="span" 
            styleCase={"uppercase"} 
            className={`inline-block px-2 py-0.5 text-xs font-semibold ${statusColors[moduleStatus]}`}
          >
            {t(`modules.status.${moduleStatus}`)}
          </Typography>
          <p className="text-sm leading-relaxed">
            {moduleDetail.moduleDescription || t('modules.detail.description')}
          </p>

          <div className="flex gap-4 mt-2 bg-[#000F4726] justify-center py-3">
            <div className="flex-1 px-3 rounded text-center text-xs">
              <Typography as="span" className="block text-[30px]" weight={"bold"} shadow={"sm"} align="center" styleCase={"uppercase"}>
                {moduleDetail.totalLessons}
              </Typography>
              <Typography
                as="span"
                align="center"
                styleCase="uppercase"
                shadow="sm"
                weight="bold"
                color="secondary"
                className="text-[14px]"
              >
                {t('modules.detail.lessons')}
              </Typography>
            </div>

            <div className="flex-1 px-3 text-center text-xs border-x border-x-[#7EDAFD]">
              <Typography as="span" className="block text-[30px]" weight={"bold"} shadow={"sm"} align="center" styleCase={"uppercase"}>
                {moduleDetail.totalGames}
              </Typography>
              <Typography
                as="span"
                align="center"
                styleCase="uppercase"
                shadow="sm"
                weight="bold"
                color="secondary"
                className="text-[14px]"
              >
                {t('modules.detail.games')}
              </Typography>
            </div>

            <div className="flex-1 px-3 rounded text-center text-xs">
              <Typography as="span" className="block text-[30px]" weight={"bold"} shadow={"sm"} align="center" styleCase={"uppercase"}>
                {moduleDetail.completedGames}
              </Typography>
              <Typography
                as="span"
                align="center"
                styleCase="uppercase"
                shadow="sm"
                weight="bold"
                color="secondary"
                className="text-[14px]"
              >
                {t('modules.detail.completedCount')}
              </Typography>
            </div>
          </div>

        </div>
      </div>

      <div className="relative border-l-8 border-[#08488b] ml-6">
        {moduleDetail.lessons.map((lesson, lessonIndex) => {
          const isLessonBlocked = lesson.games.every(game => game.status === 'blocked');
          
          return (
            <div key={lesson.id} className="relative mb-10 pl-20">
              <div className={`absolute -left-12 w-24 top-0 ${isLessonBlocked ? 'text-[#0040B6]': 'text-white'} font-bold text-sm z-10 bg-[#08488b]`}>
                <div className="w-full relative px-2 py-1">
                  <div className={`absolute w-full top-[-6px] left-0 h-3 z-0 bg-[#08488b]`} style={{ transform: "skew(0deg, -5deg)" }}></div>
                  <div className="w-full relative z-10">
                    <Typography
                      as="span"
                      align="center"
                      styleCase="uppercase"
                      shadow="sm"
                      weight="bold"
                      className={`text-[12px] block ${isLessonBlocked ? 'opacity-50 text-[#0040B6]' : 'bg-gradient-to-r from-[#FA4616] to-[#FF7F32] bg-clip-text !text-transparent'}`}
                    >
                      {t('modules.detail.lesson')}
                    </Typography>
                    <Typography 
                      as="h1" 
                      className={`text-lg ${
                        isLessonBlocked 
                          ? 'text-[#0040B6] opacity-50' 
                          : 'bg-gradient-to-r from-[#FA4616] to-[#FF7F32] bg-clip-text !text-transparent'
                      }`} 
                      weight={"bold"} 
                      shadow={"sm"} 
                      align="center" 
                      styleCase={"uppercase"}
                    >
                      {lesson.order}
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="space-y-3">{lesson.games.map((game, gameIndex) => {
                const isFirstGame = lessonIndex === 0 && gameIndex === 0;
                
                return (
                  <LessonItem
                    key={game.id}
                    image={game.coverUrl}
                    title={game.title}
                    status={game.status}
                    onGameClick={() => handleGameClick(game.id, game.title)}
                    isFirstGame={isFirstGame}
                  />
                );
              })}
            </div>
          </div>
          );
        })}
      </div>

      <GameSimulationModal
        isOpen={gameModalState.isOpen}
        onClose={handleCloseModal}
        gameId={gameModalState.gameId}
        gameTitle={gameModalState.gameTitle}
        moduleId={moduleId}
      />
    </div>
  );
}

type LessonItemProps = {
  image: string;
  title: string;
  status: 'completed' | 'blocked' | 'in_progress' | 'available';
  onGameClick?: () => void;
  isFirstGame?: boolean;
};

function LessonItem({ image, title, status, onGameClick, isFirstGame = false }: LessonItemProps) {
  const { t } = useTranslation();
  
  const statusColor = {
    not_started: 'bg-[#000F4799] text-white',
    completed: 'bg-[#00AF42] text-white',
    blocked: 'bg-red-500 text-white',
    available: 'bg-[#000F4799] text-white',
    in_progress: 'bg-[#FF7F32] text-white'
  };

  const getStatusText = (status: 'completed' | 'blocked' | 'in_progress' | 'available') => {
    return t(`modules.detail.gameStatus.${status}`) as string;
  };

  // Le premier jeu n'est jamais bloqué, même si le module n'est pas commencé
  const isGameBlocked = isFirstGame ? false : (status === 'blocked');

  return (
    <Card style={{ boxShadow: "rgb(255 255 255 / 19%) 0px -1px 1px" }}>
      <CardContent className="p-2">
        <div className="flex items-center gap-4 pe-3">
          <img 
            src={image} 
            alt={title} 
            className={`w-[120px] h-[120px] object-cover rounded-xl ${
              isGameBlocked ? 'grayscale opacity-50' : ''
            }`} 
          />
          <div className="flex-1">
            <h3 className={`font-bold text-sm uppercase ${
              isGameBlocked ? 'text-gray-400' : 'text-white'
            }`}>
              {title}
            </h3>
            <span className={`inline-block ${statusColor[status]} px-2 py-0.5 rounded text-xs`}>
              {getStatusText(status)}
            </span>
          </div>

          <LoadingButton
            onClick={onGameClick} 
            disabled={isGameBlocked}
            className={isGameBlocked ? 'opacity-75 cursor-not-allowed relative' : ''}
          >
            {isGameBlocked && (
              <img 
                src="/assets/images/icons/lock.png" 
                alt="Locked" 
                className="absolute top-1 -right-4 w-12 h-12 z-10" 
              />
            )}
            <Typography as="span" styleCase={"uppercase"} shadow={"sm"} weight={"bold"}>
              {t('modules.detail.launch')}
            </Typography>
          </LoadingButton>
        </div>
      </CardContent>
    </Card>
  );
}

export { ModuleDetailPage };
