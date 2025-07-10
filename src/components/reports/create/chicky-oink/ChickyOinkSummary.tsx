import { useContext } from "react";
import {
  ChickyOinkReportContext,
  type ChickyOinkReportContextType,
} from "../../../../context/chickyReportContext";

export default function ChickyOinkSummary() {
  const { setCash, setCashFund, setPreparedBy, setOnDuty } = useContext(
    ChickyOinkReportContext
  ) as ChickyOinkReportContextType;

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
            onChange={(e) => setCash(parseInt(e.target.value))}
          />
        </div>
        <div className="flex align-middle items-center">
          <div className="w-24">Cash Fund</div>
          <input
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Cash Fund"
            type="number"
            onChange={(e) => setCashFund(parseInt(e.target.value))}
          />
        </div>
        <div className="flex align-middle items-center">
          <div className="w-24">On Duty</div>
          <input
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Prepared by"
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
    </div>
  );
}
