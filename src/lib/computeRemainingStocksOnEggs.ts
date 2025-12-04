import type { HWRGEggsInventoryType } from "../@types/HWRGEggsReport";

export const TRAY_SIZE = 30;
export const DOZEN_SIZE = 12;

export function computeRemainingEggs(
  start: HWRGEggsInventoryType,
  sales: number
) {
  console.log("start", start, "sales", sales);
  const totalStartPcs = start.trays * TRAY_SIZE + start.pcs;

  const remainingPcs = Math.max(totalStartPcs - sales, 0);

  console.log("compute result", {
    trays: Math.floor(remainingPcs / TRAY_SIZE),
    pcs: remainingPcs % TRAY_SIZE,
  });

  return {
    trays: Math.floor(remainingPcs / TRAY_SIZE),
    pcs: remainingPcs % TRAY_SIZE,
  };
}
