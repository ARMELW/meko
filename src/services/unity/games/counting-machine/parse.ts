import { CountingMachineMessageType, CountingMachineParsedMessage } from './types';
import { COUNTING_MACHINE_PATTERNS } from './patterns';
import { createGameMessageParser } from '../../events/create-game-message-parser';

export const parseCountingMachineMessage = createGameMessageParser<
  CountingMachineMessageType,
  CountingMachineParsedMessage
>(COUNTING_MACHINE_PATTERNS, CountingMachineMessageType.UNKNOWN);
