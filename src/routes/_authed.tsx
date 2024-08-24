import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed")({
  beforeLoad: async ({ context }) => {
    const { checkSessionStatus, isAuthenticated } = context.auth;
    if (!isAuthenticated) {
      try {
        await checkSessionStatus();
      } catch (error) {
        console.error("Error checking session status", error);
        window.location.href = "/auth/login";
      }
    }
  },

  errorComponent: () => {
    return <div>There was an error loading the route</div>;
  },
});
