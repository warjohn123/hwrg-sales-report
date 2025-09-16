import { createContext, useEffect, useState } from "react";
import type {
  ChickyOinkSales,
  IChickyOinkReport,
  IChickyOinkReportInventory,
} from "../@types/ChickyOinkReport";
import type { IExpense } from "../@types/SalesReport";
import { CHICKY_OINK_PRODUCTS } from "../constants/ChickyOinkProduct";
import type { IBranchAssignment } from "../@types/BranchAssignment";
import { CHICKY_OINK_DISPLAY_ORDER } from "../components/reports/create/chicky-oink/displayOrder";

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

interface ReportContextProviderProps {
  children: React.ReactNode;
  selectedBranch: IBranchAssignment | undefined;
  setSelectedBranch: (val: IBranchAssignment | undefined) => void;
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
  coke: 0,
  sprite: 0,
  royal: 0,
};

const defaultInventoryItem = {
  initial_stocks: 0,
  delivered: 0,
  pull_out: 0,
  sales: 0,
  remaining_stocks: 0,
  notes: "",
};

function assignNewInventoryItems(prevInventory: IChickyOinkReportInventory) {
  const newInventory: IChickyOinkReportInventory = {};

  for (const item in initialInventory) {
    const prev = prevInventory[item]; 
    if (item === "poso") {
      newInventory[item] = defaultInventoryItem;
    } else {
      newInventory[item] = {
        initial_stocks: prev ? prev.remaining_stocks : 0,
        delivered: 0,
        pull_out: 0,
        sales: 0,
        remaining_stocks: prev ? prev.remaining_stocks : 0,
        notes: "",
      };
    }
  }

  const sortedInventory = Object.fromEntries(
    CHICKY_OINK_DISPLAY_ORDER.map((key) => [key, newInventory[key]]).filter(
      ([, val]) => val
    )
  );

  return sortedInventory;
}

const initialInventory: IChickyOinkReportInventory = {
  regular_chicken: defaultInventoryItem,
  spicy_chicken: defaultInventoryItem,
  regular_liempo: defaultInventoryItem,
  spicy_liempo: defaultInventoryItem,
  liog: defaultInventoryItem,
  spicy_liog: defaultInventoryItem,
  atchara_big: defaultInventoryItem,
  atchara_small: defaultInventoryItem,
  poso: defaultInventoryItem,
  coke: defaultInventoryItem,
  sprite: defaultInventoryItem,
  royal: defaultInventoryItem,
  uling: defaultInventoryItem,
};

const ChickyOinkReportContextProvider = ({
  children,
  report,
  selectedBranch,
  setSelectedBranch,
}: ReportContextProviderProps) => {
  const [sales, setSales] = useState<ChickyOinkSales>(initialSales);
  const [inventory, setInventory] =
    useState<IChickyOinkReportInventory>(initialInventory);
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
    if (report?.inventory) {
      setInventory(assignNewInventoryItems(report?.inventory));
    } else {
      setInventory(initialInventory);
    }
  }, [report]);

  const totalSales =
    sales.regular_chicken * CHICKY_OINK_PRODUCTS.REGULAR_CHICKEN.price +
    sales.spicy_chicken * CHICKY_OINK_PRODUCTS.SPICY_CHICKEN.price +
    sales.regular_liempo * CHICKY_OINK_PRODUCTS.REGULAR_LIEMPO.price +
    sales.spicy_liempo * CHICKY_OINK_PRODUCTS.SPICY_LIEMPO.price +
    sales.liog * CHICKY_OINK_PRODUCTS.LIOG.price +
    sales.spicy_liog * CHICKY_OINK_PRODUCTS.SPICY_LIOG.price +
    sales.poso * CHICKY_OINK_PRODUCTS.POSO.price +
    sales.atchara_small * CHICKY_OINK_PRODUCTS.ATCHARA_SMALL.price +
    sales.atchara_big * CHICKY_OINK_PRODUCTS.ATCHARA_BIG.price +
    sales.coke * CHICKY_OINK_PRODUCTS.COKE.price +
    sales.royal * CHICKY_OINK_PRODUCTS.ROYAL.price +
    sales.sprite * CHICKY_OINK_PRODUCTS.SPRITE.price;

  const totalExpenses = expenses.reduce(
    (partialSum, expense) => partialSum + (expense.value || 0),
    0
  );

  return (
    <ChickyOinkReportContext.Provider
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
    </ChickyOinkReportContext.Provider>
  );
};

export default ChickyOinkReportContextProvider;
