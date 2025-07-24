
import { fetchApi } from '@/services/api/http';
import { subscriptionPlanSchema, SubscriptionPlan } from './schema';
import { z } from 'zod';

class SubscriptionPlanApi {
  async list(): Promise<SubscriptionPlan[]> {
    try {
      const res = await fetchApi('api/v1/subscription-plans', { method: 'GET' }) as { success: boolean; data: unknown };
      if (!res.success || !Array.isArray(res.data)) return [];
      const parsed = z.array(subscriptionPlanSchema).safeParse(res.data);
      if (!parsed.success) return [];
      return parsed.data;
    } catch {
      return [];
    }
  }
}

export default new SubscriptionPlanApi();
