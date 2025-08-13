import { useContext } from "react";
import {
  PotatoFryReportContext,
  type PotatoFryReportContextType,
} from "../../../../context/potatoFryContext";
import { POTATO_FRY_PRODUCTS } from "../../../../constants/PotatoFryProduct";
import ItemizedRow from "./ItemizedRow";

export default function PotatoFrySales() {
  const { totalSales, selectedBranch } = useContext(
    PotatoFryReportContext
  ) as PotatoFryReportContextType;

  if (!!!selectedBranch) return <></>;

  return (
    <div className="mt-5 mb-5">
      <h1 className="font-bold text-2xl">Sales Report</h1>

      <div className="mt-5 flex flex-col gap-3">
        {Object.entries(POTATO_FRY_PRODUCTS).map(([key]) => (
          <ItemizedRow key={key} product={POTATO_FRY_PRODUCTS[key]} />
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
