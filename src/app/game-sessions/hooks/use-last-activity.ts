import { useQuery } from '@tanstack/react-query';
import { gameSessionService } from '../service';

export const useLastActivity = (childId: string) => {
  return useQuery({
    queryKey: ['lastActivity', childId],
    queryFn: () => gameSessionService.getLastActivity(childId),
    enabled: !!childId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true
  });
};
