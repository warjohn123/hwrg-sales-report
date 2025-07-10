import ChickyOinkExpenses from "./ChickyOinkExpenses";
import ChickyOinkSalesReport from "./ChickyOinkSalesReport";
import ChickyOinkSummary from "./ChickyOinkSummary";
import ChickyOinkReportContextProvider from "../../../../context/chickyReportContext";
import ChickyOinkInventoryTable from "./ChickyOinkInventoryTable";
import ChickyOinkSubmitReportBtn from "./ChickyOinkSubmitReportBtn";
import Divider from "../../../UI/Divider";

export default function ChickyOinkReport() {
  return (
    <ChickyOinkReportContextProvider>
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
