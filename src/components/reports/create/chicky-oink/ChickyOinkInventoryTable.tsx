import { useContext } from "react";
import {
  ChickyOinkReportContext,
  type ChickyOinkReportContextType,
} from "../../../../context/chickyReportContext";

export default function ChickyOinkInventoryTable() {
  const { inventory, setInventory } = useContext(
    ChickyOinkReportContext
  ) as ChickyOinkReportContextType;

  return (
    <div className="overflow-x-auto mt-5 text-xs">
      <div className="min-w-max">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="sticky left-0 bg-white z-10 border px-4 py-2">
                Item
              </th>
              <th className="border px-4 py-2">Initial Stocks</th>
              <th className="border px-4 py-2">Delivered</th>
              <th className="border px-4 py-2">Pull-Out</th>
              <th className="border px-4 py-2">Sales</th>
              <th className="border px-4 py-2">Remaining Stocks</th>
              <th className="border px-4 py-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(inventory).map((key: string) => (
              <tr>
                <td className="sticky left-0 bg-white z-10 border px-4 py-2">
                  {key.replace("_", " ").toUpperCase()}
                </td>
                <td className="border px-4 py-2">
                  {inventory[key].initial_stocks}
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={inventory[key].delivered}
                    onChange={(e) =>
                      setInventory({
                        ...inventory,
                        [key]: {
                          ...inventory[key],
                          delivered: parseInt(e.target.value),
                        },
                      })
                    }
                  />
                </td>
                <td className="border px-4 py-2">{inventory[key].pull_out}</td>
                <td className="border px-4 py-2">{inventory[key].sales}</td>
                <td className="border px-4 py-2">
                  {inventory[key].remaining_stocks}
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
            {/* <tr>
              <td className="sticky left-0 bg-white z-10 border px-4 py-2">
                Chocolate
              </td>
              <td className="border px-4 py-2">8</td>
              <td className="border px-4 py-2"></td>
              <td className="border px-4 py-2"></td>
              <td className="border px-4 py-2"></td>
              <td className="border px-4 py-2"></td>
              <td className="border px-4 py-2"></td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
