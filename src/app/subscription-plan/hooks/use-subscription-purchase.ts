import { useNavigate } from 'react-router';
import { useSession } from '@/services/session';
import { useSubscriptionCreate } from './use-subscription-create';

interface PurchaseOptions {
  planId: string;
  interval: 'month' | 'year';
}

export function useSubscriptionPurchase() {
  const navigate = useNavigate();
  const { selectedChild } = useSession();
  const createSubscription = useSubscriptionCreate();

  const successUrl = `${window.location.origin}/subscription/payment-success`;
  const cancelUrl = `${window.location.origin}/subscription/payment-cancel`;

  const purchase = async ({ planId, interval }: PurchaseOptions) => {
    if (!selectedChild) {
      navigate('/login', {
        state: {
          message: "Vous devez être connecté pour souscrire à une offre. Connectez-vous ou créez un compte."
        }
      });
      return;
    }
    const res = await createSubscription.mutateAsync({ planId, interval, successUrl, cancelUrl });
    if (res.success && res.paymentUrl) {
      window.location.href = res.paymentUrl;
    } else {
      throw new Error("Impossible de démarrer le paiement. Veuillez réessayer.");
    }
  };

  return { purchase, isLoading: createSubscription.isPending };
}
