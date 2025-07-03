import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";

export default function LoginPage({
  setIsLoggedIn,
}: {
  setIsLoggedIn: (val: boolean) => void;
}) {
  const navigate = useNavigate();
  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/reports");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <LoginForm handleLogin={handleLogin} />
      </div>
    </div>
  );
}
