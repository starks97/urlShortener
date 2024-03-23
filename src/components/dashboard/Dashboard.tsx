import UrlCard from "./UrlCard";
import { DateConverter } from "../../utils";

import { DashboardProps } from "./interfaces";

export default function DashboardMain({
  urls,
}: {
  urls: DashboardProps["urls"];
}) {
  return (
    <div>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      {/*<aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto box_data">
          <ul className="space-y-2 font-medium">
            {url["data"].map((item) => (
              <li key={item.url_id}>
                <a
                  href={item.short_url}
                  className="flex items-center p-2 text-gray-100 rounded-lg dark:text-white hover:bg-gray-100 hover:text-black group"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-100 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d={item.} />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    {item.title}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
            </aside>*/}

      <div className="p-4 sm:ml-64">
        <div className="p-4 rounded-lg min-h-[calc(100vh-3.5rem)]">
          <div className="grid gid-cols-1 md:grid-cols-3 gap-5 justify-items-center w-full">
            {urls["data"].map((url) => (
              <UrlCard
                key={url.url_id}
                short_url={url.short_url}
                original_url={url.original_url}
                views={url.views}
                created_at={DateConverter.formatDateFromString(url.created_at)}
                updated_at={DateConverter.formatDateFromString(url.updated_at)}
                url_id={url.url_id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
