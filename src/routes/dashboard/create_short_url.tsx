import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { UrlCreator } from "../../components/dashboard";

import Cookies from "js-cookie";

export const Route = createFileRoute("/dashboard/create_short_url")({
  beforeLoad: ({ context, location }) => {
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
  },

  pendingComponent: () => <div>Loading...</div>,

  component: CreateUrl,
});

function CreateUrl() {
  return (
    <>
      <UrlCreator />
      <Outlet />
    </>
  );
}
