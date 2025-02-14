import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import Collections from "@iconify/json/collections.json" with { type: "json" };
import type Lucide from "@iconify/json/json/lucide.json";

type IconsJson = typeof Lucide;

// eslint-disable-next-line n/prefer-global/process
const CWD = process.cwd();
const ICON_DIR = path.join(CWD, "src", "icons");
const ICON_SETS_DIR = path.join(ICON_DIR, "sets");

const data: Record<string, string[]> = {};
for (const collection of Object.keys(Collections)) {
  data[collection] = [];
  console.log(`Processing collection ${collection}...`);

  if (!existsSync(ICON_SETS_DIR)) {
    mkdirSync(ICON_SETS_DIR, { recursive: true });
  }

  const iconsJson = (
    await import(`@iconify/json/json/${collection}.json`, {
      with: { type: "json" },
    })
  ).default as IconsJson;
  const json = {
    ...iconsJson,
    // alias icons
    icons: Object.fromEntries(
      Object.entries(iconsJson.icons).map(([key, value]) => {
        const alias =
          Object.entries(iconsJson.aliases ?? {}).find(
            ([_, v]) => v.parent === key,
          )?.[0] ?? key;

        return [alias, value];
      }),
    ),
  };

  const iconSet: Record<string, { body: string }> = {};
  for (const iconName of Object.keys(json.icons)) {
    data[collection].push(iconName);
    console.log(`  Processing icon ${iconName}...`);

    const icon = json.icons[iconName];
    iconSet[iconName] = {
      body: icon.body,
    };
  }

  writeFileSync(
    path.join(ICON_SETS_DIR, `${collection}.json`),
    `${JSON.stringify(iconSet, null, 2)}\n`,
  );
}

writeFileSync(
  path.join(ICON_DIR, "data.json"),
  `${JSON.stringify(data, null, 2)}\n`,
);
