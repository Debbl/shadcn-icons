// https://iconify.design/docs/api/

// https://api.iconify.design/mdi.json?icons=home
// https://api.iconify.design/fluent-emoji-flat/alarm-clock.svg

interface IconifyParams {
  color?: string;
  width?: number;
  height?: number;
  flip?: string;
  rotate?: number;
  box?: boolean;
}

export async function getIconSetByCollectionName(
  collectionName: string,
  iconName: string,
  params?: IconifyParams,
) {
  const searchParams = new URLSearchParams(
    Object.fromEntries(
      Object.entries(params ?? {}).map(([key, value]) => [
        key,
        value?.toString(),
      ]),
    ),
  );

  const paramsString = searchParams.toString();
  const payload = `https://api.iconify.design/${collectionName}/${iconName}.svg${
    paramsString ? `?${paramsString}` : ""
  }`;

  const response = await fetch(payload);

  const svg = await response.text();

  return svg;
}

export function getIconByTemplate(name: string, svg: string) {
  const componentName =
    name.charAt(0).toUpperCase() +
    name.slice(1).replace(/-([a-z])/g, (_, char) => char.toUpperCase());

  return `import type { SVGProps } from "react";

export function ${componentName}(props: SVGProps<SVGSVGElement>) {
  return (
    ${svg.replace(/<svg (.*?)>/, "<svg $1 {...props}>")}
  );
}
`;
}

export async function getIcon(
  collectionName: string,
  iconName: string,
  params?: IconifyParams,
) {
  const body = await getIconSetByCollectionName(
    collectionName,
    iconName,
    params,
  );

  if (!body) return null;

  return getIconByTemplate(iconName, body);
}
