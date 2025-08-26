export interface ParsedUnityMessage {
    type: string;
    value?: string;
    numericValue?: number;
    timestamp?: number;
}

export enum UnityMessageType {
    SET_VALUE = 'setValue',
    ADD_GOAL = 'addGoal',
    INCREASE_VALUE = 'increaseValue',
    DECREASE_VALUE = 'decreaseValue',
    NEXT_GOAL = 'nextGoal',
    VALID_BUTTON = 'validButton',
    CORRECT_VALUE = 'correctValue',
    WRONG_VALUE = 'wrongValue',
    DONE = 'done',
    UNKNOWN = 'unknown'
}

export interface MessagePattern {
    pattern: RegExp;
    type: UnityMessageType;
    hasNumericValue?: boolean;
}
