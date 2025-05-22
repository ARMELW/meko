import { Navigate, Outlet } from "react-router";
import { appPath } from "../path";

export function ProtectedLayout() {
	const connected = false;

	if (connected) {
		return <Navigate to={appPath.private.home} />;
	}

	return <Outlet />;
}