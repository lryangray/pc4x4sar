import type { Metadata } from 'next'
import './globals.css'
import {
  organizationSchema,
  emergencyServiceSchema,
  localBusinessSchema,
} from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'Pierce County 4x4 Search and Rescue | Volunteer SAR Team Tacoma WA',
  description: 'Pierce County 4x4 Search and Rescue provides FREE volunteer emergency search and rescue services 24/7/365. Serving Tacoma, Puyallup, Lakewood, Mt. Rainier foothills, and all Pierce County, Washington. Missing person searches, wilderness rescue, disaster response.',
  keywords: 'search and rescue, SAR, Pierce County, 4x4, emergency response, volunteer, wilderness rescue, Washington State, missing persons, disaster response, Tacoma, Puyallup, Lakewood, Mt Rainier, Bonney Lake, Buckley, Orting, Carbon River, off-road rescue, backcountry rescue',
  authors: [{ name: 'Pierce County 4x4 Search and Rescue' }],
  openGraph: {
    title: 'Pierce County 4x4 Search and Rescue | Volunteer SAR Team',
    description: 'FREE 24/7 volunteer search and rescue serving Pierce County, WA. Wilderness rescue, missing person searches, disaster response. Working with Pierce County Sheriff and Emergency Management.',
    url: 'https://pierce-county-4x4-sar.pages.dev',
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
    canonical: 'https://pierce-county-4x4-sar.pages.dev',
  },
  other: {
    'geo.region': 'US-WA',
    'geo.placename': 'Pierce County',
    'geo.position': '47.0676;-122.1295',
    'ICBM': '47.0676, -122.1295',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="canonical" href="https://pierce-county-4x4-sar.pages.dev" />
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
      </head>
      <body className="bg-white text-navy-900">
        {children}
      </body>
    </html>
  )
}
