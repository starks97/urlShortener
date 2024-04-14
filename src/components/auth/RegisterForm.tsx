import { useMutation } from "@tanstack/react-query";

import { useNavigate } from "@tanstack/react-router";

import { type SubmitHandler } from "react-hook-form";

import {
  PostHttpRequestStrategy,
  HttpRequestContext,
  type RegisterResponse,
} from "../../api";

import {
  RegisterUserSchema,
  type RegisterUserSchemaType,
} from "../../models/auth.models";

import { RegisterFormField } from "./consts";

import Form from "../Form";
import { baseUrl } from "../../consts";

export default function RegisterForm() {
  const navigate = useNavigate();

  const Register = new PostHttpRequestStrategy();
  const RegisterContext = new HttpRequestContext(Register);

  const mutation = useMutation<
    RegisterResponse,
    unknown,
    { name: string; email: string; password: string },
    unknown
  >({
    mutationFn: async ({
      name,
      email,
      password,
    }): Promise<RegisterResponse> => {
      try {
        const register = await RegisterContext.executeRequest<RegisterResponse>(
          `${baseUrl}/auth/register`,
          { name, email, password }
        );

        return register as RegisterResponse;
      } catch (error) {
        if (error instanceof Error) {
          throw error.message;
        }
        throw "An error occurred during registration.";
      }
    },
    onSuccess: () => {
      navigate({ to: "/auth/login" });
    },
  });

  const onSubmit: SubmitHandler<RegisterUserSchemaType> = (data) => {
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
    <div id="auth-form" className=" max-w-md ">
      <h3 className="text-2xl md:text-3xl font-bold text-start text-orange-600 mb-5">
        Register new account
      </h3>
      <Form
        formSchema={RegisterFormField}
        onSubmit={onSubmit}
        submitButtonText="Register"
        validationSchema={RegisterUserSchema}
      >
        {mutation.error?.toString() && (
          <p className="text-red-500">{mutation.error.toString()}</p>
        )}
      </Form>
    </div>
  );
}
