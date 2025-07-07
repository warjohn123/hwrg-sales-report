import { createContext, useState } from "react";
import type {
  ChickyOinkSales,
  IChickyOinkReport,
  IChickyOinkReportInventory,
} from "../../../../@types/ChickyOinkReport";
import type { IExpense } from "../../../../@types/SalesReport";

export interface ChickyOinkReportContextType {
  sales: ChickyOinkSales;
  inventory: IChickyOinkReportInventory;
  expenses: IExpense[];
  setSales: (val: ChickyOinkSales) => void;
  setInventory: (val: IChickyOinkReportInventory) => void;
  setExpenses: React.Dispatch<React.SetStateAction<IExpense[]>>;
}

export const ChickyOinkReportContext =
  createContext<ChickyOinkReportContextType | null>(null);

interface ReportContextProviderProps {
  children: React.ReactNode;
  report?: IChickyOinkReport;
}

const initialSales: ChickyOinkSales = {
  spicy_chicken: 0,
  regular_chicken: 0,
  regular_liempo: 0,
  spicy_liempo: 0,
  uling: 0,
  atchara_big: 0,
  poso: 0,
  atchara_small: 0,
  liog: 0,
  spicy_liog: 0,
};

const defaultInventoryItem = {
  initial_stocks: 0,
  delivered: 0,
  pull_out: 0,
  sales: 0,
  remaining_stocks: 0,
  notes: "",
};

const initialInventory: IChickyOinkReportInventory = {
  regular_chicken: defaultInventoryItem,
  regular_liempo: defaultInventoryItem,
  spicy_chicken: defaultInventoryItem,
  spicy_liempo: defaultInventoryItem,
  liog: defaultInventoryItem,
  spicy_liog: defaultInventoryItem,
  atchara_big: defaultInventoryItem,
  atchara_small: defaultInventoryItem,
  poso: defaultInventoryItem,
  uling: defaultInventoryItem,
};

const ChickyOinkReportContextProvider = ({
  children,
  report,
}: ReportContextProviderProps) => {
  const [sales, setSales] = useState<ChickyOinkSales>(initialSales);
  const [inventory, setInventory] =
    useState<IChickyOinkReportInventory>(initialInventory);
  const [expenses, setExpenses] = useState<IExpense[]>([]);

  return (
    <ChickyOinkReportContext.Provider
      value={{
        sales,
        inventory,
        expenses,
        setSales,
        setInventory,
        setExpenses,
      }}
    >
      {children}
    </ChickyOinkReportContext.Provider>
  );
};

export default ChickyOinkReportContextProvider;
