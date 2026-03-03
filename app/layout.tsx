import type { Metadata } from 'next'
import './globals.css'

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
  // Organization schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://pierce-county-4x4-sar.pages.dev/#organization',
    name: 'Pierce County 4x4 Search and Rescue',
    alternateName: 'PC4x4SAR',
    description: 'Volunteer search and rescue organization providing FREE emergency response services 24/7/365 to Pierce County, Washington',
    url: 'https://pierce-county-4x4-sar.pages.dev',
    logo: 'https://pierce-county-4x4-sar.pages.dev/logo.png',
    foundingDate: '1985',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      areaServed: 'Pierce County, Washington',
      availableLanguage: 'English',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tacoma',
      addressRegion: 'WA',
      postalCode: '98402',
      addressCountry: 'US',
    },
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: 'Pierce County, Washington',
      },
      {
        '@type': 'City',
        name: 'Tacoma, Washington',
      },
      {
        '@type': 'City',
        name: 'Puyallup, Washington',
      },
      {
        '@type': 'City',
        name: 'Lakewood, Washington',
      },
    ],
    memberOf: [
      {
        '@type': 'Organization',
        name: 'Washington State Search and Rescue',
      },
    ],
    knowsAbout: [
      'Search and Rescue',
      'Wilderness Rescue',
      'Missing Person Search',
      '4x4 Off-Road Operations',
      'Disaster Response',
      'Emergency Medical Response',
    ],
    slogan: '100% Volunteer. 100% Free. 24/7/365.',
    nonprofitStatus: '501(c)(3)',
  }

  // Emergency Service schema
  const emergencyServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'EmergencyService',
    '@id': 'https://pierce-county-4x4-sar.pages.dev/#emergencyservice',
    name: 'Pierce County 4x4 Search and Rescue',
    description: 'Volunteer emergency search and rescue team specializing in 4x4 vehicle operations for wilderness and backcountry rescue missions',
    url: 'https://pierce-county-4x4-sar.pages.dev',
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 47.0676,
        longitude: -122.1295,
      },
      geoRadius: '50 miles',
    },
    serviceType: [
      'Search and Rescue',
      'Missing Person Search',
      'Wilderness Rescue',
      'Medical Evacuation',
      'Disaster Response',
    ],
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: 'https://pierce-county-4x4-sar.pages.dev',
      availableLanguage: 'English',
    },
    provider: {
      '@id': 'https://pierce-county-4x4-sar.pages.dev/#organization',
    },
    isRelatedTo: [
      {
        '@type': 'GovernmentOrganization',
        name: 'Pierce County Sheriff\'s Department',
      },
      {
        '@type': 'GovernmentOrganization',
        name: 'Tacoma Police Department',
      },
      {
        '@type': 'GovernmentOrganization',
        name: 'Pierce County Department of Emergency Management',
      },
    ],
  }

  // Local Business schema for local SEO
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://pierce-county-4x4-sar.pages.dev/#localbusiness',
    name: 'Pierce County 4x4 Search and Rescue',
    description: 'Volunteer search and rescue organization serving Pierce County, Washington',
    url: 'https://pierce-county-4x4-sar.pages.dev',
    email: 'info@piercecounty4x4sar.org',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tacoma',
      addressRegion: 'WA',
      postalCode: '98402',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 47.0676,
      longitude: -122.1295,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    priceRange: 'Free',
    currenciesAccepted: 'USD',
    paymentAccepted: 'Donations accepted',
    areaServed: [
      'Pierce County',
      'Tacoma',
      'Puyallup',
      'Lakewood',
      'University Place',
      'Bonney Lake',
      'Buckley',
      'Orting',
      'Sumner',
      'Eatonville',
    ],
  }

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
