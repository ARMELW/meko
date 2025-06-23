import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, Typography } from '@/components';
import { LoadingButton } from '@/components/atoms/actions/loading-button';
import { Separator } from '@radix-ui/react-select';

export function SubscriptionManagementPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Typography as="h3" weight="bold" className="text-3xl mb-2">
            {t('menu.childOptions.subscriptions')}
          </Typography>
          <hr className="my-2 text-white" />
          
        </div>

        <div className="grid gap-6 md:grid-cols-2">

        </div>
      </div>
    </div>
  );
}
