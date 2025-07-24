
import type { SubscriptionPlan } from './schema';

export interface PlanUI {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  monthlyPrice: number;
  annualPrice: number;
  annualMonthlyPrice: number;
  stripeIds?: SubscriptionPlan['stripeIds'];
}

export function mapApiPlanToUI(plan: SubscriptionPlan): PlanUI {
  return {
    id: plan.id,
    type: plan.name,
    title: plan.name,
    subtitle: plan.description || '',
    monthlyPrice: plan.priceMonthly,
    annualPrice: plan.priceYearly,
    annualMonthlyPrice: Math.round(plan.priceYearly / 12),
    stripeIds: plan.stripeIds,
  };
}
