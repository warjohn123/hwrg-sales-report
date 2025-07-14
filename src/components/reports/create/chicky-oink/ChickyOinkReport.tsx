import ChickyOinkExpenses from "./ChickyOinkExpenses";
import ChickyOinkSalesReport from "./ChickyOinkSalesReport";
import ChickyOinkSummary from "./ChickyOinkSummary";
import ChickyOinkReportContextProvider from "../../../../context/chickyReportContext";
import ChickyOinkInventoryTable from "./ChickyOinkInventoryTable";
import ChickyOinkSubmitReportBtn from "./ChickyOinkSubmitReportBtn";
import Divider from "../../../UI/Divider";
import ChickyOinkSelectBranch from "./ChickyOinkSelectBranch";

export default function ChickyOinkReport() {
  return (
    <ChickyOinkReportContextProvider>
      <ChickyOinkSelectBranch />
      <ChickyOinkSalesReport />
      <Divider />
      <ChickyOinkExpenses />
      <Divider />
      <ChickyOinkSummary />
      <Divider />
      <ChickyOinkInventoryTable />
      <ChickyOinkSubmitReportBtn />
    </ChickyOinkReportContextProvider>
  );
}
