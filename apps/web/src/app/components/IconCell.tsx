import { useMemo } from "react";
import { CopyIcon } from "~/components/icons/CopyIcon";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/Drawer";
import { useIconSvg } from "../hooks/useIconSvg";

export function IconCell({ icon }: { icon: string }) {
  const { svg } = useIconSvg(icon);

  const Icon = useMemo(() => {
    return () => (
      // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
      <span data-icon={icon} dangerouslySetInnerHTML={{ __html: svg }} />
    );
  }, [icon, svg]);

  const command = useMemo(() => {
    return `npx shadcn@latest add "https://shadcn-icons.vercel.app/i/${icon}.json"`;
  }, [icon]);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
  };

  return (
    <Drawer>
      <DrawerTrigger>
        <Icon />
      </DrawerTrigger>

      <DrawerContent>
        <div className="h-[70vh]">
          <DrawerHeader className="pt-0">
            <DrawerTitle className="flex items-center gap-2">
              <span className="text-2xl">
                <Icon />
              </span>
              <span>{icon}</span>
            </DrawerTitle>

            <DrawerDescription>
              <code>{command}</code>
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex items-center gap-2 p-4 select-text">
            <code>{command}</code>

            <CopyIcon className="size-6 p-1" onClick={handleCopy} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
