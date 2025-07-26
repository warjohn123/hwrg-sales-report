import { useContext } from "react";
import type { IInventoryItem } from "../../../@types/SalesReport";
import {
  SalesReportContext,
  type SalesReportContextType,
} from "../../../context/salesReportContext";

interface Props {
  inventoryItem: IInventoryItem;
}

export default function ItemizedRow({ inventoryItem }: Props) {
  const { sales, inventory, setSales, setInventory } = useContext(
    SalesReportContext
  ) as SalesReportContextType;

  return (
    <div className="flex items-center gap-5">
      <span className="w-30">{inventoryItem.name}</span>
      <span>
        <input
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Quantity"
          type="number"
          value={sales[inventoryItem.attribute as keyof typeof sales]}
          onChange={(e) => {
            const inputValue = e.target.value ? parseFloat(e.target.value) : 0;
            setSales({ ...sales, [inventoryItem.attribute]: inputValue });
            setInventory({
              ...inventory,
              [inventoryItem.attribute]: {
                ...inventory[inventoryItem.attribute],
                sales: inputValue,
                remaining_stocks:
                  inventory[inventoryItem.attribute].delivered +
                  inventory[inventoryItem.attribute].initial_stocks -
                  (inputValue + inventory[inventoryItem.attribute].pull_out),
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
          (sales[inventoryItem.attribute as keyof typeof sales] ?? 0) *
          inventoryItem.price!
        ).toLocaleString()}
      </span>
    </div>
  );
}
