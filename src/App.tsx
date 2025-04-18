import { createBrowserRouter, RouterProvider } from "react-router";
import routes from "./routes";
import { Provider } from "./provider";

const router = createBrowserRouter(routes);

function App() {
	return (
		<Provider>
			<RouterProvider router={router} />
		</Provider>
	);
}

export default App;
