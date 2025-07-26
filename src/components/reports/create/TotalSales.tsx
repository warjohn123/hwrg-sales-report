import { useContext } from "react";
import { CHICKY_OINK_PRODUCTS } from "../../../constants/ChickyOinkInventory";
import ItemizedRow from "./ItemizedRow";
import {
  SalesReportContext,
  type SalesReportContextType,
} from "../../../context/salesReportContext";
import { EMPLOYEE_ASSIGNMENT } from "../../../@types/User";
import { IMAGAWAYAKI_PRODUCTS } from "../../../constants/ImagawayakiInventory";

export default function TotalSales() {
  const { totalSales, selectedBranch } = useContext(
    SalesReportContext
  ) as SalesReportContextType;

  if (!!!selectedBranch) return <></>;

  console.log(
    "selectedBranch.branches?.assignment",
    selectedBranch.branches?.assignment
  );

  return (
    <div className="mt-5 mb-5">
      <h1 className="font-bold text-2xl">Sales Report</h1>

      <div className="mt-5 flex flex-col gap-3">
        {selectedBranch.branches?.assignment === EMPLOYEE_ASSIGNMENT.CHICKY_OINK
          ? Object.entries(CHICKY_OINK_PRODUCTS).map(([key]) => (
              <ItemizedRow
                key={key}
                inventoryItem={CHICKY_OINK_PRODUCTS[key]}
              />
            ))
          : Object.entries(IMAGAWAYAKI_PRODUCTS).map(([key]) => (
              <ItemizedRow
                key={key}
                inventoryItem={IMAGAWAYAKI_PRODUCTS[key]}
              />
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
