import { UnityMessageType, ParsedUnityMessage } from './unity-types';
import { MESSAGE_PATTERNS } from './unity-patterns';

export const parseUnityMessage = (message: string): ParsedUnityMessage | null => {
    if (!message || typeof message !== 'string') return null;
    const normalizedMessage = message.toLowerCase().trim();
    if (!normalizedMessage) return null;
    for (const patternConfig of MESSAGE_PATTERNS) {
        const match = normalizedMessage.match(patternConfig.pattern);
        if (match) {
            const result: ParsedUnityMessage = {
                type: patternConfig.type,
                timestamp: Date.now()
            };
            if (match[1]) {
                result.value = match[1];
                if (patternConfig.hasNumericValue && /^\d+$/.test(match[1])) {
                    const numericValue = parseInt(match[1], 10);
                    if (!isNaN(numericValue)) {
                        result.numericValue = numericValue;
                    }
                }
            }
            return result;
        }
        console.log('message',message);
    }
    return {
        type: UnityMessageType.UNKNOWN,
        value: message,
        timestamp: Date.now()
    };
};

export const isMessageType = (parsed: ParsedUnityMessage | null, type: UnityMessageType): boolean => parsed?.type === type;
export const isMessageTypes = (parsed: ParsedUnityMessage | null, types: UnityMessageType[]): boolean => parsed ? types.includes(parsed.type as UnityMessageType) : false;
export const getNumericValue = (parsed: ParsedUnityMessage | null): number | null => parsed?.numericValue ?? null;
export const hasValue = (parsed: ParsedUnityMessage | null): boolean => Boolean(parsed?.value);
export const hasNumericValue = (parsed: ParsedUnityMessage | null): boolean => typeof parsed?.numericValue === 'number';
export const isValidMessage = (parsed: ParsedUnityMessage | null): parsed is ParsedUnityMessage => parsed !== null && parsed.type !== UnityMessageType.UNKNOWN;
export const isNumericMessage = (parsed: ParsedUnityMessage | null): boolean => {
    if (!parsed) return false;
    const numericTypes = [
        UnityMessageType.SET_VALUE,
        UnityMessageType.ADD_GOAL,
        UnityMessageType.INCREASE_VALUE,
        UnityMessageType.DECREASE_VALUE,
        UnityMessageType.NEXT_GOAL
    ];
    return numericTypes.includes(parsed.type as UnityMessageType);
};
export const isActionMessage = (parsed: ParsedUnityMessage | null): boolean => {
    if (!parsed) return false;
    const actionTypes = [
        UnityMessageType.VALID_BUTTON,
        UnityMessageType.CORRECT_VALUE,
        UnityMessageType.WRONG_VALUE,
        UnityMessageType.DONE
    ];
    return actionTypes.includes(parsed.type as UnityMessageType);
};
export const getMessageTypeInfo = (): { types: string[]; patterns: string[] } => ({
    types: Object.values(UnityMessageType),
    patterns: MESSAGE_PATTERNS.map(p => p.pattern.source)
});
