import type { Metadata } from 'next'
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from '@/lib/site'

type BuildMetadataOptions = {
  title: string
  description: string
  path?: string
  keywords?: string[]
}

export function buildMetadata({
  title,
  description,
  path = '/',
  keywords = [],
}: BuildMetadataOptions): Metadata {
  const url = new URL(path, SITE_URL).toString()

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} rescue team in action`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  }
}
