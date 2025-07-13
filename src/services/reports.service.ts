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
