import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/login/login";
import DashboardPage from "./pages/dashboard/dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Check auth on load (could be from localStorage or Supabase)
  useEffect(() => {
    const user = localStorage.getItem("user"); // Or fetch from auth
    setIsLoggedIn(!!user);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/dashboard" replace /> : <LoginPage />
          }
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <DashboardPage /> : <Navigate to="/" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
