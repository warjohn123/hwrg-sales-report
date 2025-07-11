import { useContext } from "react";
import Button from "../../../UI/Button";
import {
  ChickyOinkReportContext,
  type ChickyOinkReportContextType,
} from "../../../../context/chickyReportContext";
import { EMPLOYEE_ASSIGNMENT } from "../../../../@types/User";

export default function ChickyOinkSubmitReportBtn() {
  const { cash, cashFund, sales, inventory, expenses, onDuty, preparedBy } =
    useContext(ChickyOinkReportContext) as ChickyOinkReportContextType;

  const handleSubmit = async () => {
    const res = await fetch("/api/sales-reports/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: EMPLOYEE_ASSIGNMENT.CHICKY_OINK,
        cash,
        cash_fund: cashFund,
        sales,
        inventory,
        expenses,
        on_duty: onDuty,
        prepared_by: preparedBy,
        // name,
        // email,
        // password,
        // assignment,
        // type: IUserType.EMPLOYEE,
      }),
    });
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
