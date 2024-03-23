import { baseUrl } from "../../consts";
import type { LoginResponse } from "./interfaces";

export default async function Login(email: string, password: string) {
  const res = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = (await res.json()) as LoginResponse;

  if (!res.ok) {
    throw new Error(data.message!!);
  }
  return data;
}
