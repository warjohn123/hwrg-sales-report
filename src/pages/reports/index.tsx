import { Link, useNavigate } from "react-router-dom";
import ReportsList from "../../components/reports/list";
import { supabase } from "../../lib/supabase";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { fetchUserDetails } from "../../services/user.service";
import { useEffect, useState } from "react";
import type { IUser } from "../../@types/User";

export default function ReportsPage() {
  const navigate = useNavigate();
  const user = useCurrentUser();
  const [employee, setEmployee] = useState<IUser | null>(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (user?.id) {
        const employee = await fetchUserDetails(user.id);
        console.log("employee", employee);
        setEmployee(employee ?? null);
      }
    };

    fetchUser();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Welcome back {employee?.name}</h1>
        <div className="flex gap-2">
          <button
            onClick={handleLogout}
            className="px-4 cursor-pointer py-2 bg-red-500 text-sm text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
          <Link
            to="/reports/create"
            className="px-4 py-2 bg-blue-600 text-sm text-white rounded hover:bg-blue-700"
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
