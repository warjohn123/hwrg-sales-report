import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const handleLogin = async (email: string, password: string) => {
    if (!email || !password) {
      toast.warning("Please enter email and password");
      return;
    }

    setIsLoggingIn(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error("Invalid access");
      setIsLoggingIn(false);
      return;
    }

    navigate("/reports");
  };

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) {
        navigate("/");
      } else {
        navigate("/reports");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Sales Report</h1>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <LoginForm isLoggingIn={isLoggingIn} handleLogin={handleLogin} />
      </div>
    </div>
  );
}
