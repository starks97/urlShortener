import { createFileRoute } from "@tanstack/react-router";

import { ProfileMe } from "../components/profile";

import { queryOptions } from "@tanstack/react-query";

import { middleware } from "../middleware";

import { profileRequest, ProfileResponse } from "../api";

const ProfileQueryOptions = queryOptions({
  queryKey: ["profile"],
  queryFn: () => profileRequest(),
});

export const Route = createFileRoute("/profile")({
  beforeLoad: async ({ context, location }) => {
    await middleware(location);
    return await context.queryClient.prefetchQuery(ProfileQueryOptions);
  },
  loader: async ({ context }) => {
    const profile =
      await context.queryClient.ensureQueryData(ProfileQueryOptions);

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
