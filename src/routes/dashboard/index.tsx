import { createFileRoute, Outlet } from "@tanstack/react-router";

import { queryOptions } from "@tanstack/react-query";

import { DashboardMain } from "../../components/dashboard";

import { getAllUrl, type UrlsResponse, UrlCategories } from "../../api";

import { RouterSpinner } from "../../utils";

import { UrlSearchOptions } from "../../components/dashboard";

const urlsQueryOptions = (
  limit: number,
  offset: number,
  category: UrlCategories,
) =>
  queryOptions({
    //important to include the queries, with the purpose to invalidate and refetch with a unique key.
    queryKey: ["urls", { limit, offset, category }],
    queryFn: () => getAllUrl(limit, offset, category),
  });

import { customMiddleware } from "../../Custom_middleware";

export const Route = createFileRoute("/dashboard/")({
  beforeLoad: async ({ context, location }) => {
    customMiddleware(context, location);
  },
  validateSearch: (search: Record<string, unknown>): UrlSearchOptions => {
    return {
      limit: Number(search?.limit ?? 15),
      offset: Number(search?.offset ?? 0),
      category: (search?.category as UrlCategories) || UrlCategories.All,
    };
  },

  loaderDeps: ({ search }) => {
    return {
      limit: search.limit,
      offset: search.offset,
      category: search.category,
    };
  },

  loader: async ({ context, deps: { limit, offset, category } }) => {
    const urls = await context.queryClient.ensureQueryData(
      urlsQueryOptions(limit, offset, category),
    );
    return {
      urls,
    };
  },

  pendingComponent: () => <RouterSpinner />,

  component: Dashboard,
});

function Dashboard() {
  const { urls }: { urls: UrlsResponse } = Route.useLoaderData();

  const searchProps = Route.useSearch();

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4 rounded-lg min-h-[calc(100vh-3.5rem)]">
          <DashboardMain urls={urls!} searchQueries={searchProps} />
          <Outlet />
        </div>
      </div>
    </>
  );
}
