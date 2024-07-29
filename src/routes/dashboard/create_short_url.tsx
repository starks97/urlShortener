import { createFileRoute, Outlet } from "@tanstack/react-router";

import { UrlCreator } from "../../components/dashboard";

import { customMiddleware } from "../../Custom_middleware";

export const Route = createFileRoute("/dashboard/create_short_url")({
  beforeLoad: async ({ context, location }) => {
    customMiddleware(context, location);

    return;
  },

  pendingComponent: () => <div>Loading...</div>,

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
