import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { IBranchAssignment } from "../../../../@types/BranchAssignment";
import { type IChickyOinkReport } from "../../../../@types/ChickyOinkReport";
import ChickyOinkReportContextProvider from "../../../../context/chickyReportContext";
import { getLastReportByBranchId } from "../../../../services/reports.service";
import Divider from "../../../UI/Divider";
import ChickyOinkExpenses from "./ChickyOinkExpenses";
import ChickyOinkInventoryTable from "./ChickyOinkInventoryTable";
import ChickyOinkSalesReport from "./ChickyOinkSalesReport";
import ChickyOinkSelectBranch from "./ChickyOinkSelectBranch";
import ChickyOinkSubmitReportBtn from "./ChickyOinkSubmitReportBtn";
import ChickyOinkSummary from "./ChickyOinkSummary";

export default function ChickyOinkReport() {
  const [selectedBranch, setSelectedBranch] = useState<
    IBranchAssignment | undefined
  >();
  const [report, setReport] = useState<IChickyOinkReport>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchLastReport = async () => {
    if (!selectedBranch) return;

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

  useEffect(() => {
    fetchLastReport();
  }, [selectedBranch]);

  return (
    <ChickyOinkReportContextProvider
      report={report}
      selectedBranch={selectedBranch}
      setSelectedBranch={setSelectedBranch}
    >
      <ChickyOinkSelectBranch />
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
