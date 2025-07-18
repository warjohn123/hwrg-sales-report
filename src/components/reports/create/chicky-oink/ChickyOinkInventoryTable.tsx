import { useContext } from "react";
import {
  ChickyOinkReportContext,
  type ChickyOinkReportContextType,
} from "../../../../context/chickyReportContext";

export default function ChickyOinkInventoryTable() {
  const { inventory, selectedBranch, setInventory } = useContext(
    ChickyOinkReportContext
  ) as ChickyOinkReportContextType;

  if (!!!selectedBranch) return <></>;

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
              <th className="border w-20 py-2">Delivered</th>
              <th className="border w-30 py-2">Pull-Out</th>
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
                  {inventory[key].initial_stocks}
                </td>
                <td className="border px-4 py-2 w-30">
                  <input
                    type="number"
                    className="w-25 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={inventory[key].delivered}
                    onChange={(e) => {
                      console.log("number", e.target.value);
                      setInventory({
                        ...inventory,
                        [key]: {
                          ...inventory[key],
                          delivered: parseFloat(e.target.value),
                          remaining_stocks:
                            inventory[key].initial_stocks +
                            parseFloat(e.target.value) -
                            (inventory[key].sales + inventory[key].pull_out),
                        },
                      });
                    }}
                  />
                </td>
                <td className="border px-4 py-2">
                  {/* {inventory[key].pull_out} */}
                  <input
                    type="number"
                    className="w-25 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={inventory[key].pull_out}
                    onChange={(e) => {
                      setInventory({
                        ...inventory,
                        [key]: {
                          ...inventory[key],
                          pull_out: parseFloat(e.target.value),
                          remaining_stocks:
                            inventory[key].initial_stocks +
                            inventory[key].delivered -
                            (inventory[key].sales + parseFloat(e.target.value)),
                        },
                      });
                    }}
                  />
                </td>
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
          </tbody>
        </table>
      </div>
    </div>
  );
}
