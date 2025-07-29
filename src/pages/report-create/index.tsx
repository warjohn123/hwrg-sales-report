import { useNavigate } from "react-router-dom";
import ChickyOinkReport from "../../components/reports/create/chicky-oink/ChickyOinkReport";
import Button from "../../components/UI/Button";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useEffect, useState } from "react";
import { EMPLOYEE_ASSIGNMENT, type IUser } from "../../@types/User";
import { fetchUserDetails } from "../../services/user.service";
import ImagawayakiReport from "../../components/reports/create/imagawayaki/ImagawayakiReport";

export default function ReportCreatePage() {
  const navigate = useNavigate();
  const user = useCurrentUser();
  const [employee, setEmployee] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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

  return (
    <div className="p-5">
      <Button
        text="Back to Reports Page"
        onClick={() => navigate("/reports")}
        buttonType="primary"
      />
      <div className="mt-10">
        {employee.assignment === EMPLOYEE_ASSIGNMENT.CHICKY_OINK ? (
          <ChickyOinkReport />
        ) : (
          <ImagawayakiReport />
        )}
      </div>
    </div>
  );
}
