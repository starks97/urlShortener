import { createContext } from "react";
import { useState, useCallback, useEffect, useContext } from "react";

import axios from "../axiosConfig";

import { baseUrl } from "../consts";

export interface AuthContextType {
  isAuthenticated: boolean;
  checkSessionStatus: () => Promise<void>;
  isAuthenticating: boolean;
  sessionStatus: "access" | "refresh" | "login";
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true);
  const [sessionStatus, setSessionStatus] = useState<
    "access" | "refresh" | "login"
  >("login");

  const checkSessionStatus = useCallback(async () => {
    setIsAuthenticating(true);

    try {
      const response = await axios.get(`${baseUrl}/session_status`, {
        method: "GET",
      });

      const data = response.data as { status: "access" | "refresh" | "login" };

      console.log("data from status", data);

      if (data.status === "access") {
        setIsAuthenticated(true);
        setSessionStatus("access");
      } else if (data.status === "refresh") {
        setIsAuthenticated(false);
        setSessionStatus("refresh");
        return;
      } else if (data.status === "login") {
        setIsAuthenticated(false);
        setSessionStatus("login");
        return;
      }
    } catch (error) {
      setIsAuthenticated(false);
      setSessionStatus("login");
      console.log(error);
    } finally {
      setIsAuthenticating(false);
    }
  }, []);

  useEffect(() => {
    checkSessionStatus();
  }, [checkSessionStatus]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        checkSessionStatus,
        sessionStatus,
        isAuthenticating,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
