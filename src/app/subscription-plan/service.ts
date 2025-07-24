import subscriptionPlanApi from './api';
import { SubscriptionPlan } from './schema';

export const subscriptionPlanService = {
  async list(): Promise<SubscriptionPlan[]> {
    return subscriptionPlanApi.list();
  }
};
