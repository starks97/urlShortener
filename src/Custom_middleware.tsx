import { ParsedLocation, redirect } from "@tanstack/react-router";

import Cookies from "js-cookie";
import { StoreApi } from "zustand/vanilla";
import { AuthState } from "./store";

interface Context {
  auth: StoreApi<AuthState>;
}

export function customMiddleware(context: Context, location: ParsedLocation) {
  const serviceToken = context.auth.getState().serviceToken;
  const loggedInCookie = Cookies.get("logged_in");

  if (!serviceToken && !loggedInCookie) {
    throw redirect({
      to: "/auth/login",
      search: {
        redirect: location.href,
      },
    });
  } else if (!loggedInCookie) {
    throw redirect({
      to: "/auth/refresh",
      search: {
        redirect: location.href,
      },
    });
  }
}
