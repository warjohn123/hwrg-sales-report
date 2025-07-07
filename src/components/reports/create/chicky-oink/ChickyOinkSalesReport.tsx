import { CHICKY_OINK_INVENTORY } from "../../../../constants/ChickyOinkInventory";
import ItemizedRow from "./ItemizedRow";

export default function ChickyOinkSalesReport() {
  return (
    <div className="mt-5 mb-5">
      <h1 className="font-bold text-2xl">Sales Report</h1>

      <div className="mt-5">
        {Object.entries(CHICKY_OINK_INVENTORY).map(([key]) => (
          <ItemizedRow inventoryItem={CHICKY_OINK_INVENTORY[key]} />
        ))}
      </div>
    </div>
  );
}
