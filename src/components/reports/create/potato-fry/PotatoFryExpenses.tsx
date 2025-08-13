import { useContext } from "react";
import Button from "../../../UI/Button";
import ExpenseRow from "./ExpenseRow";
import {
  PotatoFryReportContext,
  type PotatoFryReportContextType,
} from "../../../../context/potatoFryContext";

export default function PotatoFryExpenses() {
  const { setExpenses, expenses, selectedBranch } = useContext(
    PotatoFryReportContext
  ) as PotatoFryReportContextType;

  const totalExpenses = expenses.reduce(
    (partialSum, a) => partialSum + (a.value || 0),
    0
  );

  const onAddExpense = () => {
    setExpenses([...expenses, { name: "", value: 0 }]);
  };

  if (!!!selectedBranch) return <></>;

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
