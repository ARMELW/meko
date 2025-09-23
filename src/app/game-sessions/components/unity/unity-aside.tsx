import React from 'react';
import CountingMachineAssistant from './counting-machine-assistant';
type UnityAsideProps = {
  title: string;
  coverUrl?: string;
  description?: string;
  isValidGame: boolean;
  goal: string | number | undefined;
  attempt?: number;
  goalIndex?: number;
  goalTotal?: number;
  timer?: number;
  sendMessage?: (gameObject: string, method: string, parameter: string) => void;
  completed: () => void;
}
function formatDisplayedTime(seconds: number): string {
	const min = Math.floor(seconds / 60).toString().padStart(2, '0');
	const sec = (seconds % 60).toString().padStart(2, '0');
	return `${min}:${sec}`;
}

const UnityAside: React.FC<UnityAsideProps> = ({ 
  title,
  attempt,
  isValidGame, 
  sendMessage, 
  goal,
  goalIndex,
  goalTotal,
  timer,
  completed
}) => (
  <aside className="h-full flex flex-col p-6 game-bg">
    {isValidGame ? (
      <>

        {/* Header du panneau + Chronomètre mis en avant */}
        <div className="flex-shrink-0 mb-6">
          <h2 className="text-xl font-bold uppercase mb-2 text-meko-blue-darker dark:text-white">
            {title}
          </h2>
          {timer !== undefined && (
            <div className="flex items-center justify-center gap-2 bg-meko-blue-light-2/90 dark:bg-meko-blue-flat/80 rounded-full mt-4 px-4 py-2 mb-2 shadow border border-meko-blue-light-2/60 dark:border-meko-blue-light-1/40">
              <svg className="w-6 h-6 text-meko-blue-darker dark:text-meko-blue-light-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
              </svg>
              <span className="text-2xl font-mono font-extrabold text-meko-blue-darker dark:text-meko-blue-light-1 tracking-widest">
                {formatDisplayedTime(timer)}
              </span>
            </div>
          )}
        </div>

        {/* Objectif actuel */}
        {goal !== undefined && (
          <div className="flex-shrink-0 mb-6">
            <div className="bg-white/10 dark:bg-black/20 rounded-lg p-4 border border-meko-blue-light-2/30 dark:border-gray-600/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-meko-blue-dark dark:text-meko-blue-light-2">
                  Objectif actuel
                </span>
              
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="text-3xl font-bold text-meko-blue-darker dark:text-white font-mono">
                {goal}
              </div>
              {(goalIndex !== undefined && goalTotal !== undefined) && (
                <div className="mt-2 text-xs text-meko-blue-dark dark:text-meko-blue-light-2">
                  Objectif : <span className="font-semibold">{goalIndex}/{goalTotal}</span>
                </div>
              )}
              {attempt !== undefined && (
                <div className="mt-1 text-xs text-meko-blue-dark dark:text-meko-blue-light-2">
                  Nombre d'essais : <span className="font-semibold">{attempt}</span>
                </div>
              )}
              {/* Chrono déjà affiché en haut, ne pas dupliquer ici */}
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