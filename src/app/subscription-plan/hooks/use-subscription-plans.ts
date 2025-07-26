import { useQuery } from '@tanstack/react-query';
import { subscriptionPlanService } from '../service';

export function useSubscriptionPlans() {
  return useQuery({
    queryKey: ['subscriptionPlans'],
    queryFn: subscriptionPlanService.list,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnMount: true,
    refetchOnWindowFocus: true
  });
}
