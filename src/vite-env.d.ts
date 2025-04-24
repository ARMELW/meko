/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_APP_MODE: string;
	readonly VITE_APP_SERVER_URL: string;
	readonly VITE_APP_STORE_SESSION_KEY: string;
}
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }