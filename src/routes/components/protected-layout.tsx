import { Navigate, Outlet } from "react-router";
import { appPath } from "../path";

export function ProtectedLayout() {
	const connected = true;

	if (connected) {
		return <Navigate to={appPath.private.home} />;
	}

	return <Outlet />;
}