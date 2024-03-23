import { createContext, useRef } from "react";
import { useAuthStore } from "../store";
import React from "react";

export const AuthContext = createContext<typeof useAuthStore | null>(null);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = useRef(useAuthStore);

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
