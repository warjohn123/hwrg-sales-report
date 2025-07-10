import { useContext } from "react";
import {
  ChickyOinkReportContext,
  type ChickyOinkReportContextType,
} from "../../../../context/chickyReportContext";

export default function ChickyOinkSummary() {
  const { setCash, setCashFund, setPreparedBy } = useContext(
    ChickyOinkReportContext
  ) as ChickyOinkReportContextType;

  return (
    <div>
      <h5 className="text-xl">Summary</h5>

      <div className="flex flex-col gap-4">
        <div>
          <label>Cash</label>
          <input
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Cash"
            type="number"
            onChange={(e) => setCash(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label>Cash Fund</label>
          <input
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Cash Fund"
            type="number"
            onChange={(e) => setCashFund(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label>On Duty</label>
          <input
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Prepared by"
            type="string"
            onChange={(e) => setPreparedBy(e.target.value)}
          />
        </div>
        <div>
          <label>Prepared By</label>
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
