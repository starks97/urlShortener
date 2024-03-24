import { Card } from "flowbite-react";

import { ProfileResponse } from "../../api/auth";

interface ProfileProps {
  profile: ProfileResponse;
}

export default function ProfileMe({ data }: { data: ProfileProps["profile"] }) {
  return (
    <>
      <Card href="#" className="max-w-sm">
        <h5 className="text-2xl font-bold tracking-tight text-gray-200 ">
          Noteworthy technology acquisitions 2021
        </h5>
        <p className="font-normal text-gray-200">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
      </Card>
    </>
  );
}
