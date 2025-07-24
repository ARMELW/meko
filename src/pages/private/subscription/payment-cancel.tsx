import { Typography } from '@/components';
import { useTranslation } from 'react-i18next';

export default function PaymentCancelPage() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Typography variant="h2" className="mb-4 text-meko-blue-darker">
        {t('subscription.payment.cancel.title', 'Paiement annulé')}
      </Typography>
      <Typography variant="p" className="mb-6">
        {t('subscription.payment.cancel.message', 'Votre paiement a été annulé. Vous pouvez réessayer ou choisir une autre offre.')}
      </Typography>
      <a href="/" className="meko-btn-primary">
        {t('subscription.payment.cancel.cta', 'Retour aux offres')}
      </a>
    </div>
  );
}
