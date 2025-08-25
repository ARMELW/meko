import { useEffect } from 'react';
import { Card, CardContent, Typography } from '@/components';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@/components/atoms/actions/loading-button';

type LessonItemProps = {
  image: string;
  title: string;
  status: 'completed' | 'blocked' | 'in_progress' | 'available';
  onGameClick?: () => void;
  isFirstGame?: boolean;
  moduleTitle?: string;
  lessonOrder?: number;
  isHighlighted?: boolean;
  gameId: string;
};

export const LessonItem = ({ image, title, status, onGameClick, isFirstGame = false, moduleTitle, lessonOrder, isHighlighted = false, gameId }: LessonItemProps) => {
  const { t } = useTranslation();
  const statusColor: Record<string, string> = {
    not_started: 'bg-[#000F4799] text-white',
    completed: 'bg-[#00AF42] text-white',
    blocked: 'bg-red-500 text-white',
    available: 'bg-[#000F4799] text-white',
    in_progress: 'bg-[#FF7F32] text-white'
  };

  const getStatusText = (s: string) => {
    const statusKey =
      s === 'completed'
        ? 'modules.status.completed'
        : s === 'blocked'
        ? 'modules.status.blocked'
        : s === 'in_progress'
        ? 'modules.status.in_progress'
        : 'modules.status.not_started';
    return t(statusKey, s);
  };

  const isGameBlocked = isFirstGame ? false : (status === 'blocked');

  useEffect(() => {
    // When highlighted, focus the Launch button for keyboard users
    if (isHighlighted) {
      const el = document.getElementById(`game-${gameId}`)?.querySelector('button');
      if (el) (el as HTMLElement).focus();
    }
  }, [isHighlighted, gameId]);

  return (
    <Card id={`game-${gameId}`} className={`transition-all duration-300 ${isHighlighted ? 'ring-2 ring-yellow-400/40' : ''}`} style={{ boxShadow: "rgb(255 255 255 / 19%) 0px -1px 1px" }}>
      <CardContent className="p-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <img
            src={image}
            alt={title}
            className={`w-full sm:w-[120px] h-[180px] sm:h-[120px] object-cover rounded-xl ${isGameBlocked ? 'grayscale opacity-50' : ''}`}
          />

          <div className="flex-1">
            <h3 className={`font-bold text-sm uppercase ${isGameBlocked ? 'text-gray-400' : 'text-white'}`}>
              {title}
            </h3>
            <span className={`inline-block ${statusColor[status]} px-2 py-0.5 rounded text-xs mt-1`}>
              {getStatusText(status)}
            </span>
            <div className="flex flex-col mt-2">
              <div className="flex flex-row">
                <h3 className="text-meko-blue-light-3 text-sm">{t('modules.detail.moduleLabel', 'Module :')}</h3>
                {moduleTitle && (
                  <Typography as="p" className="text-white px-2 text-sm">{moduleTitle}</Typography>
                )}
              </div>
              <div className="flex flex-row">
                <h3 className="text-meko-blue-light-3 text-sm">{t('modules.detail.lessonLabel', 'Leçon :')}</h3>
                {lessonOrder && (
                  <Typography as="p" className="text-white px-2 text-sm">{lessonOrder}</Typography>
                )}
              </div>
            </div>
          </div>

          <div className="w-full sm:w-auto mt-3 sm:mt-0">
            <LoadingButton
              onClick={onGameClick}
              disabled={isGameBlocked}
              className={`${isGameBlocked ? 'opacity-75 cursor-not-allowed relative' : ''} w-full sm:w-auto`}
            >
              {isGameBlocked && (
                <img src="/assets/images/icons/lock.png" alt="Locked" className="absolute top-1 -right-4 w-12 h-12 z-10" />
              )}
              <Typography as="span" styleCase={"uppercase"} shadow={"sm"} weight={"bold"}>
                {t('modules.detail.launch', 'Lancer')}
              </Typography>
            </LoadingButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default LessonItem;
