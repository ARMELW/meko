import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ModulesService } from '../service';
import { modulesKeys } from '../config';

export const useModuleDetail = (childId: string, moduleId: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: modulesKeys.detail(`${childId}-${moduleId}`),
    queryFn: () => ModulesService.getModuleDetail(childId, moduleId),
    enabled: !!(childId && moduleId),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true
  });

  const invalidate = () => {
    return queryClient.invalidateQueries({
      queryKey: modulesKeys.detail(`${childId}-${moduleId}`),
      refetchType: 'all'
    });
  };

  const invalidateAll = () => {
    return queryClient.invalidateQueries({
      queryKey: modulesKeys.all,
      refetchType: 'all'
    });
  };

  return {
    ...query,
    invalidate,
    invalidateAll
  };
};
