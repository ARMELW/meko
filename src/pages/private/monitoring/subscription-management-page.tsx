import { useTranslation } from 'react-i18next';
import { Typography } from '@/components';
import { useCurrentSubscription } from '@/app/subscription/hooks/use-current-subscription';
import { PaymentMethodBlock } from '@/app/subscription/components/payment-method-block';
import { CurrentSubscriptionBlock } from '@/app/subscription/components/current-subscription-block';
import { InvoiceHistoryBlock } from '@/app/subscription/components/invoice-history-block';
export function SubscriptionManagementPage() {
  const { t } = useTranslation();
  const { data: subscription,
    isLoading,
    refetch: refetchSubscription
  } = useCurrentSubscription();
  return (
    <div className="min-h-screen p-2 sm:p-4">
      <div className="px-28 mx-auto w-full">
        <div className="mb-4">
          <Typography as="h3" weight="bold" className="text-xl sm:text-3xl mb-2">
            {t('menu.childOptions.subscriptions')}
          </Typography>
          <hr className="my-2 text-white" />
        </div>

        <div className="w-full flex flex-col gap-6 md:flex-row md:gap-8">
          <div className="flex-1">
            {isLoading && (
              <div className="text-center py-8">Chargement...</div>
            )}
            {subscription && (
              <CurrentSubscriptionBlock
                subscription={subscription}
                refetchSubscription={refetchSubscription}
              />
            )}
          </div>
          <div className="flex-1">

            <PaymentMethodBlock />
          </div>
        </div>
        <InvoiceHistoryBlock />
      </div>
      
    </div>
  );
}
