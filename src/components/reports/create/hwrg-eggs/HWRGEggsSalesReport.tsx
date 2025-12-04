import { useContext } from "react";
import {
  HWRGEggsReportContext,
  type HWRGEggsReportContextType,
} from "../../../../context/hwrgEggsReportContext";
import ItemizedRow from "./ItemizedRow";
import { HWRG_EGGS_PRODUCTS } from "../../../../constants/HWRGEggsProduct";

export default function HWRGEggsSalesReport() {
  const { totalSales, selectedBranch } = useContext(
    HWRGEggsReportContext
  ) as HWRGEggsReportContextType;

  if (!selectedBranch) return <></>;

  return (
    <div className="mt-5 mb-5">
      <h1 className="font-bold text-2xl">Sales Report</h1>

      <div className="mt-5 flex flex-col gap-3 space-y-4">
        {Object.entries(HWRG_EGGS_PRODUCTS).map(([key]) => (
          <ItemizedRow key={key} product={HWRG_EGGS_PRODUCTS[key]} />
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
