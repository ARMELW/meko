import { GAME_EVENT_REGISTRY } from "../../../config/unity/game-register";

export interface SetupGameEventBusListenersParams<EventMap extends Record<string, unknown>> {
  game: string;
  listeners: Partial<{ [K in keyof EventMap]: (msg: EventMap[K]) => void }>;
}


export interface GameEventBusEntry<EventMap> {
  eventBus: {
    on: <K extends keyof EventMap>(type: string, cb: (msg: EventMap[K]) => void) => void;
    off: <K extends keyof EventMap>(type: string, cb: (msg: EventMap[K]) => void) => void;
  };
  MessageType: Record<string, string>;
}

export function setupGameEventBusListeners<EventMap extends Record<string, unknown>>({
  game,
  listeners
}: SetupGameEventBusListenersParams<EventMap>) {
  const entry = GAME_EVENT_REGISTRY[game as keyof typeof GAME_EVENT_REGISTRY];
  if (!entry) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(`[setupGameEventBusListeners] Aucun eventBus trouvé pour le jeu: ${game}`);
    }
    return () => {};
  }
  const { eventBus, MessageType } = entry;
  const offFns: Array<() => void> = [];
  (Object.keys(listeners) as Array<keyof EventMap>).forEach((eventName) => {
    const cb = listeners[eventName];
    const type = MessageType[eventName as string];
    if (typeof cb === 'function' && typeof type === 'string') {
      eventBus.on(type, cb as (msg: unknown) => void);
      offFns.push(() => eventBus.off(type, cb as (msg: unknown) => void));
    }
  });
  return () => { offFns.forEach(fn => fn()); };
}