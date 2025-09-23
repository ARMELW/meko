import React from 'react';

interface UnityLoaderProps {
  loadingProgression: number;
}

const UnityLoader: React.FC<UnityLoaderProps> = ({ loadingProgression }) => {
  const percentage = Math.round(loadingProgression * 100);
  
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center  transition-all duration-500">
      {/* Particules d'arrière-plan */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 dark:bg-white/5 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-md px-8 flex flex-col items-center">
        {/* Logo avec animation */}
        <div className="mb-8 flex flex-col items-center">
          <div className="relative w-24 h-24 flex items-center justify-center mb-4">
            {/* Cercles animés en arrière-plan */}
            <div className="absolute inset-0 rounded-full border-2 border-meko-blue-light-2/30 dark:border-meko-blue-light-1/20 animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-2 border-meko-blue-light-2/50 dark:border-meko-blue-light-1/30 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '3s' }}></div>
            
            {/* Logo central */}
            <div className="relative rounded-full border-4 border-white/80 dark:border-meko-blue-light-1/80 p-3 bg-white dark:bg-meko-blue-dark shadow-xl backdrop-blur-sm">
              <img 
                src='/favicon.svg' 
                className='w-12 h-12 rounded-full filter drop-shadow-lg'
                alt="Logo du jeu"
              />
            </div>
          </div>
          
          <h2 className="text-meko-blue-darker dark:text-white font-bold text-xl tracking-wide mb-2">
            Chargement du jeu
          </h2>
          <p className="text-meko-blue-dark dark:text-meko-blue-light-2 text-sm text-center opacity-80">
            Préparation de l'expérience immersive...
          </p>
        </div>

        {/* Barre de progression moderne */}
        <div className="w-full mb-6">
          <div className="relative w-full h-4 bg-white/20 dark:bg-black/30 rounded-full overflow-hidden shadow-inner backdrop-blur-sm border border-white/30 dark:border-gray-600/30">
            {/* Barre de progression avec gradient animé */}
            <div
              className="h-full bg-gradient-to-r from-meko-blue-darker via-blue-500 to-meko-blue-darker dark:from-meko-blue-light-1 dark:via-blue-400 dark:to-meko-blue-light-1 transition-all duration-300 ease-out relative overflow-hidden"
              style={{ width: `${percentage}%` }}
            >
              {/* Effet de brillance */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              {/* Animation de mouvement */}
              {percentage > 0 && (
                <div className="absolute top-0 right-0 w-4 h-full bg-gradient-to-l from-white/40 to-transparent animate-pulse"></div>
              )}
            </div>
            
            {/* Points de progression */}
            <div className="absolute inset-0 flex items-center">
              {[25, 50, 75].map(point => (
                <div
                  key={point}
                  className={`absolute w-2 h-2 rounded-full transition-all duration-300 ${
                    percentage >= point 
                      ? 'bg-white shadow-lg scale-125' 
                      : 'bg-white/50 scale-100'
                  }`}
                  style={{ left: `${point}%`, transform: 'translateX(-50%)' }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Pourcentage avec animation */}
        <div className="text-center mb-4">
          <div className="text-4xl font-bold font-mono text-meko-blue-darker dark:text-white tracking-wider mb-2">
            {percentage}%
          </div>
          <div className="flex items-center justify-center gap-2 text-meko-blue-dark dark:text-meko-blue-light-2 text-sm">
            <div className="flex space-x-1">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="w-2 h-2 bg-current rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.3}s` }}
                />
              ))}
            </div>
            <span className="font-medium">
              {percentage < 30 ? 'Initialisation' : 
               percentage < 60 ? 'Chargement des ressources' :
               percentage < 90 ? 'Finalisation' : 
               'Prêt à jouer'}
            </span>
          </div>
        </div>

        {/* Conseils de chargement */}
        <div className="text-center">
          <p className="text-xs text-meko-blue-dark/70 dark:text-meko-blue-light-2/70 italic">
            {percentage < 50 
              ? "Astuce : Utilisez les raccourcis clavier pour une meilleure expérience"
              : percentage < 80
              ? "L'assistant sera disponible dès le début de la partie"
              : "Presque terminé ! Le jeu va bientôt commencer"}
          </p>
        </div>
      </div>

      {/* Effet de lueur en arrière-plan */}
      <div className="absolute inset-0 bg-gradient-radial from-meko-blue-light-2/10 via-transparent to-transparent dark:from-meko-blue-light-1/5 pointer-events-none"></div>
    </div>
  );
};

export default UnityLoader;