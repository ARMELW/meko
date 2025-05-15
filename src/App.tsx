import { createBrowserRouter, RouterProvider } from "react-router";
import routes from "./routes";
import { Provider } from "./provider";
import { Toaster } from "./components/atoms/floating/sonner";

const router = createBrowserRouter(routes);

function App() {
	return (
		<Provider>
			<RouterProvider router={router} />
			<Toaster />
		</Provider>
	);
}

export default App;
