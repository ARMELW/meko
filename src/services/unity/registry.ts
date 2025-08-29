import { COUNTING_MACHINE_PATTERNS } from './games/counting-machine/patterns';
import { countingMachineHandlers } from './games/counting-machine/handlers';
import { parseCountingMachineMessage } from './games/counting-machine/parse';

export const unityGameRegistry = {
  'counting-machine': {
    patterns: COUNTING_MACHINE_PATTERNS,
    handlers: countingMachineHandlers,
    parse: parseCountingMachineMessage,
  }
} as const;
