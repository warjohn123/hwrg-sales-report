import { useEffect, useRef, useState } from "react";
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
import { USER_TYPE, type IUser } from "../../../@types/User";
import DatePicker, {
  DateObject,
  type DatePickerRef,
} from "react-multi-date-picker";

interface ChickyOinkReportsListProps {
  currentUser: IUser;
}

export default function ChickyOinkReportsList({
  currentUser,
}: ChickyOinkReportsListProps) {
  const [reports, setReports] = useState<SalesReport[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { page, setPage, totalPages, setTotal, pageSize } = usePagination();
  const user = useCurrentUser();
  const datePickerRef = useRef<DatePickerRef>(null);
  const [dates, setDates] = useState([
    new DateObject().subtract(1, "day"),
    new DateObject(),
  ]);

  useEffect(() => {
    const fetchEmployeeReports = async (pageNumber = 1) => {
      if (!user?.id) return;
      setIsLoading(true);
      const formattedDates = dates.map((date) => date.format("YYYY-MM-DD"));

      const isEmployee = currentUser?.type === USER_TYPE.EMPLOYEE;

      try {
        const res = isEmployee
          ? await getReportsByUserId(
              user?.id ?? "",
              pageNumber,
              pageSize,
              formattedDates
            )
          : await fetchSalesReports(pageNumber, pageSize, "", formattedDates);

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
    if (!user?.id) return;
    if (dates.length === 2) fetchEmployeeReports(page);
  }, [page, user, dates, currentUser.type, pageSize, setTotal]);

  if (isLoading) return <>Loading reports...</>;

  return (
    <div>
      <div className="mt-5 mb-5">
        <label className="font-bold">Choose dates</label>
        <div>
          <DatePicker
            style={{ zIndex: 9999, height: "38px", width: "220px" }}
            value={dates}
            onChange={(selectedDates) => {
              setDates(selectedDates);
              if (selectedDates.length === 2) {
                setPage(1);
                datePickerRef.current?.closeCalendar();
              }
            }}
            format="YYYY-MM-DD"
            range
            ref={datePickerRef}
          />
        </div>
      </div>
      <table className="min-w-full bg-white shadow rounded-md overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-3 border-b">Title</th>
            <th className="px-4 py-3 border-b">Remit</th>
            <th className="px-4 py-3 border-b">Date Created</th>
          </tr>
        </thead>
        <tbody>
          {reports.length > 0 ? (
            reports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 border-b underline">
                  <Link to={`/reports/${report.id}`}>{report.title}</Link>
                </td>
                <td className="px-4 py-3 border-b font-bold">
                  {report.cash.toLocaleString()}
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
