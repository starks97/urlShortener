import { Card } from "flowbite-react";

import { ProfileResponse } from "../../api/auth";

interface ProfileProps {
  profile: ProfileResponse;
}

export default function ProfileMe({ data }: { data: ProfileProps["profile"] }) {
  return (
    <>
      <Card href="#" className="max-w-sm m-auto " id="url-card">
        <h5 className="text-2xl font-bold tracking-tight text-gray-200 ">
          Profile info
        </h5>
        <div className="flex flex-row w-full mt-4">
          <span className="text-gray-200 w-1/4">Name:</span>
          <p className="text-gray-200">{data.data.user.name}</p>
        </div>
        <div className="flex flex-row w-full mt-4">
          <span className="text-gray-200 w-1/4">Email:</span>
          <p className="text-gray-200">{data.data.user.email}</p>
        </div>

        <div className="flex flex-row w-full mt-4">
          <span className="text-gray-200 w-1/4">Created:</span>
          <p className="text-gray-200">{data.data.user.createdAt}</p>
        </div>
      </Card>
    </>
  );
}
