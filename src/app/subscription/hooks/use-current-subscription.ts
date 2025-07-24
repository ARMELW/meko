import { useQuery } from '@tanstack/react-query';
import { currentSubscriptionService } from '../api/current-subscription';
export function useCurrentSubscription() {
  return useQuery({
    queryKey: ['currentSubscription'],
    queryFn: currentSubscriptionService.get,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    retry: 1,
    retryDelay: 1000,
  });
}
