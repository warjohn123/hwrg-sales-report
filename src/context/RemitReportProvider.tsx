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
    "Chicky Oink": Record<number, number>;
    Imagawayaki: Record<number, number>;
    "Potato Fry": Record<number, number>;
    "HWRG Eggs": Record<number, number>;
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
