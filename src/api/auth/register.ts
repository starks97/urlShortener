import type { RegisterResponse } from "./interfaces";
import { baseUrl } from "../../consts";
export default async function Register(
  name: string,
  email: string,
  password: string
) {
  try {
    const res = await fetch(`${baseUrl}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = (await res.json()) as RegisterResponse;

    if (!res.ok) {
      throw new Error(data.message!!);
    }
    return data;
  } catch (error) {
    console.error(error);
  }
}
