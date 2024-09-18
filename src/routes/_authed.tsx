import { createFileRoute, redirect } from "@tanstack/react-router";
import { AuthContextType } from "../context";

export const Route = createFileRoute("/_authed")({
  beforeLoad: async ({ context }) => {
    const {
      checkSessionStatus,
      isAuthenticated,
      isAuthenticating,
      sessionStatus,
    } = context.auth as AuthContextType;

    if (isAuthenticating) {
      return;
    }

    if (!isAuthenticated) {
      try {
        await checkSessionStatus();
        if (sessionStatus === "login") {
          redirect({
            to: "/auth/login",
          });
        }

        if (sessionStatus === "refresh") {
          redirect({
            to: "/auth/refresh",
          });
        }
      } catch (error) {
        console.error("Error checking session status", error);
        redirect({
          to: "/auth/login",
        });
        return;
      }
    }

    return;
  },

  errorComponent: () => {
    return <div>There was an error loading the route</div>;
  },
});
