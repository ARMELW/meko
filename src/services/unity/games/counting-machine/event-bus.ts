
import EventBus from '../../events/event-bus';
import { CountingMachineMessageType, CountingMachineParsedMessage } from './types';

export const countingMachineEventBus = new EventBus<Record<CountingMachineMessageType, CountingMachineParsedMessage>>();
