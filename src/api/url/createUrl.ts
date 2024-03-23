import { baseUrl } from "../../consts";

export default async function createUrl(orginalUrl: string, shortUrl: string) {
  try {
    const res = await fetch(`${baseUrl}/api/url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ orginalUrl, shortUrl }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message!!);
    }

    return data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create url");
  }
}
