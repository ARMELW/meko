import { X } from 'lucide-react';
import { Card, CardContent, Typography } from '@/components';
import { LoadingButton } from '@/components/atoms/actions/loading-button';
import { useTranslation } from 'react-i18next';
import type { LastActivity } from '../types';

interface LastActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  lastActivity: LastActivity | null;
  onRelaunch?: () => void;
}

export function LastActivityModal({
  isOpen,
  onClose,
  lastActivity,
  onRelaunch
}: LastActivityModalProps) {
  const { t } = useTranslation();
  
  if (!isOpen) return null;

  // Debug: loguer les données reçues
  console.log('LastActivityModal - lastActivity:', lastActivity);

  const formatDuration = (minutes?: number) => {
    if (!minutes) return '';
    return `${minutes} ${t('games.session.modal.lastActivity.minutes')}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-blue-600">
        <CardContent className="p-6 text-white">
          <div className="flex items-center justify-between mb-6">
            <Typography as="h2" weight="bold" className="text-xl text-white uppercase">
              {t('games.session.modal.lastActivity.title')}
            </Typography>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {lastActivity ? (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="w-32 h-32 bg-orange-400 rounded-lg flex items-center justify-center">
                  {lastActivity.game.coverUrl ? (
                    <img
                      src={lastActivity.game.coverUrl}
                      alt={lastActivity.game.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-4xl">🎮</div>
                  )}
                </div>
              </div>

              <div className="text-center">
                <Typography className="text-2xl font-bold text-white uppercase mb-2">
                  {lastActivity.game.title}
                </Typography>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Typography className="text-cyan-300 font-semibold uppercase">
                    {t('games.session.modal.lastActivity.module')}
                  </Typography>
                  <Typography className="text-white">
                    {lastActivity.module.name}
                  </Typography>
                </div>

                <div className="flex justify-between">
                  <Typography className="text-cyan-300 font-semibold uppercase">
                    {t('games.session.modal.lastActivity.lesson')}
                  </Typography>
                  <Typography className="text-white">
                    {lastActivity.lesson.order}
                  </Typography>
                </div>

                <div className="flex justify-between">
                  <Typography className="text-cyan-300 font-semibold uppercase">
                    {t('games.session.modal.lastActivity.duration')}
                  </Typography>
                  <Typography className="text-white">
                    {formatDuration(lastActivity.totalTime)}
                  </Typography>
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <LoadingButton
                  onClick={onRelaunch}
                 >
                  {t('games.session.modal.lastActivity.relaunch')}
                </LoadingButton>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Typography className="text-white mb-4">
                {t('games.session.modal.lastActivity.noActivity')}
              </Typography>
              <LoadingButton
                onClick={onClose}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded"
              >
                {t('games.session.modal.actions.close')}
              </LoadingButton>
            </div>
          )}
         
        </CardContent>
      </Card>
    </div>
  );
}
