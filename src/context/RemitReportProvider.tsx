import { useState } from "react";
import { RemitReportContext } from "./remitReportContext";
import type { RemitAddOn, RemitExpense } from "../@types/RemitAddOn";

interface RemitReportContextProviderProps {
  children: React.ReactNode;
}

const RemitReportContextProvider = ({
  children,
}: RemitReportContextProviderProps) => {
  const [addOns, setAddOns] = useState<RemitAddOn[]>([]);
  const [expenses, setExpenses] = useState<RemitExpense[]>([]);
  const [sales, setSales] = useState<{
    "Chicky Oink": Record<string, { branchId: number; amount: number }>;
    Imagawayaki: Record<string, { branchId: number; amount: number }>;
    "Potato Fry": Record<string, { branchId: number; amount: number }>;
    "HWRG Eggs": Record<string, { branchId: number; amount: number }>;
  }>({
    "Chicky Oink": {},
    Imagawayaki: {},
    "Potato Fry": {},
    "HWRG Eggs": {},
  });

  return (
    <RemitReportContext.Provider
      value={{ addOns, setAddOns, expenses, setExpenses, sales, setSales }}
    >
      {children}
    </RemitReportContext.Provider>
  );
};

export default RemitReportContextProvider;
