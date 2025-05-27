import { useQuery } from '@tanstack/react-query';
import { childrenService } from '../query';
import { childrenKeys } from '../config';

export const useChildren = () => {
  return useQuery({
    queryKey: childrenKeys.lists(),
    queryFn: () => childrenService.list({ page: 1, limit: 10 }),
  });
};
