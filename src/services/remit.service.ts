export async function createRemitReport(report: { title: string }) {
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
