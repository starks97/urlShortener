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
  SessionStatusResponse,
} from "./interfaces";

const login = new PostHttpRequestStrategy();
const register = new PostHttpRequestStrategy();
const profile = new GetHttpRequestStrategy();
const refresh = new GetHttpRequestStrategy();
const sessionStatus = new GetHttpRequestStrategy();

export const loginContext = new HttpRequestContext(login);
export const registerContext = new HttpRequestContext(register);
export const profileContext = new HttpRequestContext(profile);
export const refreshContext = new HttpRequestContext(refresh);
export const sessionStatusContext = new HttpRequestContext(sessionStatus);

export async function loginRequest(email: string, password: string) {
  return await loginContext.executeRequest<LoginResponse>(
    `${baseUrl}/auth/login`,
    {
      email,
      password,
    },
  );
}

export async function registerRequest(
  name: string,
  email: string,
  password: string,
) {
  return registerContext.executeRequest<RegisterResponse>(
    `${baseUrl}/auth/register`,
    {
      name,
      email,
      password,
    },
  );
}

export async function profileRequest() {
  return profileContext.executeRequest<ProfileResponse>(`${baseUrl}/users/me`);
}

export async function refreshRequest() {
  const response = refreshContext.executeRequest<ResfreshResponse>(
    `${baseUrl}/auth/refresh`,
  );
  return response;
}

export async function sessionStatusReq() {
  const response =
    await sessionStatusContext.executeRequest<SessionStatusResponse>(
      `${baseUrl}/session_status`,
    );
  return response;
}
