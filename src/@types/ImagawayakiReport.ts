import type { IInventoryFormat, SalesReport } from "./SalesReport";

export interface IImagawayakiReport extends SalesReport {
  sales: ImagawayakiSales;
  inventory: { [key: string]: IInventoryFormat };
}

export interface ImagawayakiSales {
  chocolate: number;
  oreo: number;
  cheese: number;
  custard: number;
  plain: number;
  juice: number;
  mineral_water: number;
  minute_maid: number;
}
