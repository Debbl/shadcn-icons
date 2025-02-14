// https://api.iconify.design/mdi.json?icons=home

export interface IconSet {
  prefix: string;
  icons: Record<string, { body: string }>;
  aliases?: Record<string, { parent: string }>;
}

export async function getIconSetByCollectionName(collectionName: string) {
  const response = await fetch(
    `https://raw.githubusercontent.com/iconify/icon-sets/refs/heads/master/json/${collectionName}.json`,
  );

  const json = (await response.json()) as IconSet;

  return json;
}

export async function getIcon(collectionName: string, iconName: string) {
  const iconSet = await getIconSetByCollectionName(collectionName);

  const icon = iconSet.icons[iconName];

  if (icon) return icon;

  if (!icon) {
    const aliases = iconSet.aliases ?? {};
    const aliasName = aliases[iconName]?.parent;

    return aliases[iconName] ? iconSet.icons[aliasName] : null;
  }

  return null;
}

export function getIconByTemplate(name: string, body: string) {
  const componentName =
    name.charAt(0).toUpperCase() +
    name.slice(1).replace(/-([a-z])/g, (_, char) => char.toUpperCase());

  return `import type { SVGProps } from "react";

export function ${componentName}(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      ${body}
    </svg>
  );
}
`;
}
