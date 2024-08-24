import { createFileRoute, Outlet } from "@tanstack/react-router";

import { UrlCreator } from "../../../components/dashboard";

export const Route = createFileRoute("/_authed/dashboard/create_short_url")({
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
