import { NextResponse } from 'next/server'
import { getIcon } from './utils'

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const url = new URL(request.url)
  const searchParams = Object.fromEntries(url.searchParams.entries())

  const { slug } = await params

  const slugArray = slug[0].slice(0, -5).split(':')
  const collectionName = slugArray[0]
  const iconName = slugArray[1]

  const content = await getIcon(collectionName, iconName, searchParams)

  if (!content) {
    return NextResponse.json('Not Found', { status: 404 })
  }

  const json = {
    name: iconName,
    type: 'registry:component',
    homepage: 'https://shadcn-icons.vercel.app',
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
        path: `components/icons/${iconName}.tsx`,
        content,
        type: 'registry:component',
      },
    ],
  }

  return NextResponse.json(json)
}
