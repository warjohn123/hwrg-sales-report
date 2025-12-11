import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchRemitDetails } from "../../services/remits.service";
import type { IRemitReport } from "../../@types/RemitReport";
import RemitReportDetails from "../../components/remits/details/RemitReportDetails";

export default function RemitReportDetailPage() {
  const { id } = useParams();
  const [remit, setRemit] = useState<IRemitReport | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const loadRemitDetails = async () => {
    try {
      const res = await fetchRemitDetails(id!);
      setRemit(res);
    } catch (e) {
      toast.error("Something went wrong. Please contact Warren.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRemitDetails();
  }, []);

  if (loading) return <>Loading report...</>;
  if (!remit) return <>Report not found...</>;
  return <RemitReportDetails remit={remit} />;
}
