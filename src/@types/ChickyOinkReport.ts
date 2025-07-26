import type { IInventoryFormat, SalesReport } from "./SalesReport";

export interface IChickyOinkReport extends SalesReport {
  sales: ChickyOinkSales;
  inventory: { [key: string]: IInventoryFormat };
}

export interface ChickyOinkSales {
  regular_chicken: number;
  spicy_chicken: number;
  regular_liempo: number;
  spicy_liempo: number;
  liog: number;
  spicy_liog: number;
  poso: number;
  atchara_small: number;
  atchara_big: number;
  uling: number;
}
