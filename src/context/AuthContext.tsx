import { createContext } from "react";
import React, { useState } from "react";

import { baseUrl } from "../consts";

export interface AuthContextType {
  isAuthenticated: boolean;
  checkSessionStatus: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const checkSessionStatus = async () => {
    //this is important to prevent infinite loop and making unnecessary requests, this is like cache for the session status.
    if (isAuthenticated) return;

    try {
      const response = await fetch(`${baseUrl}/session_status`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = (await response.json()) as {
        status: "access" | "refresh" | "login";
      };

      if (response.status === 401 || data.status === "login") {
        setIsAuthenticated(false);
        window.location.href = "/auth/login";
      } else if (data.status === "refresh") {
        setIsAuthenticated(false);
        window.location.href = "/auth/refresh";
      }

      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkSessionStatus }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
