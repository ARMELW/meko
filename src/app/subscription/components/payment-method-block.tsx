import { Button, Card, CardContent, CardTitle, Typography } from '@/components';
import { useUpdatePaymentMethod } from '@/app/subscription/hooks/use-update-payment-method';
import { usePaymentMethod } from '@/app/subscription/hooks/use-payment-method';

export function PaymentMethodBlock() {
  const { mutate: updateCard, isPending: isUpdatingCard } = useUpdatePaymentMethod();
  const { data: paymentMethod, isLoading: isPaymentLoading, error: paymentError } = usePaymentMethod();

  return (
    <div className="mb-6">

      <Card>
        <CardTitle title="MOYEN DE PAIEMENT" />
        <CardContent className="h-[400px]  justify-center">

          {isPaymentLoading ? (
            <div className="text-center py-4 text-white">Chargement du moyen de paiement...</div>
          ) : paymentError ? (
            <div className="text-center py-4 text-red-500">Erreur lors du chargement du moyen de paiement.</div>
          ) : paymentMethod ? (
            <div className="bg-meko-blue-dark rounded-lg p-4 flex flex-col gap-3 items-center">
              <Typography as="p" className="text-white text-center mb-2">
                Les paiements seront réglés par la carte suivante.
              </Typography>
              <div className="flex flex-row bg-meko-blue-transparent-2 justify-between items-center w-full bg-meko-blue-light-2 rounded-2xls px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg text-white font-mono">•••• •••• •••• {paymentMethod.last4}</span>
                </div>
                <div className="text-white text-lg font-bold">
                  {paymentMethod.expMonth.toString().padStart(2, '0')}/{paymentMethod.expYear}
                </div>
              </div>
              <Button
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
              </Button>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
