import { Button, Popover } from "flowbite-react";

import { deleteCustomUrl, DeleteUrlResponse } from "../../api";

import Form from "../Form";

import { DeleteUrlSchema, DeleteUrlSchemaType } from "../../models/url.models";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { type SubmitHandler } from "react-hook-form";

import { useNavigate } from "@tanstack/react-router";

import { UrlCategories } from "../../api";

import { DeleteUrlField } from "./consts";

interface Props {
  id: string;
}

export default function DeleteUrl({ ...props }: Props) {
  const query = useQueryClient();

  const navigate = useNavigate();

  const mutation = useMutation<DeleteUrlResponse, unknown, unknown, unknown>({
    mutationFn: async () => {
      try {
        const deleteUrl = await deleteCustomUrl(props.id);

        return deleteUrl as DeleteUrlResponse;
      } catch (error) {
        if (error instanceof Error) {
          throw error.message;
        }
        throw "An error occurred deleting the url.";
      }
    },
    onMutate: async () => {
      return query.getQueryData(["urls", props.id]);
    },
    onSuccess: () => {
      navigate({
        to: "/dashboard",
        search: { limit: 15, category: UrlCategories.All, offset: 0 },
      });
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: async () => {
      await query.invalidateQueries({ queryKey: ["urls"] });
    },
  });

  const onSubmit: SubmitHandler<DeleteUrlSchemaType> = (data) => {
    mutation.mutate(data);
  };

  return (
    <Popover
      aria-labelledby="default-popover"
      placement="top"
      content={
        <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
          <div id="auth-form" className=" max-w-md ">
            <Form
              formSchema={DeleteUrlField}
              submitButtonText="Create Short Url"
              validationSchema={DeleteUrlSchema}
              onSubmit={onSubmit}
            >
              {mutation.error?.toString() && (
                <p className="text-red-500">{mutation.error.toString()}</p>
              )}
            </Form>
          </div>
        </div>
      }
      trigger="click"
      arrow={false}
    >
      <Button>Delete</Button>
    </Popover>
  );
}
