import type { IconifyInfo } from "@iconify/types";

export interface APIv3LastModifiedResponse {
  lastModified: Record<string, number>;
}

export type APIv2CollectionsList = Record<string, IconifyInfo>;

export interface APIv2SearchParams {
  query: string;
  limit?: number;
  offset?: number;
  prefix?: string;
  prefixes?: string;
  category?: string;
}

export interface APIv2SearchResponse {
  // List of icons, including prefixes
  icons: string[];

  // Number of results. If same as `limit`, more results are available
  total: number;

  // Number of results shown
  limit: number;

  // Index of first result
  start: number;

  // Info about icon sets
  collections: Record<string, IconifyInfo>;

  // Copy of request, values are string
  request: APIv2SearchParams;
}
