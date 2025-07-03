import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

interface Report {
  id: number;
  title: string;
  created_at: string;
}

export default function ReportsPage() {
  const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>([]);
  // Simulated fetch
  useEffect(() => {
    // Replace this with Supabase/API fetch
    setReports([
      { id: 1, title: "Sales Report - July 3", created_at: "2025-07-03" },
      { id: 2, title: "Sales Report - July 2", created_at: "2025-07-02" },
    ]);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Replace with Supabase signOut if needed
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
        <table className="min-w-full bg-white shadow rounded-md overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-3 border-b">Title</th>
              <th className="px-4 py-3 border-b">Date Created</th>
            </tr>
          </thead>
          <tbody>
            {reports.length > 0 ? (
              reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b text-blue-600 underline">
                    <Link to={`/reports/${report.id}`}>{report.title}</Link>
                  </td>
                  <td className="px-4 py-3 border-b">{report.created_at}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="px-4 py-6 text-center text-gray-500">
                  No reports available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
