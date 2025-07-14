export async function getBranchAssignmentsByUserId(user_id: string) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/${user_id}/branch-assignments`
    );

    return res.json();
  } catch (e) {
    console.log("e", e);
    console.error(e);
  }
}
