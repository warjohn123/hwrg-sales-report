import { useContext } from "react";
import {
  ImagawayakiReportContext,
  type ImagawayakiReportContextType,
} from "../../../../context/imagawayakiReportContext";

export default function ImagawayakiSummary() {
  const {
    setCash,
    setCashFund,
    setPreparedBy,
    setOnDuty,
    selectedBranch,
    totalSales,
    totalExpenses,
    cash,
    cashFund,
  } = useContext(ImagawayakiReportContext) as ImagawayakiReportContextType;

  const totalRemit = totalSales - totalExpenses;

  if (!!!selectedBranch) return <></>;

  return (
    <div>
      <div className="flex flex-col gap-5">
        <h5 className="text-xl font-bold">Summary</h5>
        <div className="flex align-middle items-center">
          <div className="w-24">Cash</div>
          <input
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Cash"
            type="number"
            value={cash}
            onChange={(e) => {
              const inputValue = e.target.value
                ? parseFloat(e.target.value)
                : 0;
              setCash(inputValue);
            }}
          />
        </div>
        <div className="flex align-middle items-center">
          <div className="w-24">Cash Fund</div>
          <input
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Cash Fund"
            type="number"
            value={cashFund}
            onChange={(e) => {
              const inputValue = e.target.value
                ? parseFloat(e.target.value)
                : 0;
              setCashFund(inputValue);
            }}
          />
        </div>
        <div className="flex align-middle items-center">
          <div className="w-24">On Duty</div>
          <input
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="On Duty"
            type="string"
            onChange={(e) => setOnDuty(e.target.value)}
          />
        </div>
        <div className="flex align-middle items-center">
          <div className="w-24">Prepared By</div>
          <input
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Prepared by"
            type="string"
            onChange={(e) => setPreparedBy(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-5">
        {totalRemit - cash > 0 && (
          <h1 className="text-red-500">
            SHORT: Php {(totalRemit - cash).toLocaleString()}
          </h1>
        )}
        {cash - totalRemit > 0 && (
          <h1 className="text-green-500">
            OVER: Php {(cash - totalRemit).toLocaleString()}
          </h1>
        )}
      </div>
    </div>
  );
}
