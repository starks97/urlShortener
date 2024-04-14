import { Button, Card } from "flowbite-react";

import { ResfreshResponse } from "../../api/auth";

import { useMutation } from "@tanstack/react-query";

import { useNavigate } from "@tanstack/react-router";

import { baseUrl } from "../../consts";

import {
  GetHttpRequestStrategy,
  HttpRequestContext,
} from "../../api/handlerMethod";

export default function RefreshForm() {
  const navigate = useNavigate();

  const RefreshStrategy = new GetHttpRequestStrategy();
  const RefreshContext = new HttpRequestContext(RefreshStrategy);

  const mutation = useMutation<ResfreshResponse>({
    mutationFn: async (): Promise<ResfreshResponse> => {
      try {
        const refresh = await RefreshContext.executeRequest<ResfreshResponse>(
          `${baseUrl}/auth/refresh`
        );

        return refresh as ResfreshResponse;
      } catch (error) {
        if (error instanceof Error) {
          throw error.message;
        }

        throw "An error occurred. Please try again.";
      }
    },

    onSuccess: (data) => {
      navigate({ to: "/dashboard" });
      return;
    },

    onError: (data) => {
      throw data.message;
    },
  });

  const handleRefresh = () => {
    mutation.mutate();
  };

  return (
    <Card className="max-w-sm">
      {mutation.error?.toString() && (
        <p className="text-red-500">{mutation.error.toString()}</p>
      )}
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Refresh your token
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        You can refresh your token by clicking the button below.
      </p>
      <Button onClick={handleRefresh}>
        Refresh token
        <svg
          className="-mr-1 ml-2 h-4 w-4"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
    </Card>
  );
}
