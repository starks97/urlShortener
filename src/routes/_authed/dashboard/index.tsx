import {
  createFileRoute,
  Outlet,
  ErrorComponent,
  type ErrorComponentProps,
} from "@tanstack/react-router";

import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { DashboardMain } from "../../../components/dashboard";

import { UrlCategories } from "../../../api";

import { UrlSearchOptions } from "../../../components/dashboard";

import axios from "../../../axiosConfig";

const fetchUrls = async (
  limit: number,
  offset: number,
  category: UrlCategories,
) => {
  const response = await axios.get(`/url`, {
    params: { limit, offset, category },
  });

  return response.data;
};

const urlsQueryOptions = (
  limit: number,
  offset: number,
  category: UrlCategories,
) => {
  return queryOptions({
    //important to include the queries, with the purpose to invalidate and refetch with a unique key.
    queryKey: ["urls", { limit, offset, category }],
    queryFn: () => fetchUrls(limit, offset, category),
    staleTime: 1000 * 60 * 1,
    refetchOnWindowFocus: false,
  });
};

export function UrlsErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />;
}

export const Route = createFileRoute("/_authed/dashboard/")({
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
    if (context.auth?.isAuthenticated) {
      const urls = await context.queryClient.ensureQueryData(
        urlsQueryOptions(limit, offset, category),
      );

      return { urls };
    }
  },
  pendingComponent: () => <div>Loading...</div>,

  errorComponent: UrlsErrorComponent,

  component: Dashboard,
});

function Dashboard() {
  const searchProps = Route.useSearch();
  const { limit, offset, category } = searchProps;

  const { data: urls } = useSuspenseQuery(
    urlsQueryOptions(limit, offset, category),
  );

  return (
    <>
      <>
        <DashboardMain urls={urls!} searchQueries={searchProps} />
        <Outlet />
      </>
    </>
  );
}
