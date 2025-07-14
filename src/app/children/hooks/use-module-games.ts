import { useQuery, useQueryClient } from '@tanstack/react-query';
import { http } from '@/services/api';
import { modulesKeys } from '@/app/modules/config';

export interface Game {
  id: string;
  title: string;
  coverUrl: string;
  status: 'available' | 'completed' | 'blocked' | 'in_progress';
  completedAt?: string;
}

export interface Lesson {
  id: string;
  title: string;
  games: Game[];
}

export interface ModuleDetail {
  id: string;
  name: string;
  lessons: Lesson[];
}

const getModuleDetail = async (childId: string, moduleId: string): Promise<ModuleDetail> => {
  const response = await http.private.get(`/api/v1/children/${childId}/modules/${moduleId}`);
  return response.data;
};

export const useModuleGames = (childId: string, moduleId: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: modulesKeys.detail(`${childId}-${moduleId}`),
    queryFn: () => getModuleDetail(childId, moduleId),
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

  return {
    ...query,
    invalidate
  };
};
