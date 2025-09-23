import { useEffect, useRef } from 'react';

export const sendUnityMessage = (
    sendMessage: ((go: string, fn: string, arg: string) => void) | undefined,
    gameObject: string,
    method: string,
    parameter: string
): boolean => {
    if (!sendMessage) {
        console.warn('⚠️ Unity sendMessage not available');
        return false;
    }

    try {
        sendMessage(gameObject, method, parameter);
        console.log(`📤 Unity: ${gameObject}.${method}("${parameter}")`);
        return true;
    } catch (error) {
        console.error('❌ Unity message failed:', error);
        return false;
    }
};

export function useUnitySync(
    isLoaded: boolean,
    sendMessage: ((go: string, fn: string, arg: string) => void) | undefined,
    currentValue: number,
    goalList: string[]
) {

    const lastValue = useRef<number>(0);
    const lastGoals = useRef<string>('');

    useEffect(() => {
        if (!isLoaded || !currentValue || lastValue.current === currentValue) {
            return;
        }
        if (sendUnityMessage(sendMessage, 'WebBridge', 'ReceiveStringMessageFromJs', `SetValue${currentValue}`)) {
            lastValue.current = currentValue;
        }
    }, [currentValue, isLoaded, sendMessage]);

    useEffect(() => {
        if (!isLoaded || goalList.length === 0) {
            return;
        }

    const goalString = goalList.join('/');
        if (lastGoals.current === goalString) {
            return;
        }

        if (sendUnityMessage(sendMessage, 'WebBridge', 'ReceiveStringMessageFromJs', `ChangeList${goalString}`)) {
            lastGoals.current = goalString;
        }
    }, [goalList, isLoaded, sendMessage]);

    return {
        isReady: isLoaded && Boolean(sendMessage)
    };
}