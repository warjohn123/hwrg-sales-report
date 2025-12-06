import { createContext } from "react";
import type { RemitAddOn, RemitExpense } from "../@types/RemitAddOn";
import type { IAssignment } from "../enums/Assignment";

export interface RemitReportContextType {
  addOns: RemitAddOn[];
  expenses: RemitExpense[];
  sales: { [K in IAssignment]: Record<number, number> };
  setAddOns: React.Dispatch<React.SetStateAction<RemitAddOn[]>>;
  setExpenses: React.Dispatch<React.SetStateAction<RemitExpense[]>>;
  setSales: React.Dispatch<
    React.SetStateAction<{ [K in IAssignment]: Record<number, number> }>
  >;
}

export const RemitReportContext = createContext<RemitReportContextType | null>(
  null
);
