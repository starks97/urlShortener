import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { UrlCreator } from "../../components/dashboard";

import { customMiddleware } from "../../Custom_middleware";

export const Route = createFileRoute("/dashboard/create_short_url")({
  beforeLoad: ({ context, location }) => {
    try {
      customMiddleware(context, location);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw redirect(error as { to: string; search: { redirect: string } });
    }
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
