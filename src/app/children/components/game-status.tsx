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
          label: t('modules.detail.gameStatus.completed', 'TERMINÉ')
        };
      case 'blocked':
        return {
          variant: 'blocked',
          label: t('modules.detail.gameStatus.blocked', 'BLOQUÉ')
        };
      case 'in_progress':
        return {
          variant: 'inProgress',
          label: t('modules.detail.gameStatus.in_progress', 'EN COURS')
        };
      case 'available':
      default:
        return {
          variant: 'toDiscover',
          label: t('modules.detail.gameStatus.available', 'À DÉCOUVRIR')
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
