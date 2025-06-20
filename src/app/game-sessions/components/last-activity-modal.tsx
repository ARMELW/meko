import { X } from 'lucide-react';
import { Card, CardContent, Typography, Table, TableBody, TableRow, TableCell } from '@/components';
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


  const formatDuration = (minutes?: number) => {
    if (!minutes) return '';
    return `${minutes} ${t('games.session.modal.lastActivity.minutes')}`;
  };

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
            <div className="space-y-3  mt-5 ">
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
                <Typography className="text-2xl font-bold text-white uppercase">
                  {lastActivity.game.title}
                </Typography>
              </div>
              <div className='mx-4'>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell styleCase="uppercase" color="primary" align="left">
                        {t('games.session.modal.lastActivity.module')}
                      </TableCell>
                      <TableCell weight="default" align="right">
                        {lastActivity.module.name}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell styleCase="uppercase" color="primary" align="left">
                        {t('games.session.modal.lastActivity.lesson')}
                      </TableCell>
                      <TableCell weight="default" align="right">
                        {lastActivity.lesson.order}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell styleCase="uppercase" color="primary" align="left">
                        {t('games.session.modal.lastActivity.duration')}
                      </TableCell>
                      <TableCell weight="default" align="right">
                        {formatDuration(lastActivity.totalTime)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-center py-4">
                <LoadingButton
                  onClick={onRelaunch}
                >
                  {t('games.session.modal.lastActivity.relaunch')}
                </LoadingButton>
              </div>
            </div>
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
