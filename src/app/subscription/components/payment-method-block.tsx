import { Typography } from '@/components';
import { useUpdatePaymentMethod } from '@/app/subscription/hooks/use-update-payment-method';
import { usePaymentMethod } from '@/app/subscription/hooks/use-payment-method';

export function PaymentMethodBlock() {
  const { mutate: updateCard, isPending: isUpdatingCard } = useUpdatePaymentMethod();
  const { data: paymentMethod, isLoading: isPaymentLoading, error: paymentError } = usePaymentMethod();

  return (
    <div className="mb-6">
      <Typography weight="bold" className="text-lg text-white mb-2 tracking-wide">
        MOYEN DE PAIEMENT
      </Typography>
      {isPaymentLoading ? (
        <div className="text-center py-4 text-white">Chargement du moyen de paiement...</div>
      ) : paymentError ? (
        <div className="text-center py-4 text-red-500">Erreur lors du chargement du moyen de paiement.</div>
      ) : paymentMethod ? (
        <div className="bg-meko-blue-dark rounded-lg p-4 flex flex-col gap-3 items-center">
          <Typography as="p" className="text-white text-center mb-2">
            Les paiements seront réglés par la carte suivante.
          </Typography>
          <div className="flex flex-row justify-between items-center w-full bg-meko-blue-light-2 rounded px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl text-white font-mono tracking-widest">•••• •••• •••• {paymentMethod.last4}</span>
            </div>
            <div className="text-white text-lg font-bold">
              {paymentMethod.expMonth.toString().padStart(2, '0')}/{paymentMethod.expYear}
            </div>
          </div>
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded shadow text-base transition mt-2 disabled:opacity-60"
            disabled={isUpdatingCard}
            onClick={() => {
              const returnUrl = window.location.href;
              updateCard(
                { returnUrl },
                {
                  onSuccess: (res) => {
                    if (res.success && res.url) {
                      window.location.href = res.url;
                    }
                  }
                }
              );
            }}
          >
            {isUpdatingCard ? 'Redirection...' : 'MODIFIER'}
          </button>
        </div>
      ) : null}
    </div>
  );
}
