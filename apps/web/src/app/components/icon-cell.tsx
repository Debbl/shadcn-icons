import { useMemo } from 'react'
import { CopyButton } from '~/components/animate-ui/buttons/copy'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '~/components/ui/drawer'
import { useIconSvg } from '../hooks/use-icon-svg'

export function IconCell({ icon }: { icon: string }) {
  const { svg } = useIconSvg(icon)

  const Icon = useMemo(() => {
    return () => (
      // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
      <span data-icon={icon} dangerouslySetInnerHTML={{ __html: svg }} />
    )
  }, [icon, svg])

  const command = useMemo(() => {
    return `npx shadcn@latest add "https://shadcn-icons.vercel.app/r/${icon}.json"`
  }, [icon])

  return (
    <Drawer>
      <DrawerTrigger>
        <Icon />
      </DrawerTrigger>

      <DrawerContent>
        <div className='h-[70vh]'>
          <DrawerHeader className='pt-0'>
            <DrawerTitle className='flex items-center gap-2'>
              <span className='text-2xl'>
                <Icon />
              </span>
              <span>{icon}</span>
            </DrawerTitle>

            <DrawerDescription>
              <code>{command}</code>
            </DrawerDescription>
          </DrawerHeader>

          <div className='bg-accent ml-4 flex w-fit items-center gap-2 rounded-md p-4 select-text'>
            <code>{command}</code>

            <CopyButton content={command} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
