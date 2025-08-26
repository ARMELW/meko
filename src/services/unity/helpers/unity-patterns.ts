import { UnityMessageType, MessagePattern } from './unity-types';

export const MESSAGE_PATTERNS: MessagePattern[] = [
    { pattern: /^set value (\d+)$/, type: UnityMessageType.SET_VALUE, hasNumericValue: true },
    { pattern: /^add to goal list (\d+)$/, type: UnityMessageType.ADD_GOAL, hasNumericValue: true },
    { pattern: /^increase value by (\d+)$/, type: UnityMessageType.INCREASE_VALUE, hasNumericValue: true },
    { pattern: /^decrease value by (\d+)$/, type: UnityMessageType.DECREASE_VALUE, hasNumericValue: true },
    { pattern: /^next goal (\d+)$/, type: UnityMessageType.NEXT_GOAL, hasNumericValue: true },
    { pattern: /^on valid button clicked$/, type: UnityMessageType.VALID_BUTTON },
    { pattern: /^correct value$/, type: UnityMessageType.CORRECT_VALUE },
    { pattern: /^wrong value$/, type: UnityMessageType.WRONG_VALUE },
    { pattern: /^done$/, type: UnityMessageType.DONE },
];
