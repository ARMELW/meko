import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changeSubscriptionService } from '../api/change-subscription';

export function useChangeSubscription() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: changeSubscriptionService.change,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentSubscription'] });
    },
  });
}
