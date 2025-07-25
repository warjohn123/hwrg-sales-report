import type { IChickyOinkReport } from "../@types/ChickyOinkReport";

export async function createSalesReport(report: IChickyOinkReport) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/sales-reports/add`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(report),
      }
    );

    return res;
  } catch (e) {
    console.error(e);
  }
}

export async function getLastReportByBranchId(branch_id: number) {
  try {
    const res = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/api/sales-reports/${branch_id}/get-last-report`
    );

    console.log("res", res);

    return res.json();
  } catch (e) {
    console.log("e", e);
    console.error(e);
  }
}

export async function getReportsByUserId(
  user_id: string,
  pageNumber: number,
  pageSize: number,
  dates: string[]
) {
  try {
    const res = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/api/sales-reports/get-reports-by-user/${user_id}?page=${pageNumber}&limit=${pageSize}&dates=${dates.join(
        ","
      )}`
    );

    return res.json();
  } catch (e) {
    console.log("e", e);
    console.error(e);
  }
}

export async function fetchReportDetails(report_id: string) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/sales-reports/${report_id}`
    );

    return res.json();
  } catch (e) {
    console.log("e", e);
    console.error(e);
  }
}

export async function fetchSalesReports(
  page: number,
  limit: number,
  branchId = "",
  dates: string[]
) {
  const params = new URLSearchParams();

  params.set("page", page.toString());
  params.set("limit", limit.toString());
  if (branchId) params.set("branchId", branchId);
  if (dates?.length === 2) {
    params.set("dates", dates.join(","));
  }

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/sales-reports?${params.toString()}`
  );
  return res.json();
}
