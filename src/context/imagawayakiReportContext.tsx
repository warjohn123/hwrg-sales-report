import { createContext, useEffect, useState } from "react";
import type { IBranchAssignment } from "../@types/BranchAssignment";
import type { IImagawayakiReport } from "../@types/ImagawayakiReport";
import type {
  IImagawayakiReportInventory,
  ImagawayakiSales,
} from "../@types/ImagawayakiReport";
import type { IExpense } from "../@types/SalesReport";
import { IMAGAWAYAKI_INVENTORY_DISPLAY_ORDER } from "../components/reports/create/imagawayaki/displayOrder";
import { IMAGAWAYAKI_PRODUCTS } from "../constants/ImagawayakiProduct";

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

interface ReportContextProviderProps {
  children: React.ReactNode;
  selectedBranch: IBranchAssignment | undefined;
  setSelectedBranch: (val: IBranchAssignment | undefined) => void;
  report?: IImagawayakiReport;
}

const initialSales: ImagawayakiSales = {
  chocolate: 0,
  oreo: 0,
  cheese: 0,
  custard: 0,
  plain: 0,
  juice: 0,
  mineral_water: 0,
  minute_maid: 0,
};

const defaultInventoryItem = {
  initial_stocks: "",
  delivered: "",
  pull_out: "",
  sales: "",
  remaining_stocks: "",
  notes: "",
};

const initialInventory: IImagawayakiReportInventory = {
  batter: defaultInventoryItem,
  chocolate: defaultInventoryItem,
  oreo: defaultInventoryItem,
  cheese: defaultInventoryItem,
  custard: defaultInventoryItem,
  minute_maid: defaultInventoryItem,
  mineral_water: defaultInventoryItem,
  cups: defaultInventoryItem,
  straws: defaultInventoryItem,
  blue_lemon: defaultInventoryItem,
  lemon_fruit: defaultInventoryItem,
  cucumber: defaultInventoryItem,
  cucumber_fruit: defaultInventoryItem,
  ice_cube: defaultInventoryItem,
  bulsita_1: defaultInventoryItem,
  bulsita_2: defaultInventoryItem,
  box_1: defaultInventoryItem,
  box_2: defaultInventoryItem,
  plastic_bag: defaultInventoryItem,
};

function assignNewInventoryItems(inventory: IImagawayakiReportInventory) {
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
    IMAGAWAYAKI_INVENTORY_DISPLAY_ORDER.map((key) => [
      key,
      newInventory[key],
    ]).filter(([_, val]) => val)
  );

  return sortedInventory;
}

const ImagawayakiReportContextProvider = ({
  children,
  report,
  selectedBranch,
  setSelectedBranch,
}: ReportContextProviderProps) => {
  const [sales, setSales] = useState<ImagawayakiSales>(initialSales);
  const [inventory, setInventory] =
    useState<IImagawayakiReportInventory>(initialInventory);
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
    sales.chocolate * IMAGAWAYAKI_PRODUCTS.CHOCOLATE.price +
    sales.oreo * IMAGAWAYAKI_PRODUCTS.OREO.price +
    sales.cheese * IMAGAWAYAKI_PRODUCTS.CHEESE.price +
    sales.custard * IMAGAWAYAKI_PRODUCTS.CUSTARD.price +
    sales.plain * IMAGAWAYAKI_PRODUCTS.PLAIN.price +
    sales.juice * IMAGAWAYAKI_PRODUCTS.JUICE.price +
    sales.mineral_water * IMAGAWAYAKI_PRODUCTS.MINERAL_WATER.price +
    sales.minute_maid * IMAGAWAYAKI_PRODUCTS.MINUTE_MAID.price;

  const totalExpenses = expenses.reduce(
    (partialSum, expense) => partialSum + (expense.value || 0),
    0
  );

  return (
    <ImagawayakiReportContext.Provider
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
    </ImagawayakiReportContext.Provider>
  );
};

export default ImagawayakiReportContextProvider;
