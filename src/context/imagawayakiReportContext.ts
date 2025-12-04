import { createContext } from "react";
import type {
  IImagawayakiReportInventory,
  ImagawayakiSales,
} from "../@types/ImagawayakiReport";
import type { IExpense } from "../@types/SalesReport";
import type { IBranchAssignment } from "../@types/BranchAssignment";

export interface ImagawayakiReportContextType {
  sales: ImagawayakiSales;
  inventory: IImagawayakiReportInventory;
  expenses: IExpense[];
  cash: number;
  cashFund: number;
  preparedBy: string;
  totalSales: number;
  totalExpenses: number;
  onDuty: string;
  selectedBranch: IBranchAssignment | undefined;
  setSelectedBranch: (val: IBranchAssignment | undefined) => void;
  setSales: (val: ImagawayakiSales) => void;
  setInventory: (val: IImagawayakiReportInventory) => void;
  setExpenses: React.Dispatch<React.SetStateAction<IExpense[]>>;
  setCash: (val: number) => void;
  setCashFund: (val: number) => void;
  setPreparedBy: (val: string) => void;
  setOnDuty: (val: string) => void;
}

export const ImagawayakiReportContext =
  createContext<ImagawayakiReportContextType | null>(null);
