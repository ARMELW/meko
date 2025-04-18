import CONFIG from "@/config";
import { createApiInstance, createPrivateApiInstance } from "./helper";

export const http = {
	public: createApiInstance({
		baseURL: CONFIG.APP_SERVER_URL,
	}),
	private: createPrivateApiInstance({
		baseURL: CONFIG.APP_SERVER_URL,
		getToken() {
			// replace it later
			return localStorage.getItem("access_token");
		},
	}),
};

export type { BaseResponse } from "./type";
