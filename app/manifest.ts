import type { MetadataRoute } from 'next'
import { SITE_NAME, SITE_SHORT_NAME, THEME_COLOR } from '@/lib/site'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_SHORT_NAME,
    description:
      'Volunteer search and rescue serving Pierce County, Washington. 24/7/365.',
    start_url: '/',
    display: 'standalone',
    background_color: THEME_COLOR,
    theme_color: THEME_COLOR,
    orientation: 'portrait-primary',
    categories: ['government', 'emergency'],
    icons: [
      {
        src: '/icon',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
