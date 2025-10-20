import React from 'react';

interface UnityLoaderProps {
  loadingProgression: number;
}

const UnityLoader: React.FC<UnityLoaderProps> = ({ loadingProgression }) => {
  const percentage = Math.round(loadingProgression * 100);
  
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gray-900/80">
      <div className="w-full max-w-md px-8 flex flex-col items-center">
        
        {/* Logo simple */}
        <div className="mb-8 flex flex-col items-center">
          <div className="w-16 h-16 bg-white rounded-full p-3 mb-4 shadow-lg">
            <img 
              src='/favicon.svg' 
              className='w-full h-full'
              alt="Logo"
            />
          </div>
          <h2 className="text-white font-bold text-xl mb-2">
            Chargement du jeu
          </h2>
        </div>

        {/* Barre de progression */}
        <div className="w-full mb-6">
          <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Pourcentage */}
        <div className="text-3xl font-bold text-white mb-4">
          {percentage}%
        </div>

        {/* Message de statut */}
        <div className="text-gray-300 text-sm text-center">
          {percentage < 30 ? 'Initialisation...' : 
           percentage < 60 ? 'Chargement des ressources...' :
           percentage < 90 ? 'Finalisation...' : 
           'Prêt à jouer !'}
        </div>
      </div>
    </div>
  );
};

export default UnityLoader;