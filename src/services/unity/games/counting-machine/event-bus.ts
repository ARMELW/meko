
import { createGameEventBus } from '../../events/create-game-event-bus';
import { CountingMachineMessageType, CountingMachineParsedMessage } from './types';

export const countingMachineEventBus = createGameEventBus<CountingMachineMessageType, CountingMachineParsedMessage>();
