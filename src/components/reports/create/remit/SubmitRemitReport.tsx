import { useContext, useState } from "react";
import Button from "../../../UI/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createRemitReport } from "../../../../services/remit.service";
import {
  RemitReportContext,
  type RemitReportContextType,
} from "../../../../context/remitReportContext";

export default function SubmitRemitReport() {
  const {
    sales,
    expenses,
    addOns: add_ons,
  } = useContext(RemitReportContext) as RemitReportContextType;
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      await createRemitReport({
        title: `Remit  ${new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })}`,
        sales,
        expenses,
        add_ons,
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
