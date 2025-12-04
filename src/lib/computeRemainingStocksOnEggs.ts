import type { HWRGEggsInventoryType } from "../@types/HWRGEggsReport";

export const TRAY_SIZE = 30;
export const DOZEN_SIZE = 12;

export function computeRemainingEggs(
  start: HWRGEggsInventoryType,
  sales: number
) {
  const totalStartPcs = start.trays * TRAY_SIZE + start.pcs;

  const remainingPcs = Math.max(totalStartPcs - sales, 0);

  return {
    trays: Math.floor(remainingPcs / TRAY_SIZE),
    pcs: remainingPcs % TRAY_SIZE,
  };
}
