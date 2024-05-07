import { useState } from "react";

import { UrlUpdaterProps } from "./interfaces";

import { updateShortUrl, UpdateUrlResponse } from "../../api";

import {
  UpdateUrlSchema,
  type UpdateUrlSchemaType,
} from "../../models/url.models";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { type SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

export default function UrlUpdater({ ...props }: UrlUpdaterProps) {
  const query = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);

  const [inputValue, setInputValue] = useState(props.data);

  console.log(inputValue);

  const mutation = useMutation<
    UpdateUrlResponse,
    unknown,
    { original_url?: string; short_url?: string },
    unknown
  >({
    mutationFn: async ({ original_url, short_url }) => {
      try {
        const update = await updateShortUrl(
          props.id,
          original_url!,
          short_url!
        );

        return update as UpdateUrlResponse;
      } catch (error) {
        if (error instanceof Error) {
          throw error.message;
        }
        throw "An error occurred during updating the url.";
      }
    },
    onSuccess: (data) => {
      setIsEditing(false);
      if (props.label === "short_url") {
        setInputValue(data.data.short_url);
      } else {
        setInputValue(data.data.original_url);
      }
    },
    onSettled: async () => {
      return await query.invalidateQueries({ queryKey: ["urls"] });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUrlSchemaType>({ resolver: zodResolver(UpdateUrlSchema) });

  const onSubmit: SubmitHandler<UpdateUrlSchemaType> = (data) => {
    mutation.mutate(data);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto">
      <div className="mt-4">
        <div className="flex flex-col align-start">
          <div
            className="flex w-full flex-col md:flex-row "
            style={{ display: !isEditing ? "flex" : "none" }}
          >
            <span className="text-gray-200 w-1/4">{props.label}</span>
            <div className="flex flex-row align-start">
              <button
                className="text-blue-500 hover:underline"
                onClick={() => setIsEditing(true)}
              >
                <svg
                  className="w-6 h-6 text-gray-200 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.3 6.2H5a2 2 0 0 0-2 2V19a2 2 0 0 0 2 2h11c1.1 0 2-1 2-2.1V11l-4 4.2c-.3.3-.7.6-1.2.7l-2.7.6c-1.7.3-3.3-1.3-3-3.1l.6-2.9c.1-.5.4-1 .7-1.3l3-3.1Z"
                    clipRule="evenodd"
                  ></path>
                  <path
                    fillRule="evenodd"
                    d="M19.8 4.3a2.1 2.1 0 0 0-1-1.1 2 2 0 0 0-2.2.4l-.6.6 2.9 3 .5-.6a2.1 2.1 0 0 0 .6-1.5c0-.2 0-.5-.2-.8Zm-2.4 4.4-2.8-3-4.8 5-.1.3-.7 3c0 .3.3.7.6.6l2.7-.6.3-.1 4.7-5Z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <span className="text-gray-600 text-lg line-clamp-1">
                {props.data.length > 30
                  ? `${props.data.slice(0, 40)}...`
                  : props.data}
              </span>
            </div>
          </div>

          {/* Display the input field for editing */}
          <form
            className="mb-4 flex items-center justify-start w-full"
            style={{ display: isEditing ? "flex" : "none" }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              defaultValue={inputValue}
              {...register(
                props.label === "short_url" ? "short_url" : "original_url"
              )}
            />
            {errors[
              props.label === "short_url" ? "short_url" : "original_url"
            ] && (
              <span className="text-red-500">
                {
                  errors[
                    props.label === "short_url" ? "short_url" : "original_url"
                  ]?.message
                }
              </span>
            )}
            <button
              className="ml-2 bg-orange-400 text-white px-2 py-2 rounded"
              type="submit"
            >
              <svg
                className="w-6 h-6 text-gray-200 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 11.917 9.724 16.5 19 7.5"
                />
              </svg>
            </button>
            <button
              className="ml-2 bg-orange-400 text-white px-2 py-2 rounded"
              onClick={() => setIsEditing(false)}
            >
              <svg
                className="w-6 h-6 text-gray-200 "
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 50 50"
              >
                <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
