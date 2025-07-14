import { useContext, useEffect, useState } from "react";
import { type IBranchAssignment } from "../../../../@types/BranchAssignment";
import { useCurrentUser } from "../../../../hooks/useCurrentUser";
import { getBranchAssignmentsByUserId } from "../../../../services/branch-assignment.service";
import {
  ChickyOinkReportContext,
  type ChickyOinkReportContextType,
} from "../../../../context/chickyReportContext";

export default function ChickyOinkSelectBranch() {
  const user = useCurrentUser();
  const [branchAssignments, setBranchAssignments] = useState<
    IBranchAssignment[]
  >([]);
  const { selectedBranch, setSelectedBranch } = useContext(
    ChickyOinkReportContext
  ) as ChickyOinkReportContextType;

  const fetchBranches = async () => {
    const res = await getBranchAssignmentsByUserId(user!.id);

    setBranchAssignments(res);
    setSelectedBranch(res[0]);
  };

  useEffect(() => {
    if (user?.id) {
      fetchBranches();
    }
  }, [user]);

  return (
    <>
      <div>Select a branch</div>
      <select
        value={selectedBranch?.branch_id || ""}
        onChange={(e) => {
          const branchId = e.target.value;
          const selected = branchAssignments.find(
            (a) => a.branch_id.toString() === branchId
          );
          setSelectedBranch(selected ?? undefined); // Pass full assignment object or just ID
        }}
        className="px-4 py-2 mt-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {branchAssignments.map((assignment) => (
          <option key={assignment.branch_id} value={assignment.branch_id}>
            {assignment.branches?.branch_name || "Unnamed Branch"}
          </option>
        ))}
      </select>
    </>
  );
}
