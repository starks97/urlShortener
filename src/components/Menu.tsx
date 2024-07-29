import { Button, Navbar } from "flowbite-react";

import { Link } from "@tanstack/react-router";

interface Props {
  children: React.ReactNode;
}

export default function Menu({ children }: Props) {
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
          to={"/dashboard"}
          preload="intent"
          activeProps={{ className: `font-bold` }}
        >
          <Button>Dashboard</Button>
        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>{children}</Navbar.Collapse>
    </Navbar>
  );
}
