import { baseUrl } from "../../consts";

export default async function updateUrl(
  urlId: string,
  orginalUrl: string,
  shortUrl: string
) {
  try {
    const res = await fetch(`${baseUrl}/api/url/${urlId}`, {
      method: "PATCH",
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
    throw new Error("Failed to update url");
  }
}
