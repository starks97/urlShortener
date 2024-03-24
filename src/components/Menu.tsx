import { Button, Navbar } from "flowbite-react";

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
        <Button>Get started</Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>{children}</Navbar.Collapse>
    </Navbar>
  );
}
