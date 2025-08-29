import { CountingMachineMessageType } from './types';

export const COUNTING_MACHINE_PATTERNS = [
  { pattern: /^set value (\d+)$/, type: CountingMachineMessageType.SET_VALUE, hasNumericValue: true },
  { pattern: /^add to goal list (\d+)$/, type: CountingMachineMessageType.ADD_GOAL, hasNumericValue: true },
  { pattern: /^increase value by (\d+)$/, type: CountingMachineMessageType.INCREASE_VALUE, hasNumericValue: true },
  { pattern: /^decrease value by (\d+)$/, type: CountingMachineMessageType.DECREASE_VALUE, hasNumericValue: true },
  { pattern: /^next goal (\d+)$/, type: CountingMachineMessageType.NEXT_GOAL, hasNumericValue: true },
  { pattern: /^on valid button clicked$/, type: CountingMachineMessageType.VALID_BUTTON },
  { pattern: /^correct value$/, type: CountingMachineMessageType.CORRECT_VALUE },
  { pattern: /^wrong value$/, type: CountingMachineMessageType.WRONG_VALUE },
  { pattern: /^done$/, type: CountingMachineMessageType.DONE },
];
