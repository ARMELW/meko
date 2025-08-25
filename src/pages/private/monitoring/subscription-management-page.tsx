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
  <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <Typography as="h3" weight="bold" className="text-xl sm:text-3xl mb-2">
            {t('menu.childOptions.subscriptions')}
          </Typography>
          <hr className="my-2 text-white" />
        </div>

        <div className="w-full flex flex-col gap-6 md:flex-row md:gap-8 items-start">
          <div className="w-full md:w-2/3">
            {isLoading && (
              <div className="text-center py-8">{t('common.loading', 'Chargement...')}</div>
            )}
            {subscription && (
              <CurrentSubscriptionBlock
                subscription={subscription}
                refetchSubscription={refetchSubscription}
              />
            )}
          </div>
          <div className="w-full md:w-1/3">
            <PaymentMethodBlock />
          </div>
        </div>
        <div className="mt-6">
          <InvoiceHistoryBlock />
        </div>
      </div>
      
    </div>
  );
}
