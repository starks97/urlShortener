import { createFileRoute, redirect } from "@tanstack/react-router";

import { checkExpToken } from "../utils";

import { queryOptions } from "@tanstack/react-query";
import { allUrls } from "../api";

import { DashboardMain } from "../components/dashboard";

const urlsQueryOptions = queryOptions({
  queryKey: ["urls"],
  queryFn: () => allUrls(10, 0),
});

export const Route = createFileRoute("/dashboard")({
  beforeLoad: ({ context, location }) => {
    const accessToken = context.auth.getState().access_token;

    const refreshToken = context.auth.getState().refresh_token;

    if (!accessToken! && !refreshToken!) {
      throw redirect({
        to: "/auth/login",
        search: {
          redirect: location.href,
        },
      });
    } else if (!accessToken && checkExpToken(accessToken!).status === false) {
      throw redirect({
        to: "/auth/refresh",
        search: {
          redirect: location.href,
        },
      });
    } else if (!refreshToken && checkExpToken(refreshToken!).status === false) {
      throw redirect({
        to: "/auth/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },

  loader: async ({ context }) => {
    const urls = await context.queryClient.ensureQueryData(urlsQueryOptions);

    return {
      urls,
    };
  },

  component: Dashboard,
});

function Dashboard() {
  const { urls } = Route.useLoaderData();

  return <DashboardMain urls={urls!} />;
}
