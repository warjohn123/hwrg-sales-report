import { useContext } from "react";
import {
  ImagawayakiReportContext,
  type ImagawayakiReportContextType,
} from "../../../../context/imagawayakiReportContext";
import type { IExpense } from "../../../../@types/SalesReport";

interface Props {
  index: number;
}

const disabledExpenses = ["Grab", "FoodPanda", "GCash", "Commission Fee"];

export default function ExpenseRow({ index }: Props) {
  const { setExpenses, expenses } = useContext(
    ImagawayakiReportContext
  ) as ImagawayakiReportContextType;

  return (
    <div className="flex gap-4">
      <div>
        <input
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Name"
          type="string"
          value={expenses[index].name}
          disabled={disabledExpenses.includes(expenses[index].name)}
          onChange={(e) =>
            setExpenses((prev: IExpense[]) => {
              const result = [...prev];
              result[index].name = e.target.value;
              return result;
            })
          }
        />
      </div>
      <div>
        <input
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Amount"
          type="number"
          value={expenses[index].value}
          onChange={(e) => {
            const inputValue = e.target.value ? parseFloat(e.target.value) : 0;
            setExpenses((prev: IExpense[]) => {
              const result = [...prev];
              result[index].value = inputValue;
              return result;
            });
          }}
        />
      </div>
    </div>
  );
}
