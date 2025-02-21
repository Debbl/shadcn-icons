"use client";
import Link from "next/link";
import { useState } from "react";
import { ThemeSwitcher } from "~/components/ThemeSwitcher";
import { Input } from "~/components/ui/Input";
import { IconCell } from "./components/IconCell";
import { useSearchIcons } from "./hooks/useSearchIcons";
import { Collections } from "./icons";

export default function Home() {
  const [query, setQuery] = useState("");

  const { data: searchResults } = useSearchIcons({
    query,
  });

  return (
    <main className="h-full overflow-y-auto">
      <div className="flex min-h-full flex-col items-center justify-center gap-y-4 py-8">
        <h1>Shadcn Icons</h1>

        <Input
          className="w-full max-w-md"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3 md:grid-cols-4">
          {searchResults?.icons.map((icon) => (
            <IconCell key={icon} icon={icon} />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3 md:grid-cols-4">
          {Object.keys(Collections).map((collection) => (
            <Link href={`/collections/${collection}`} key={collection}>
              <div className="rounded-md border p-2">{collection}</div>
            </Link>
          ))}
        </div>

        <ThemeSwitcher />
      </div>
    </main>
  );
}
