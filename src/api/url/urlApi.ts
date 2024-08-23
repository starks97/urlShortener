import {
  UrlsResponse,
  CreateUrlResponse,
  UpdateUrlResponse,
  UrlCategories,
  DeleteUrlResponse,
} from "./interfaces";
import {
  GetHttpRequestStrategy,
  PostHttpRequestStrategy,
  PatchHttpRequestStrategy,
  DeleteHttpRequestStrategy,
  HttpRequestContext,
} from "../handlerMethod";

import { baseUrl } from "../../consts";

const getAllUrls = new GetHttpRequestStrategy();
const fetchUrl = new GetHttpRequestStrategy();
const createUrl = new PostHttpRequestStrategy();
const updateUrl = new PatchHttpRequestStrategy();
const deleteUrl = new DeleteHttpRequestStrategy();

export const createUrlContext = new HttpRequestContext(createUrl);

const allUrlsContext = new HttpRequestContext(getAllUrls);

const updateUrlContext = new HttpRequestContext(updateUrl);

const urlContext = new HttpRequestContext(fetchUrl);

const deleteUrlContext = new HttpRequestContext(deleteUrl);

export async function getAllUrl(
  limit?: number,
  offset?: number,
  category?: UrlCategories,
) {
  const categoryParam = category
    ? `&category=${encodeURIComponent(category)}`
    : "";
  const url = `${baseUrl}/url?limit=${limit}&offset=${offset}${categoryParam}`;

  return allUrlsContext.executeRequest<UrlsResponse>(url);
}

export async function getUrl(id: string) {
  return urlContext.executeRequest<UrlsResponse>(`${baseUrl}/url/${id}`);
}

export async function createShortUrl(
  original_url: string,
  short_url: string,
  category: string,
) {
  return await createUrlContext.executeRequest<CreateUrlResponse>(
    `${baseUrl}/url`,
    {
      original_url,
      short_url,
      category,
    },
  );
}

export async function updateShortUrl(
  id: string,
  original_url?: string,
  short_url?: string,
  category?: string,
) {
  return await updateUrlContext.executeRequest<UpdateUrlResponse>(
    `${baseUrl}/url/${id}`,
    {
      original_url,
      short_url,
      category,
    },
  );
}

export async function deleteCustomUrl(id: string) {
  return await deleteUrlContext.executeRequest<DeleteUrlResponse>(
    `${baseUrl}/url/${id}`,
  );
}
