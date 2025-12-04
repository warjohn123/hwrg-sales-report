import { createContext } from "react";
import type { IExpense } from "../@types/SalesReport";
import type { IBranchAssignment } from "../@types/BranchAssignment";
import type { IHWRGEggsSales } from "../@types/HWRGEggsReport";
import { type IHWRGEggsReportInventory } from "../@types/HWRGEggsReport";

export interface HWRGEggsReportContextType {
  sales: IHWRGEggsSales;
  inventory: IHWRGEggsReportInventory;
  expenses: IExpense[];
  cash: number;
  cashFund: number;
  preparedBy: string;
  totalSales: number;
  totalExpenses: number;
  onDuty: string;
  selectedBranch: IBranchAssignment | undefined;
  setSelectedBranch: (val: IBranchAssignment | undefined) => void;
  setSales: (val: IHWRGEggsSales) => void;
  setInventory: (val: IHWRGEggsReportInventory) => void;
  setExpenses: React.Dispatch<React.SetStateAction<IExpense[]>>;
  setCash: (val: number) => void;
  setCashFund: (val: number) => void;
  setPreparedBy: (val: string) => void;
  setOnDuty: (val: string) => void;
}

export const HWRGEggsReportContext =
  createContext<HWRGEggsReportContextType | null>(null);
