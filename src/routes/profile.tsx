import { createFileRoute, redirect } from "@tanstack/react-router";

import { ProfileMe } from "../components/profile";

import { queryOptions } from "@tanstack/react-query";

import Cookies from "js-cookie";

import { baseUrl } from "../consts";

import {
  GetHttpRequestStrategy,
  HttpRequestContext,
  type ProfileResponse,
} from "../api";

const Profile = new GetHttpRequestStrategy();
const ProfileContext = new HttpRequestContext(Profile);

const profile = await ProfileContext.executeRequest<ProfileResponse>(
  `${baseUrl}/users/me`
);

const urlsQueryOptions = queryOptions({
  queryKey: ["profile"],
  queryFn: () => profile,
});

export const Route = createFileRoute("/profile")({
  beforeLoad: ({ context, location }) => {
    const serviceToken = context.auth.getState().serviceToken;

    const loggedInCookie = Cookies.get("logged_in");

    console.log(loggedInCookie);

    if (!serviceToken && !loggedInCookie) {
      throw redirect({
        to: "/auth/login",
        search: {
          redirect: location.href,
        },
      });
    } else if (!loggedInCookie) {
      throw redirect({
        to: "/auth/refresh",
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
  const { profile }: { profile: ProfileResponse } = Route.useLoaderData();

  return <ProfileMe data={profile!} />;
}
