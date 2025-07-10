import { useQuery, useQueryClient } from '@tanstack/react-query';
import { childrenService } from '../query';
import { childrenKeys } from '../config';

export const useChildren = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: childrenKeys.lists(),
    queryFn: () => childrenService.list({ page: 1, limit: 10 }),
    staleTime: 5 * 60 * 1000, // 5 minutes - considérer les données comme fraîches pendant 5 min
    gcTime: 10 * 60 * 1000, // 10 minutes - garder en cache pendant 10 min
    refetchOnMount: false, // Ne pas rafraîchir automatiquement au montage
    refetchOnWindowFocus: false, // Ne pas rafraîchir quand la fenêtre reprend le focus
    retry: 2, // Retry 2 fois en cas d'erreur
    retryDelay: 1000 // Délai de 1 seconde entre les retries
  });

  const invalidate = () => {
    return queryClient.invalidateQueries({
      queryKey: childrenKeys.lists(),
      refetchType: 'all'
    });
  };

  return {
    ...query,
    invalidate
  };
};