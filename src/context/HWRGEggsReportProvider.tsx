import { useEffect, useState } from "react";
import type { IBranchAssignment } from "../@types/BranchAssignment";
import type {
  IHWRGEggsReport,
  IHWRGEggsReportInventory,
  IHWRGEggsSales,
} from "../@types/HWRGEggsReport";
import { HWRGEggsReportContext } from "./hwrgEggsReportContext";
import type { IExpense } from "../@types/SalesReport";
import { HWRG_EGGS_PRODUCTS } from "../constants/HWRGEggsProduct";
import { HWRG_EGGS_INVENTORY_DISPLAY_ORDER } from "../components/reports/create/hwrg-eggs/displayOrder";

const initialSales: IHWRGEggsSales = {
  pl: {
    trays: 0,
    dozens: 0,
    pcs: 0,
  },
  pw: {
    trays: 0,
    dozens: 0,
    pcs: 0,
  },
  small: {
    trays: 0,
    dozens: 0,
    pcs: 0,
  },
  medium: {
    trays: 0,
    dozens: 0,
    pcs: 0,
  },
  large: {
    trays: 0,
    dozens: 0,
    pcs: 0,
  },
  xl: {
    trays: 0,
    dozens: 0,
    pcs: 0,
  },
  jumbo: {
    trays: 0,
    dozens: 0,
    pcs: 0,
  },
};

const defaultInventoryItem = {
  initial_stocks: {
    trays: 0,
    pcs: 0,
  },
  delivered: {
    trays: 0,
  },
  pull_out: {
    trays: 0,
  },
  sales: {
    trays: 0,
    dozens: 0,
    pcs: 0,
  },
  remaining_stocks: {
    trays: 0,
    pcs: 0,
  },
  notes: "",
};

const initialInventory: IHWRGEggsReportInventory = {
  pw: defaultInventoryItem,
  pl: defaultInventoryItem,
  small: defaultInventoryItem,
  medium: defaultInventoryItem,
  large: defaultInventoryItem,
  xl: defaultInventoryItem,
  jumbo: defaultInventoryItem,
};

function assignNewInventoryItems(prevInventory: IHWRGEggsReportInventory) {
  const newInventory: IHWRGEggsReportInventory = {};

  for (const item in initialInventory) {
    const prev = prevInventory[item]; // yesterday’s data if it exists
    newInventory[item] = {
      initial_stocks: prev ? prev.remaining_stocks : { trays: 0, pcs: 0 },
      delivered: { trays: 0 },
      pull_out: { trays: 0 },
      sales: { trays: 0, pcs: 0, dozens: 0 },
      remaining_stocks: prev ? prev.remaining_stocks : { trays: 0, pcs: 0 },
      notes: "", // reset notes each day
    };
  }

  return Object.fromEntries(
    HWRG_EGGS_INVENTORY_DISPLAY_ORDER.map((key) => [
      key,
      newInventory[key],
    ]).filter(([, val]) => val !== undefined)
  );
}

interface ReportContextProviderProps {
  children: React.ReactNode;
  selectedBranch: IBranchAssignment | undefined;
  setSelectedBranch: (val: IBranchAssignment | undefined) => void;
  report?: IHWRGEggsReport;
}

const HWRGEggsReportContextProvider = ({
  children,
  report,
  selectedBranch,
  setSelectedBranch,
}: ReportContextProviderProps) => {
  const [sales, setSales] = useState<IHWRGEggsSales>(initialSales);
  const [inventory, setInventory] =
    useState<IHWRGEggsReportInventory>(initialInventory);
  const [expenses, setExpenses] = useState<IExpense[]>([
    { name: "Grab", value: 0 },
    { name: "FoodPanda", value: 0 },
    { name: "GCash", value: 0 },
  ]);
  const [cash, setCash] = useState<number>(0);
  const [cashFund, setCashFund] = useState<number>(0);
  const [preparedBy, setPreparedBy] = useState<string>("");
  const [onDuty, setOnDuty] = useState<string>("");

  console.log("report inventory", report?.inventory);

  useEffect(() => {
    if (report?.inventory) {
      setInventory(assignNewInventoryItems(report?.inventory));
    } else {
      setInventory(initialInventory);
    }
  }, [report]);

  const totalSales =
    sales.pl.pcs * HWRG_EGGS_PRODUCTS.PL.pcPrice +
    sales.pl.dozens * HWRG_EGGS_PRODUCTS.PL.dozenPrice +
    sales.pl.trays * HWRG_EGGS_PRODUCTS.PL.trayPrice +
    sales.pw.pcs * HWRG_EGGS_PRODUCTS.PW.pcPrice +
    sales.pw.dozens * HWRG_EGGS_PRODUCTS.PW.dozenPrice +
    sales.pw.trays * HWRG_EGGS_PRODUCTS.PW.trayPrice +
    sales.small.pcs * HWRG_EGGS_PRODUCTS.SMALL.pcPrice +
    sales.small.dozens * HWRG_EGGS_PRODUCTS.SMALL.dozenPrice +
    sales.small.trays * HWRG_EGGS_PRODUCTS.SMALL.trayPrice +
    sales.medium.pcs * HWRG_EGGS_PRODUCTS.MEDIUM.pcPrice +
    sales.medium.dozens * HWRG_EGGS_PRODUCTS.MEDIUM.dozenPrice +
    sales.medium.trays * HWRG_EGGS_PRODUCTS.MEDIUM.trayPrice +
    sales.large.pcs * HWRG_EGGS_PRODUCTS.LARGE.pcPrice +
    sales.large.dozens * HWRG_EGGS_PRODUCTS.LARGE.dozenPrice +
    sales.large.trays * HWRG_EGGS_PRODUCTS.LARGE.trayPrice +
    sales.xl.pcs * HWRG_EGGS_PRODUCTS.XL.pcPrice +
    sales.xl.dozens * HWRG_EGGS_PRODUCTS.XL.dozenPrice +
    sales.xl.trays * HWRG_EGGS_PRODUCTS.XL.trayPrice +
    sales.jumbo.pcs * HWRG_EGGS_PRODUCTS.JUMBO.pcPrice +
    sales.jumbo.dozens * HWRG_EGGS_PRODUCTS.JUMBO.dozenPrice +
    sales.jumbo.trays * HWRG_EGGS_PRODUCTS.JUMBO.trayPrice;

  const totalExpenses = expenses.reduce(
    (partialSum, expense) => partialSum + (expense.value || 0),
    0
  );

  return (
    <HWRGEggsReportContext.Provider
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
    </HWRGEggsReportContext.Provider>
  );
};

export default HWRGEggsReportContextProvider;
