import UrlCard from "./UrlCard";
import { DateConverter } from "../../utils";

import { DashboardProps } from "./interfaces";
import SideMenu from "./SideMenu";

export default function DashboardMain({
  urls,
}: {
  urls: DashboardProps["urls"];
}) {
  return (
    <div>
      <SideMenu />

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
