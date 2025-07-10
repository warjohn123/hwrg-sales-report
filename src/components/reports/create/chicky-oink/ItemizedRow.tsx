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
  const { sales, setSales } = useContext(
    ChickyOinkReportContext
  ) as ChickyOinkReportContextType;

  return (
    <div className="flex">
      <span className="mr-5">{inventoryItem.name}</span>
      <span>
        <input
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="quantity"
          type="number"
          onChange={(e) =>
            setSales({ ...sales, [inventoryItem.attribute]: e.target.value })
          }
        />
      </span>
      <span className="mr-5"> X </span>
      <span className="mr-5">{inventoryItem.price}</span>
      <span>
        {(sales[inventoryItem.attribute] ?? 0) * inventoryItem.price!}
      </span>
    </div>
  );
}
