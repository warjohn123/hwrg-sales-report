import { createContext } from "react";
import type {
  IChickyOinkReport,
  IChickyOinkReportInventory,
} from "../../../../@types/ChickyOinkReport";
import type { IExpense } from "../../../../@types/SalesReport";

export interface ReportContextType extends IChickyOinkReport {
  setRegularChicken: (val: number) => void;
  setSpicyChicken: (val: number) => void;
  setRegularLiempo: (val: number) => void;
  setSpicyLiempo: (val: number) => void;
  setLiog: (val: number) => void;
  setSpicyLiog: (val: number) => void;
  setPoso: (val: number) => void;
  setAtcharaSmall: (val: number) => void;
  setAtcharaBig: (val: number) => void;
  setUling: (val: number) => void;
  setCash: (cash: number) => void;
  setCashFund: (cashFund: number) => void;
  setOnDuty: (onDuty: string) => void;
  setPreparedBy: (preparedBy: string) => void;
  setExpenses: (expenses: IExpense) => void;
  setInventory: (inventory: IChickyOinkReportInventory) => void;
}

export const ReportContext = createContext<ReportContextType | null>(null);
