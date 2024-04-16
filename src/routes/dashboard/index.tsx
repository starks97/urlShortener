import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { queryOptions } from "@tanstack/react-query";

import { DashboardMain } from "../../components/dashboard";

import { getAllUrl, type UrlResponse } from "../../api";

const urlsQueryOptions = queryOptions({
  queryKey: ["urls"],
  queryFn: () => getAllUrl(10, 0),
});

import { customMiddleware } from "../../Custom_middleware";

export const Route = createFileRoute("/dashboard/")({
  beforeLoad: async ({ context, location }) => {
    try {
      customMiddleware(context, location);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw redirect(error as { to: string; search: { redirect: string } });
    }

    await context.queryClient.prefetchQuery(urlsQueryOptions);
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
