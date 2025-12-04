import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { IBranchAssignment } from "../../../../@types/BranchAssignment";
import { type IChickyOinkReport } from "../../../../@types/ChickyOinkReport";
import { getLastReportByBranchId } from "../../../../services/reports.service";
import Divider from "../../../UI/Divider";
import ChickyOinkExpenses from "./ChickyOinkExpenses";
import ChickyOinkInventoryTable from "./ChickyOinkInventoryTable";
import ChickyOinkSalesReport from "./ChickyOinkSalesReport";
import ChickyOinkSubmitReportBtn from "./ChickyOinkSubmitReportBtn";
import ChickyOinkSummary from "./ChickyOinkSummary";
import ChickyOinkReportContextProvider from "../../../../context/ChickyOinkReportProvider";

interface ChickyOinkReportProps {
  selectedBranch: IBranchAssignment | undefined;
  setSelectedBranch: (branch: IBranchAssignment | undefined) => void;
}

export default function ChickyOinkReport({
  selectedBranch,
  setSelectedBranch,
}: ChickyOinkReportProps) {
  const [report, setReport] = useState<IChickyOinkReport>();
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
    <ChickyOinkReportContextProvider
      report={report}
      selectedBranch={selectedBranch}
      setSelectedBranch={setSelectedBranch}
    >
      {loading ? (
        <div>Loading last report...</div>
      ) : (
        <>
          <ChickyOinkSalesReport />
          <Divider />
          <ChickyOinkExpenses />
          <Divider />
          <ChickyOinkSummary />
          <Divider />
          <ChickyOinkInventoryTable />
          <ChickyOinkSubmitReportBtn />
        </>
      )}
    </ChickyOinkReportContextProvider>
  );
}
