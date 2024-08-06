import { useState } from "react";

import { UrlUpdaterProps } from "./interfaces";

import { updateShortUrl, UpdateUrlResponse, UrlCategories } from "../../api";

import {
  UpdateUrlSchema,
  type UpdateUrlSchemaType,
} from "../../models/url.models";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { type SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { CheckIcon, CloseIcon, OverWriteIcon } from "../Icons";

export default function UrlUpdater({ ...props }: UrlUpdaterProps) {
  const query = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);

  const [inputValue, setInputValue] = useState<string>(props.data);

  const updateHandlers: Record<
    UrlUpdaterProps["label"],
    (variables: any) => void
  > = {
    short_url: (variables) => setInputValue(variables.short_url!),
    original_url: (variables) => setInputValue(variables.original_url!),
    category: (variables) => setInputValue(variables.category!),
  };

  const mutation = useMutation<
    UpdateUrlResponse,
    unknown,
    { original_url?: string; short_url?: string; category?: UrlCategories },
    unknown
  >({
    mutationFn: async ({ original_url, short_url, category }) => {
      try {
        const update = await updateShortUrl(
          props.id,
          original_url!,
          short_url!,
          category!,
        );

        return update as UpdateUrlResponse;
      } catch (error) {
        if (error instanceof Error) {
          throw error.message;
        }
        throw "An error occurred during updating the url.";
      }
    },
    //this executes before the mutation is sent, helping to update the UI
    onMutate: async (variables) => {
      setIsEditing(false);
      const updateHandler = updateHandlers[props.label];
      if (updateHandler) {
        updateHandler(variables);
      }

      return query.getQueryData(["urls", props.id]);
    },
    onSuccess: () => {
      setIsEditing(false);
    },
    onSettled: () => {
      query.invalidateQueries({ queryKey: ["urls"] });
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateUrlSchemaType>({ resolver: zodResolver(UpdateUrlSchema) });

  const onSubmit: SubmitHandler<UpdateUrlSchemaType> = (data) => {
    mutation.mutate(data);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    reset();
    setIsEditing(false);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setInputValue(event.target.value);
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
                onClick={handleEdit}
              >
                <OverWriteIcon />
              </button>
              <span className="text-gray-600 text-lg line-clamp-1">
                {inputValue.length > 30
                  ? `${inputValue.slice(0, 40)}...`
                  : inputValue}
              </span>
            </div>
          </div>

          {/* Display the input field for editing */}
          <form
            className="mb-4 flex items-center justify-start w-full"
            style={{ display: isEditing ? "flex" : "none" }}
            onSubmit={handleSubmit(onSubmit)}
          >
            {props.label !== "category" && (
              <>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  defaultValue={inputValue}
                  {...register(
                    props.label === "short_url" ? "short_url" : "original_url",
                  )}
                />
                {errors[
                  props.label === "short_url" ? "short_url" : "original_url"
                ] && (
                  <span className="text-red-500">
                    {
                      errors[
                        props.label === "short_url"
                          ? "short_url"
                          : "original_url"
                      ]?.message
                    }
                  </span>
                )}
              </>
            )}
            {props.label === "category" && (
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                {...register("category")}
                defaultValue={inputValue}
                onChange={handleCategoryChange}
              >
                {Object.values(UrlCategories)
                  .filter((category) => category !== UrlCategories.All)
                  .map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
              </select>
            )}
            <button
              className="ml-2 bg-orange-400 text-white px-2 py-2 rounded"
              type="submit"
            >
              <CheckIcon />
            </button>
            <button
              className="ml-2 bg-orange-400 text-white px-2 py-2 rounded"
              onClick={handleCancel}
            >
              <CloseIcon />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
