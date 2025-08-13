import { useSystemConfig } from '@/services/api/use-system-config';

export function useSubscriptionFeatureEnabled() {
  const { data } = useSystemConfig();
  console.log('useSubscriptionFeatureEnabled', data);
  return data?.isSubscriptionEnabled !== false;
}
