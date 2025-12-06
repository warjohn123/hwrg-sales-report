import { useContext, useEffect, useState } from "react";
import { fetchBranches } from "../../../../services/branch.service";
import { toast } from "react-toastify";
import { IAssignment } from "../../../../enums/Assignment";
import { type IBranch } from "../../../../@types/Branch";
import {
  RemitReportContext,
  type RemitReportContextType,
} from "../../../../context/remitReportContext";

type Props = {
  assignment: IAssignment;
};

export default function RemitSales({ assignment }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [branches, setBranches] = useState<IBranch[]>([]);

  const { sales, setSales } = useContext(
    RemitReportContext
  ) as RemitReportContextType;

  useEffect(() => {
    const loadBranches = async () => {
      try {
        const res = await fetchBranches(assignment);
        setBranches(res.branches);

        setIsLoading(false);
      } catch (e) {
        toast.error("Something went wrong. Please contact Warren.");
        console.error(e);
      }
    };

    loadBranches();
  }, [assignment]);

  const branchTotal = Object.values(sales[assignment] || {}).reduce(
    (sum, val) => sum + val,
    0
  );

  if (isLoading) return <>Loading branches...</>;

  return (
    <div className="mt-5 mb-5">
      <h1 className="font-bold text-2xl">{assignment} Sales</h1>

      <div className="space-y-4 mt-3">
        {branches
          .filter((branch) => !branch.branch_name.includes("Test"))
          .map((branch: IBranch) => (
            <div key={branch.id} className="flex">
              <p className="text-lg mb-3 w-55">{branch.branch_name}</p>
              <input
                type="number"
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  const value = Number(e.target.value) || 0;
                  setSales((prev) => ({
                    ...prev,
                    [assignment]: {
                      ...prev[assignment],
                      [String(branch.id)]: value,
                    },
                  }));
                }}
              />
            </div>
          ))}
      </div>

      {/* Total */}
      <div className="mt-6 text-xl font-bold">
        Total Sales: ₱{branchTotal.toLocaleString()}
      </div>
    </div>
  );
}
