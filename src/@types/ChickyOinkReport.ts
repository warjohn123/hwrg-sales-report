import type { IInventoryFormat, SalesReport } from "./SalesReport";

export interface IChickyOinkReport extends SalesReport {
  sales: ChickyOinkSales;
  inventory: IChickyOinkReportInventory;
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
  coke: number;
  royal: number;
  sprite: number
  mineral_water: number
  uling: number;
}

export interface IChickyOinkReportInventory {
  [key: string]: IInventoryFormat;
}
