import { useContext } from "react";
import { type RemitExpense } from "../../../../@types/RemitAddOn";
import Button from "../../../UI/Button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  RemitReportContext,
  type RemitReportContextType,
} from "../../../../context/remitReportContext";

export default function RemitExpense() {
  const { expenses, setExpenses } = useContext(
    RemitReportContext
  ) as RemitReportContextType;

  function handleAddExpense() {
    setExpenses([...expenses, { name: "", value: 0 }]);
  }

  function computeTotalExpenses() {
    return expenses.reduce((total, expense) => total + expense.value, 0);
  }
  return (
    <div>
      <h1 className="font-bold text-2xl">Expenses</h1>
      {expenses.map((expense, index) => (
        <div key={index} className="flex align-middle items-center gap-3 mt-3">
          <input
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Expense Name"
            value={expense.name}
            onChange={(e) => {
              const updatedExpenses = [...expenses];
              updatedExpenses[index].name = e.target.value;
              setExpenses(updatedExpenses);
            }}
          />
          <input
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Expense Value"
            type="number"
            value={expense.value}
            onChange={(e) => {
              const updatedExpenses = [...expenses];
              updatedExpenses[index].value = e.target.value
                ? parseFloat(e.target.value)
                : 0;
              setExpenses(updatedExpenses);
            }}
          />
          <XMarkIcon
            className="cursor-pointer"
            width={20}
            height={20}
            onClick={() => {
              const updatedExpenses = expenses.filter((_, i) => i !== index);
              setExpenses(updatedExpenses);
            }}
          />
        </div>
      ))}

      <h3 className="text-lg font-bold mt-3">
        Total Expenses: {computeTotalExpenses()}
      </h3>
      <div className="mt-3">
        <Button
          buttonType="primary"
          text="Add expense"
          onClick={handleAddExpense}
        />
      </div>
    </div>
  );
}
