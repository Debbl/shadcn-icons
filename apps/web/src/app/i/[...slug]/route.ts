import { NextResponse } from "next/server";
import { getIcon, getIconByTemplate } from "./utils";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const collectionName = slug[0];
  const iconName = slug[1].slice(0, -5);

  const icon = await getIcon(collectionName, iconName);

  const content = icon?.body;

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
