import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [tailwindcss(), react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	define: {
		"process.env": {},
		"process.env.VITE_APP_SERVER_URL": JSON.stringify(process.env.VITE_APP_SERVER_URL)
	},
	server: {
		host: '0.0.0.0',
		port: 5173
	}
});
