import { ParsedLocation, redirect } from "@tanstack/react-router";

import { baseUrl } from "./consts";

import { SessionStatusResponse, UrlCategories } from "./api";

export async function middleware(location: ParsedLocation) {
  try {
    const response = await fetch(`${baseUrl}/session_status`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const data = (await response.json()) as SessionStatusResponse;

    if (data.status === "valid") {
      throw redirect({
        to: "/dashboard",
        search: {
          category: UrlCategories.All,
          limit: 15,
          offset: 0,
        },
      });
    } else if (data.status === "refresh") {
      throw redirect({
        to: "/auth/refresh",
        search: {
          redirect: location.href,
        },
      });
    } else if (data.status === "login") {
      throw redirect({
        to: "/auth/login",
        search: {
          message: "An unexpected error occurred.",
        },
      });
    }

    return true;
  } catch (error) {
    console.error("Error in customMiddleware:", error);
    throw redirect({
      to: "/auth/login",
      search: {
        message: "An unexpected error occurred.",
      },
    });
  }
}
