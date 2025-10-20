import { useMutation, useQueryClient } from '@tanstack/react-query';
import { gameSessionService } from '../service';
import { SaveProgressPayload, CompleteGameSessionPayload } from '../types';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useLastActivityActions } from './use-last-activity-actions';
import { $ } from 'node_modules/react-router/dist/development/fog-of-war-1hWhK5ey.d.mts';

export const useGameSession = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { invalidateLastActivity } = useLastActivityActions();

  const startSession = useMutation({
    mutationFn: ({ childId, gameId }: { childId: string; gameId: string }) =>
      gameSessionService.startSession({ childId, gameId }),
    onSuccess: (_, variables) => {
     // toast.success(t('games.session.started'));
      // Invalider la cache de la dernière activité pour l'enfant qui commence une session
      invalidateLastActivity(variables.childId);
    },
    onError: (error: Error) => {
      //toast.error(t('games.session.error'));
      console.error('Error starting game session:', error);
    }
  });

  const saveProgress = useMutation({
    mutationFn: ({ childId, sessionId, data }: { 
      childId: string; 
      sessionId: string; 
      data: SaveProgressPayload 
    }) =>
      gameSessionService.saveProgress(childId, sessionId, data),
    onSuccess: (_, variables) => {
      toast.success(t('games.session.progressSaved'));
      // Invalider la cache de la dernière activité pour l'enfant spécifique
      invalidateLastActivity(variables.childId);
    },
    onError: (error: Error) => {
     // toast.error(t('games.session.error'));
      console.error('Error saving progress:', error);
    }
  });

  const completeSession = useMutation({
    mutationFn: ({ sessionId, data }: { 
      sessionId: string; 
      data: CompleteGameSessionPayload 
    }) =>
      gameSessionService.completeSession(sessionId, data),
    onSuccess: (response) => {
      // La réponse contient success et data avec la session mise à jour
      if (response.success && response.data.status === 'completed') {
        toast.success(t('games.session.completed'));
      } else {
        toast.info(t('games.session.completed'));
      }
      // Invalider les caches pour mettre à jour les données
      queryClient.invalidateQueries({ queryKey: ['modules'] });
      queryClient.invalidateQueries({ queryKey: ['game-sessions'] });
      
      // Si on a l'ID de l'enfant dans la réponse, l'utiliser pour invalider spécifiquement
      if (response.data?.childId) {
        invalidateLastActivity(response.data.childId);
      } else {
        // Sinon invalider toutes les dernières activités
        invalidateLastActivity();
      }
    },
    onError: (error: Error) => {
     // toast.error(t('games.session.error'));
      console.error('Error completing game session:', error);
    }
  });

  const abandonSession = useMutation({
    mutationFn: ({ sessionId, timeSpent }: { sessionId: string; timeSpent: number }) =>
      gameSessionService.abandonSession(sessionId, timeSpent),
    onSuccess: () => {
      // Ne plus afficher le toast ici car il est affiché immédiatement dans le composant
      // Invalider les caches pour mettre à jour les données
      queryClient.invalidateQueries({ queryKey: ['modules'] });
      queryClient.invalidateQueries({ queryKey: ['game-sessions'] });
    },
    onError: (error: Error) => {
      //toast.error(t('games.session.error'));
      console.error('Error abandoning game session:', error);
    }
  });

  return {
    startSession,
    saveProgress,
    completeSession,
    abandonSession,
    isStarting: startSession.isPending,
    isSaving: saveProgress.isPending,
    isCompleting: completeSession.isPending,
    isAbandoning: abandonSession.isPending
  };
};
