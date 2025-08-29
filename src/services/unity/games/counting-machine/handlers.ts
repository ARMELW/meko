import { CountingMachineMessageType, CountingMachineParsedMessage } from './types';
import { countingMachineEventBus } from './event-bus';


export const countingMachineHandlers: Record<CountingMachineMessageType, (msg: CountingMachineParsedMessage) => void> =
  Object.fromEntries(
    Object.values(CountingMachineMessageType).map(type => [
      type,
      (msg: CountingMachineParsedMessage) => countingMachineEventBus.emit(type, msg)
    ])
  ) as Record<CountingMachineMessageType, (msg: CountingMachineParsedMessage) => void>;
