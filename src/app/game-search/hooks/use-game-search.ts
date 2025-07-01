import { useQuery, useQueryClient } from '@tanstack/react-query';
import { gameSearchService } from '../api/game-search-service';
import { gameSearchKeys } from '../config';
import { GameSearchParams, GameSearchResponse } from '../types';

export const useGameSearch = (childId: string, params: GameSearchParams) => {
  const queryClient = useQueryClient();
  const entity = gameSearchKeys.all[0];

  const query = useQuery<GameSearchResponse>({
    queryKey: [entity, 'search', childId, params],
    queryFn: () => gameSearchService.search(childId, params),
    enabled: !!childId,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true
  });

  const invalidate = () => {
    return queryClient.invalidateQueries({
      queryKey: [entity, 'search', childId, params],
      refetchType: 'all'
    });
  };

  const invalidateAll = () => {
    return queryClient.invalidateQueries({
      queryKey: gameSearchKeys.lists(),
      refetchType: 'all'
    });
  };

  return { ...query, invalidate, invalidateAll };
};
