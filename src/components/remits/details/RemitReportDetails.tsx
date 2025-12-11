import { useNavigate } from "react-router-dom";
import type { IRemitReport } from "../../../@types/RemitReport";
import type { IAssignment } from "../../../enums/Assignment";
import Button from "../../UI/Button";

interface Props {
  remit: IRemitReport;
}

export default function RemitReportDetails({ remit }: Props) {
  const navigate = useNavigate();
  return (
    <div className="p-5">
      <Button
        text="Back to Reports Page"
        onClick={() => navigate("/reports")}
        buttonType="primary"
      />
      <h2 className="text-lg font-bold mb-4">Remit Report Details</h2>

      <p className="mb-2">
        <strong>Title:</strong> {remit.title}
      </p>

      {Object.keys(remit.sales || {}).map((key: string) => (
        <p className="mb-2" key={key}>
          <strong>
            {(key.charAt(0).toUpperCase() + key.slice(1)) as IAssignment} Sales:
          </strong>{" "}
          <div>
            {Object.entries(
              remit.sales[key as keyof typeof remit.sales] || {}
            ).map((item) => {
              console.log("item", item);
              const [branchId, data] = item;
              return (
                <div key={branchId}>
                  {item[0]}: {data.amount.toLocaleString()}{" "}
                </div>
              );
            })}
          </div>
        </p>
      ))}

      {/** Add-Ons Section */}
      <div className="mt-5">
        <h3 className="text-lg font-bold mb-2">Add-Ons</h3>
        {remit.remit_add_ons && Object.keys(remit.remit_add_ons).length > 0 ? (
          <ul>
            {remit.remit_add_ons.map((item) => {
              return (
                <li key={item.id}>
                  {item.name}: {item.value.toLocaleString()}
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No add-ons available.</p>
        )}
      </div>

      {/** Expenses Section */}
      <div className="mt-5">
        <h3 className="text-lg font-bold mb-2">Expenses</h3>
        {remit.remit_expenses &&
        Object.keys(remit.remit_expenses).length > 0 ? (
          <ul>
            {remit.remit_expenses.map((item) => {
              return (
                <li key={item.id}>
                  {item.name}: {item.value.toLocaleString()}
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No add-ons available.</p>
        )}
      </div>

      <h1 className="font-bold text-2xl mt-5">
        Total Remit: {remit.totals?.remit_total.toLocaleString()}
      </h1>
    </div>
  );
}
