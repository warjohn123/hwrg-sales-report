import ChickyOinkExpenses from "./ChickyOinkExpenses";
import ChickyOinkSalesReport from "./ChickyOinkSalesReport";
import ChickyOinkReportContextProvider from "./chickyReportContext";

export default function ChickyOinkReport() {
  return (
    <ChickyOinkReportContextProvider>
      <ChickyOinkSalesReport />
      <ChickyOinkExpenses />
    </ChickyOinkReportContextProvider>
  );
}
