import { Component, ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    // i18n hook must be used in a function component, so we wrap the error UI in a function
    const ErrorContent = () => {
      const { t } = useTranslation();
      return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-8 bg-meko-blue-dark text-white">
          <img src="/logo-circle.svg" alt={t('errorBoundary.logoAlt', 'Erreur')} className="w-20 h-20 mb-6 opacity-80" />
          <h1 className="text-3xl font-bold mb-2 text-red-400 drop-shadow">{t('errorBoundary.title', 'Oups, une erreur est survenue')}</h1>
          <p className="mb-4 text-lg text-meko-blue-light-1">{t('errorBoundary.techIssue', "Un problème technique empêche l'affichage de la page.")}</p>
          <p className="mb-6 text-sm text-gray-300">{t('errorBoundary.suggestion', "Vous pouvez réessayer, revenir à l'accueil ou contacter le support si le problème persiste.")}</p>
          <pre className="bg-red-50 text-red-700 text-xs p-3 rounded max-w-xl overflow-x-auto border border-red-200 mb-4 text-left">
            {this.state.error?.message}
          </pre>
          <a href="/" className="inline-block bg-meko-blue-light-1 hover:bg-meko-blue text-meko-blue-dark font-semibold px-6 py-2 rounded transition">{t('errorBoundary.cta', "Retour à l'accueil")}</a>
        </div>
      );
    };
    if (this.state.hasError) {
      return <ErrorContent />;
    }
    return this.props.children;
  }
}
