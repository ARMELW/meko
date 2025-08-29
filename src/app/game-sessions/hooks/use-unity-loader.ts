import { useCallback, useState } from 'react';
import { useUnityContext } from 'react-unity-webgl';
import { unityGameRegistry } from '@/services/unity/registry';
import { useUnityEvents } from './use-unity-events';
import { useUnitySync } from './use-unity-sync';


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

    const parser = name ? unityGameRegistry[name]?.parse : undefined;
    const { unityProvider, isLoaded, loadingProgression, requestFullscreen, sendMessage } = useUnityContext(config);

    const handleUnityMessage = useCallback(
        (message: string) => {
            const parsed = parser ? parser(message) : null;
            if (parsed && name) {
                const handlers = unityGameRegistry[name]?.handlers as Record<string, Handler>;
                const handler = handlers?.[parsed.type as string];
                if (handler) handler(parsed);
                if ('numericValue' in parsed && typeof parsed.numericValue === 'number') {
                    setCurrentValue(parsed.numericValue);
                    setCurrentGoalList(parsed.numericValue);
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