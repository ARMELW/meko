import { Typography } from '@/components';
import { useTranslation } from 'react-i18next';

export default function PaymentSuccessPage() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Typography variant="h2" className="mb-4 text-meko-blue-darker">
        {t('subscription.payment.success.title', 'Paiement réussi !')}
      </Typography>
  <Typography variant="p" className="mb-6">
        {t('subscription.payment.success.message', 'Votre paiement a été validé. Merci pour votre confiance !')}
      </Typography>
      <a href="/dashboard" className="meko-btn-primary">
        {t('common.dashboard', 'Aller au tableau de bord')}
      </a>
    </div>
  );
}
