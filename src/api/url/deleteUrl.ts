import { baseUrl } from "../../consts";

export default async function deleteUrl(urlId: string) {
  try {
    const res = await fetch(`${baseUrl}/api/url/${urlId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message!!);
    }

    return data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete url");
  }
}
