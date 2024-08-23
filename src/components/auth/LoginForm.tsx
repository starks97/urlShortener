import { useMutation } from "@tanstack/react-query";

import { useNavigate } from "@tanstack/react-router";

import { type SubmitHandler } from "react-hook-form";

import {
  type LoginUserSchemaType,
  LoginUserSchema,
} from "../../models/auth.models";

import { LoginFormField } from "./consts";

import { loginRequest, LoginResponse, UrlCategories } from "../../api";

import Form from "../Form";

export default function LoginForm() {
  const navigate = useNavigate();

  const mutation = useMutation<
    LoginResponse,
    unknown,
    { email: string; password: string },
    unknown
  >({
    mutationFn: async ({ email, password }) => {
      try {
        const login = await loginRequest(email, password);

        return login as LoginResponse;
      } catch (error) {
        if (error instanceof Error) {
          throw error.message;
        }
        throw "An error occurred during sign-in.";
      }
    },

    onSuccess: () => {
      navigate({
        to: "/dashboard",
        search: { limit: 15, offset: 0, category: UrlCategories.All },
      });
    },
  });

  const onSubmit: SubmitHandler<LoginUserSchemaType> = (data) => {
    try {
      mutation.mutate(data);
    } catch (error) {
      if (error instanceof Error) {
        throw error.message;
      }
      throw "An error occurred during sign-in.";
    }
  };

  return (
    <>
      <div id="auth-form" className=" max-w-md ">
        <h3 className="text-2xl md:text-3xl font-bold text-start text-orange-600 mb-5">
          Login to your account
        </h3>
        <Form
          formSchema={LoginFormField}
          onSubmit={onSubmit}
          submitButtonText="Login"
          validationSchema={LoginUserSchema}
        >
          {mutation.error?.toString() && (
            <p className="text-red-500">{mutation.error.toString()}</p>
          )}
        </Form>
      </div>
    </>
  );
}
