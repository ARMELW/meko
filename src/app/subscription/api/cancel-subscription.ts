import { fetchApi } from '@/services/api/http';

export type CancelSubscriptionResponse = {
  success: boolean;
};

export const cancelSubscriptionService = {
  async cancel(): Promise<CancelSubscriptionResponse> {
    const res = await fetchApi<{ success: boolean }>('api/v1/subscription/cancel', {
      method: 'POST',
      credentials: 'include'
    });
  return { success: res.success };
  }
};
