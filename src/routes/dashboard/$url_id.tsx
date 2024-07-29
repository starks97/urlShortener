import { createFileRoute } from "@tanstack/react-router";

import { customMiddleware } from "../../Custom_middleware";

import { getUrl, UrlResponse } from "../../api";

import { queryOptions } from "@tanstack/react-query";

import { useState } from "react";

import { DashModal } from "../../components/dashboard";

import { useMemo } from "react";

const urlQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["url"],
    queryFn: () => getUrl(id),
  });

export const Route = createFileRoute("/dashboard/$url_id")({
  beforeLoad: async ({ context, location, params }) => {
    customMiddleware(context, location);

    await context.queryClient.prefetchQuery(urlQueryOptions(params.url_id));
  },

  loader: async ({ params, context }) => {
    const url = await context.queryClient.ensureQueryData(
      urlQueryOptions(params.url_id),
    );

    return {
      url,
    };
  },

  pendingComponent: () => <div>Loading...</div>,

  component: UrlModal,
});

function UrlModal() {
  const { url }: { url: UrlResponse } = Route.useLoaderData();
  const [openModal, setOpenModal] = useState(true);
  const memoizedData = useMemo(() => url.data, [url.data]);
  return (
    <>
      <DashModal
        setOpenModal={setOpenModal}
        data={memoizedData}
        openModal={openModal}
      />
    </>
  );
}
