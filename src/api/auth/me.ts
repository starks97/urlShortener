import { baseUrl } from "../../consts";
import { ProfileResponse } from "./interfaces";

export default async function Me() {
  try {
    const res = await fetch(`${baseUrl}/api/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // this is important for cookies to be sent for the request
    });

    const data = (await res.json()) as ProfileResponse;

    if (!res.ok) {
      throw new Error(data.message!!);
    }

    return data;
  } catch (error) {
    console.log(error);
  }
}
