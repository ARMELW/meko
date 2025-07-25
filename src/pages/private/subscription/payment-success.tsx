import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Button, Typography } from '@/components'
import { useNavigate } from 'react-router';
export default function PaymentSuccessPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#2563eb', '#38bdf8', '#fbbf24', '#22c55e', '#ef4444'],
    });
    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 100,
        origin: { x: 0, y: 0.7 },
        colors: ['#2563eb', '#38bdf8', '#fbbf24', '#22c55e', '#ef4444'],
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 100,
        origin: { x: 1, y: 0.7 },
        colors: ['#2563eb', '#38bdf8', '#fbbf24', '#22c55e', '#ef4444'],
      });
    }, 400);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] relative">
      <Typography
        variant="h2"
        className="mb-4 text-meko-blue-darker font-extrabold text-2xl sm:text-3xl md:text-4xl text-center animate-bounce flex items-center gap-2"
      >
        🎉 {t('subscription.payment.success.title', 'Paiement réussi !')}
      </Typography>
      <Typography
        variant="p"
        className="mb-6 text-lg sm:text-xl text-meko-blue-dark text-center"
      >
        {t('subscription.payment.success.message', 'Votre paiement a été validé. Merci pour votre confiance !')}
      </Typography>
      <Button
        type="button"
        className="meko-btn-primary px-6 py-3 rounded-full shadow-lg text-lg font-semibold transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-meko-blue-light-1 flex items-center gap-2"
        aria-label={t('subscription.payment.success.cta', 'Créer vos premiers enfants')}
        onClick={() => navigate('/profile/create-child')}
      >
        👶 {t('subscription.payment.success.cta', 'Créer vos premiers enfants')}
      </Button>
    </div>
  );
}
