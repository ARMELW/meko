import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchApi } from '@/services/api/http';

interface UpdatePaymentMethodPayload {
  returnUrl: string;
}

interface UpdatePaymentMethodResponse {
  success: boolean;
  url: string;
  error?: string;
}

export function useUpdatePaymentMethod() {
  const queryClient = useQueryClient();
  return useMutation<UpdatePaymentMethodResponse, Error, UpdatePaymentMethodPayload>({
    mutationFn: async (payload) => {
      const res = await fetchApi<UpdatePaymentMethodResponse>('api/v1/subscription/payment-method/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include',
      });
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paymentMethod'] });
    }
  });
}
