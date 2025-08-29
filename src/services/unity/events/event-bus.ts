
type ParsedUnityMessage = {
  type: string;
  value?: string;
  numericValue?: number;
  timestamp?: number;
}
export default class EventBus<Events extends Record<string, unknown> = Record<string, unknown>> {
  private listeners: Map<keyof Events, Array<(payload: Events[keyof Events]) => void>> = new Map();

  on<K extends keyof Events>(eventName: K, listener: (payload: ParsedUnityMessage) => void) {
    let targetListeners = this.listeners.get(eventName);
    if (!targetListeners) {
      targetListeners = [];
      this.listeners.set(eventName, targetListeners);
    }
    (targetListeners as Array<(payload: ParsedUnityMessage) => void>).push(listener);
  }

  off<K extends keyof Events>(eventName: K, listener: (payload: ParsedUnityMessage) => void) {
    const targetListeners = this.listeners.get(eventName);
    if (!targetListeners) return;

    const typedListeners = targetListeners as Array<(payload: ParsedUnityMessage) => void>;
    const index = typedListeners.indexOf(listener);
    if (index >= 0) {
      typedListeners.splice(index, 1);
    }
  }

  emit<K extends keyof Events>(eventName: K, payload: ParsedUnityMessage) {
    queueMicrotask(() => {
      const targetListeners = this.listeners.get(eventName);
      if (!targetListeners) return;
      const typedListeners = [...targetListeners] as Array<(payload: ParsedUnityMessage) => void>;
      for (const listener of typedListeners) {
        try {
          listener(payload);
        } catch (error) {
          console.error(`Error in event listener for "${String(eventName)}":`, error);
        }
      }
    });
  }

  offAll<K extends keyof Events>(eventName: K) {
    this.listeners.delete(eventName);
  }

  hasListeners<K extends keyof Events>(eventName: K): boolean {
    const listeners = this.listeners.get(eventName);
    return listeners !== undefined && listeners.length > 0;
  }

  getListenerCount<K extends keyof Events>(eventName: K): number {
    const listeners = this.listeners.get(eventName);
    return listeners ? listeners.length : 0;
  }

  clear(): void {
    this.listeners.clear();
  }

  getAllEvents(): Array<keyof Events> {
    return Array.from(this.listeners.keys());
  }
}