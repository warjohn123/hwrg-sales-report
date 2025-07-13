import { useContext } from "react";
import Button from "../../../UI/Button";
import {
  ChickyOinkReportContext,
  type ChickyOinkReportContextType,
} from "../../../../context/chickyReportContext";
import { EMPLOYEE_ASSIGNMENT } from "../../../../@types/User";
import { createSalesReport } from "../../../../services/reports.service";

export default function ChickyOinkSubmitReportBtn() {
  const { cash, cashFund, sales, inventory, expenses, onDuty, preparedBy } =
    useContext(ChickyOinkReportContext) as ChickyOinkReportContextType;

  const handleSubmit = async () => {
    await createSalesReport({
      title: "Testing",
      report_date: new Date().toISOString(),
      type: EMPLOYEE_ASSIGNMENT.CHICKY_OINK,
      branch: "Escario",
      cash,
      cash_fund: cashFund,
      sales,
      inventory,
      expenses,
      on_duty: onDuty,
      prepared_by: preparedBy,
    });

    // id?: string;
    //   title: string;
    //   report_date: string;
    //   cash: number;
    //   cash_fund: number;
    //   total_remit: number;
    //   total_sales: number;
    //   short: number;
    //   over: number;
    //   on_duty: string;
    //   prepared_by: string;
    //   type: IAssignment;
    //   expenses: IExpense[];
    //   branch: string;
  };
  return (
    <div className="mt-5">
      <Button
        buttonType="primary"
        text="Submit Report"
        onClick={handleSubmit}
      />
    </div>
  );
}
