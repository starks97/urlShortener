import { createFileRoute, redirect } from "@tanstack/react-router";

import { checkExpToken } from "../utils";

import { Profile } from "../api/auth";

import { ProfileMe } from "../components/profile";

import { queryOptions } from "@tanstack/react-query";

const urlsQueryOptions = queryOptions({
  queryKey: ["profile"],
  queryFn: () => Profile(),
});

export const Route = createFileRoute("/profile")({
  beforeLoad: ({ context, location }) => {
    const accessToken = context.auth.getState().access_token;

    const refreshToken = context.auth.getState().refresh_token;

    if (!accessToken! && !refreshToken!) {
      throw redirect({
        to: "/auth/login",
        search: {
          redirect: location.href,
        },
      });
    } else if (!accessToken && checkExpToken(accessToken!).status === false) {
      throw redirect({
        to: "/auth/refresh",
        search: {
          redirect: location.href,
        },
      });
    } else if (!refreshToken && checkExpToken(refreshToken!).status === false) {
      throw redirect({
        to: "/auth/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  loader: async ({ context }) => {
    const profile = await context.queryClient.ensureQueryData(urlsQueryOptions);

    return {
      profile,
    };
  },
  component: MainProfile,
});

function MainProfile() {
  const { profile } = Route.useLoaderData();

  return <ProfileMe data={profile!} />;
}
