import type { RemitAddOn, RemitExpense } from "../@types/RemitAddOn";
import type { RemitSalesType } from "../context/remitReportContext";

type CreateRemitReportParam = {
  title: string;
  sales: RemitSalesType;
  expenses: RemitExpense[];
  add_ons: RemitAddOn[];
};

export async function createRemitReport(report: CreateRemitReportParam) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/remit-reports/add`,
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
