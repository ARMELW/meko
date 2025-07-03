import { useQuery } from '@tanstack/react-query';
import { fetchGamesStats } from '../api/games-stats-service';

export function useGamesStats(childId?: string) {
  return useQuery({
    queryKey: ['gamesStats', childId],
    queryFn: () => childId ? fetchGamesStats(childId) : Promise.resolve(undefined),
    enabled: !!childId,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
}
