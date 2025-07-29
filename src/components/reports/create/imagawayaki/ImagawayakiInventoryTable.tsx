import { useContext } from "react";
import {
  ImagawayakiReportContext,
  type ImagawayakiReportContextType,
} from "../../../../context/imagawayakiReportContext";
import { isNumberedInventory } from "./isNumberedInventory";

export default function ImagawayakiInventoryTable() {
  const { inventory, selectedBranch, setInventory } = useContext(
    ImagawayakiReportContext
  ) as ImagawayakiReportContextType;

  if (!!!selectedBranch) return <></>;

  const disabledSales = (key: string) =>
    key === "mineral_water" || key === "minute_maid" || key === "cups";

  const inputValue =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      return e.target.value
        ? isNumberedInventory(key)
          ? parseFloat(e.target.value)
          : e.target.value
        : isNumberedInventory(key)
        ? 0
        : "";
    };

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
                    type={isNumberedInventory(key) ? "number" : "text"}
                    className="w-25 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={inventory[key].delivered}
                    onChange={(e) => {
                      const value = inputValue(key)(e);
                      setInventory({
                        ...inventory,
                        [key]: {
                          ...inventory[key],
                          delivered: value,
                          ...(isNumberedInventory(key) && {
                            remaining_stocks:
                              Number(inventory[key].initial_stocks) +
                              Number(value) -
                              (Number(inventory[key].sales) +
                                Number(inventory[key].pull_out)),
                          }),
                        },
                      });
                    }}
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type={isNumberedInventory(key) ? "number" : "text"}
                    className="w-25 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={inventory[key].pull_out}
                    onChange={(e) => {
                      const value = inputValue(key)(e);
                      setInventory({
                        ...inventory,
                        [key]: {
                          ...inventory[key],
                          pull_out: value,
                          ...(isNumberedInventory(key) && {
                            remaining_stocks:
                              Number(inventory[key].initial_stocks) +
                              Number(inventory[key].delivered) -
                              (Number(inventory[key].sales) + Number(value)),
                          }),
                        },
                      });
                    }}
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type={isNumberedInventory(key) ? "number" : "text"}
                    className={`w-25 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      disabledSales(key) ? "border-0" : "bg-white"
                    }`}
                    value={inventory[key].sales}
                    disabled={disabledSales(key)}
                    onChange={(e) => {
                      const value = inputValue(key)(e);
                      setInventory({
                        ...inventory,
                        [key]: {
                          ...inventory[key],
                          sales: value,
                          ...(isNumberedInventory(key) && {
                            remaining_stocks:
                              Number(inventory[key].initial_stocks) +
                              Number(inventory[key].delivered) -
                              (Number(value) + Number(inventory[key].pull_out)),
                          }),
                        },
                      });
                    }}
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type={isNumberedInventory(key) ? "number" : "text"}
                    className={`w-25 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isNumberedInventory(key) ? "border-0" : "bg-white"
                    }`}
                    value={inventory[key].remaining_stocks}
                    disabled={isNumberedInventory(key)}
                    onChange={(e) => {
                      const value = inputValue(key)(e);
                      setInventory({
                        ...inventory,
                        [key]: {
                          ...inventory[key],
                          remaining_stocks: value,
                          //   ...(isNumberInventory(key) && {
                          //     remaining_stocks:
                          //       Number(inventory[key].initial_stocks) +
                          //       Number(inventory[key].delivered) -
                          //       (Number(inventory[key].sales) +
                          //         Number(inventory[key].pull_out)),
                          //   }),
                        },
                      });
                    }}
                  />
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
