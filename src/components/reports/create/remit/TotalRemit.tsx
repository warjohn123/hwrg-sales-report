import { useContext } from "react";
import {
  RemitReportContext,
  type RemitReportContextType,
} from "../../../../context/remitReportContext";

export default function TotalRemit() {
  const { sales, addOns, expenses } = useContext(
    RemitReportContext
  ) as RemitReportContextType;

  const totalSales = Object.values(sales)
    .flatMap((branch) => Object.values(branch))
    .reduce((sum, val) => sum + val, 0);

  const totalAddOns = addOns.reduce((sum, val) => sum + val.value, 0);

  const totalExpenses = expenses.reduce((sum, val) => sum + val.value, 0);
  const totalRemit = totalSales + totalAddOns - totalExpenses;

  return (
    <h1
      className={`text-3xl font-bold mt-3 ${
        totalRemit > 0 ? "text-green-500" : "text-red-300"
      }`}
    >
      Total Remit: ₱{totalRemit.toLocaleString()}
    </h1>
  );
}
