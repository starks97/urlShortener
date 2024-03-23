import { baseUrl } from "../../consts";
import { ResfreshResponse } from "./interfaces";

export default async function Refresh(): Promise<ResfreshResponse | undefined> {
  try {
    const res = await fetch(`${baseUrl}/api/auth/refresh`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // this is important for cookies to be sent for the request
    });

    const data = (await res.json()) as ResfreshResponse;

    if (!res.ok) {
      throw new Error(data.message!!);
    }

    return data;
  } catch (error) {
    console.log(error);
  }
}
