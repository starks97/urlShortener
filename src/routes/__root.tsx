import {
  Outlet,
  createRootRouteWithContext,
  Link,
  useLocation,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { useAuthStore } from "../store";

import { getAllUrl } from "../api";

import { useState, useEffect } from "react";

import Menu from "../components/Menu";

import { SideMenu } from "../components/dashboard";

interface Context {
  queryClient: QueryClient;
  auth: typeof useAuthStore;
  urls: typeof getAllUrl;
}

export const Route = createRootRouteWithContext<Context>()({
  component: RootComponent,
});

import Cookies from "js-cookie";
import { MenuPath } from "../consts";

function RootComponent() {
  const loggedInCookie = Cookies.get("logged_in");

  const location = useLocation();

  const [isMenuLoaded, setIsMenuLoaded] = useState<boolean>(false);

  const currentPath = location.pathname;

  useEffect(() => {
    if (!currentPath.startsWith("/dashboard")) {
      setIsMenuLoaded(true);
    } else {
      setIsMenuLoaded(false);
    }
  }, [currentPath]);

  const filteredMenuPaths = loggedInCookie
    ? MenuPath
    : MenuPath.filter(([to]) => !to.startsWith("/dashboard"));

  return (
    <>
      {isMenuLoaded ? (
        <Menu>
          {filteredMenuPaths.map(([to, label]) => (
            <li key={to}>
              <Link
                to={to}
                preload="intent"
                className={`block py-2 px-3 text-blue-700`}
                activeProps={{ className: `font-bold` }}
              >
                {label}
              </Link>
            </li>
          ))}
        </Menu>
      ) : (
        <SideMenu />
      )}
      <Outlet />
      <ReactQueryDevtools buttonPosition="bottom-left" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
