import { createFileRoute, redirect } from "@tanstack/react-router";

import { RefreshForm } from "../../components/auth";

export const Route = createFileRoute("/auth/refresh")({
  beforeLoad: ({ context, location }) => {
    console.log("before load", location);
  },
  component: Refresh,
});

function Refresh() {
  return <RefreshForm />;
}
