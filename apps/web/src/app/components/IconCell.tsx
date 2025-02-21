import useSWR from "swr";
import { ICONIFY_API_URL } from "../constants";

async function fetcher(icon: string) {
  const res = await fetch(`${ICONIFY_API_URL}/${icon}.svg`);

  return res.text();
}

export function IconCell({ icon }: { icon: string }) {
  const { data: svg = "" } = useSWR(icon, fetcher);

  // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
  return <div dangerouslySetInnerHTML={{ __html: svg }} />;
}
