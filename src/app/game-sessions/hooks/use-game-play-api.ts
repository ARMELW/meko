import { useQuery } from '@tanstack/react-query';
import { UnityGameConfig } from '@/app/game-sessions/hooks/use-unity-loader';
import { fetchApi } from '@/services/api/http';

interface UseGamePlayApiOptions {
  gameId?: string;
  enabled?: boolean;
}

export interface GamePlayApiResponse extends UnityGameConfig {
  name: string;
  id: string;
  title: string;
  coverUrl?: string;
  lessonId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export function useGamePlayApi({ gameId, enabled = true }: UseGamePlayApiOptions) {
  return useQuery<GamePlayApiResponse | undefined>({
    queryKey: ['game-play', gameId],
    queryFn: async () => {
      if (!gameId) return undefined;
      const res = await fetchApi<GamePlayApiResponse>(`api/v1/games/${gameId}/play`, {
        method: 'GET',
      });
      if (!res) throw new Error('Erreur lors du chargement du jeu');
      return res;
    },
    enabled: !!gameId && enabled,
    staleTime: 5 * 60 * 1000,
  });
}
