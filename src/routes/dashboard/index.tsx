import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";

import { queryOptions } from "@tanstack/react-query";

import { DashboardMain } from "../../components/dashboard";

import { getAllUrl, type UrlResponse } from "../../api";

import { SideMenu } from "../../components/dashboard";

const urlsQueryOptions = queryOptions({
  queryKey: ["urls"],
  queryFn: () => getAllUrl(15, 0),
});

import { customMiddleware } from "../../Custom_middleware";

export const Route = createFileRoute("/dashboard/")({
  beforeLoad: async ({ context, location }) => {
    customMiddleware(context, location);

    return await context.queryClient.prefetchQuery(urlsQueryOptions);
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
      <div className="p-4 sm:ml-64">
        <div className="p-4 rounded-lg min-h-[calc(100vh-3.5rem)]">
          <DashboardMain urls={urls!} />
          <Outlet />
        </div>
      </div>
    </>
  );
}
