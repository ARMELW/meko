import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '@/services/api/http';

export interface PaymentMethod {
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  funding: string;
  country: string;
}

export function usePaymentMethod() {
  return useQuery({
    queryKey: ['paymentMethod'],
    queryFn: async () => {
      const res = await fetchApi<{ success: boolean; data: PaymentMethod }>('api/v1/subscription/payment-method', {
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
