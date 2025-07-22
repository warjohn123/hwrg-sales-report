import { useContext } from "react";
import type { IInventoryItem } from "../../../../constants/ChickyOinkInventory";
import {
  ChickyOinkReportContext,
  type ChickyOinkReportContextType,
} from "../../../../context/chickyReportContext";

interface Props {
  inventoryItem: IInventoryItem;
}

export default function ItemizedRow({ inventoryItem }: Props) {
  const { sales, inventory, setSales, setInventory } = useContext(
    ChickyOinkReportContext
  ) as ChickyOinkReportContextType;

  return (
    <div className="flex items-center gap-5">
      <span className="w-30">{inventoryItem.name}</span>
      <span>
        <input
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Quantity"
          type="number"
          onChange={(e) => {
            setSales({ ...sales, [inventoryItem.attribute]: e.target.value });
            setInventory({
              ...inventory,
              [inventoryItem.attribute]: {
                ...inventory[inventoryItem.attribute],
                sales: parseFloat(e.target.value),
                remaining_stocks:
                  inventory[inventoryItem.attribute].delivered +
                  inventory[inventoryItem.attribute].initial_stocks -
                  (parseFloat(e.target.value) +
                    inventory[inventoryItem.attribute].pull_out),
              },
            });
          }}
        />
      </span>
      <span className=""> X </span>
      <span className="w-7">{inventoryItem.price}</span>
      <span className=""> = </span>
      <span className="font-bold">
        ₱
        {(
          (sales[inventoryItem.attribute] ?? 0) * inventoryItem.price!
        ).toLocaleString()}
      </span>
    </div>
  );
}
