import type { Metadata, Viewport } from 'next'
import { Inter, Bebas_Neue } from 'next/font/google'
import './globals.css'
import {
  organizationSchema,
  emergencyServiceSchema,
  localBusinessSchema,
  webSiteSchema,
  monthlyMeetingSchema,
  joinActionSchema,
  donateActionSchema,
} from '@/lib/structured-data'
import StructuredDataScript from '@/components/StructuredDataScript'
import {
  DEFAULT_OG_IMAGE,
  SITE_SHORT_NAME,
  SITE_URL,
  THEME_COLOR,
} from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Pierce County 4x4 Search and Rescue | Volunteer SAR Team Tacoma WA',
  description: 'Pierce County 4x4 Search and Rescue provides FREE volunteer emergency search and rescue services 24/7/365. Serving Tacoma, Puyallup, Lakewood, Mt. Rainier foothills, and all Pierce County, Washington. Missing person searches, wilderness rescue, disaster response.',
  keywords: 'search and rescue, SAR, Pierce County, 4x4, emergency response, volunteer, wilderness rescue, Washington State, missing persons, disaster response, Tacoma, Puyallup, Lakewood, Mt Rainier, Bonney Lake, Buckley, Orting, Carbon River, off-road rescue, backcountry rescue',
  authors: [{ name: 'Pierce County 4x4 Search and Rescue' }],
  applicationName: 'Pierce County 4x4 SAR',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    title: SITE_SHORT_NAME,
  },
  openGraph: {
    title: 'Pierce County 4x4 Search and Rescue | Volunteer SAR Team',
    description: 'FREE 24/7 volunteer search and rescue serving Pierce County, WA. Wilderness rescue, missing person searches, disaster response. Working with Pierce County Sheriff and Emergency Management.',
    url: SITE_URL,
    siteName: 'Pierce County 4x4 Search and Rescue',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Pierce County 4x4 Search and Rescue Team in action',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pierce County 4x4 Search and Rescue',
    description: 'FREE 24/7 volunteer search and rescue serving Pierce County, Washington.',
    images: ['https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=630&fit=crop&q=75&fm=auto'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      en: SITE_URL,
      'en-US': SITE_URL,
      'x-default': SITE_URL,
    },
  },
  other: {
    'geo.region': 'US-WA',
    'geo.placename': 'Pierce County',
    'geo.position': '47.0676;-122.1295',
    'ICBM': '47.0676, -122.1295',
    'format-detection': 'telephone=yes',
  },
}

export const viewport: Viewport = {
  themeColor: THEME_COLOR,
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://static.cloudflareinsights.com" />
        <StructuredDataScript data={organizationSchema} />
        <StructuredDataScript data={emergencyServiceSchema} />
        <StructuredDataScript data={localBusinessSchema} />
        <StructuredDataScript data={webSiteSchema} />
        <StructuredDataScript data={monthlyMeetingSchema} />
        <StructuredDataScript data={joinActionSchema} />
        <StructuredDataScript data={donateActionSchema} />
      </head>
      <body className="bg-white text-navy-900">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-rescue-orange focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-semibold"
        >
          Skip to main content
        </a>
        {children}
        <script src="/site-init.js" defer />
        {/* Cloudflare Web Analytics — no cookies, no JS overhead, GDPR-friendly */}
        {process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token":"${process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN}"}`}
          />
        )}
      </body>
    </html>
  )
}
