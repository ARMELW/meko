import { PUZZLE_PATTERNS } from './games/puzzle/patterns';
import { puzzleHandlers } from './games/puzzle/handlers';
import { parsePuzzleMessage } from './games/puzzle/parse';
import { COUNTING_MACHINE_PATTERNS } from './games/counting-machine/patterns';
import { countingMachineHandlers } from './games/counting-machine/handlers';
import { parseCountingMachineMessage } from './games/counting-machine/parse';

export const unityGameRegistry = {
  'counting-machine': {
    patterns: COUNTING_MACHINE_PATTERNS,
    handlers: countingMachineHandlers,
    parse: parseCountingMachineMessage,
  },
  'puzzle': {
    patterns: PUZZLE_PATTERNS,
    handlers: puzzleHandlers,
    parse: parsePuzzleMessage,
  },
} as const;
