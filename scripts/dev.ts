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

getIcon("lucide", "arrow-right").then((icon) => {
  console.log("🚀 ~ getIconSetByCollection ~ json:", icon);
});
