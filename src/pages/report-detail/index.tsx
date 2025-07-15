import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { type IChickyOinkReport } from "../../@types/ChickyOinkReport";
import ChickyOinkReportDetails from "../../components/reports/details/chicky-oink/ChickyOinkReportDetails";
import { fetchReportDetails } from "../../services/reports.service";

export default function ReportDetailPage() {
  const { id } = useParams();
  const [report, setReport] = useState<IChickyOinkReport | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const getReportDetails = async () => {
    try {
      const res = await fetchReportDetails(id!);
      setReport(res);
    } catch (e) {
      toast.error("Something went wrong. Please contact Warren.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReportDetails();
  }, []);

  if (loading) return <>Loading report...</>;
  if (!report) return <>Report not found...</>;
  return <ChickyOinkReportDetails report={report} />;
}
