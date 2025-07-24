import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { SalesReport } from "../../../@types/SalesReport";
import { toast } from "react-toastify";
import {
  fetchSalesReports,
  getReportsByUserId,
} from "../../../services/reports.service";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import Pagination from "../../Pagination";
import { usePagination } from "../../../hooks/usePagination";
import { fetchUserDetails } from "../../../services/user.service";
import { USER_TYPE, type IUser } from "../../../@types/User";

export default function ChickyOinkReportsList() {
  const [reports, setReports] = useState<SalesReport[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { page, setPage, totalPages, setTotal, pageSize } = usePagination();
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const user = useCurrentUser();

  const fetchUser = async () => {
    if (!user?.id) return;
    const userData = await fetchUserDetails(user.id);
    setCurrentUser(userData ?? null);
  };

  const fetchEmployeeReports = async (pageNumber = 1) => {
    if (!currentUser) return;

    try {
      const isEmployee = currentUser.type === USER_TYPE.EMPLOYEE;

      const res = isEmployee
        ? await getReportsByUserId(user?.id ?? "", pageNumber, pageSize)
        : await fetchSalesReports(pageNumber, pageSize, "", []);

      setTotal(res.total);
      setReports(res.sales_reports);
    } catch (e) {
      toast.error(
        "Something went wrong fetching reports. Please contact Warren."
      );
      console.error(e);
    }
  };

  useEffect(() => {
    const fetchAllData = () => {
      Promise.all([fetchUser(), fetchEmployeeReports()]).then(() => {
        setIsLoading(false);
      });
    };

    if (!user?.id) return;
    fetchAllData();
  }, [page, user]);

  if (isLoading) return <>Loading reports...</>;
  if (!currentUser) return <>No user found. Contact Warren to get access.</>;

  return (
    <div>
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
                <td className="px-4 py-3 border-b">{report.report_date}</td>
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
      <Pagination setPage={setPage} page={page} totalPages={totalPages} />
    </div>
  );
}
