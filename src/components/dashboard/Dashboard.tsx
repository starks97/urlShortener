import UrlCard from "./UrlCard";
import { DateConverter } from "../../utils";

import { DashboardProps } from "./interfaces";
import Toast from "../Toast";

export default function DashboardMain({
  urls,
}: {
  urls: DashboardProps["urls"];
}) {
  return (
    <div>
      <Toast />

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
  );
}
