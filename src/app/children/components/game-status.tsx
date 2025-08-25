import React from 'react';
import { Status } from '@/components';
import { useTranslation } from 'react-i18next';
export interface GameStatusProps {
  status: 'available' | 'completed' | 'blocked' | 'in_progress';
  size?: 'normal' | 'small';
  className?: string;
}

const GameStatus: React.FC<GameStatusProps> = ({ 
  status, 
  size = 'small',
  className 
}) => {
  const { t } = useTranslation();

  const getStatusConfig = (gameStatus: string) => {
    switch (gameStatus) {
      case 'completed':
        return {
          variant: 'completed',
          label: t('modules.status.completed')
        };
      case 'blocked':
        return {
          variant: 'blocked',
          label: t('modules.status.blocked')
        };
      case 'in_progress':
        return {
          variant: 'inProgress',
          label: t('modules.status.in_progress')
        };
      case 'available':
      default:
        return {
          variant: 'toDiscover',
          label: t('modules.status.not_started')
        };
    }
  };

  const statusConfig = getStatusConfig(status);

  return (
    <div className={className}>
      <Status 
        status={statusConfig.variant as 'completed' | 'blocked' | 'inProgress' | 'toDiscover'}
        size={size}
      />
    </div>
  );
};

export default GameStatus;
