export type UnityEventHandler = (message: string) => void;

let globalHandler: UnityEventHandler | null = null;

export function registerUnityGlobalHandler(handler: UnityEventHandler) {
  globalHandler = handler;
  if (typeof window !== 'undefined') {
    (window as Window & { onUnityMessage?: (msg: unknown) => void }).onUnityMessage = (msg: unknown) => {
      handler(typeof msg === 'string' ? msg : JSON.stringify(msg));
    };
  }
}

export function unregisterUnityGlobalHandler(handler: UnityEventHandler) {
  if (globalHandler === handler && typeof window !== 'undefined') {
    (window as Window & { onUnityMessage?: (msg: unknown) => void }).onUnityMessage = undefined;
    globalHandler = null;
  }
}

export function sendUnityMessage(
  sendMessage: ((go: string, fn: string, arg: string) => void) | undefined,
  go: string,
  fn: string,
  arg: string
) {
  if (sendMessage) {
    sendMessage(go, fn, arg);
  }
}
