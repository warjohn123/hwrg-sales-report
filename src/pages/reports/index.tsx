import { Link, useNavigate } from "react-router-dom";
import ReportsList from "../../components/reports/list";
import { supabase } from "../../lib/supabase";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { fetchUserDetails } from "../../services/user.service";
import { useEffect, useState } from "react";
import { USER_TYPE, type IUser } from "../../@types/User";
import Version from "../../components/Version";

export default function ReportsPage() {
  const navigate = useNavigate();
  const user = useCurrentUser();
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [isLoadingEmployee, setIsLoadingEmployee] = useState<boolean>(true);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (user?.id) {
        const employee = await fetchUserDetails(user.id);
        setCurrentUser(employee ?? null);
        setIsLoadingEmployee(false);
      }
    };

    fetchUser();
  }, [user]);

  if (isLoadingEmployee) return <>Loading...</>;
  if (!currentUser) return <>No user found. Contact Warren.</>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Welcome back {currentUser.name}</h1>
        <div className="flex gap-2">
          <button
            onClick={handleLogout}
            className="px-4 cursor-pointer py-2 bg-red-500 text-sm text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
          <Link
            to={
              currentUser.type === USER_TYPE.COLLECTOR
                ? "/reports/remit"
                : "/reports/create"
            }
            className="px-4 py-2 bg-blue-600 text-sm text-white rounded hover:bg-blue-700"
          >
            Add Report
          </Link>
        </div>
      </div>

      <div
        className="flex flex-col justify-between"
        style={{ height: "calc(100vh - 100px)" }}
      >
        <div className="overflow-x-auto">
          <ReportsList currentUser={currentUser} />
        </div>

        <Version />
      </div>
    </div>
  );
}
