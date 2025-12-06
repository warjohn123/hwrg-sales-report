import type { IAssignment } from "../enums/Assignment";

export async function fetchBranches(assignment?: IAssignment) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/branches?assignment=${assignment}`
    );
    return res.json();
  } catch (e) {
    console.error(e);
  }
}
