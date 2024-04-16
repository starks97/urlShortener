import {
  GetHttpRequestStrategy,
  PostHttpRequestStrategy,
  PatchHttpRequestStrategy,
  DeleteHttpRequestStrategy,
  HttpRequestContext,
} from "../handlerMethod";

import { baseUrl } from "../../consts";

import {
  LoginResponse,
  ProfileResponse,
  RegisterResponse,
  ResfreshResponse,
} from "./interfaces";

const login = new PostHttpRequestStrategy();
const register = new PostHttpRequestStrategy();
const profile = new GetHttpRequestStrategy();
const refresh = new GetHttpRequestStrategy();

export const loginContext = new HttpRequestContext(login);
export const registerContext = new HttpRequestContext(register);
export const profileContext = new HttpRequestContext(profile);
export const refreshContext = new HttpRequestContext(refresh);

export async function loginRequest(email: string, password: string) {
  return loginContext.executeRequest<LoginResponse>(`${baseUrl}/auth/login`, {
    email,
    password,
  });
}

export async function registerRequest(
  name: string,
  email: string,
  password: string
) {
  return registerContext.executeRequest<RegisterResponse>(
    `${baseUrl}/auth/register`,
    {
      name,
      email,
      password,
    }
  );
}

export async function profileRequest() {
  return profileContext.executeRequest<ProfileResponse>(`${baseUrl}/users/me`);
}

export async function refreshRequest() {
  return refreshContext.executeRequest<ResfreshResponse>(
    `${baseUrl}/auth/refresh`
  );
}
