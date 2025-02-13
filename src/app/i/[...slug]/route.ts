import lucide from "@iconify/json/json/lucide.json";
import { NextResponse } from "next/server";
import { getIconByTemplate } from "./utils";

export const dynamic = "force-static";

const icons = Object.fromEntries(
  Object.entries(lucide.icons).map(([key, value]) => {
    const alias =
      Object.entries(lucide.aliases).find(([_, v]) => v.parent === key)?.[0] ??
      key;

    return [alias, value];
  }),
);

export async function generateStaticParams() {
  return Object.keys(icons).map((key) => ({
    slug: ["lucide", `${key}.json`],
  }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const name = slug[1].slice(0, -5);
  const content = icons[name].body;

  if (!content) {
    return NextResponse.json("Not Found", { status: 404 });
  }

  const json = {
    name,
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
        path: `${name}.tsx`,
        content: getIconByTemplate(name, content),
        type: "registry:ui",
      },
    ],
  };

  return NextResponse.json(json);
}
