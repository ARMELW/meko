import React from 'react';
import CountingMachineAssistant from './counting-machine-assistant';

interface UnityAsideProps {
  title: string;
  coverUrl?: string;
  description?: string;
  isValidGame: boolean;
  goal: string | number | undefined;
  attempt?: number;
  sendMessage?: (gameObject: string, method: string, parameter: string) => void;
  completed: () => void;
}

const UnityAside: React.FC<UnityAsideProps> = ({ 
  title,
  attempt,
  isValidGame, 
  sendMessage, 
  goal,
  completed

}) => (
  <aside className="h-full flex flex-col p-6 game-bg">
    {isValidGame ? (
      <>
        {/* Header du panneau */}
        <div className="flex-shrink-0 mb-6">
          <h2 className="text-xl font-bold uppercase mb-4  text-meko-blue-darker dark:text-white">
            {title} 
          </h2>
        </div>

        {/* Objectif actuel */}
        {goal !== undefined && (
          <div className="flex-shrink-0 mb-6">
            <div className="bg-white/10 dark:bg-black/20 rounded-lg p-4 border border-meko-blue-light-2/30 dark:border-gray-600/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-meko-blue-dark dark:text-meko-blue-light-2">
                  Objectif actuel
                </span>
              {attempt !== undefined && (
                <div className="mt-2 text-xs text-meko-blue-dark dark:text-meko-blue-light-2">
                  Nombre d'essais : <span className="font-semibold">{attempt}</span>
                </div>
              )}
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="text-3xl font-bold text-meko-blue-darker dark:text-white font-mono">
                {goal}
              </div>
            </div>
          </div>
        )}

        {/* Assistant - prend le reste de l'espace */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="bg-white/5 dark:bg-black/10 rounded-lg p-2 border border-meko-blue-light-2/20 dark:border-gray-600/20 flex-1 flex flex-col">
            <h3 className="text-lg font-semibold mb-3 text-meko-blue-darker dark:text-white flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              Assistant 
            </h3>
            <div className="flex-1 min-h-0">
              <CountingMachineAssistant sendMessage={sendMessage} completed={completed} />
            </div>
          </div>
        </div>
      </>
    ) : (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎮</div>
          <div className="text-red-600 dark:text-red-400 font-semibold text-lg">
            Jeu non disponible
          </div>
          <div className="text-meko-blue-dark dark:text-meko-blue-light-1 text-sm mt-2">
            Vérifiez la configuration du jeu
          </div>
        </div>
      </div>
    )}
  </aside>
);

export default UnityAside;