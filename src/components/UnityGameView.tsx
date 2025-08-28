import React from 'react';
import { unityGameRegistry } from '@/services/unity/registry';
import { UnityGameConfig, useUnityLoader } from '@/app/game-sessions/hooks/use-unity-loader';
import { countingMachineEventBus } from '@/services/unity/games/counting-machine/event-bus';
import { CountingMachineMessageType, CountingMachineParsedMessage } from '@/services/unity/games/counting-machine/types';
import { useEffect } from 'react';
import { useUnityGameHandler } from '@/app/game-sessions/hooks/use-unity-game-handler';
import { useUnityEvents } from '@/app/game-sessions/hooks/use-unity-events';
import { Unity } from 'react-unity-webgl';
import type { UnityProvider } from 'react-unity-webgl/distribution/types/unity-provider';
import UnityLoader from '../app/game-sessions/components/unity/unity-loader';
import UnityAside from '../app/game-sessions/components/unity/unity-aside';
import { FullscreenIcon } from 'lucide-react';

type UnityGameInfo = {
    title: string;
    coverUrl: string;
};
interface UnityGameViewProps {
    game: keyof typeof unityGameRegistry | string;
    config: UnityGameConfig;
    info: UnityGameInfo

}

export const UnityGameView: React.FC<UnityGameViewProps> = ({ game, config, info }) => {
    const {
        unityProvider,
        isLoaded,
        loadingProgression,
        requestFullscreen
    } = useUnityLoader({ name: game as keyof typeof unityGameRegistry, config, goalList: ["100", "200", "300"] });
    const handleUnityMessage = useUnityGameHandler(game as keyof typeof unityGameRegistry);
    const parseUnityMessage = unityGameRegistry[game as keyof typeof unityGameRegistry]?.parse;

    useUnityEvents(
        (msg: string) => {
            const parsed = parseUnityMessage ? parseUnityMessage(msg) : null;
            if (parsed && typeof handleUnityMessage === 'function') handleUnityMessage(parsed);
        },
        isLoaded
    );


    useEffect(() => {
        let offFns: Array<() => void> = [];
        if (game === 'counting-machine') {
            const onWrong = (msg: CountingMachineParsedMessage) => {

            };
            const onDone = (msg: CountingMachineParsedMessage) => {

            };
            countingMachineEventBus.on(CountingMachineMessageType.WRONG_VALUE, onWrong);
            countingMachineEventBus.on(CountingMachineMessageType.DONE, onDone);
            offFns = [
                () => countingMachineEventBus.off(CountingMachineMessageType.WRONG_VALUE, onWrong),
                () => countingMachineEventBus.off(CountingMachineMessageType.DONE, onDone)
            ];
        }
        return () => { offFns.forEach(fn => fn()); };
    }, [game]);

    const isValidGame = game in unityGameRegistry;
    console.log('isLoaded', isLoaded);
    return (
        <div className={`unity-game-modal z-50 flex items-center justify-center bg-black bg-opacity-40 transition-all`}>
            <div className={`dark:bg-meko-blue-dark rounded-xl shadow-2xl flex w-[900px] h-[540px] overflow-hidden relative`}>

                <UnityAside 
                    title={info.title}
                    coverUrl={info.coverUrl}
                    game={game}
                    isValidGame={isValidGame}
                />
                <main className="flex-1 flex items-center justify-center  relative bg-meko-blue-light-2 dark:bg-meko-blue-dark">
                    {isValidGame ? (
                        <>
                            {!isLoaded && <UnityLoader loadingProgression={loadingProgression} />}
                            {isLoaded && typeof requestFullscreen === 'function' && (
                                <button
                                    onClick={() => requestFullscreen(true)}
                                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-meko-blue-dark/80 hover:bg-meko-blue-light-2 hover:scale-105 transition-all border border-meko-blue-light-2 dark:border-meko-blue-light-1 shadow"
                                    title="Plein écran"
                                >
                                  <FullscreenIcon className='text-meko-blue-flat'/>
                                </button>
                            )}
                            <Unity unityProvider={unityProvider as UnityProvider} style={{ width: '100%', height: '100%', boxShadow: '0 2px 8px #0001' }} />
                        </>
                    ) : null}
                </main>
            </div>
        </div>
    );
};
