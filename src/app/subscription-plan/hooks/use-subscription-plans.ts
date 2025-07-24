import { useQuery } from '@tanstack/react-query';
import { subscriptionPlanService } from '../service';

export function useSubscriptionPlans() {
  return useQuery({
    queryKey: ['subscriptionPlans'],
    queryFn: subscriptionPlanService.list,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true
  });
}
