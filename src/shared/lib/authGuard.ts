import { cookies } from "next/headers";

export async function getCurrentUser() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("accessToken")?.value;

  if (!token) {
    return null;
  }

  // TODO: verify token / call API lấy user
  return {
    id: "1",
    username: "demo",
  };
}
