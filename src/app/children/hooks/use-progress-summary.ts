import { useQuery } from '@tanstack/react-query';
import { fetchProgressSummary } from '../api/progress-summary-service';

export function useProgressSummary(childId?: string) {
  return useQuery({
    queryKey: ['progressSummary', childId],
    queryFn: () => childId ? fetchProgressSummary(childId) : Promise.resolve(undefined),
    enabled: !!childId,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
}
