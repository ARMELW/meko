import { useMutation, useQueryClient } from '@tanstack/react-query';
import { gameSessionService } from '../service';
import { SaveProgressPayload, CompleteGameSessionPayload } from '../types';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

export const useGameSession = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const startSession = useMutation({
    mutationFn: ({ childId, gameId }: { childId: string; gameId: string }) =>
      gameSessionService.startSession({ childId, gameId }),
    onSuccess: () => {
      toast.success(t('games.session.started'));
    },
    onError: (error: Error) => {
      toast.error(t('games.session.error'));
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
    onSuccess: () => {
      toast.success(t('games.session.progressSaved'));
    },
    onError: (error: Error) => {
      toast.error(t('games.session.error'));
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
    },
    onError: (error: Error) => {
      toast.error(t('games.session.error'));
      console.error('Error completing game session:', error);
    }
  });

  const abandonSession = useMutation({
    mutationFn: ({ sessionId }: { sessionId: string }) =>
      gameSessionService.abandonSession(sessionId),
    onSuccess: () => {
      toast.info(t('games.session.abandoned'));
      // Invalider les caches pour mettre à jour les données
      queryClient.invalidateQueries({ queryKey: ['modules'] });
      queryClient.invalidateQueries({ queryKey: ['game-sessions'] });
    },
    onError: (error: Error) => {
      toast.error(t('games.session.error'));
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
