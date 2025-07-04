import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '@/services/api/http';

export interface ChildActivityStats {
  completedModules: number;
  completedLessons: number;
  avgTimePerDay: number;
  successRate: number;
  gamesPlayed: number;
  sessionsCount: number;
  avgSessionDuration: number;
}

export function useChildActivityStats(childId?: string, period: string = '7d') {
  return useQuery({
    queryKey: ['child-activity-stats', childId, period],
    enabled: !!childId,
    queryFn: async () => {
      const res = await fetchApi<{ success: boolean; data: ChildActivityStats }>(
        `api/v1/children/${childId}/activity-stats?period=${period}`,
        { method: 'GET' }
      );
      return res.data;
    },
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}
