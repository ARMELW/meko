
import { fetchApi } from '@/services/api/http';
import { SubscriptionPlan } from './schema';

class SubscriptionPlanApi {
  async list(): Promise<SubscriptionPlan[]> {
    try {
      const res = await fetchApi('api/v1/subscription-plans', { method: 'GET' }) as { data?: SubscriptionPlan[] };
      return res.data ?? [];
    } catch(error) {
      console.error("Failed to fetch subscription plans:", error);
      return [];
    }
  }
}

export default new SubscriptionPlanApi();
