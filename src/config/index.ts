import { validateConfig } from "./schema";

const env = import.meta.env;
export const CONFIG = {
	APP_MODE: env.VITE_APP_MODE,
	APP_SERVER_URL: env.VITE_APP_SERVER_URL || "https://dev-api.meko.ac",
	SESSION_KEY: env.VITE_APP_STORE_SESSION_KEY,
};

export async function checkConfig() {
	console.log(`Config loaded in mode : ${CONFIG.APP_MODE}`);
	await validateConfig(CONFIG);
}
