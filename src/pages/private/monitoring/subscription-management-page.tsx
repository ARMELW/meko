import { useTranslation } from 'react-i18next';
import { Typography } from '@/components';
import { useCurrentSubscription } from '@/app/subscription/hooks/use-current-subscription';
import { InvoiceHistoryBlock } from '@/app/subscription/components/invoice-history-block';
import { PaymentMethodBlock } from '@/app/subscription/components/payment-method-block';
import { CurrentSubscriptionBlock } from '@/app/subscription/components/current-subscription-block';
export function SubscriptionManagementPage() {
  const { t } = useTranslation();
  const { data: subscription,
    isLoading,
    error,
    refetch: refetchSubscription
  } = useCurrentSubscription();
  return (
    <div className="min-h-screen p-2 sm:p-4">
      <div className="max-w-2xl mx-auto w-full">
        <div className="mb-4">
          <Typography as="h3" weight="bold" className="text-xl sm:text-3xl mb-2">
            {t('menu.childOptions.subscriptions')}
          </Typography>
          <hr className="my-2 text-white" />
        </div>

        <div className="w-full">
          <PaymentMethodBlock />
          {isLoading ? (
            <div className="text-center py-8">Chargement...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">Erreur de chargement</div>
          ) : subscription ? (
            <CurrentSubscriptionBlock
              subscription={subscription}
              refetchSubscription={refetchSubscription}
            />
          ) : (
            <div className="text-center py-8 text-gray-500">Aucun abonnement trouvé.</div>
          )}
        </div>
      </div>
      <InvoiceHistoryBlock />
    </div>
  );
}
