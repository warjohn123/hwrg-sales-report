import Button from "../../../UI/Button";

export default function ChickyOinkSubmitReportBtn() {
  const handleSubmit = () => {};
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
