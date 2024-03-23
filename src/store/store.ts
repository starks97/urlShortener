import { createStore } from "zustand";

import Cookies from "js-cookie";

import { REFRESH_TOKEN, ACCESS_TOKEN } from "../consts";

export type AuthState = {
  access_token: string | undefined;
  refresh_token: string | undefined;
  setAccesToken: (accessToken: string | undefined) => void;
  setRefreshToken: (refreshToken: string | undefined) => void;
};

export const useAuthStore = createStore<AuthState>((set) => ({
  access_token: Cookies.get(ACCESS_TOKEN),
  refresh_token: Cookies.get(REFRESH_TOKEN),
  setAccesToken: (accessToken: string | undefined) =>
    set((state) => ({
      ...state,
      access_token: !state.access_token
        ? Cookies.set(ACCESS_TOKEN, accessToken!, { expires: 1 / 24 })
        : Cookies.get(ACCESS_TOKEN),
    })),
  setRefreshToken: (refreshToken: string | undefined) =>
    set((state) => ({
      ...state,
      refresh_token: !state.refresh_token
        ? Cookies.set(REFRESH_TOKEN, refreshToken!, {
            secure: true,
            expires: 7,
            sameSite: "none",
          })
        : Cookies.get(REFRESH_TOKEN),
    })),
}));
