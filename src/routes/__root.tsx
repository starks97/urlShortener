import {
  Outlet,
  createRootRouteWithContext,
  Link,
  //useLocation,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { sessionActions } from "../context";

//import { useState, useEffect } from "react";

import Menu from "../components/Menu";

//import { SideMenu } from "../components/dashboard";

interface Context {
  queryClient: QueryClient;
  auth: typeof sessionActions;
}

export const Route = createRootRouteWithContext<Context>()({
  component: RootComponent,
});

import { MenuPath } from "../consts";

function RootComponent() {
  //const location = useLocation();
  //const [isMenuLoaded, setIsMenuLoaded] = useState<boolean>(false);
  /*const [sessionStatus, setSessionStatus] =
    useState<SessionStatusResponse | null>(null);

  console.log(sessionStatus);


  useEffect(() => {
    const checkSessionStatus = async () => {
      try {
        const response = await fetch(`${baseUrl}/session_status`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }

        const data = (await response.json()) as SessionStatusResponse;
        setSessionStatus(data);
      } catch (error) {
        console.error("Error checking session status:", error);
      }
    };

    checkSessionStatus();
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;
    if (!currentPath.startsWith("/dashboard")) {
      setIsMenuLoaded(true);
    } else {
      setIsMenuLoaded(false);
    }
    }, [location.pathname]);*/

  const filteredMenuPaths = MenuPath.filter(
    ([to]) => !to.startsWith("/dashboard"),
  );

  return (
    <>
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

      <Outlet />
      <ReactQueryDevtools buttonPosition="bottom-left" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}

/* {isMenuLoaded ? (
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
)}*/
