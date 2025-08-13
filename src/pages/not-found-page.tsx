import { useNavigate } from 'react-router';

export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-meko-blue-dark text-white px-4">
      <img src="/logo-circle.svg" alt="Meko Academy" className="w-24 h-24 mb-6 opacity-80" />
      <h1 className="text-5xl font-bold mb-2">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Oups, cette page n'existe pas !</h2>
      <p className="mb-8 text-center max-w-md">
        La page que vous cherchez est introuvable ou vous n'avez pas les droits d'accès.<br />
        Retournez à l'accueil ou contactez un administrateur si besoin.
      </p>
      <button
        className="bg-meko-blue-light-1 hover:bg-meko-blue text-meko-blue-dark font-semibold px-6 py-2 rounded transition"
        onClick={() => navigate('/')}
      >
        Retour à l'accueil
      </button>
    </div>
  );
}