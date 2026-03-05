import type { Metadata } from 'next'
import { Inter, Bebas_Neue } from 'next/font/google'
import './globals.css'
import {
  organizationSchema,
  emergencyServiceSchema,
  localBusinessSchema,
  webSiteSchema,
  breadcrumbSchema,
} from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'Pierce County 4x4 Search and Rescue | Volunteer SAR Team Tacoma WA',
  description: 'Pierce County 4x4 Search and Rescue provides FREE volunteer emergency search and rescue services 24/7/365. Serving Tacoma, Puyallup, Lakewood, Mt. Rainier foothills, and all Pierce County, Washington. Missing person searches, wilderness rescue, disaster response.',
  keywords: 'search and rescue, SAR, Pierce County, 4x4, emergency response, volunteer, wilderness rescue, Washington State, missing persons, disaster response, Tacoma, Puyallup, Lakewood, Mt Rainier, Bonney Lake, Buckley, Orting, Carbon River, off-road rescue, backcountry rescue',
  authors: [{ name: 'Pierce County 4x4 Search and Rescue' }],
  applicationName: 'Pierce County 4x4 SAR',
  openGraph: {
    title: 'Pierce County 4x4 Search and Rescue | Volunteer SAR Team',
    description: 'FREE 24/7 volunteer search and rescue serving Pierce County, WA. Wilderness rescue, missing person searches, disaster response. Working with Pierce County Sheriff and Emergency Management.',
    url: 'https://piercecounty4x4sar.org',
    siteName: 'Pierce County 4x4 Search and Rescue',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=630&fit=crop&q=75&fm=auto',
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
    canonical: 'https://piercecounty4x4sar.org',
  },
  other: {
    'geo.region': 'US-WA',
    'geo.placename': 'Pierce County',
    'geo.position': '47.0676;-122.1295',
    'ICBM': '47.0676, -122.1295',
    'format-detection': 'telephone=yes',
  },
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
        <meta name="theme-color" content="#0a1628" />
        <meta name="apple-mobile-web-app-title" content="PC4x4SAR" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link
          rel="preload"
          as="image"
          href="https://images.unsplash.com/photo-1434394354979-a235cd36269d?w=1920&h=1080&fit=crop&q=75&fm=auto"
        />
        <link rel="canonical" href="https://piercecounty4x4sar.org" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(emergencyServiceSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </head>
      <body className="bg-white text-navy-900">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-rescue-orange focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-semibold"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
