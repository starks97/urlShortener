import { type SubmitHandler } from "react-hook-form";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { type CreateUrlResponse } from "../../api";

import Form from "../Form";

import {
  CreateUrlSchema,
  type CreateUrlSchemaType,
} from "../../models/url.models";

import { CreateShortUrlField } from "./consts";

import { baseUrl } from "../../consts";

import {
  PostHttpRequestStrategy,
  HttpRequestContext,
} from "../../api/handlerMethod";

export default function UrlCreator() {
  const query = useQueryClient();

  const CreateUrlStrategy = new PostHttpRequestStrategy();
  const CreateUrlContext = new HttpRequestContext(CreateUrlStrategy);

  const mutation = useMutation<
    CreateUrlResponse,
    unknown,
    { original_url: string; short_url: string },
    unknown
  >({
    mutationFn: async ({ original_url, short_url }) => {
      try {
        const createUrlResponse =
          await CreateUrlContext.executeRequest<CreateUrlResponse>(
            `${baseUrl}/url`,
            { original_url, short_url }
          );

        return createUrlResponse as CreateUrlResponse;
      } catch (error) {
        if (error instanceof Error) {
          throw error.message;
        }
        throw "An error occurred during creation of short url.";
      }
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: async () => {
      return await query.invalidateQueries({ queryKey: ["urls"] });
    },
  });

  const onSubmit: SubmitHandler<CreateUrlSchemaType> = (data) => {
    try {
      mutation.mutate(data);
    } catch (error) {
      if (error instanceof Error) {
        throw error.message;
      }
      throw "An error occurred during creation of short url.";
    }
  };

  return (
    <>
      <div id="auth-form">
        <Form
          formSchema={CreateShortUrlField}
          submitButtonText="Create Short Url"
          validationSchema={CreateUrlSchema}
          onSubmit={onSubmit}
        >
          {mutation.error?.toString() && (
            <p className="text-red-500">{mutation.error.toString()}</p>
          )}
        </Form>
      </div>
    </>
  );
}
