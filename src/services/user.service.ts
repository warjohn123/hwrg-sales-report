import type { IUser } from "../@types/User";

export async function fetchUserDetails(user_id: string) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/${user_id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = (await res.json()) as IUser;

    return data;
  } catch (e) {
    console.error(e);
  }
}
