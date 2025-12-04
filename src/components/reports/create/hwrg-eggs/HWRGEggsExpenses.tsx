import { useContext } from "react";
import {
  HWRGEggsReportContext,
  type HWRGEggsReportContextType,
} from "../../../../context/hwrgEggsReportContext";
import Button from "../../../UI/Button";
import ExpenseRow from "./ExpenseRow";

export default function HWRGEggsExpenses() {
  const { setExpenses, expenses, selectedBranch } = useContext(
    HWRGEggsReportContext
  ) as HWRGEggsReportContextType;

  const totalExpenses = expenses.reduce(
    (partialSum, a) => partialSum + (a.value || 0),
    0
  );

  const onAddExpense = () => {
    setExpenses([...expenses, { name: "", value: 0 }]);
  };

  //TODO ADD COMMISION LOGIC IN THE FUTURE
  //   useEffect(() => {
  //     if (totalSales > CHICKY_OINK_BASE_SALES) {
  //       const newCommission = {
  //         name: "Commission",
  //         value: getChickyOinkCommission(totalSales),
  //       };

  //       setExpenses((prevExpenses) => {
  //         const filtered = prevExpenses.filter(
  //           (expense) => expense.name !== "Commission"
  //         );
  //         return [...filtered, newCommission];
  //       });
  //     } else {
  //       // Remove commission if sales are below the base
  //       setExpenses((prevExpenses) =>
  //         prevExpenses.filter((expense) => expense.name !== "Commission")
  //       );
  //     }
  //   }, [totalSales]);

  if (!selectedBranch) return <></>;

  return (
    <div className="mt-5 mb-5">
      <div className="flex flex-col gap-5">
        <h1 className="font-bold text-2xl">Expenses</h1>
        {expenses.map((_, index) => (
          <ExpenseRow index={index} />
        ))}
        <Button
          buttonType="primary"
          text="Add expense"
          className="w-40"
          onClick={onAddExpense}
        />
      </div>

      <div className="mt-5">
        <h4 className="font-bold text-lg">
          TOTAL EXPENSES: {totalExpenses.toLocaleString()}
        </h4>
      </div>
    </div>
  );
}
