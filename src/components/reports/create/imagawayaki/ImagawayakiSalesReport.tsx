import { useContext } from "react";
import { IMAGAWAYAKI_PRODUCTS } from "../../../../constants/ImagawayakiProduct";
import {
  ImagawayakiReportContext,
  type ImagawayakiReportContextType,
} from "../../../../context/imagawayakiReportContext";
import ItemizedRow from "./ItemizedRow";

export default function ImagawayakiSalesReport() {
  const { totalSales, selectedBranch } = useContext(
    ImagawayakiReportContext
  ) as ImagawayakiReportContextType;

  if (!selectedBranch) return <></>;

  return (
    <div className="mt-5 mb-5">
      <h1 className="font-bold text-2xl">Sales Report</h1>

      <div className="mt-5 flex flex-col gap-3">
        {Object.entries(IMAGAWAYAKI_PRODUCTS).map(([key]) => (
          <ItemizedRow key={key} product={IMAGAWAYAKI_PRODUCTS[key]} />
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
