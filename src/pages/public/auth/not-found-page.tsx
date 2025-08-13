import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
export const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-meko-blue-dark text-white px-4">
      <img src="/logo-circle.svg" alt="Meko Academy" className="w-24 h-24 mb-6 opacity-80" />
      <h1 className="text-5xl font-bold mb-2">404</h1>
      <h2 className="text-2xl font-semibold mb-4">{t('notFound.title', "Oups, cette page n'existe pas !")}</h2>
      <p className="mb-8 text-center max-w-md">
        {t('notFound.message', "La page que vous cherchez est introuvable ou vous n'avez pas les droits d'accès.")}<br />
        {t('notFound.suggestion', "Retournez à l'accueil ou contactez un administrateur si besoin.")}
      </p>
      <button
        className="bg-meko-blue-light-1 hover:bg-meko-blue text-meko-blue-dark font-semibold px-6 py-2 rounded transition"
        onClick={() => navigate('/')}
      >
        {t('notFound.cta', "Retour à l'accueil")}
      </button>
    </div>
  );
}