import { useEffect, useState } from "react";
import type { IBranchAssignment } from "../../../../@types/BranchAssignment";
import { getLastReportByBranchId } from "../../../../services/reports.service";
import { toast } from "react-toastify";
import type { IHWRGEggsReport } from "../../../../@types/HWRGEggsReport";
import HWRGEggsReportContextProvider from "../../../../context/HWRGEggsReportProvider";
import Divider from "../../../UI/Divider";
import HWRGEggsSalesReport from "./HWRGEggsSalesReport";
import HWRGEggsExpenses from "./HWRGEggsExpenses";
import HWRGEggsSummary from "./HWRGEggsSummary";
import HWRGEggsInventoryTable from "./HWRGEggsInventoryTable";
import HWRGEggsSubmitReportBtn from "./HWRGEggsSubmitReportBtn";

interface HWRGEggsReportProps {
  selectedBranch: IBranchAssignment | undefined;
  setSelectedBranch: (branch: IBranchAssignment | undefined) => void;
}

export default function HWRGEggsReport({
  selectedBranch,
  setSelectedBranch,
}: HWRGEggsReportProps) {
  const [report, setReport] = useState<IHWRGEggsReport>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLastReport = async () => {
      if (!selectedBranch) return;

      setLoading(true);

      try {
        const res = await getLastReportByBranchId(selectedBranch.branch_id);
        setReport(res.sales_reports[0]);
      } catch (e) {
        console.error(e);
        toast.error("Something went wrong fetching last report");
      } finally {
        setLoading(false);
      }
    };
    fetchLastReport();
  }, [selectedBranch]);

  return (
    <HWRGEggsReportContextProvider
      report={report}
      selectedBranch={selectedBranch}
      setSelectedBranch={setSelectedBranch}
    >
      {loading ? (
        <div>Loading last report...</div>
      ) : (
        <>
          <HWRGEggsSalesReport />
          <Divider />
          <HWRGEggsExpenses />
          <Divider />
          <HWRGEggsSummary />
          <Divider />
          <HWRGEggsInventoryTable />
          <HWRGEggsSubmitReportBtn />
        </>
      )}
    </HWRGEggsReportContextProvider>
  );
}
