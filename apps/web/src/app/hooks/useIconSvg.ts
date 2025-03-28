import useSWR from "swr";
import { ICONIFY_API_URL } from "../constants";

async function fetcher(icon: string) {
  const res = await fetch(`${ICONIFY_API_URL}/${icon}.svg`);

  return res.text();
}

export function useIconSvg(icon: string) {
  const { data: svg = "", ...rest } = useSWR(icon, fetcher);

  return { svg, ...rest };
}
