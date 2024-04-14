import { createStore } from "zustand";

import Cookies from "js-cookie";

export type AuthState = {
  serviceToken: string | undefined;
  setServiceToken: (newRefreshToken: string | undefined) => void;
};

export const useAuthStore = createStore<AuthState>((set) => ({
  serviceToken: Cookies.get("service_token") as string,

  setServiceToken: (newServiceToken: string | undefined) =>
    set((state) => {
      if (newServiceToken) {
        Cookies.set("service_token", newServiceToken, {
          expires: 7,
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
