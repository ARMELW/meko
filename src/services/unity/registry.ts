
import { COUNTING_MACHINE_PATTERNS } from './games/counting-machine/patterns';
import { countingMachineHandlers } from './games/counting-machine/handlers';
import { parseCountingMachineMessage } from './games/counting-machine/parse';

type UnityGameModule = {
  name: string;
  patterns: unknown;
  handlers: unknown;
  parse: unknown;
};

function registerUnityGame({ name, patterns, handlers, parse }: UnityGameModule) {
  return { name, patterns, handlers, parse };
}

const unityGames = [
  registerUnityGame({
    name: 'counting-machine',
    patterns: COUNTING_MACHINE_PATTERNS,
    handlers: countingMachineHandlers,
    parse: parseCountingMachineMessage,
  })

];

export const unityGameRegistry = unityGames.reduce((acc, game) => {
  acc[game.name] = {
    patterns: game.patterns,
    handlers: game.handlers,
    parse: game.parse
  };
  return acc;
}, {} as Record<string, { patterns: unknown; handlers: unknown; parse: unknown }>);
