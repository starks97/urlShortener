import { createContext, useRef } from "react";
import React from "react";

import { ParsedLocation, redirect } from "@tanstack/react-router";

import { UrlCategories } from "../api";

export const sessionActions: Record<
  string,
  (location: ParsedLocation) => void
> = {
  valid: () => {
    throw redirect({
      to: "/dashboard",
      search: {
        category: UrlCategories.All,
        limit: 15,
        offset: 0,
      },
    });
  },
  login: (location: ParsedLocation) => {
    throw redirect({
      to: "/auth/login",
      search: {
        redirect: location.href,
      },
    });
  },

  refresh: (location: ParsedLocation) => {
    throw redirect({
      to: "/auth/refresh",
      search: {
        redirect: location.href,
      },
    });
  },
  default: (location: ParsedLocation) => {
    throw redirect({
      to: "/auth/login",
      search: {
        redirect: location.href,
      },
    });
  },
};

export const AuthContext = createContext<typeof sessionActions | null>(null);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = useRef(sessionActions);

  return (
    <AuthContext.Provider value={store.current}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context; // Return the context directly
}
