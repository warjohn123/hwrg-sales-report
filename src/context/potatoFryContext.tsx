import { createContext } from "react";
import type {
  IPotatoFryReport,
  IPotatoFryReportInventory,
  PotatoFrySales,
} from "../@types/PotatoFryReport";
import type { IExpense } from "../@types/SalesReport";
import type { IBranchAssignment } from "../@types/BranchAssignment";

export interface PotatoFryReportContextType {
  sales: PotatoFrySales;
  inventory: IPotatoFryReportInventory;
  expenses: IExpense[];
  cash: number;
  cashFund: number;
  preparedBy: string;
  totalSales: number;
  totalExpenses: number;
  onDuty: string;
  selectedBranch: IBranchAssignment | undefined;
  setSelectedBranch: (val: IBranchAssignment | undefined) => void;
  setSales: (val: PotatoFrySales) => void;
  setInventory: (val: IPotatoFryReportInventory) => void;
  setExpenses: React.Dispatch<React.SetStateAction<IExpense[]>>;
  setCash: (val: number) => void;
  setCashFund: (val: number) => void;
  setPreparedBy: (val: string) => void;
  setOnDuty: (val: string) => void;
}

export const PotatoFryReportContext =
  createContext<PotatoFryReportContextType | null>(null);

interface ReportContextProviderProps {
  children: React.ReactNode;
  selectedBranch: IBranchAssignment | undefined;
  setSelectedBranch: (val: IBranchAssignment | undefined) => void;
  report?: IPotatoFryReport;
}

const initialSales: PotatoFrySales = {
  small: {
    quantity: 0,
  },
  medium: {
    quantity: 0,
  },
  large: {
    quantity: 0,
  },
};

const defaultInventoryItem = {
  initial_stocks: "",
  delivered: "",
  pull_out: "",
  sales: "",
  remaining_stocks: "",
  notes: "",
};
