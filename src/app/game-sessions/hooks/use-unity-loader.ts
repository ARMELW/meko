import { useCallback, useEffect, useState } from 'react';
import { useUnityContext } from 'react-unity-webgl';
import {
    ParsedUnityMessage,
    processUnityMessage,
    unityEventBus,
    UnityMessageType
} from '@/services/unity/helpers';
import { useUnityEvents } from './use-unity-events';
import { useUnitySync } from './use-unity-sync';

interface UseUnityLoaderProps {
    name?: string;
    goalList?: string[];
}

interface UseUnityLoaderReturn {
    unityProvider: unknown;
    isLoaded: boolean;
    currentValue: number;
    currentGoalList: number;
    sendMessage: (gameObject: string, methodName: string, parameter?: string | number) => void;
}

const createUnityConfig = (name?: string) => ({
    loaderUrl: `/${name}/Build/${name}.loader.js`,
    dataUrl: `/${name}/Build/${name}.data.br`,
    frameworkUrl: `/${name}/Build/${name}.framework.js.br`,
    codeUrl: `/${name}/Build/${name}.wasm.br`,
    streamingAssetsUrl: `/${name}/StreamingAssets`,
});

export function useUnityLoader({
    name,
    goalList = []
}: UseUnityLoaderProps = {}): UseUnityLoaderReturn {

    const [currentValue, setCurrentValue] = useState<number>(0);
    const [currentGoalList, setCurrentGoalList] = useState<number>(0);

    const { unityProvider, isLoaded, sendMessage } = useUnityContext(
        createUnityConfig(name)
    );

    const handleUnityMessage = useCallback((message: string) => {
        processUnityMessage(message);
    }, []);

    const updateValue = useCallback((msg: ParsedUnityMessage) => {
        setCurrentValue(msg.numericValue || 0);
    }, []);

    const handleAddGoal = useCallback((msg: ParsedUnityMessage) => {
        setCurrentGoalList(msg.numericValue || 0);
    }, []);

    const eventHandlers = [
        { event: UnityMessageType.INCREASE_VALUE, handler: updateValue },
        { event: UnityMessageType.DECREASE_VALUE, handler: updateValue },
        { event: UnityMessageType.ADD_GOAL, handler: handleAddGoal }
    ] as const;

    useUnityEvents(handleUnityMessage, isLoaded);
    useUnitySync(isLoaded, sendMessage, currentValue, goalList);

    useEffect(() => {
        eventHandlers.forEach(({ event, handler }) => {
            unityEventBus.on(event, handler);
        });

        return () => {
            eventHandlers.forEach(({ event, handler }) => {
                unityEventBus.off(event, handler);
            });
        };
    }, []);

    return {
        unityProvider,
        isLoaded,
        currentValue,
        currentGoalList,
        sendMessage,
    };
}