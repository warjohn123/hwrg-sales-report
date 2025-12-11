export async function fetchRemits(
  page: number,
  limit: number,
  dates: string[]
) {
  const params = new URLSearchParams();

  params.set("page", page.toString());
  params.set("limit", limit.toString());
  if (dates?.length === 2) {
    params.set("dates", dates.join(","));
  }

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/remit-reports?${params.toString()}`
  );
  return res.json();
}

export async function fetchRemitDetails(remit_id: string) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/remit-reports/${remit_id}`
    );

    return res.json();
  } catch (e) {
    console.log("e", e);
    console.error(e);
  }
}
