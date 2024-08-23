import { createFileRoute, Outlet } from "@tanstack/react-router";

import { UrlCreator } from "../../components/dashboard";

import { middleware } from "../../middleware";

import { Spinner } from "../../utils";

export const Route = createFileRoute("/dashboard/create_short_url")({
  beforeLoad: async ({ context, location }) => {
    await middleware(location);
  },

  pendingComponent: () => <Spinner />,

  component: CreateUrl,
});

function CreateUrl() {
  return (
    <>
      <UrlCreator />
      <Outlet />
    </>
  );
}
