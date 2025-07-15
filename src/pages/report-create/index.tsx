import { useNavigate } from "react-router-dom";
import ChickyOinkReport from "../../components/reports/create/chicky-oink/ChickyOinkReport";
import Button from "../../components/UI/Button";

export default function ReportCreatePage() {
  const navigate = useNavigate();
  return (
    <div className="p-5">
      <Button
        text="Back to Reports Page"
        onClick={() => navigate("/reports")}
        buttonType="primary"
      />
      <div className="mt-10">
        <ChickyOinkReport />
      </div>
    </div>
  );
}
