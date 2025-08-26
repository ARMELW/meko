import EventBus from '@/services/unity/event-bus';
import { UnityMessageType, ParsedUnityMessage } from './unity-types';
import { parseUnityMessage, isNumericMessage, isActionMessage } from './unity-parse';

export const unityEventBus = new EventBus<Record<UnityMessageType | 'unity-message' | 'unity-numeric-message' | 'unity-action-message', ParsedUnityMessage>>();

export const processUnityMessage = (rawMessage: string, emitEvents = true): ParsedUnityMessage | null => {
    const parsed = parseUnityMessage(rawMessage);
    if (parsed && emitEvents) {
        unityEventBus.emit(parsed.type as UnityMessageType, parsed);
        unityEventBus.emit('unity-message', parsed);
        if (isNumericMessage(parsed)) unityEventBus.emit('unity-numeric-message', parsed);
        if (isActionMessage(parsed)) unityEventBus.emit('unity-action-message', parsed);
    }
    return parsed;
};
