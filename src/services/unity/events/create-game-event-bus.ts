import EventBus from './event-bus';
export function createGameEventBus<TType extends string, TPayload>() {
  return new EventBus<Record<TType, TPayload>>();
}
