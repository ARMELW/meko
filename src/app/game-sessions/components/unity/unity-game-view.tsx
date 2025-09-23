import React from 'react';

import { unityGameRegistry } from '@/services/unity/registry';
import { UnityGameConfig, useUnityLoader } from '@/app/game-sessions/hooks/use-unity-loader';

import { useUnityGameHandler } from '@/app/game-sessions/hooks/use-unity-game-handler';
import { useUnityEvents } from '@/app/game-sessions/hooks/use-unity-events';
import { Unity } from 'react-unity-webgl';
import type { UnityProvider } from 'react-unity-webgl/distribution/types/unity-provider';
import UnityLoader from './unity-loader';
import UnityAside from './unity-aside';
import { useAssistantContextStore } from '@/app/assistant/store';
import { useAssistantStore } from './assistantStore';


type UnityGameInfo = {
    title: string;
    coverUrl: string;
};

import { X } from 'lucide-react';

interface UnityGameViewProps {
    game: keyof typeof unityGameRegistry | string;
    config: UnityGameConfig;
    info: UnityGameInfo;
    start: () => Promise<void>;
    completed: () => Promise<void>;
    onClose?: () => void;
}

export const UnityGameView: React.FC<UnityGameViewProps> = ({ game, config, info, start, completed, onClose }) => {
    const { isLoading } = useAssistantStore();
    const [hasLoadedOnce, setHasLoadedOnce] = React.useState(false);

    const generateGoals = (count = 5, min = 10, max = 999) =>
        Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);
    const goalList = React.useMemo(() => generateGoals(10, 10, 999).map(String), []);
    
    const {
        unityProvider,
        isLoaded,
        loadingProgression,
        requestFullscreen,
        sendMessage
    } = useUnityLoader({ name: game as keyof typeof unityGameRegistry, config, goalList });
    
    const { goal, setGoal } = useAssistantContextStore();
    const handleUnityMessage = useUnityGameHandler(game as keyof typeof unityGameRegistry);
    const parseUnityMessage = unityGameRegistry[game as keyof typeof unityGameRegistry]?.parse;

    useUnityEvents(
        (msg: string) => {
            const parsed = typeof parseUnityMessage === 'function' ? parseUnityMessage(msg) : null;
            if (parsed && typeof handleUnityMessage === 'function') handleUnityMessage(parsed);
        },
        isLoaded
    );

    React.useEffect(() => {
        if (isLoaded && goalList.length > 0) {
            setGoal(Number(goalList[0]));
            start();
            if (!hasLoadedOnce) setHasLoadedOnce(true);
        }
    }, [isLoaded, goalList, hasLoadedOnce]);

    const isValidGame = game in unityGameRegistry;
    const { isAssistantSpeaking } = useAssistantContextStore();

  

    return (
        <div className="unity-game-modal fixed inset-0 z-50 flex bg-black">
            {/* Panneau latéral - toujours visible */}

            <div className="w-80 h-full bg-white/95 dark:bg-meko-blue-dark/95 backdrop-blur-md border-r border-white/20 dark:border-gray-700 shadow-2xl overflow-y-auto relative">
                {/* Bouton de fermeture en haut à droite */}
                {onClose && (
                    <button
                        onClick={onClose}
                        aria-label="Fermer le jeu"
                        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-meko-blue-light-2 text-meko-blue-dark hover:text-meko-blue-flat shadow border border-meko-blue-light-2 transition-all focus:outline-none focus:ring-2 focus:ring-meko-blue-flat"
                        type="button"
                    >
                        <X size={20} />
                    </button>
                )}
                <UnityAside
                    title={info.title}
                    coverUrl={info.coverUrl}
                    isValidGame={isValidGame}
                    sendMessage={sendMessage}
                    goal={goal}
                    attempt={useAssistantContextStore.getState().attempt}
                    goalIndex={useAssistantContextStore.getState().goal ? goalList.findIndex(g => Number(g) === useAssistantContextStore.getState().goal) + 1 : 1}
                    goalTotal={goalList.length}
                    completed={completed}
                />
            </div>

            <main className="flex-1 flex flex-col relative bg-meko-blue-flat">
                
                <div className="flex-1 flex items-center justify-center">
                    {isValidGame ? (
                        <div className="relative w-full h-full flex items-center justify-center">

                            <div className={`w-full h-full max-w-none ${isAssistantSpeaking ? 'filter blur-xs pointer-events-none select-none' : ''}`}>
                                <Unity
                                    unityProvider={unityProvider as UnityProvider}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        maxWidth: 'none',
                                        maxHeight: 'none',
                                        borderRadius: '8px',
                                        overflow: 'hidden'
                                    }} 
                                />
                            </div>

                            {/* Overlay de chargement : affiché uniquement au tout premier chargement */}
                            {(!isLoaded) && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10">
                                    <div className="text-center">
                                      
                                            <UnityLoader loadingProgression={loadingProgression} />
                                      
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center">
                            <div className="text-red-400 text-xl font-semibold mb-2">
                                Jeu non disponible
                            </div>
                            <div className="text-white/70">
                                Le jeu <span className="font-mono bg-white/10 px-2 py-1 rounded">{game}</span> n'existe pas ou n'est pas disponible.
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default UnityGameView;