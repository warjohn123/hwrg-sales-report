import { useContext } from "react";
import {
  HWRGEggsReportContext,
  type HWRGEggsReportContextType,
} from "../../../../context/hwrgEggsReportContext";
import {
  computeRemainingEggs,
  DOZEN_SIZE,
  TRAY_SIZE,
} from "../../../../lib/computeRemainingStocksOnEggs";

export default function HWRGEggsInventoryTable() {
  const { inventory, selectedBranch, setInventory } = useContext(
    HWRGEggsReportContext
  ) as HWRGEggsReportContextType;

  if (!selectedBranch) return <></>;

  return (
    <div className="overflow-x-auto mt-5 text-xs">
      <div className="min-w-max">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="sticky left-0 bg-white z-10 border w-40 py-2">
                Item
              </th>
              <th className="border w-30 py-2">Initial Stocks</th>
              <th className="border w-20 py-2">Delivered (Trays)</th>
              <th className="border w-30 py-2">Pull-Out (Trays)</th>
              <th className="border w-30 py-2">Sales</th>
              <th className="border w-30 py-2">Remaining Stocks</th>
              <th className="border px-4 py-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(inventory).map((key: string) => (
              <tr key={key}>
                <td className="sticky left-0 bg-white z-10 border px-4 py-2">
                  {key.replace("_", " ").toUpperCase()}
                </td>
                <td className="border px-4 py-2">
                  <div>
                    Trays:
                    {inventory[key].initial_stocks?.trays}
                  </div>
                  <div>
                    Pcs:
                    {inventory[key].initial_stocks?.pcs}
                  </div>
                </td>
                <td className="border px-4 py-2 w-30">
                  <input
                    type="number"
                    className="w-25 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={inventory[key].delivered?.trays}
                    onChange={(e) => {
                      const inputValue = e.target.value
                        ? parseFloat(e.target.value)
                        : 0;
                      setInventory({
                        ...inventory,
                        [key]: {
                          ...inventory[key],
                          delivered: { trays: inputValue },
                          remaining_stocks: computeRemainingEggs(
                            {
                              trays:
                                inventory[key].initial_stocks.trays +
                                inputValue -
                                inventory[key].pull_out.trays,
                              pcs: inventory[key].initial_stocks.pcs,
                            },
                            inventory[key]?.sales.pcs +
                              inventory[key]?.sales.dozens * DOZEN_SIZE +
                              inventory[key]?.sales.trays * TRAY_SIZE
                          ),
                        },
                      });
                    }}
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    className="w-25 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={inventory[key].pull_out.trays}
                    onChange={(e) => {
                      const inputValue = e.target.value
                        ? parseFloat(e.target.value)
                        : 0;
                      setInventory({
                        ...inventory,
                        [key]: {
                          ...inventory[key],
                          pull_out: { trays: inputValue },
                          remaining_stocks: computeRemainingEggs(
                            {
                              trays:
                                inventory[key].initial_stocks.trays +
                                inventory[key].delivered.trays -
                                inputValue,
                              pcs: inventory[key].initial_stocks.pcs,
                            },
                            inventory[key]?.sales.pcs +
                              inventory[key]?.sales.dozens * DOZEN_SIZE +
                              inventory[key]?.sales.trays * TRAY_SIZE
                          ),
                        },
                      });
                    }}
                  />
                </td>
                <td className="border px-4 py-2">
                  <div>Trays: {inventory[key].sales.trays}</div>
                  <div>Dozens: {inventory[key].sales.dozens}</div>
                  <div>Pcs: {inventory[key].sales.pcs}</div>
                </td>
                <td className="border px-4 py-2">
                  <div>Trays: {inventory[key].remaining_stocks.trays}</div>
                  <div>Pcs: {inventory[key].remaining_stocks.pcs}</div>
                </td>
                <td className="border px-4 py-2">
                  {
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={inventory[key].notes}
                      placeholder="Input a note"
                      onChange={(e) =>
                        setInventory({
                          ...inventory,
                          [key]: {
                            ...inventory[key],
                            notes: e.target.value,
                          },
                        })
                      }
                    />
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
