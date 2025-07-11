import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/login";
import ReportCreatePage from "./pages/report-create";
import ReportDetailPage from "./pages/report-detail";
import ReportsPage from "./pages/reports";

function App() {
  // Check auth on load (could be from localStorage or Supabase)
  // useEffect(() => {
  //   const user = localStorage.getItem("user"); // Or fetch from auth
  //   setIsLoggedIn(!!user);
  // }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* Protected routes */}
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <ReportsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports/:id"
          element={
            <ProtectedRoute>
              <ReportDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports/create"
          element={
            <ProtectedRoute>
              <ReportCreatePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
