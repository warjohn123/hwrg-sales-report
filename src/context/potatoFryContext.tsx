import { createContext, useEffect, useState } from "react";
import {
  POTATO_FRY_PRICES,
  type IPotatoFryReport,
  type IPotatoFryReportInventory,
  type PotatoFrySales,
} from "../@types/PotatoFryReport";
import type { IExpense } from "../@types/SalesReport";
import type { IBranchAssignment } from "../@types/BranchAssignment";
import { POTATOFRY_INVENTORY_DISPLAY_ORDER } from "../components/reports/create/potato-fry/displayOrder";

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
  initial_stocks: 0,
  delivered: 0,
  pull_out: 0,
  sales: 0,
  remaining_stocks: 0,
  notes: "",
};

const initialInventory: IPotatoFryReportInventory = {
  fries: defaultInventoryItem,
  cheeese_powder: defaultInventoryItem,
  bbq_powder: defaultInventoryItem,
  sour_cream: defaultInventoryItem,
  chili_bbq: defaultInventoryItem,
  small_cups: defaultInventoryItem,
  medium_cups: defaultInventoryItem,
  large_cups: defaultInventoryItem,
  bulsita_3: defaultInventoryItem,
};

function assignNewInventoryItems(inventory: IPotatoFryReportInventory) {
  const newInventory: {
    [key: string]: {
      initial_stocks: string | number;
      delivered: string | number;
      pull_out: string | number;
      sales: string | number;
      remaining_stocks: string | number;
      notes: string;
    };
  } = {};

  for (let item in inventory) {
    newInventory[item] = {
      initial_stocks: inventory[item].remaining_stocks,
      delivered: 0,
      pull_out: 0,
      sales: 0,
      remaining_stocks: inventory[item].remaining_stocks,
      notes: "",
    };
  }

  const sortedInventory = Object.fromEntries(
    POTATOFRY_INVENTORY_DISPLAY_ORDER.map((key) => [
      key,
      newInventory[key],
    ]).filter(([_, val]) => val)
  );

  return sortedInventory;
}

const PotatoFryReportContextProvider = ({
  children,
  report,
  selectedBranch,
  setSelectedBranch,
}: ReportContextProviderProps) => {
  const [sales, setSales] = useState<PotatoFrySales>(initialSales);
  const [inventory, setInventory] =
    useState<IPotatoFryReportInventory>(initialInventory);
  const [expenses, setExpenses] = useState<IExpense[]>([
    // { name: "Grab", value: 0 },
    // { name: "FoodPanda", value: 0 },
    { name: "GCash", value: 0 },
  ]);
  const [cash, setCash] = useState<number>(0);
  const [cashFund, setCashFund] = useState<number>(0);
  const [preparedBy, setPreparedBy] = useState<string>("");
  const [onDuty, setOnDuty] = useState<string>("");

  const totalExpenses = 0;
  const totalSales = Object.entries(sales).reduce(
    (acc, [size, curr]) =>
      acc +
      (curr.quantity || 0) *
        POTATO_FRY_PRICES[size as keyof typeof POTATO_FRY_PRICES],
    0
  );

  useEffect(() => {
    if (report?.inventory) {
      setInventory(assignNewInventoryItems(report.inventory));
    } else {
      setInventory(initialInventory);
    }
  }, [report]);

  return (
    <PotatoFryReportContext.Provider
      value={{
        sales,
        inventory,
        expenses,
        cash,
        cashFund,
        preparedBy,
        totalSales,
        totalExpenses,
        onDuty,
        selectedBranch,
        setOnDuty,
        setSales,
        setInventory,
        setExpenses,
        setCash,
        setCashFund,
        setPreparedBy,
        setSelectedBranch,
      }}
    >
      {children}
    </PotatoFryReportContext.Provider>
  );
};

export default PotatoFryReportContextProvider;
