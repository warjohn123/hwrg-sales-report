import type { SalesReport } from "./SalesReport";

export interface IPotatoFryReport extends SalesReport {
  sales: PotatoFrySales;
  inventory: IPotatoFryInventoryFormat;
}

export const POTATO_FRY_SIZES = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
} as const;

export type PotatoFrySize =
  (typeof POTATO_FRY_SIZES)[keyof typeof POTATO_FRY_SIZES];

export const POTATO_FRY_PRICES: Record<PotatoFrySize, number> = {
  [POTATO_FRY_SIZES.SMALL]: 40,
  [POTATO_FRY_SIZES.MEDIUM]: 55,
  [POTATO_FRY_SIZES.LARGE]: 60,
};

export type PotatoFrySales = Record<PotatoFrySize, { quantity: number }>;

export interface IPotatoFryInventoryFormat {
  initial_stocks: string | number;
  delivered: string | number;
  pull_out: string | number;
  sales: string | number;
  remaining_stocks: string | number;
  notes: string;
}

export interface IPotatoFryReportInventory {
  [key: string]: IPotatoFryInventoryFormat;
}
