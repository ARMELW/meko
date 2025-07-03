import { X } from 'lucide-react';
import { Card, CardContent, Typography } from '@/components';
import { LoadingButton } from '@/components/atoms/actions/loading-button';
import { useTranslation } from 'react-i18next';
import type { LastActivity } from '../types';
import { LastActivitySummary } from './last-activity-summary';

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



  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md bg-meko-blue-darker shadow-lg rounded-lg">
        <CardContent className=" p-0 text-white">
          <div className="bg-meko-blue-transparent-2 py-3 px-4 border-b border-meko-blue-transparent-1">

            <div className="flex items-center justify-between">
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
          </div>
          {lastActivity ? (
            <LastActivitySummary
              lastActivity={lastActivity}
              onRelaunch={onRelaunch}
              showActions={!!onRelaunch}
            />
          ) : (
            <div className="text-center py-8 flex flex-col items-center justify-center">
              <Typography className="text-white mb-4">
                {t('games.session.modal.lastActivity.noActivity')}
              </Typography>
              <LoadingButton
                size={'small'}
                onClick={onClose}
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
