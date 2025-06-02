
import axios, { AxiosError, AxiosHeaders } from "axios";
import { redirect } from "react-router";

interface CreateApiInstanceArgs {
	baseURL: string;
	headers?: AxiosHeaders;
}

export function createApiInstance({ baseURL, headers }: CreateApiInstanceArgs) {
	const api = axios.create({
		baseURL: baseURL,
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			...(headers || {}),
		},
		// Important: Allow cookies to be sent with requests
		withCredentials: true,
	});

	api.interceptors.request.use(
		async (config) => {
			// No need to manually add authorization header
			// Better Auth will handle cookies automatically
			return config
		},
		(error) => Promise.reject(error)
	)


	// handle error
	api.interceptors.response.use(
		(res) => res,
		(error) => {
			if (error.response && error.response.status === 401) {
				redirect('/login')
			}
			console.log("error", JSON.stringify(error, null, 3));
			return Promise.reject(handleAPIError(error));
		}
	);

	return api;
}

interface CreatePrivateApiInstanceArgs extends CreateApiInstanceArgs {
	getToken: () => string | null;
}

export function createPrivateApiInstance({
	baseURL,
	headers,
	getToken,
}: CreatePrivateApiInstanceArgs) {
	const api = createApiInstance({ baseURL, headers });

	//  inject token to each request
	api.interceptors.request.use((config) => {
		const token = getToken();
		if (token !== null) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	});

	// handle refresh token

	return api;
}

function handleAPIError(error: AxiosError) {
	if (error?.response?.data) {
		return {
			type: "ERR_REQUEST",
			data: error.response.data,
		};
	} else if (error?.response) {
		return {
			type: "ERR_REQUEST_NO_DATA",
			data: error.response,
		};
	} else {
		return {
			type: "ERR_NETWORK",
			data: error,
		};
	}
}
