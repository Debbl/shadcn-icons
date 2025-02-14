import { readFileSync } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { getIconByTemplate } from "./utils";

// eslint-disable-next-line n/prefer-global/process
const CWD = process.cwd();
const ICON_SETS_DIR = path.join(CWD, "src", "icons", "sets");

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const collectionName = slug[0];
  const iconName = slug[1].slice(0, -5);

  const iconSet = JSON.parse(
    readFileSync(path.join(ICON_SETS_DIR, `${collectionName}.json`), "utf-8"),
  ) as Record<string, { body: string }>;

  const content = iconSet[iconName].body;

  if (!content) {
    return NextResponse.json("Not Found", { status: 404 });
  }

  const json = {
    name: iconName,
    type: "registry:ui",
    registryDependencies: [],
    dependencies: [],
    devDependencies: [],
    tailwind: {},
    cssVars: {
      light: {},
      dark: {},
    },
    files: [
      {
        path: `${iconName}.tsx`,
        content: getIconByTemplate(iconName, content),
        type: "registry:ui",
      },
    ],
  };

  return NextResponse.json(json);
}
