import { Navigate, Outlet } from "react-router";
import { useSession } from "@/config/auth";
import { LoadingSpinner } from "@/components/atoms/loading-spinner";

export function ProtectedLayout() {
	const { data: session, isPending } = useSession();
	if (isPending) {
		return <LoadingSpinner size={48} />;
	}
	if (!session) {
		return <Navigate to="/login" replace />;
	}
	return <Outlet />;
}