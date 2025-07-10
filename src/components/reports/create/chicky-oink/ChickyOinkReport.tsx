import ChickyOinkExpenses from "./ChickyOinkExpenses";
import ChickyOinkSalesReport from "./ChickyOinkSalesReport";
import ChickyOinkSummary from "./ChickyOinkSummary";
import ChickyOinkReportContextProvider from "../../../../context/chickyReportContext";

export default function ChickyOinkReport() {
  return (
    <ChickyOinkReportContextProvider>
      <ChickyOinkSalesReport />
      <ChickyOinkExpenses />
      <ChickyOinkSummary />
    </ChickyOinkReportContextProvider>
  );
}
