import { useEffect, useState } from "react";
import type { IBranchAssignment } from "../../../../@types/BranchAssignment";
import type { IImagawayakiReport } from "../../../../@types/ImagawayakiReport";
import { getLastReportByBranchId } from "../../../../services/reports.service";
import { toast } from "react-toastify";
import Divider from "../../../UI/Divider";
import ImagawayakiSelectBranch from "./ImagawayakiSelectBranch";
import ImagawayakiReportContextProvider from "../../../../context/imagawayakiReportContext";
import ImagawayakiSalesReport from "./ImagawayakiSalesReport";
import ImagawayakiExpenses from "./ImagawayakiExpenses";
import ImagawayakiSummary from "./ImagawayakiSummary";
import ImagawayakiSubmitReportBtn from "./ImagawayakiSubmitReportBtn";
import ImagawayakiInventoryTable from "./ImagawayakiInventoryTable";

export default function ImagawayakiReport() {
  const [selectedBranch, setSelectedBranch] = useState<
    IBranchAssignment | undefined
  >();

  const [report, setReport] = useState<IImagawayakiReport>();
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

  console.log("selected branch", selectedBranch);

  return (
    <ImagawayakiReportContextProvider
      report={report}
      selectedBranch={selectedBranch}
      setSelectedBranch={setSelectedBranch}
    >
      <ImagawayakiSelectBranch />
      {loading ? (
        <div>Loading last report...</div>
      ) : (
        <>
          <ImagawayakiSalesReport />
          <Divider />
          <ImagawayakiExpenses />
          <Divider />
          <ImagawayakiSummary />
          <Divider />
          <ImagawayakiInventoryTable />
          <ImagawayakiSubmitReportBtn />
        </>
      )}
    </ImagawayakiReportContextProvider>
  );
}
