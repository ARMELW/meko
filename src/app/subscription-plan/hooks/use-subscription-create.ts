import { useMutation } from '@tanstack/react-query';
import { fetchApi } from '@/services/api/http';

interface SubscriptionCreatePayload {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}

interface SubscriptionCreateResponse {
  success: boolean;
  sessionId: string;
  paymentUrl?: string;
}

export function useSubscriptionCreate() {
  return useMutation<SubscriptionCreateResponse, Error, SubscriptionCreatePayload>({
    mutationFn: async (payload) => {
      const res = await fetchApi<SubscriptionCreateResponse>('api/v1/subscription/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return res;
    }
  });
}
