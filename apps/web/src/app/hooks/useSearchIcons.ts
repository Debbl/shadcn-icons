import { useEffect, useState } from "react";
import useSWR from "swr";
import { ICONIFY_API_URL } from "../constants";
import type { APIv2SearchParams, APIv2SearchResponse } from "../types";

async function fetcher(searchParams: string) {
  const res = await fetch(`${ICONIFY_API_URL}/search?${searchParams}`);

  return res.json() as Promise<APIv2SearchResponse>;
}

function getSearchParams(params: APIv2SearchParams) {
  return new URLSearchParams(
    Object.fromEntries(
      Object.entries(params)
        .map(([key, value]) => [key, `${value}`])
        .filter(([, value]) => value !== ""),
    ),
  ).toString();
}

export function useSearchIcons(params: APIv2SearchParams) {
  const [searchParams, setSearchParams] = useState(getSearchParams(params));

  useEffect(() => {
    const id = setTimeout(() => {
      setSearchParams(getSearchParams(params));
    }, 800);

    return () => clearTimeout(id);
  }, [params]);

  return useSWR(searchParams, fetcher);
}
