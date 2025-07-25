import { fetchApi } from '@/services/api/http';

export type CurrentSubscription = {
  planName: string;
  maxChildren: number;
  activeUntil: string;
  isTrial: boolean;
  trialEndDate?: string;
  trialDaysLeft?: number;
  isCanceled?: boolean;
  accessEndsAt?: string;
  isExpired: boolean;
  currentChildrenCount: number;
  interval: 'month' | 'year';
};

type CurrentSubscriptionApiResponse = {
  success: boolean;
  data: CurrentSubscription;
};

export const currentSubscriptionService = {
  async get(): Promise<CurrentSubscription> {
    const res = await fetchApi<CurrentSubscriptionApiResponse>('api/v1/subscription/current', { method: 'GET', credentials: 'include' });
    return res.data;
  }
};
