import { createFileRoute } from "@tanstack/react-router";

import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { useState } from "react";

import { DashModal } from "../../../components/dashboard";

import { useMemo } from "react";

import axios from "../../../axiosConfig";

import { Spinner } from "../../../components/Spinner";

const fetchUrl = async (id: string) => {
  const response = await axios.get(`/url/${id}`);
  return response.data;
};

const urlQueryOptions = (id: string) =>
  queryOptions({
    //important always set the key and the value that will be changed or updated.
    queryKey: ["url", id],
    queryFn: () => fetchUrl(id),
    staleTime: 1000 * 60 * 1,
  });

export const Route = createFileRoute("/_authed/dashboard/$url_id")({
  loader: async ({ params: { url_id }, context }) => {
    const url = await context.queryClient.ensureQueryData(
      urlQueryOptions(url_id),
    );

    return { url };
  },

  component: UrlModal,
});

function UrlModal() {
  const { url_id } = Route.useParams();
  const { data: url, isLoading } = useSuspenseQuery(urlQueryOptions(url_id));

  console.log("loading..", isLoading);

  const [openModal, setOpenModal] = useState(true);
  const memoizedData = useMemo(() => url.data, [url.data]);

  if (isLoading) {
    return <Spinner />;
  }

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
