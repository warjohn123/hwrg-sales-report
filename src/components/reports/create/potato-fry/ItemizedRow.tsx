import { useContext } from "react";
import type { IPotatoFryProductItem } from "../../../../constants/PotatoFryProduct";
import {
  PotatoFryReportContext,
  type PotatoFryReportContextType,
} from "../../../../context/potatoFryContext";

interface Props {
  product: IPotatoFryProductItem;
}

export default function ItemizedRow({ product }: Props) {
  const { sales, inventory, setSales, setInventory } = useContext(
    PotatoFryReportContext
  ) as PotatoFryReportContextType;

  return (
    <div className="flex items-center gap-5">
      <span className="w-30">{product.name}</span>
      <span>
        <input
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Quantity"
          type="number"
          value={sales[product.attribute]?.quantity ?? ""}
          onChange={(e) => {
            const inputValue = e.target.value ? parseFloat(e.target.value) : 0;
            setSales({
              ...sales,
              [product.attribute]: { quantity: inputValue },
            });

            setInventory({
              ...inventory,
              cups: {
                ...inventory.cups,
                sales: inputValue,
                remaining_stocks:
                  Number(inventory.cups.delivered) +
                  Number(inventory.cups.initial_stocks) -
                  (inputValue + Number(inventory.cups.pull_out)),
              },
            });
          }}
        />
      </span>
      <span className=""> X </span>
      <span className="w-7">{product.price}</span>
      <span className=""> = </span>
      <span className="font-bold">
        ₱
        {(
          (sales[product.attribute]?.quantity ?? 0) * product.price!
        ).toLocaleString()}
      </span>
    </div>
  );
}
