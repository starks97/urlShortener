import { createFileRoute } from "@tanstack/react-router";

import { getUrl } from "../../../api";

import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { useState } from "react";

import { DashModal } from "../../../components/dashboard";

import { useMemo } from "react";

const urlQueryOptions = (id: string) =>
  queryOptions({
    //important always set the key and the value that will be changed or updated.
    queryKey: ["url", id],
    queryFn: () => getUrl(id),
  });

export const Route = createFileRoute("/_authed/dashboard/$url_id")({
  loader: async ({ params: { url_id }, context }) => {
    const url = await context.queryClient.ensureQueryData(
      urlQueryOptions(url_id),
    );
    return {
      url,
    };
  },

  component: UrlModal,
});

function UrlModal() {
  const { url_id } = Route.useParams();
  const { data: url } = useSuspenseQuery(urlQueryOptions(url_id));
  const [openModal, setOpenModal] = useState(true);
  const memoizedData = useMemo(() => url.data, [url.data]);

  console.log(url);
  return (
    <>
      <DashModal
        key={url.data.id}
        setOpenModal={setOpenModal}
        data={memoizedData}
        openModal={openModal}
      />
    </>
  );
}
