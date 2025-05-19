import { useSession } from "@/config/auth";
import { authClient } from '../../../config/auth';
import { useNavigate } from "react-router";

function LandingPage() {
  const { data: session } = useSession();
  const navigate = useNavigate();

  if (session) {
    return (
      <div>
        <p>Bienvenue, {session.user?.name || "User"}</p>
        <button onClick={() => authClient.signOut()}>Sign Out</button>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <button onClick={() => navigate('/login')}>Sign In</button>
      <button onClick={() => navigate('/register')}>
        Create Account
      </button>
    </div>
  );
}

export { LandingPage };
