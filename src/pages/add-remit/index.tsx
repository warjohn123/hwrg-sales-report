import { useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";
import RemitReport from "../../components/reports/create/remit/RemitReport";

export default function AddRemitPage() {
  const navigate = useNavigate();

  return (
    <div className="p-5">
      <Button
        text="Back to Reports Page"
        onClick={() => navigate("/reports")}
        buttonType="primary"
      />

      <div className="mt-10">
        <RemitReport />
      </div>
    </div>
  );
}
