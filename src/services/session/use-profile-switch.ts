import { useSession } from './store';
import { useLastActivityActions } from '@/app/game-sessions/hooks/use-last-activity-actions';
import { useChildren } from '@/app/children';

interface Child {
  id: string;
  firstname: string;
  lastname?: string;
  avatarUrl?: string;
}

/**
 * Hook pour gérer le changement de profil avec invalidation automatique 
 * du cache des activités récentes
 */
export const useProfileSwitch = () => {
  const login = useSession(state => state.login);
  const logout = useSession(state => state.logout);
  const { invalidateLastActivity } = useLastActivityActions();
  const { data: childrenData } = useChildren();

  /**
   * Change de profil et invalide automatiquement le cache des activités récentes
   */
  const switchProfile = (child: Child) => {
    // Chercher l'enfant complet (avec avatarUrl) si possible
    let fullChild = child;
    if (childrenData?.data) {
      const found = childrenData.data.find((c) => c.id === child.id);
      if (found) {
        fullChild = { ...found };
      }
    }
    invalidateLastActivity();
    login(fullChild);
  };

  /**
   * Se déconnecte et invalide le cache des activités récentes
   */
  const logoutWithCacheCleanup = () => {
    // Invalider toutes les activités récentes avant de se déconnecter
    invalidateLastActivity();
    
    // Se déconnecter
    logout();
  };

  return {
    switchProfile,
    logout: logoutWithCacheCleanup
  };
};
