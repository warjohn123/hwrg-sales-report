import { useContext } from "react";
import {
  HWRGEggsReportContext,
  type HWRGEggsReportContextType,
} from "../../../../context/hwrgEggsReportContext";
import type { IHWRGEggsProductItem } from "../../../../constants/HWRGEggsProduct";
import {
  computeRemainingEggs,
  DOZEN_SIZE,
  TRAY_SIZE,
} from "../../../../lib/computeRemainingStocksOnEggs";

interface Props {
  product: IHWRGEggsProductItem;
}

export default function ItemizedRow({ product }: Props) {
  const { sales, inventory, setSales, setInventory } = useContext(
    HWRGEggsReportContext
  ) as HWRGEggsReportContextType;

  return (
    <div className="flex items-top gap-5">
      <span className="w-30 font-bold">{product.name}</span>
      <span>
        <div className="space-y-3">
          <div>
            <label>Trays</label>
            <div className="flex items-center gap-3">
              <input
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Quantity (trays)"
                type="number"
                value={sales[product.attribute].trays}
                onChange={(e) => {
                  const inputValue = e.target.value
                    ? parseFloat(e.target.value)
                    : 0;
                  setSales({
                    ...sales,
                    [product.attribute]: {
                      ...sales[product.attribute],
                      trays: inputValue,
                    },
                  });
                  setInventory({
                    ...inventory,
                    [product.attribute]: {
                      ...inventory[product.attribute],
                      sales: {
                        ...inventory[product.attribute].sales,
                        trays: inputValue,
                      },
                      remaining_stocks: computeRemainingEggs(
                        {
                          trays:
                            inventory[product.attribute].initial_stocks.trays +
                            inventory[product.attribute].delivered.trays,
                          pcs: inventory[product.attribute].initial_stocks.pcs,
                        },
                        inventory[product.attribute].sales.pcs +
                          inventory[product.attribute].sales.dozens *
                            DOZEN_SIZE +
                          inputValue * TRAY_SIZE
                      ),
                    },
                  });
                }}
              />
              <span className=""> X </span>
              <span className="w-7">{product.trayPrice}</span>
              <span className=""> = </span>
              <span className="font-bold">
                ₱
                {(
                  (sales[product.attribute].trays ?? 0) * product.trayPrice!
                ).toLocaleString()}
              </span>
            </div>
          </div>
          <div>
            <label>Dozens</label>
            <div className="flex items-center gap-3">
              <input
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Quantity (dozens)"
                type="number"
                value={sales[product.attribute].dozens}
                onChange={(e) => {
                  const inputValue = e.target.value
                    ? parseFloat(e.target.value)
                    : 0;
                  setSales({
                    ...sales,
                    [product.attribute]: {
                      ...sales[product.attribute],
                      dozens: inputValue,
                    },
                  });
                  setInventory({
                    ...inventory,
                    [product.attribute]: {
                      ...inventory[product.attribute],
                      sales: {
                        ...inventory[product.attribute].sales,
                        dozens: inputValue,
                      },
                      remaining_stocks: computeRemainingEggs(
                        {
                          trays:
                            inventory[product.attribute].initial_stocks.trays +
                            inventory[product.attribute].delivered.trays,
                          pcs: inventory[product.attribute].initial_stocks.pcs,
                        },
                        inventory[product.attribute].sales.pcs +
                          inputValue * DOZEN_SIZE +
                          inventory[product.attribute].sales.trays * TRAY_SIZE
                      ),
                    },
                  });
                }}
              />
              <span className=""> X </span>
              <span className="w-7">{product.dozenPrice}</span>
              <span className=""> = </span>
              <span className="font-bold">
                ₱
                {(
                  (sales[product.attribute].dozens ?? 0) * product.dozenPrice!
                ).toLocaleString()}
              </span>
            </div>
          </div>

          <div>
            <label>Pcs</label>
            <div className="flex items-center gap-3">
              <input
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Quantity (pcs)"
                type="number"
                value={sales[product.attribute].pcs}
                onChange={(e) => {
                  const inputValue = e.target.value
                    ? parseFloat(e.target.value)
                    : 0;
                  setSales({
                    ...sales,
                    [product.attribute]: {
                      ...sales[product.attribute],
                      pcs: inputValue,
                    },
                  });
                  setInventory({
                    ...inventory,
                    [product.attribute]: {
                      ...inventory[product.attribute],
                      sales: {
                        ...inventory[product.attribute].sales,
                        pcs: inputValue,
                      },
                      remaining_stocks: computeRemainingEggs(
                        {
                          trays:
                            inventory[product.attribute].initial_stocks.trays +
                            inventory[product.attribute].delivered.trays,
                          pcs: inventory[product.attribute].initial_stocks.pcs,
                        },
                        inputValue +
                          inventory[product.attribute].sales.dozens *
                            DOZEN_SIZE +
                          inventory[product.attribute].sales.trays * TRAY_SIZE
                      ),
                    },
                  });
                }}
              />

              <span className=""> X </span>
              <span className="w-7">{product.pcPrice}</span>
              <span className=""> = </span>
              <span className="font-bold">
                ₱
                {(
                  (sales[product.attribute].pcs ?? 0) * product.pcPrice!
                ).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </span>
    </div>
  );
}
