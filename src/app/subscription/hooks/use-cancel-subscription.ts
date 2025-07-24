import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelSubscriptionService } from '../api/cancel-subscription';

export function useCancelSubscription() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: cancelSubscriptionService.cancel,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['currentSubscription'] });
        },
    });
}
