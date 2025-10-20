import { createGameEventBus } from '../../events/create-game-event-bus';
import { MachineANombresMessageType, MachineANombresParsedMessage } from './types';

export const machineANombresEventBus = createGameEventBus<MachineANombresMessageType, MachineANombresParsedMessage>();
