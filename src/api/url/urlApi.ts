import { UrlResponse, CreateUrlResponse } from "./interfaces";
import {
  GetHttpRequestStrategy,
  PostHttpRequestStrategy,
  PatchHttpRequestStrategy,
  DeleteHttpRequestStrategy,
  HttpRequestContext,
} from "../handlerMethod";

import { baseUrl } from "../../consts";

const getAllUrls = new GetHttpRequestStrategy();
const createUrl = new PostHttpRequestStrategy();

export const createUrlContext = new HttpRequestContext(createUrl);

const allUrlsContext = new HttpRequestContext(getAllUrls);

export async function getAllUrl(limit: number, offset: number) {
  return allUrlsContext.executeRequest<UrlResponse>(
    `${baseUrl}/url?limit=${limit}&offset=${offset}`
  );
}

export async function createShortUrl(original_url: string, short_url: string) {
  return createUrlContext.executeRequest<CreateUrlResponse>(`${baseUrl}/url`, {
    original_url,
    short_url,
  });
}
