import { useContext } from "react";
import { CHICKY_OINK_PRODUCTS } from "../../../../constants/ChickyOinkProduct";
import ItemizedRow from "./ItemizedRow";
import {
  ChickyOinkReportContext,
  type ChickyOinkReportContextType,
} from "../../../../context/chickyReportContext";

export default function ChickyOinkSalesReport() {
  const { totalSales, selectedBranch } = useContext(
    ChickyOinkReportContext
  ) as ChickyOinkReportContextType;

  if (!!!selectedBranch) return <></>;

  return (
    <div className="mt-5 mb-5">
      <h1 className="font-bold text-2xl">Sales Report</h1>

      <div className="mt-5 flex flex-col gap-3">
        {Object.entries(CHICKY_OINK_PRODUCTS).map(([key]) => (
          <ItemizedRow key={key} product={CHICKY_OINK_PRODUCTS[key]} />
        ))}
      </div>

      <div className="mt-5">
        <h5 className="font-bold text-3xl">
          Total Sales: {totalSales.toLocaleString()}
        </h5>
      </div>
    </div>
  );
}
