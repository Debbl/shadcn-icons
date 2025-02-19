import { NextResponse } from "next/server";
import { getIcon } from "./utils";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const url = new URL(request.url);
  const searchParams = Object.fromEntries(url.searchParams.entries());

  const { slug } = await params;

  const collectionName = slug[0];
  const iconName = slug[1].slice(0, -5);

  const content = await getIcon(collectionName, iconName, searchParams);

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
        path: `/icons/${iconName}.tsx`,
        content,
        type: "registry:ui",
      },
    ],
  };

  return NextResponse.json(json);
}
