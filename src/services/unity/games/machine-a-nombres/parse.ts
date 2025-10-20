import { MachineANombresMessageType, MachineANombresParsedMessage } from './types';
import { MACHINE_A_NOMBRES_PATTERNS } from './patterns';
import { createGameMessageParser } from '../../events/create-game-message-parser';

export const parseMachineANombresMessage = createGameMessageParser<
  MachineANombresMessageType,
  MachineANombresParsedMessage
>(MACHINE_A_NOMBRES_PATTERNS, MachineANombresMessageType.UNKNOWN);
