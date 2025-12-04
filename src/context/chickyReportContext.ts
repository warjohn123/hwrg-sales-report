import { createContext } from "react";
import type {
  ChickyOinkSales,
  IChickyOinkReportInventory,
} from "../@types/ChickyOinkReport";
import type { IExpense } from "../@types/SalesReport";
import type { IBranchAssignment } from "../@types/BranchAssignment";

export interface ChickyOinkReportContextType {
  sales: ChickyOinkSales;
  inventory: IChickyOinkReportInventory;
  expenses: IExpense[];
  cash: number;
  cashFund: number;
  preparedBy: string;
  totalSales: number;
  totalExpenses: number;
  onDuty: string;
  selectedBranch: IBranchAssignment | undefined;
  setSelectedBranch: (val: IBranchAssignment | undefined) => void;
  setSales: (val: ChickyOinkSales) => void;
  setInventory: (val: IChickyOinkReportInventory) => void;
  setExpenses: React.Dispatch<React.SetStateAction<IExpense[]>>;
  setCash: (val: number) => void;
  setCashFund: (val: number) => void;
  setPreparedBy: (val: string) => void;
  setOnDuty: (val: string) => void;
}

export const ChickyOinkReportContext =
  createContext<ChickyOinkReportContextType | null>(null);
