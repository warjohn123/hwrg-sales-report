import { useNavigate } from "react-router-dom";
import ChickyOinkReport from "../../components/reports/create/chicky-oink/ChickyOinkReport";
import Button from "../../components/UI/Button";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useEffect, useState } from "react";
import { type IUser } from "../../@types/User";
import { fetchUserDetails } from "../../services/user.service";
import ImagawayakiReport from "../../components/reports/create/imagawayaki/ImagawayakiReport";
import PotatoFryReport from "../../components/reports/create/potato-fry/PotatoFryReport";
import type { IBranchAssignment } from "../../@types/BranchAssignment";
import BranchSelector from "../../components/reports/branch-selector/BranchSelector";
import { IAssignment } from "../../enums/Assignment";
import HWRGEggsReport from "../../components/reports/create/hwrg-eggs/HWRGEggsReport";

export default function ReportCreatePage() {
  const navigate = useNavigate();
  const user = useCurrentUser();
  const [employee, setEmployee] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedBranch, setSelectedBranch] = useState<
    IBranchAssignment | undefined
  >();

  useEffect(() => {
    const fetchUser = async () => {
      if (user?.id) {
        const employee = await fetchUserDetails(user.id);
        setEmployee(employee ?? null);
        setLoading(false);
      }
    };

    fetchUser();
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (!employee) return <div>No employee found</div>;

  function showReportDetails() {
    switch (selectedBranch?.branches?.assignment) {
      case IAssignment.CHICKY_OINK:
        return (
          <ChickyOinkReport
            selectedBranch={selectedBranch}
            setSelectedBranch={setSelectedBranch}
          />
        );
      case IAssignment.IMAGAWAYAKI:
        return (
          <ImagawayakiReport
            selectedBranch={selectedBranch}
            setSelectedBranch={setSelectedBranch}
          />
        );
      case IAssignment.POTATO_FRY:
        return <PotatoFryReport />;
      case IAssignment.HWRG_EGGS:
        return (
          <HWRGEggsReport
            selectedBranch={selectedBranch}
            setSelectedBranch={setSelectedBranch}
          />
        );
      default:
        return <div>No assignment found</div>;
    }
  }

  return (
    <div className="p-5">
      <Button
        text="Back to Reports Page"
        onClick={() => navigate("/reports")}
        buttonType="primary"
      />
      <div className="mt-10">
        <BranchSelector
          setSelectedBranch={setSelectedBranch}
          selectedBranch={selectedBranch}
        />
        {showReportDetails()}
      </div>
    </div>
  );
}
