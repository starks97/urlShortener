import { createStore } from "zustand";

import Cookies from "js-cookie";

export type AuthState = {
  serviceToken: string | undefined;
  setServiceToken: (newRefreshToken: string | undefined) => void;
};

const oneHourFromNow: Date = new Date(new Date().getTime() + 60 * 60 * 1000);

export const useAuthStore = createStore<AuthState>((set) => ({
  serviceToken: Cookies.get("service_token") as string,

  setServiceToken: (newServiceToken: string | undefined) =>
    set((state) => {
      if (newServiceToken) {
        Cookies.set("service_token", newServiceToken, {
          expires: oneHourFromNow,
          secure: true,
          sameSite: "none",
        });
      } else {
        Cookies.remove("service_token");
      }
      return {
        ...state,
        serviceToken: newServiceToken,
      };
    }),
}));
