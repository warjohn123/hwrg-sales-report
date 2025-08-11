import { useEffect, useState } from "react";
import PotatoFryReportContextProvider from "../../../../context/potatoFryContext";
import type { IBranchAssignment } from "../../../../@types/BranchAssignment";
import type { IPotatoFryReport } from "../../../../@types/PotatoFryReport";
import { getLastReportByBranchId } from "../../../../services/reports.service";
import { toast } from "react-toastify";
import PotatoFrySelectBranch from "./PotatoFrySelectBranch";
import Divider from "../../../UI/Divider";
import PotatoFrySummary from "./PotatoFrySummary";
import PotatoFryExpenses from "./PotatoFryExpenses";

export default function PotatoFryReport() {
  const [selectedBranch, setSelectedBranch] = useState<
    IBranchAssignment | undefined
  >();

  const [report, setReport] = useState<IPotatoFryReport>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchLastReport = async () => {
    if (!selectedBranch) return;

    try {
      const res = await getLastReportByBranchId(selectedBranch.branch_id);
      setReport(res.sales_reports[0]);
    } catch (e) {
      console.error(e);
      toast.error(
        "Something went wrong fetching last report. Contact Warren for support."
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchLastReport();
  }, [selectedBranch]);

  return (
    <PotatoFryReportContextProvider
      report={report}
      selectedBranch={selectedBranch}
      setSelectedBranch={setSelectedBranch}
    >
      <PotatoFrySelectBranch />
      {loading ? (
        <div>Loading last report...</div>
      ) : (
        <>
          {/* <PotatoFrySalesReport /> */}
          <Divider />
          <PotatoFryExpenses />
          <Divider />
          <PotatoFrySummary />
          <Divider />
          {/* <ImagawayakiInventoryTable />
          <ImagawayakiSubmitReportBtn /> */}
        </>
      )}
    </PotatoFryReportContextProvider>
  );
}
