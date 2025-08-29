import { CountingMachineMessageType, CountingMachineParsedMessage } from './types';
import { countingMachineEventBus } from './event-bus';
import { createGameHandlers } from '../../events/create-game-handlers';

export const countingMachineHandlers = createGameHandlers<CountingMachineMessageType, CountingMachineParsedMessage>(
  countingMachineEventBus,
  CountingMachineMessageType
);
