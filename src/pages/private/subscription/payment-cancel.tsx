import { Button } from '@/components';
import { Typography } from '@/components/atoms/typography/typography';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
export default function PaymentCancelPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] relative">
      <Typography 
        variant="h2" 
        className="mb-4 text-meko-blue-darker font-extrabold text-2xl sm:text-3xl md:text-4xl text-center animate-pulse flex items-center gap-2"
      >
        😕 {t('subscription.payment.cancel.title', 'Paiement annulé')}
      </Typography>
      <Typography 
        variant="p" 
        className="mb-6 text-lg sm:text-xl text-meko-blue-dark text-center"
      >
        {t('subscription.payment.cancel.message', 'Votre paiement a été annulé. Vous pouvez réessayer ou choisir une autre offre.')}
      </Typography>
      <Button
        type="button"
        aria-label={t('subscription.payment.cancel.cta', 'Retour aux offres')}
        onClick={() => navigate('/')}
      >
        🔙 {t('subscription.payment.cancel.cta', 'Retour aux offres')}
      </Button>
    </div>
  );
}
