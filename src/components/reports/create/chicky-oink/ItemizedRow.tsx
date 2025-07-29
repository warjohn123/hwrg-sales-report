import { useContext } from "react";
import type { IChickyOinkProductItem } from "../../../../constants/ChickyOinkProduct";
import {
  ChickyOinkReportContext,
  type ChickyOinkReportContextType,
} from "../../../../context/chickyReportContext";

interface Props {
  product: IChickyOinkProductItem;
}

export default function ItemizedRow({ product }: Props) {
  const { sales, inventory, setSales, setInventory } = useContext(
    ChickyOinkReportContext
  ) as ChickyOinkReportContextType;

  return (
    <div className="flex items-center gap-5">
      <span className="w-30">{product.name}</span>
      <span>
        <input
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Quantity"
          type="number"
          value={sales[product.attribute]}
          onChange={(e) => {
            const inputValue = e.target.value ? parseFloat(e.target.value) : 0;
            setSales({ ...sales, [product.attribute]: inputValue });
            setInventory({
              ...inventory,
              [product.attribute]: {
                ...inventory[product.attribute],
                sales: inputValue,
                remaining_stocks:
                  inventory[product.attribute].delivered +
                  inventory[product.attribute].initial_stocks -
                  (inputValue + inventory[product.attribute].pull_out),
              },
            });
          }}
        />
      </span>
      <span className=""> X </span>
      <span className="w-7">{product.price}</span>
      <span className=""> = </span>
      <span className="font-bold">
        ₱{((sales[product.attribute] ?? 0) * product.price!).toLocaleString()}
      </span>
    </div>
  );
}
