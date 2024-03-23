import { createFileRoute, redirect } from "@tanstack/react-router";

import { RefreshForm } from "../../components/auth";

export const Route = createFileRoute("/auth/refresh")({
  beforeLoad: ({ context, location }) => {
    const accessToken = context.auth.getState().access_token;

    const refreshToken = context.auth.getState().refresh_token;

    if (!accessToken && !refreshToken) {
      throw redirect({
        to: "/auth/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: Refresh,
});

function Refresh() {
  return <RefreshForm />;
}
