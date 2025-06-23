import { useLastActivityActions } from './use-last-activity-actions';
import { useSession as useChildrenSession } from '@/services/session/store';

/**
 * Hook pour mettre à jour facilement la dernière activité
 * Utilise automatiquement l'enfant de la session courante si aucun ID n'est fourni
 */
export const useUpdateLastActivity = () => {
  const { invalidateLastActivity, refetchLastActivity } = useLastActivityActions();
  const sessionChild = useChildrenSession(state => state.selectedChild);

  /**
   * Met à jour la dernière activité pour l'enfant courant ou un enfant spécifique
   */
  const updateLastActivity = (childId?: string) => {
    const targetChildId = childId || sessionChild?.id;
    if (targetChildId) {
      invalidateLastActivity(targetChildId);
    }
  };

  /**
   * Force le rechargement de la dernière activité
   */
  const refreshLastActivity = (childId?: string) => {
    const targetChildId = childId || sessionChild?.id;
    if (targetChildId) {
      refetchLastActivity(targetChildId);
    }
  };

  return {
    updateLastActivity,
    refreshLastActivity
  };
};
