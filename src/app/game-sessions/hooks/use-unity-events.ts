import { useEffect } from 'react';
import {
  registerUnityGlobalHandler,
  unregisterUnityGlobalHandler,
} from '@/services/unity/unity-event-bridge';

export function useUnityEvents(handler: (msg: string) => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    registerUnityGlobalHandler(handler);
    return () => {
      unregisterUnityGlobalHandler(handler);
    };
  }, [handler, enabled]);
}
