import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

import routes from "./routes";
import { Provider } from "./provider";
import { Toaster } from "./components/atoms/floating/sonner";
import { LoadingSpinner } from "./components/atoms/loading-spinner";

const router = createBrowserRouter(routes);

function App() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Simule le chargement initial (remplace par une vraie logique si besoin)
		const timeout = setTimeout(() => setLoading(false), 800);
		return () => clearTimeout(timeout);
	}, []);

	if (loading) {
		return <LoadingSpinner size={64} />;
	}

	return (
		<Provider>
			<RouterProvider router={router} />
			<Toaster />
		</Provider>
	);
}

export default App;
