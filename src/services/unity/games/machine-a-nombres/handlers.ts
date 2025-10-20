import { MachineANombresMessageType, MachineANombresParsedMessage } from './types';
import { machineANombresEventBus } from './event-bus';
import { createGameHandlers } from '../../events/create-game-handlers';

export const machineANombresHandlers = createGameHandlers<MachineANombresMessageType, MachineANombresParsedMessage>(
  machineANombresEventBus,
  MachineANombresMessageType
);
