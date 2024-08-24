import { createFileRoute } from "@tanstack/react-router";

import { getUrl, UrlResponse } from "../../../api";

import { queryOptions } from "@tanstack/react-query";

import { useState } from "react";

import { DashModal } from "../../../components/dashboard";

import { useMemo } from "react";

const urlQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["url"],
    queryFn: () => getUrl(id),
  });

export const Route = createFileRoute("/_authed/dashboard/$url_id")({
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
