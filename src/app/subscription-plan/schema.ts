import { z } from 'zod';

export const subscriptionPlanSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().optional(),
  childLimit: z.number().int().positive().optional(),
  priceMonthly: z.number().nonnegative(),
  priceYearly: z.number().nonnegative(),
  displayedYearly: z.number().nonnegative(),
  displayedMonthly: z.number().nonnegative(),
  displayedYearlyBar: z.number().nonnegative(),
  currency: z.string().min(1),
  stripeIds: z.object({
    monthly: z.string().optional(),
    yearly: z.string().optional()
  }),
  createdAt: z.string(),
  updatedAt: z.string()
});

export type SubscriptionPlan = z.infer<typeof subscriptionPlanSchema>;
