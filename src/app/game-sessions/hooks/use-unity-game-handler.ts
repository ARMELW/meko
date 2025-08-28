import { unityGameRegistry } from '@/services/unity/registry';

export type GameKey = keyof typeof unityGameRegistry;

export function useUnityGameHandler(game: GameKey) {
  if (!unityGameRegistry[game]) return;
  const handlers = unityGameRegistry[game].handlers as Record<string, (msg: unknown) => void>;
  return ((msg: { type: string }) => {
    const handler = handlers[msg.type];
    if (typeof handler === 'function') handler(msg);
  });
}
