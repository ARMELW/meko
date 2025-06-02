import { Navigate, Outlet } from "react-router";
import { useSession } from "@/config/auth";

export function ProtectedLayout() {
	const { data: session } = useSession();
	const connnected = !!session;
	if (!connnected) {
		return <Navigate to={"/"} />;
	}

	return <Outlet />;
}