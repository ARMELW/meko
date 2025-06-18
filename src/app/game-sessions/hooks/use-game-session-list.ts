import { useQuery } from '@tanstack/react-query';
import { gameSessionService } from '../service';
import { GameSessionListResponse, ChildGameSessionListResponse } from '../types';

/**
 * Hook pour récupérer la liste paginée de toutes les sessions
 */
export const useGameSessionList = (params: {
  page?: number;
  limit?: number;
  status?: string;
} = {}) => {
  return useQuery<GameSessionListResponse>({
    queryKey: ['game-sessions', 'list', params],
    queryFn: () => gameSessionService.listSessions(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * Hook pour récupérer les sessions d'un enfant spécifique
 */
export const useChildGameSessions = (
  childId: string,
  params: {
    page?: number;
    limit?: number;
    gameId?: string;
  } = {}
) => {
  return useQuery<ChildGameSessionListResponse>({
    queryKey: ['game-sessions', 'child', childId, params],
    queryFn: () => gameSessionService.getChildSessions(childId, params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!childId, // Ne s'exécute que si childId est fourni
  });
};

/**
 * Hook pour récupérer les détails d'une session spécifique
 */
export const useGameSessionDetail = (sessionId: string) => {
  return useQuery({
    queryKey: ['game-sessions', 'detail', sessionId],
    queryFn: () => gameSessionService.getSessionDetail(sessionId),
    staleTime: 1000 * 60 * 2, // 2 minutes
    enabled: !!sessionId, // Ne s'exécute que si sessionId est fourni
  });
};
