import { useChildrenStore } from '@/app/children/store';
import { useLastActivityActions } from '@/app/game-sessions/hooks/use-last-activity-actions';
import { Children } from '@/app/children/type';

/**
 * Hook pour gérer le changement d'enfant dans le monitoring
 * avec invalidation automatique du cache des activités récentes
 */
export const useChildMonitoringSwitch = () => {
  const setCurrentChild = useChildrenStore((state) => state.setCurrentChild);
  const { invalidateLastActivity } = useLastActivityActions();

  /**
   * Change l'enfant courant dans le monitoring et invalide le cache des activités récentes
   */
  const switchCurrentChild = (child: Children) => {
    // Invalider le cache des activités récentes pour tous les enfants
    invalidateLastActivity();
    
    // Changer l'enfant courant
    setCurrentChild(child);
  };

  return {
    switchCurrentChild
  };
};
