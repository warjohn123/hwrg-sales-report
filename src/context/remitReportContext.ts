import { createContext } from "react";
import type { RemitAddOn, RemitExpense } from "../@types/RemitAddOn";
import type { IAssignment } from "../enums/Assignment";

export type RemitSalesType = {
  [K in IAssignment]: Record<string, { branchId: number; amount: number }>;
};

export interface RemitReportContextType {
  addOns: RemitAddOn[];
  expenses: RemitExpense[];
  sales: RemitSalesType;
  setAddOns: React.Dispatch<React.SetStateAction<RemitAddOn[]>>;
  setExpenses: React.Dispatch<React.SetStateAction<RemitExpense[]>>;
  setSales: React.Dispatch<React.SetStateAction<RemitSalesType>>;
}

export const RemitReportContext = createContext<RemitReportContextType | null>(
  null
);
