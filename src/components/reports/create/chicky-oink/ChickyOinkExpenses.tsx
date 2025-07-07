import { useContext } from "react";
import {
  ChickyOinkReportContext,
  type ChickyOinkReportContextType,
} from "./chickyReportContext";
import Button from "../../../UI/Button";
import ExpenseRow from "./ExpenseRow";

export default function ChickyOinkExpenses() {
  const { setExpenses, expenses } = useContext(
    ChickyOinkReportContext
  ) as ChickyOinkReportContextType;

  const totalExpenses = expenses.reduce(
    (partialSum, a) => partialSum + (a.value || 0),
    0
  );

  const onAddExpense = () => {
    setExpenses([...expenses, { name: "", value: 0 }]);
  };

  return (
    <div className="mt-5 mb-5">
      <h1 className="font-bold text-xl">Expenses</h1>

      {expenses.map((expense, index) => (
        <ExpenseRow index={index} />
      ))}

      <Button buttonType="primary" text="Add expense" onClick={onAddExpense} />

      <div className="mt-5">
        <h4 className="font-bold text-lg">TOTAL EXPENSES: {totalExpenses}</h4>
      </div>
    </div>
  );
}
