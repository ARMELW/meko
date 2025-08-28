import React from 'react';

interface UnityLoaderProps {
  loadingProgression: number;
}

const UnityLoader: React.FC<UnityLoaderProps> = ({ loadingProgression }) => (
  <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-meko-blue-flat transition-all">
    <div className="w-2/3 max-w-xs flex flex-col items-center">
      <div className="mb-4 flex flex-col items-center">
        <div className="w-20 h-20 flex items-center justify-center mb-2">
          <div className="rounded-full border-4 border-meko-blue-light-2 dark:border-meko-blue-light-1 p-2 bg-white dark:bg-meko-blue-dark">
            <img src='/favicon.svg' className='w-12 h-12 rounded-full'/>
          </div>
        </div>
        <span className="text-meko-blue-darker dark:text-meko-blue-light-1 font-semibold text-lg tracking-wide">Chargement du jeu...</span>
      </div>
      <div className="w-full h-3 bg-meko-blue-light-2 dark:bg-meko-blue-flat rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full bg-meko-blue-darker dark:bg-meko-blue-light-1 transition-all duration-300"
          style={{ width: `${Math.round(loadingProgression * 100)}%` }}
        ></div>
      </div>
      <div className="mt-2 text-center text-meko-blue-dark dark:text-meko-blue-light-2 text-sm font-mono tracking-widest">
        {Math.round(loadingProgression * 100)}%
      </div>
    </div>
  </div>
);

export default UnityLoader;
