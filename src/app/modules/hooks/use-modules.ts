import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ModulesService } from '../service';
import { modulesKeys } from '../config';
import { ModulesQueryParams } from '../types';

export const useModules = (childId: string, params: ModulesQueryParams = {}) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [...modulesKeys.list({ childId, ...params })],
    queryFn: () => ModulesService.getChildModules(childId, params),
    enabled: !!childId,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true
  });

  const invalidate = () => {
    return queryClient.invalidateQueries({
      queryKey: modulesKeys.all,
      refetchType: 'all'
    });
  };

  return {
    ...query,
    invalidate
  };
};
