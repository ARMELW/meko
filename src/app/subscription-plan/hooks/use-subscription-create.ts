import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchApi } from '@/services/api/http';

interface SubscriptionCreatePayload {
  planId: string;
  interval: 'month' | 'year';
  successUrl: string;
  cancelUrl: string;
}

interface SubscriptionCreateResponse {
  success: boolean;
  sessionId: string;
  paymentUrl?: string;
}

export function useSubscriptionCreate() {
  const queryClient = useQueryClient();
  return useMutation<SubscriptionCreateResponse, Error, SubscriptionCreatePayload>({
    mutationFn: async (payload) => {
      const res = await fetchApi<SubscriptionCreateResponse>('api/v1/subscription/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentSubscription'] });
    }
  });
}
