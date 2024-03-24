import { baseUrl } from "../../consts";
import { RedirectResponse } from "./interfaces";

export default async function redirectUrl(shortUrl: string) {
  try {
    const res = await fetch(`${baseUrl}/api/url/redirect/${shortUrl}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = (await res.json()) as RedirectResponse;

    if (!res.ok) {
      throw new Error(data.message!!);
    }

    return data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to redirect url");
  }
}
