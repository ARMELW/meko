import { useQuery, useQueryClient } from '@tanstack/react-query';
import { childrenService } from '../query';
import { childrenKeys } from '../config';

export const useChildren = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: childrenKeys.lists(),
    queryFn: () => childrenService.list({ page: 1, limit: 10 }),
    staleTime: 0, // Toujours considérer les données comme périmées
    refetchOnMount: true, // Rafraîchir à chaque montage
    refetchOnWindowFocus: true // Rafraîchir quand la fenêtre reprend le focus
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