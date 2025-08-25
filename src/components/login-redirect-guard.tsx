import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSession } from "@/services/session";

/**
 * Redirects to /profile/choose if the user is authenticated (has a session)
 * Usage: <LoginRedirectGuard />
 */
export function LoginRedirectGuard() {
  const navigate = useNavigate();
  const selectedChild = useSession(state => state.selectedChild);

  useEffect(() => {
    if (selectedChild) {
      navigate("/profile/choose", { replace: true });
    }
  }, [selectedChild, navigate]);

  return null;
}
