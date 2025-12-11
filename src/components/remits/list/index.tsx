import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "../../Pagination";
import { usePagination } from "../../../hooks/usePagination";
import DatePicker, {
  DateObject,
  type DatePickerRef,
} from "react-multi-date-picker";
import type { IRemitReport } from "../../../@types/RemitReport";
import { fetchRemits } from "../../../services/remits.service";

export default function RemitsList() {
  const [reports, setReports] = useState<IRemitReport[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { page, setPage, totalPages, setTotal, pageSize } = usePagination();
  const datePickerRef = useRef<DatePickerRef>(null);
  const [dates, setDates] = useState([
    new DateObject().subtract(1, "day"),
    new DateObject(),
  ]);

  useEffect(() => {
    const loadRemits = async (pageNumber = 1) => {
      setIsLoading(true);
      const formattedDates = dates.map((date) => date.format("YYYY-MM-DD"));

      try {
        const res = await fetchRemits(pageNumber, pageSize, formattedDates);

        setTotal(res.total);
        setReports(res.remit_reports);
      } catch (e) {
        toast.error(
          "Something went wrong fetching reports. Please contact Warren."
        );
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    if (dates.length === 2) loadRemits(page);
  }, [page, dates, pageSize, setTotal]);

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
            <th className="px-4 py-3 border-b">Total Remit</th>
            <th className="px-4 py-3 border-b">Date Created</th>
          </tr>
        </thead>
        <tbody>
          {reports.length > 0 ? (
            reports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 border-b underline">
                  <Link to={`/remit/${report.id}`}>{report.title}</Link>
                </td>
                <td className="px-4 py-3 border-b font-bold">
                  {report.totals?.remit_total}
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
