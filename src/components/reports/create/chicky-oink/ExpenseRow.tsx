import { useContext } from "react";
import {
  ChickyOinkReportContext,
  type ChickyOinkReportContextType,
} from "../../../../context/chickyReportContext";
import type { IExpense } from "../../../../@types/SalesReport";

interface Props {
  index: number;
}

export default function ExpenseRow({ index }: Props) {
  const { setExpenses } = useContext(
    ChickyOinkReportContext
  ) as ChickyOinkReportContextType;

  return (
    <div className="flex gap-4">
      <div>
        <input
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Name"
          type="string"
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
          onChange={(e) =>
            setExpenses((prev: IExpense[]) => {
              const result = [...prev];
              result[index].value = parseInt(e.target.value);
              return result;
            })
          }
        />
      </div>
    </div>
  );
}
