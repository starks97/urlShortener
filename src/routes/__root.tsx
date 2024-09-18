import {
  Outlet,
  createRootRouteWithContext,
  Link,
  useLocation,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { useState, useEffect } from "react";

import Menu from "../components/Menu";

import { SideMenu } from "../components/dashboard";

import { Spinner } from "../components/Spinner";

function RouterSpinner() {
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });
  return <Spinner show={isLoading} />;
}

interface Context {
  queryClient: QueryClient;
  auth: AuthContextType | null;
}

export const Route = createRootRouteWithContext<Context>()({
  component: RootComponent,
});

import { MenuPath } from "../consts";
import { AuthContextType } from "../context";

function RootComponent() {
  const location = useLocation();

  const [menuIsLoaded, setMenuIsLoaded] = useState(false);

  const currentPath = location.pathname;

  const dashboardPaths = ["/dashboard", "/dashboard/create_short_url"];

  const visiblePaths = [
    "/",
    "/auth/login",
    "/auth/register",
    "/auth/refresh",
    "/profile",
  ];
  const filteredMenuPaths = MenuPath.filter(
    ([to]) => to !== "/auth/login" && to !== "/dashboard",
  );

  useEffect(() => {
    if (dashboardPaths.includes(currentPath)) {
      setMenuIsLoaded(false);
    } else if (visiblePaths.includes(currentPath)) {
      setMenuIsLoaded(true);
    }
  }, [currentPath]);

  return (
    <>
      <div className={`text-3xl`}>
        <RouterSpinner />
      </div>
      {dashboardPaths.includes(currentPath) ? (
        <div className="flex min-h-screen">
          <SideMenu />
          <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
            <Outlet />
          </div>
        </div>
      ) : menuIsLoaded ? (
        <>
          <Menu>
            {filteredMenuPaths.map(([to, label]) => (
              <li key={to}>
                <Link
                  to={to}
                  preload="intent"
                  className="block py-2 px-3 text-blue-700"
                  activeProps={{ className: "font-bold" }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </Menu>
          <Outlet />
        </>
      ) : (
        <Outlet />
      )}

      <ReactQueryDevtools buttonPosition="bottom-left" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
