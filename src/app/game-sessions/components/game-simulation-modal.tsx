import { useState, useEffect } from 'react';
import { useGameSession } from '../hooks/use-game-session';
import { useSession as useChildrenSession } from '@/services/session/store';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdateLastActivity } from '../hooks/use-update-last-activity';
import type { GameSession } from '../types';
import { modulesKeys } from '@/app/modules/config';
import type { ModuleDetail } from '@/app/modules/types';
import { GameSimulationView } from './game-simulation-view';
import { useGamePlayApi } from '../hooks/use-game-play-api';

interface GameState {
  currentQuestionIndex: number;
  score: number;
  totalAttempts: number;
  startTime: number;
  isGameStarted: boolean;
  isGameCompleted: boolean;
}

interface GameSimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameId: string;
  gameTitle?: string;
  moduleId?: string;
}

export function GameSimulationModal({
  isOpen,
  onClose,
  gameId,
  moduleId
}: GameSimulationModalProps) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { selectedChild } = useChildrenSession();
  const { startSession, completeSession, abandonSession } = useGameSession();
  const { updateLastActivity } = useUpdateLastActivity();
  const { data: game, isLoading, error } = useGamePlayApi({ gameId });
  const [currentSession, setCurrentSession] = useState<GameSession | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    currentQuestionIndex: 0,
    score: 0,
    totalAttempts: 0,
    startTime: 0,
    isGameStarted: false,
    isGameCompleted: false
  });

  const [displayedTime, setDisplayedTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (gameState.isGameStarted && !gameState.isGameCompleted) {
      interval = setInterval(() => {
        const currentTime = Math.floor((performance.now() - gameState.startTime) / 1000);
        setDisplayedTime(currentTime);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [gameState.isGameStarted, gameState.isGameCompleted, gameState.startTime]);

  const initializeGame = () => {
    setGameState({
      currentQuestionIndex: 0,
      score: 0,
      totalAttempts: 0,
      startTime: performance.now(),
      isGameStarted: true,
      isGameCompleted: false
    });
    setDisplayedTime(0);
  };

  const handleStartSession = async () => {
    if (!selectedChild) return;

    try {
      const result = await startSession.mutateAsync({
        childId: selectedChild.id,
        gameId
      });

      if (result.success && result.data) {
        setCurrentSession(result.data);
        initializeGame();
      }
    } catch (error) {
      console.error('Error starting session:', error);
    }
  };

  const handleCompleteSession = async () => {
    if (!currentSession || !selectedChild) return;

    try {
      const timeSpent = Math.floor((performance.now() - gameState.startTime) / 1000);
      await completeSession.mutateAsync({
        sessionId: currentSession.id,
        data: {
          score: gameState.score,
          timeSpent,
          success: gameState.score >= 3
        }
      });

      // Mettre à jour la dernière activité
      if (selectedChild?.id) {
        updateLastActivity(selectedChild.id);
      }

      toast.success(t('games.session.completed'));

      // Mise à jour optimiste de la cache du détail du module
      if (moduleId) {
        const moduleDetailKey = modulesKeys.detail(`${selectedChild.id}-${moduleId}`);

        queryClient.setQueryData(moduleDetailKey, (oldData: ModuleDetail | undefined) => {
          if (!oldData) return oldData;

          // Mettre à jour le statut du jeu à "completed" après complétion
          const updatedLessons = oldData.lessons.map((lesson) => ({
            ...lesson,
            games: lesson.games.map((game) => {
              if (game.id === gameId) {
                return {
                  ...game,
                  status: 'completed' as const
                };
              }
              return game;
            })
          }));

          // Mettre à jour le nombre de jeux complétés
          const completedGamesCount = updatedLessons
            .flatMap(lesson => lesson.games)
            .filter(game => game.status === 'completed').length;

          return {
            ...oldData,
            lessons: updatedLessons,
            completedGames: completedGamesCount
          };
        });
      }

      setGameState({
        currentQuestionIndex: 0,
        score: 0,
        totalAttempts: 0,
        startTime: 0,
        isGameStarted: false,
        isGameCompleted: false
      });
      setCurrentSession(null);
      onClose(); // Fermer le modal après la complétion
    } catch (error) {
      console.error('Error completing session:', error);
    }
  };

  const handleAbandonSession = async () => {
    if (!currentSession || !selectedChild) return;
    const timeSpent = Math.floor((performance.now() - gameState.startTime) / 1000);
    if (moduleId) {
      const moduleDetailKey = modulesKeys.detail(`${selectedChild.id}-${moduleId}`);
      queryClient.setQueryData(moduleDetailKey, (oldData: ModuleDetail | undefined) => {
        if (!oldData) return oldData;
        // Mettre à jour le statut du jeu à "available" ou "not_started" après abandon
        const updatedLessons = oldData.lessons.map((lesson) => ({
          ...lesson,
          games: lesson.games.map((game) => {
            if (game.id === gameId) {
              return {
                ...game,
                status: 'in_progress' as const
              };
            }
            return game;
          })
        }));
        return {
          ...oldData,
          lessons: updatedLessons
        };
      });
    }
    await abandonSession.mutateAsync({
      sessionId: currentSession.id,
      timeSpent: timeSpent
    });
    setCurrentSession(null);
    setGameState({
      currentQuestionIndex: 0,
      score: 0,
      totalAttempts: 0,
      startTime: 0,
      isGameStarted: false,
      isGameCompleted: false
    });
    toast.info(t('games.session.abandoned'));
    if (selectedChild?.id) {
      updateLastActivity(selectedChild.id);
    }
  };


  const handleClose = () => {
    onClose();
  };
  if (isLoading) {
    return <div className="flex items-center justify-center h-full">Chargement du jeu…</div>;
  }
  if (error || !game) {
    return <div className="text-red-500 text-center mt-8">Erreur lors du chargement du jeu.</div>;
  }

  if (!isOpen) return null;


  return (
    <GameSimulationView
      isOpen={isOpen}
      onClose={handleClose}
      game={game}
      displayedTime={displayedTime}
      handleStartSession={handleStartSession}
      handleCompleteSession={handleCompleteSession}
      handleAbandonSession={handleAbandonSession}
      completeSessionPending={completeSession.isPending}

    />
  );
}
