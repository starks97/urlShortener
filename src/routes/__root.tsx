import {
  Outlet,
  createRootRouteWithContext,
  Link,
  //useLocation,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

//import { useState, useEffect } from "react";

import Menu from "../components/Menu";

//import { SideMenu } from "../components/dashboard";

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
  //const location = useLocation();
  //const [isMenuLoaded, setIsMenuLoaded] = useState<boolean>(false);

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
