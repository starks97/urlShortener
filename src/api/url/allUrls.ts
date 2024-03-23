import { baseUrl } from "../../consts";
import type { UrlResponse } from "./interfaces";

export default async function allUrls(limit: number, offser: number) {
  try {
    const res = await fetch(
      `${baseUrl}/api/url?limit=${limit}&offset=${offser}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const data = (await res.json()) as UrlResponse;

    if (!res.ok) {
      throw new Error(data.message!!);
    }

    return data;
  } catch (err) {
    console.log(err);
  }
}
