import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { SalesReport } from "../../../@types/SalesReport";
import { toast } from "react-toastify";
import { getReportsByUserId } from "../../../services/reports.service";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import Pagination from "../../Pagination";
import { usePagination } from "../../../hooks/usePagination";

export default function ChickyOinkReportsList() {
  const [reports, setReports] = useState<SalesReport[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { page, setPage, totalPages, setTotal, pageSize } = usePagination();
  const user = useCurrentUser();

  const fetchReports = async (pageNumber = 1) => {
    try {
      const res = await getReportsByUserId(
        user?.id ?? "",
        pageNumber,
        pageSize
      );
      console.log("res", res);
      setTotal(res.total);
      setReports(res.sales_reports);
    } catch (e) {
      toast.error(
        "Something went wrong fetching reports. Please contact Warren."
      );
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.id) return;
    fetchReports(page);
  }, [page, user]);

  if (isLoading) return <>Loading reports...</>;

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
