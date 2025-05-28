import { useQuery, useQueryClient } from '@tanstack/react-query';
import { childrenService } from '../query';
import { childrenKeys } from '../config';

export const useChildren = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: childrenKeys.lists(),
    queryFn: () => childrenService.list({ page: 1, limit: 10 }),
  });

  const invalidate = () => {
    queryClient.invalidateQueries({
      queryKey: childrenKeys.lists(),
    });
  };

  return {
    ...query,
    invalidate
  };
};