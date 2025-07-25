import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '@/services/api/http';

export interface Invoice {
  id: string;
  planName: string;
  periodStart: string;
  periodEnd: string;
  amount: number;
  currency: string;
  status: string;
  paidAt?: string | null;
  invoiceUrl: string;
  interval: 'month' | 'year';
}

export function useInvoices() {
  return useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      const res = await fetchApi<{ success: boolean; data: Invoice[] }>('api/v1/subscription/invoices', {
        method: 'GET',
        credentials: 'include',
      });
      return res.data;
    },
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}
