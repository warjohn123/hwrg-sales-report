import RemitReportContextProvider from "../../../../context/RemitReportProvider";
import { IAssignment } from "../../../../enums/Assignment";
import Divider from "../../../UI/Divider";
import RemitAddOns from "./RemitAddOns";
import RemitExpenses from "./RemitExpenses";
import RemitSales from "./RemitSales";
import SubmitReportButton from "./SubmitRemitReport";
import TotalRemit from "./TotalRemit";

export default function RemitReport() {
  return (
    <RemitReportContextProvider>
      <RemitSales assignment={IAssignment.CHICKY_OINK} />
      <Divider />
      <RemitSales assignment={IAssignment.IMAGAWAYAKI} />
      <Divider />
      <RemitSales assignment={IAssignment.HWRG_EGGS} />
      <Divider />
      <RemitAddOns />
      <Divider />
      <RemitExpenses />
      <Divider />
      <TotalRemit />

      <div className="mt-5">
        <SubmitReportButton />
      </div>
    </RemitReportContextProvider>
  );
}
