import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { SalesReport } from "../../../@types/SalesReport";

export default function ChickyOinkReportsList() {
  const [reports, setReports] = useState<SalesReport[]>([]);
  // Simulated fetch
  useEffect(() => {
    // Replace this with Supabase/API fetch
    setReports([
      { id: "1", title: "Sales Report - July 3", date: "2025-07-03" },
      { id: "2", title: "Sales Report - July 2", date: "2025-07-02" },
    ] as SalesReport[]);
  }, []);
  return (
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
              <td className="px-4 py-3 border-b">{report.date}</td>
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
  );
}
