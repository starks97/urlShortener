import { type SubmitHandler } from "react-hook-form";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { type CreateUrlResponse } from "../../api";

import Form from "../Form";

import {
  CreateUrlSchema,
  type CreateUrlSchemaType,
} from "../../models/url.models";

import { CreateShortUrlField } from "./consts";

import { useNavigate } from "@tanstack/react-router";

import toast from "react-hot-toast";

import { searchParams } from "../../consts";

import axios from "../../axiosConfig";

const createShortUrl = async (
  original_url: string,
  short_url: string,
  category: string,
) => {
  try {
    const response = await axios.post("/url", {
      original_url,
      short_url,
      category,
    });

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    }
    throw "An error occurred during creation of short url.";
  }
};

export default function UrlCreator() {
  const query = useQueryClient();

  const navigate = useNavigate();

  const mutation = useMutation<
    CreateUrlResponse,
    unknown,
    { original_url: string; short_url: string; category: string },
    unknown
  >({
    mutationFn: async ({ original_url, short_url, category }) => {
      try {
        const response = await createShortUrl(
          original_url,
          short_url,
          category,
        );

        return response as CreateUrlResponse;
      } catch (error) {
        if (error instanceof Error) {
          throw error.message;
        }
        throw "An error occurred during creation of short url.";
      }
    },
    onMutate: () => {
      navigate({
        to: "/dashboard",
        search: { ...searchParams.search },
      });

      toast.success("Short url created successfully.");
      return query.getQueryData(["urls"]);
    },
    onError: (error) => {
      console.log(error);
      toast.error("An error occurred during creation of short url.");
    },
    onSettled: async () => {
      await query.invalidateQueries({ queryKey: ["urls"] });
    },
  });

  const onSubmit: SubmitHandler<CreateUrlSchemaType> = (data) => {
    mutation.mutate(data!);
  };

  return (
    <>
      <div id="auth-form" className=" max-w-md ">
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
