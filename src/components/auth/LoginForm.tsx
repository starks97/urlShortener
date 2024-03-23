import { useContext } from "react";

import { useMutation } from "@tanstack/react-query";

import { useNavigate } from "@tanstack/react-router";

import { type SubmitHandler } from "react-hook-form";

import { Login, type LoginResponse } from "../../api";

import {
  type LoginUserSchemaType,
  LoginUserSchema,
} from "../../models/auth.models";

import { AuthContext } from "../../context";

import { useStore } from "zustand";

import { LoginFormField } from "./consts";

import Form from "../Form";

export default function LoginForm() {
  const store = useContext(AuthContext);

  const refreshToken = useStore(store!, (state) => state.setRefreshToken);

  const accessToken = useStore(store!, (state) => state.setAccesToken);

  const navigate = useNavigate();

  const mutation = useMutation<
    LoginResponse,
    unknown,
    { email: string; password: string },
    unknown
  >({
    mutationFn: async ({ email, password }) => {
      try {
        const data = await Login(email, password);

        return data;
      } catch (error) {
        if (error instanceof Error) {
          throw error.message;
        }
        throw "An error occurred during sign-in.";
      }
    },

    onSuccess: (data) => {
      accessToken(data?.data.access_token!);

      refreshToken(data?.data.refresh_token!);

      navigate({ to: "/dashboard" });
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
          submitButtonText="Register"
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
