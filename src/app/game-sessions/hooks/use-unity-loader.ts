import { useCallback, useState } from 'react';
import { useUnityContext } from 'react-unity-webgl';
import { unityGameRegistry } from '@/services/unity/registry';
import { useUnityEvents } from './use-unity-events';
import { useUnitySync } from './use-unity-sync';
import { CountingMachineMessageType } from '@/services/unity/games/counting-machine/types';


export interface UnityGameConfig {
    loaderUrl: string;
    dataUrl: string;
    frameworkUrl: string;
    codeUrl: string;
    streamingAssetsUrl?: string;
}

interface UseUnityLoaderProps {
    config: UnityGameConfig;
    name?: keyof typeof unityGameRegistry;
    goalList?: string[];
}


interface UseUnityLoaderReturn {
    unityProvider: unknown;
    isLoaded: boolean;
    loadingProgression: number;
    requestFullscreen: (enabled: boolean) => void;
    currentValue: number;
    currentGoalList: number;
    sendMessage: (gameObject: string, methodName: string, parameter?: string | number) => void;
}


type Handler = (msg: unknown) => void;

export function useUnityLoader({
    config,
    name,
    goalList = [],
}: UseUnityLoaderProps): UseUnityLoaderReturn {
    const [currentValue, setCurrentValue] = useState<number>(0);
    const [currentGoalList, setCurrentGoalList] = useState<number>(0);

    const parser = name && typeof unityGameRegistry[name]?.parse === 'function'
        ? (unityGameRegistry[name]?.parse as (msg: string) => unknown)
        : undefined;
    const { unityProvider, isLoaded, loadingProgression, requestFullscreen, sendMessage } = useUnityContext(config);
   

    const handleUnityMessage = useCallback(
        (message: string) => {
            const parsed = typeof parser === 'function' ? parser(message) : null;
            if (parsed && name) {
             
                const parsedMsg = parsed as { type: string; [key: string]: any };
                const handlers = unityGameRegistry[name]?.handlers as Record<string, Handler>;
                const handler = handlers?.[parsedMsg.type as string];
                if (handler) handler(parsedMsg);
                if ('numericValue' in parsedMsg && typeof parsedMsg.numericValue === 'number') {
                    if (parsedMsg.type !== CountingMachineMessageType.ADD_GOAL) {
                        setCurrentValue(parsedMsg.numericValue);
                    }
                    setCurrentGoalList(parsedMsg.numericValue);
                }
            }
        },
        [parser, name]
    );

    useUnityEvents(handleUnityMessage, isLoaded);
    useUnitySync(isLoaded, sendMessage, currentValue, goalList);

    return {
        unityProvider,
        isLoaded,
        loadingProgression,
        requestFullscreen,
        currentValue,
        currentGoalList,
        sendMessage,
    };
}