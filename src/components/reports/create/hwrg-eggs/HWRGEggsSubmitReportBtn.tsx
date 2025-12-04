import { useContext, useState } from "react";
import { createSalesReport } from "../../../../services/reports.service";
import Button from "../../../UI/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  HWRGEggsReportContext,
  type HWRGEggsReportContextType,
} from "../../../../context/hwrgEggsReportContext";
import { IAssignment } from "../../../../enums/Assignment";

export default function HWRGEggsSubmitReportBtn() {
  const {
    cash,
    cashFund,
    sales,
    selectedBranch,
    inventory,
    expenses,
    onDuty,
    preparedBy,
  } = useContext(HWRGEggsReportContext) as HWRGEggsReportContextType;
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
        type: IAssignment.HWRG_EGGS,
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

  if (!selectedBranch) return <></>;

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
