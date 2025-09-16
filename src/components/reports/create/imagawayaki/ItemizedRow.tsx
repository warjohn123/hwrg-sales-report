import { useContext } from "react";
import type { IImagawayakiProductItem } from "../../../../constants/ImagawayakiProduct";
import {
  ImagawayakiReportContext,
  type ImagawayakiReportContextType,
} from "../../../../context/imagawayakiReportContext";

interface Props {
  product: IImagawayakiProductItem;
}

export default function ItemizedRow({ product }: Props) {
  const { sales, inventory, setSales, setInventory } = useContext(
    ImagawayakiReportContext
  ) as ImagawayakiReportContextType;

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

            if (
              product.attribute === "mineral_water" ||
              product.attribute === "minute_maid" ||
              product.attribute === "coke" ||
              product.attribute === "royal" ||
              product.attribute === "sprite"
            ) {
              setInventory({
                ...inventory,
                [product.attribute]: {
                  ...inventory[product.attribute],
                  sales: inputValue,
                  remaining_stocks:
                    Number(inventory[product.attribute].delivered) +
                    Number(inventory[product.attribute].initial_stocks) -
                    (inputValue +
                      Number(inventory[product.attribute].pull_out)),
                },
              });
            }

            if (product.attribute === "juice") {
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
            }

            // setInventory({
            //   ...inventory,
            //   [product.attribute]: {
            //     ...inventory[product.attribute],
            //     sales: inputValue,
            //     // remaining_stocks:
            //     //   inventory[inventoryItem.attribute].delivered +
            //     //   inventory[inventoryItem.attribute].initial_stocks -
            //     //   (inputValue + inventory[inventoryItem.attribute].pull_out),
            //   },
            // });
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
