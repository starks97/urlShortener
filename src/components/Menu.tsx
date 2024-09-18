import { Button, Navbar } from "flowbite-react";

import { Link } from "@tanstack/react-router";

interface Props {
  children: React.ReactNode;
}

import { searchParams } from "../consts";

import { useAuth } from "../context";

export default function Menu({ children }: Props) {
  const auth = useAuth();

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        <img
          src="/favicon.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Link
          to={
            auth.sessionStatus === "access"
              ? "/dashboard"
              : auth.sessionStatus === "refresh"
                ? "/auth/refresh"
                : "/auth/login"
          }
          preload="intent"
          activeProps={{ className: `font-bold` }}
          search={searchParams.search}
        >
          <Button>
            {auth.sessionStatus === "access"
              ? "Dashboard"
              : auth.sessionStatus === "refresh"
                ? "Dashboard"
                : "Login"}
          </Button>
        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>{children}</Navbar.Collapse>
    </Navbar>
  );
}
