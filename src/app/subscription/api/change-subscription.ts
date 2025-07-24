import { fetchApi } from '@/services/api/http';

export interface ChangeSubscriptionResponse {
  success: boolean;
  message?: string;
}

export const changeSubscriptionService = {
  async change(payload: { planId: string; interval: 'month' | 'year' }): Promise<ChangeSubscriptionResponse> {
    const res = await fetchApi<{ success: boolean; message?: string }>(
      'api/v1/subscription/change',
      {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }
    );
    return { success: res.success, message: res.message };
  }
};
