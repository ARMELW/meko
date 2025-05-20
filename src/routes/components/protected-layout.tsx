import { Navigate, Outlet } from "react-router";
import { appPath } from "../path";
import { useSession } from "@/config/auth";

export function ProtectedLayout() {
	const { data: session } = useSession();
	const connnected = !!session;
	if (!connnected) {
		return <Navigate to={appPath.private.home} />;
	}

	return <Outlet />;
}