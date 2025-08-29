export enum CountingMachineMessageType {
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

export interface CountingMachineParsedMessage {
  type: CountingMachineMessageType;
  value?: string;
  numericValue?: number;
  timestamp: number;
}
