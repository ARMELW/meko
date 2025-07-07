import { Typography } from '@/components';
import type { LastActivity } from '../types';
import { Table, TableBody, TableRow, TableCell } from '@/components';
import { LoadingButton } from '@/components/atoms/actions/loading-button';
import { useTranslation } from 'react-i18next';

interface LastActivitySummaryProps {
  lastActivity: LastActivity;
  onRelaunch?: () => void;
  onDetail?: () => void;
  showActions?: boolean;
}

export function LastActivitySummary({ lastActivity, onRelaunch }: LastActivitySummaryProps) {
  const { t } = useTranslation();
  if (!lastActivity) return null;
  const formatDuration = (duration: number): string => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className="space-y-3 mt-5">
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
              <TableCell styleCase="uppercase"  color="primary" align="left">
                {t('games.session.modal.lastActivity.module')}
              </TableCell>
              <TableCell weight="default" align="right">
                {lastActivity.module.name}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell styleCase="uppercase"  color="primary" align="left">
                {t('games.session.modal.lastActivity.lesson')}
              </TableCell>
              <TableCell weight="default"  align="right">
                {lastActivity.lesson.order}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell styleCase="uppercase"  color="primary" align="left">
                {t('games.session.modal.lastActivity.duration')}
              </TableCell>
              <TableCell weight="default"  align="right">
                {formatDuration(Number(lastActivity.duration))}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      {onRelaunch && (
      <div className="flex justify-center py-4">
        <LoadingButton onClick={onRelaunch}>
          {t('games.session.modal.lastActivity.relaunch')}
        </LoadingButton>
      </div>
      )}
    </div>
  );
}
