import UrlCard from "./UrlCard";
import { DateConverter } from "../../utils";

import { DashboardProps } from "./interfaces";
import Toast from "../Toast";

import UrlFilterAndPagination from "./Filter&Pag";

export default function DashboardMain({
  urls,
  searchQueries,
}: {
  urls: DashboardProps["urls"];
  searchQueries: DashboardProps["searchQueries"];
}) {
  return (
    <div className="flex flex-col gap-10 md:gap-22 max-w-full">
      <Toast />
      <UrlFilterAndPagination
        currentCategory={searchQueries.category}
        currentLimit={searchQueries.limit}
        currentOffset={searchQueries.offset}
      />

      <div className="grid gid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center w-full ">
        {urls["data"].map((url) => (
          <UrlCard
            key={url.id}
            short_url={url.short_url}
            original_url={url.original_url}
            views={url.views}
            createdAt={DateConverter.formatDateFromString(url.createdAt)}
            updatedAt={DateConverter.formatDateFromString(url.updatedAt)}
            id={url.id}
            category={url.category}
          />
        ))}
      </div>
    </div>
  );
}
