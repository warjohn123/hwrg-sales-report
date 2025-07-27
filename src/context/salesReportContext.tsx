import { createContext, useEffect, useState } from "react";
import type {
  ChickyOinkSales,
  IChickyOinkReport,
} from "../@types/ChickyOinkReport";
import type { IExpense, IInventoryFormat } from "../@types/SalesReport";
import { CHICKY_OINK_PRODUCTS } from "../constants/ChickyOinkInventory";
import type { IBranchAssignment } from "../@types/BranchAssignment";
import {
  CHICKY_OINK_DISPLAY_ORDER,
  IMAGAWAYAKI_DISPLAY_ORDER,
} from "../constants/DisplayOrder";
import type { ImagawayakiSales } from "../@types/ImagawayakiReport";
import {
  CHICKY_OINK_INITIAL_SALES,
  IMAGAWAYAKI_INITIAL_SALES,
} from "../constants/InitialSales";
import { IMAGAWAYAKI_PRODUCTS } from "../constants/ImagawayakiInventory";
import { EMPLOYEE_ASSIGNMENT, type IAssignment } from "../@types/User";

export interface SalesReportContextType {
  sales: ChickyOinkSales | ImagawayakiSales;
  inventory: { [key: string]: IInventoryFormat };
  expenses: IExpense[];
  cash: number;
  cashFund: number;
  preparedBy: string;
  totalSales: number;
  totalExpenses: number;
  onDuty: string;
  selectedBranch: IBranchAssignment | undefined;
  setSelectedBranch: (val: IBranchAssignment | undefined) => void;
  setSales: (val: ChickyOinkSales | ImagawayakiSales) => void;
  setInventory: (val: { [key: string]: IInventoryFormat }) => void;
  setExpenses: React.Dispatch<React.SetStateAction<IExpense[]>>;
  setCash: (val: number) => void;
  setCashFund: (val: number) => void;
  setPreparedBy: (val: string) => void;
  setOnDuty: (val: string) => void;
}

export const SalesReportContext = createContext<SalesReportContextType | null>(
  null
);

interface ReportContextProviderProps {
  children: React.ReactNode;
  selectedBranch: IBranchAssignment | undefined;
  setSelectedBranch: (val: IBranchAssignment | undefined) => void;
  report?: IChickyOinkReport;
}

const defaultInventoryItem = {
  initial_stocks: 0,
  delivered: 0,
  pull_out: 0,
  sales: 0,
  remaining_stocks: 0,
  notes: "",
};

function assignNewInventoryItems(
  inventory: {
    [key: string]: IInventoryFormat;
  },
  reportType: IAssignment
) {
  const displayOrder =
    reportType === "chicky_oink"
      ? CHICKY_OINK_DISPLAY_ORDER
      : IMAGAWAYAKI_DISPLAY_ORDER;

  const newInventory: {
    [key: string]: {
      initial_stocks: number;
      delivered: number;
      pull_out: number;
      sales: number;
      remaining_stocks: number;
      notes: string;
    };
  } = {};

  for (let item in inventory) {
    if (item === "poso") {
      newInventory[item] = defaultInventoryItem;
    } else {
      newInventory[item] = {
        initial_stocks: inventory[item].remaining_stocks,
        delivered: 0,
        pull_out: 0,
        sales: 0,
        remaining_stocks: inventory[item].remaining_stocks,
        notes: "",
      };
    }
  }

  const sortedInventory = Object.fromEntries(
    displayOrder
      .map((key) => [key, newInventory[key]])
      .filter(([_, val]) => val)
  );

  return sortedInventory;
}

const initialInventory: { [key: string]: IInventoryFormat } = {
  regular_chicken: defaultInventoryItem,
  spicy_chicken: defaultInventoryItem,
  regular_liempo: defaultInventoryItem,
  spicy_liempo: defaultInventoryItem,
  liog: defaultInventoryItem,
  spicy_liog: defaultInventoryItem,
  atchara_big: defaultInventoryItem,
  atchara_small: defaultInventoryItem,
  poso: defaultInventoryItem,
  uling: defaultInventoryItem,
};

const SalesReportContextProvider = ({
  children,
  report,
  selectedBranch,
  setSelectedBranch,
}: ReportContextProviderProps) => {
  const [sales, setSales] = useState<ChickyOinkSales | ImagawayakiSales>(
    selectedBranch?.branches?.assignment === EMPLOYEE_ASSIGNMENT.CHICKY_OINK
      ? CHICKY_OINK_INITIAL_SALES
      : IMAGAWAYAKI_INITIAL_SALES
  );
  const [inventory, setInventory] = useState<{
    [key: string]: IInventoryFormat;
  }>(initialInventory);
  const [expenses, setExpenses] = useState<IExpense[]>([
    { name: "Grab", value: 0 },
    { name: "FoodPanda", value: 0 },
    { name: "GCash", value: 0 },
  ]);
  const [cash, setCash] = useState<number>(0);
  const [cashFund, setCashFund] = useState<number>(0);
  const [preparedBy, setPreparedBy] = useState<string>("");
  const [onDuty, setOnDuty] = useState<string>("");

  useEffect(() => {
    if (report?.inventory && selectedBranch?.branches?.assignment) {
      setInventory(
        assignNewInventoryItems(
          report?.inventory,
          selectedBranch?.branches?.assignment as IAssignment
        )
      );
    } else {
      setInventory(initialInventory);
    }
  }, [report]);

  const totalSales =
    selectedBranch?.branches?.assignment === EMPLOYEE_ASSIGNMENT.CHICKY_OINK
      ? Object.entries(CHICKY_OINK_PRODUCTS).reduce((total, [key, item]) => {
          return total + (sales[key as keyof typeof sales] ?? 0) * item.price;
        }, 0)
      : Object.entries(IMAGAWAYAKI_PRODUCTS).reduce((total, [key, item]) => {
          return (
            total +
            (sales[key.toLowerCase() as keyof typeof sales] ?? 0) * item.price
          );
        }, 0);

  console.log("total sales", totalSales);

  console.log("selectedBranch?.branches?.assignment", selectedBranch?.branches);

  const totalExpenses = expenses.reduce(
    (partialSum, expense) => partialSum + (expense.value || 0),
    0
  );

  return (
    <SalesReportContext.Provider
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
    </SalesReportContext.Provider>
  );
};

export default SalesReportContextProvider;
