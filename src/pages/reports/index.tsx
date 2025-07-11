import { Link, useNavigate } from "react-router-dom";
import ReportsList from "../../components/reports/list";
import { supabase } from "../../lib/supabase";

export default function ReportsPage() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reports</h1>
        <div className="flex gap-2">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
          <Link
            to="/reports/create"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Report
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <ReportsList />
      </div>
    </div>
  );
}
