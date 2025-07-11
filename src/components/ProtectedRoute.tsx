// components/ProtectedRoute.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // or useRouter for Next.js
import { supabase } from "../lib/supabase";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate(); // if using React Router
  const [checking, setChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setIsAuthenticated(true);
      } else {
        navigate("/"); // redirect to login page
      }

      setChecking(false);
    };

    checkUser();
  }, [navigate]);

  if (checking) return <div>Loading...</div>;

  return <>{isAuthenticated && children}</>;
}
