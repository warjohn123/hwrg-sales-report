import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/login";
import ReportCreatePage from "./pages/report-create";
import ReportDetailPage from "./pages/report-detail";
import ReportsPage from "./pages/reports";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import AddRemitPage from "./pages/add-remit";

function App() {
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (
        document.activeElement instanceof HTMLInputElement &&
        document.activeElement.type === "number" &&
        e.target === document.activeElement
      ) {
        document.activeElement.blur();
      }
    };
    document.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);

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
        <Route
          path="/reports/remit"
          element={
            <ProtectedRoute>
              <AddRemitPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
