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
  setAccesToken: (newAccessToken: string | undefined) =>
    set((state) => {
      if (newAccessToken) {
        Cookies.set(ACCESS_TOKEN, newAccessToken, { expires: 1 / 24 });
      } else {
        Cookies.remove(ACCESS_TOKEN);
      }
      return {
        ...state,
        access_token: newAccessToken,
      };
    }),
  setRefreshToken: (newRefreshToken: string | undefined) =>
    set((state) => {
      if (newRefreshToken) {
        Cookies.set(REFRESH_TOKEN, newRefreshToken, {
          secure: true,
          expires: 7,
          sameSite: "none",
        });
      } else {
        Cookies.remove(REFRESH_TOKEN);
      }
      return {
        ...state,
        refresh_token: newRefreshToken,
      };
    }),
}));
