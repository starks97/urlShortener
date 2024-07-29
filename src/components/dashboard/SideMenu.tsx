import { Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { DashboadMenuPath } from "../../consts";
import { Button } from "flowbite-react";

import { HambugerMenuIcon } from "../Icons";

export default function SideMenu() {
  const [toggle, setToggle] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setToggle(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        onClick={() => setToggle(!toggle)}
      >
        <span className="sr-only">Open sidebar</span>
        <HambugerMenuIcon />
      </button>
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${toggle ? "" : "-translate-x-full sm:translate-x-0"}`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 ">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to={"/dashboard/create_short_url"}
                preload="intent"
                activeProps={{ className: `font-bold` }}
                onClick={() => setToggle(!toggle)}
              >
                <Button>New Shortener</Button>
              </Link>
            </li>
            {DashboadMenuPath.map(([to, label]) => {
              return (
                <li key={to}>
                  <Link
                    to={to}
                    preload="intent"
                    className={`block py-2 px-3 text-blue-700`}
                    activeProps={{ className: `font-bold` }}
                    onClick={() => setToggle(!toggle)}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
}
