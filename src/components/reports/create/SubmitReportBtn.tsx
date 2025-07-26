import { useContext, useState } from "react";
import { EMPLOYEE_ASSIGNMENT } from "../../../@types/User";
import {
  SalesReportContext,
  type SalesReportContextType,
} from "../../../context/salesReportContext";
import { createSalesReport } from "../../../services/reports.service";
import Button from "../../UI/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SubmitReportBtn() {
  const {
    cash,
    cashFund,
    sales,
    selectedBranch,
    inventory,
    expenses,
    onDuty,
    preparedBy,
  } = useContext(SalesReportContext) as SalesReportContextType;
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      await createSalesReport({
        title: `${
          selectedBranch?.branches?.branch_name
        } ${new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })}`,
        report_date: new Date().toISOString(),
        type: EMPLOYEE_ASSIGNMENT.CHICKY_OINK,
        branch_id: selectedBranch?.branch_id ?? 0,
        user_id: selectedBranch?.user_id ?? "",
        cash,
        cash_fund: cashFund,
        sales,
        inventory,
        expenses,
        on_duty: onDuty,
        prepared_by: preparedBy,
      });
      toast.success("Successfully submitted");
      navigate("/reports");
    } catch (e) {
      toast.error("Something went wrong. Please try again");
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  if (!!!selectedBranch) return <></>;

  return (
    <div className="mt-5">
      <Button
        buttonType="primary"
        text={isSaving ? "Saving" : "Submit Report"}
        disabled={isSaving}
        onClick={handleSubmit}
      />
    </div>
  );
}
