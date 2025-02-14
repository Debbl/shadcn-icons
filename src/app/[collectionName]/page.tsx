import { readFileSync } from "node:fs";
import path from "node:path";

// eslint-disable-next-line n/prefer-global/process
const ICON_DIR = path.join(process.cwd(), "src", "icons");
const ICON_SETS_DIR = path.join(ICON_DIR, "sets");

type Collections = Record<string, string[]>;

const collections = JSON.parse(
  readFileSync(path.join(ICON_DIR, "data.json"), "utf-8"),
) as Collections;

export async function generateStaticParams() {
  return Object.keys(collections).map((collection) => ({
    collectionName: collection,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ collectionName: string }>;
}) {
  const { collectionName } = await params;

  const icons = collections[collectionName];

  const getShadcnCmd = (icon: string) => {
    return `npx shadcn@latest add "https://shadcn-icons.vercel.app/${collectionName}/${icon}.json"`;
  };

  const getIcon = (icon: string) => {
    const iconSet = JSON.parse(
      readFileSync(path.join(ICON_SETS_DIR, `${collectionName}.json`), "utf-8"),
    ) as Record<string, { body: string }>;

    return `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">${iconSet[icon].body}</svg>`;
  };

  return (
    <div>
      <h1>{collectionName}</h1>

      <div>
        {icons.map((icon) => (
          <div key={icon}>
            {/* eslint-disable-next-line react-dom/no-dangerously-set-innerhtml */}
            <div dangerouslySetInnerHTML={{ __html: getIcon(icon) }} />
            <div>{getShadcnCmd(icon)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
