import { useQuery } from '@tanstack/react-query';
import { fetchApi } from './http';

export interface SystemConfig {
    isSubscriptionEnabled: boolean;
    isTrialRequired: boolean;
    maintenanceMode: boolean;
    allowNewRegistrations: boolean;
}

export function useSystemConfig() {
    return useQuery<SystemConfig>({
        queryKey: ['systemConfig'],
        queryFn: async () => {
            const res = await fetchApi('api/v1/admin/system/config', { credentials: 'include' }) as { data: SystemConfig };
            return res.data;
        },
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
}
