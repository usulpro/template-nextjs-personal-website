import { PortableText, PortableTextComponents } from '@portabletext/react'
import { Header } from 'components/Header'
import { TimelineSection } from 'components/TimelineSection'
import { notFound } from 'next/navigation'
import type { PagePayload } from 'types'

export function Page({
  data,
  preview,
}: {
  data: PagePayload
  preview?: boolean
}) {
  if (!data && !preview) {
    notFound()
  }

  // Default to an empty object to allow previews on non-existent documents
  const { body, overview, title } = data || {}

  const components: PortableTextComponents = {
    types: {
      timeline: ({ value }) => {
        const { items } = value || {}
        return <TimelineSection timelines={items} />
      },
    },
  }

  return (
    <div>
      <Header title={title} description={overview} />
      {body && <PortableText components={components} value={body} />}
    </div>
  )
}
