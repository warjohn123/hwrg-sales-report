import { useContext } from "react";
import Button from "../../../UI/Button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  RemitReportContext,
  type RemitReportContextType,
} from "../../../../context/remitReportContext";

export default function RemitAddOns() {
  const { addOns, setAddOns } = useContext(
    RemitReportContext
  ) as RemitReportContextType;

  function handleAddAddOn() {
    setAddOns([...addOns, { name: "", value: 0 }]);
  }

  function computeTotalAddOns() {
    return addOns.reduce((total, addOn) => total + addOn.value, 0);
  }
  return (
    <div>
      <h1 className="font-bold text-2xl">Add-Ons</h1>
      {addOns.map((addOn, index) => (
        <div key={index} className="flex align-middle items-center gap-3 mt-3">
          <input
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add-On Name"
            value={addOn.name}
            onChange={(e) => {
              const updatedAddOns = [...addOns];
              updatedAddOns[index].name = e.target.value;
              setAddOns(updatedAddOns);
            }}
          />
          <input
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add-On Value"
            type="number"
            value={addOn.value}
            onChange={(e) => {
              const updatedAddOns = [...addOns];
              updatedAddOns[index].value = e.target.value
                ? parseFloat(e.target.value)
                : 0;
              setAddOns(updatedAddOns);
            }}
          />
          <XMarkIcon
            className="cursor-pointer"
            width={20}
            height={20}
            onClick={() => {
              const updatedAddOns = addOns.filter((_, i) => i !== index);
              setAddOns(updatedAddOns);
            }}
          />
        </div>
      ))}

      <h3 className="text-lg font-bold mt-3">
        Total Add-Ons: {computeTotalAddOns()}
      </h3>
      <div className="mt-3">
        <Button
          buttonType="primary"
          text="Add add-on"
          onClick={handleAddAddOn}
        />
      </div>
    </div>
  );
}
