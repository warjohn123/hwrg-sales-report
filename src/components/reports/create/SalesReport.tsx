import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { IBranchAssignment } from "../../../@types/BranchAssignment";
import { type IChickyOinkReport } from "../../../@types/ChickyOinkReport";
import SalesReportContextProvider from "../../../context/salesReportContext";
import { getLastReportByBranchId } from "../../../services/reports.service";
import Divider from "../../UI/Divider";
import ExpensesList from "./ExpensesList";
import InventoryTable from "./InventoryTable";
import TotalSales from "./TotalSales";
import SelectBranch from "./SelectBranch";
import SubmitReportBtn from "./SubmitReportBtn";
import Summary from "./Summary";

export default function SalesReport() {
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
    <SalesReportContextProvider
      report={report}
      selectedBranch={selectedBranch}
      setSelectedBranch={setSelectedBranch}
    >
      <SelectBranch />
      {loading ? (
        <div>Loading last report...</div>
      ) : (
        <>
          <TotalSales />
          <Divider />
          <ExpensesList />
          <Divider />
          <Summary />
          <Divider />
          <InventoryTable />
          <SubmitReportBtn />
        </>
      )}
    </SalesReportContextProvider>
  );
}
