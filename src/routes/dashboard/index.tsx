import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { queryOptions } from "@tanstack/react-query";
import { type UrlResponse } from "../../api";

import { DashboardMain } from "../../components/dashboard";

import { GetHttpRequestStrategy, HttpRequestContext } from "../../api";

import Cookies from "js-cookie";
import { baseUrl } from "../../consts";

const getAllUrls = new GetHttpRequestStrategy();
const allUrlsContext = new HttpRequestContext(getAllUrls);

const paginationParameters = {
  limit: 10,
  offset: 0,
};

const allUrls = await allUrlsContext.executeRequest<UrlResponse>(
  `${baseUrl}/url?limit=${paginationParameters.limit}&offset=${paginationParameters.offset}`
);

const urlsQueryOptions = queryOptions({
  queryKey: ["urls"],
  queryFn: () => allUrls,
});

export const Route = createFileRoute("/dashboard/")({
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

  loader: async ({ context }) => {
    const urls = await context.queryClient.ensureQueryData(urlsQueryOptions);

    return {
      urls,
    };
  },

  pendingComponent: () => <div>Loading...</div>,

  component: Dashboard,
});

function Dashboard() {
  const { urls }: { urls: UrlResponse } = Route.useLoaderData();

  return (
    <>
      <DashboardMain urls={urls!} />
      <Outlet />
    </>
  );
}
