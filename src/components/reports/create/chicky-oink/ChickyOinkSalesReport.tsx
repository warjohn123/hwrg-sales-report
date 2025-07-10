import { useContext } from "react";
import { CHICKY_OINK_INVENTORY } from "../../../../constants/ChickyOinkInventory";
import ItemizedRow from "./ItemizedRow";
import {
  ChickyOinkReportContext,
  type ChickyOinkReportContextType,
} from "../../../../context/chickyReportContext";

export default function ChickyOinkSalesReport() {
  const { totalSales } = useContext(
    ChickyOinkReportContext
  ) as ChickyOinkReportContextType;

  return (
    <div className="mt-5 mb-5">
      <h1 className="font-bold text-2xl">Sales Report</h1>

      <div className="mt-5 flex flex-col gap-3">
        {Object.entries(CHICKY_OINK_INVENTORY).map(([key]) => (
          <ItemizedRow inventoryItem={CHICKY_OINK_INVENTORY[key]} />
        ))}
      </div>

      <div className="mt-5">
        <h5 className="font-bold">Total Sales: {totalSales}</h5>
      </div>
    </div>
  );
}
