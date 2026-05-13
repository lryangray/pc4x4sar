import { faqs } from '@/lib/data/content'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const ORGANIZATION_ID = `${SITE_URL}/#organization`

/**
 * Returns the next 2nd-Wednesday-of-the-month meeting time as ISO strings
 * with explicit America/Los_Angeles offset. Runs at build time, so the
 * schema's primary occurrence is always in the future for any fresh deploy.
 */
function getNextMonthlyMeeting(now: Date = new Date()): {
  startDate: string
  endDate: string
} {
  const pad = (n: number) => String(n).padStart(2, '0')

  // Get current PT calendar date so the "is the meeting in the future" check
  // matches what the user sees on their clock.
  const ptDate = new Date(
    now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }),
  )

  for (let offset = 0; offset <= 1; offset++) {
    const monthZero = ptDate.getMonth() + offset
    const year = ptDate.getFullYear() + Math.floor(monthZero / 12)
    const month = (monthZero % 12) + 1 // 1–12

    const firstOfMonth = new Date(Date.UTC(year, month - 1, 1))
    const firstDow = firstOfMonth.getUTCDay() // 0=Sun … 3=Wed
    const daysToFirstWednesday = (3 - firstDow + 7) % 7
    const secondWednesdayDay = 1 + daysToFirstWednesday + 7

    const offsetStr = isPacificDST(year, month, secondWednesdayDay) ? '-07:00' : '-08:00'
    const startDate = `${year}-${pad(month)}-${pad(secondWednesdayDay)}T19:00:00${offsetStr}`
    const endDate = `${year}-${pad(month)}-${pad(secondWednesdayDay)}T21:00:00${offsetStr}`

    if (new Date(startDate).getTime() >= now.getTime()) {
      return { startDate, endDate }
    }
  }

  // Shouldn't happen — the second iteration always finds a future date.
  throw new Error('Could not compute next monthly meeting date')
}

/** True if the given Pacific calendar date is within US Daylight Saving Time. */
function isPacificDST(year: number, month: number, day: number): boolean {
  if (month > 3 && month < 11) return true
  if (month < 3 || month > 11) return false

  const firstOfMonth = new Date(Date.UTC(year, month - 1, 1))
  const firstDow = firstOfMonth.getUTCDay()
  const firstSunday = firstDow === 0 ? 1 : 8 - firstDow

  // March: DST starts on the 2nd Sunday.
  // November: DST ends on the 1st Sunday.
  return month === 3 ? day >= firstSunday + 7 : day < firstSunday
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: SITE_NAME,
  alternateName: ['PC4x4SAR', 'Pierce County 4x4 SAR'],
  description:
    'Volunteer search and rescue organization providing FREE emergency response services 24/7/365 to Pierce County, Washington',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  image: `${SITE_URL}/images/hero-jeep-rainier.jpg`,
  foundingDate: '1984',
  sameAs: [
    'https://www.facebook.com/PierceCounty4x4SAR',
    'https://www.instagram.com/piercecounty4x4searchandrescue/',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'pcsar4x4@gmail.com',
    url: `${SITE_URL}/contact`,
    areaServed: 'Pierce County, Washington',
    availableLanguage: ['English'],
    // No hoursAvailable here on purpose: the org has no scheduled "customer
    // service" hours; 24/7 belongs on EmergencyService, not on a contact form.
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '2501 S. 35th St. Suite D',
    addressLocality: 'Tacoma',
    addressRegion: 'WA',
    postalCode: '98409',
    addressCountry: 'US',
  },
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Pierce County, Washington' },
    { '@type': 'City', name: 'Tacoma, Washington' },
    { '@type': 'City', name: 'Puyallup, Washington' },
    { '@type': 'City', name: 'Lakewood, Washington' },
    { '@type': 'City', name: 'Bonney Lake, Washington' },
    { '@type': 'City', name: 'Buckley, Washington' },
    { '@type': 'City', name: 'Orting, Washington' },
    { '@type': 'City', name: 'University Place, Washington' },
    { '@type': 'City', name: 'Sumner, Washington' },
    { '@type': 'City', name: 'Eatonville, Washington' },
  ],
  memberOf: [
    { '@type': 'Organization', name: 'Washington State Search and Rescue' },
  ],
  knowsAbout: [
    'Search and Rescue',
    'Wilderness Rescue',
    'Missing Person Search',
    '4x4 Off-Road Operations',
    'Disaster Response',
    'Emergency Medical Response',
    'Technical Rope Rescue',
    'K-9 Search Support',
  ],
  slogan: '100% Volunteer. 100% Free. 24/7/365.',
  nonprofitStatus: '501(c)(3)',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Search and Rescue Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Missing Person Search',
          description: 'Coordinated ground searches for missing persons using trained search teams and systematic grid searches.',
        },
        price: '0',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Wilderness Rescue',
          description: 'Rescue operations in remote backcountry areas for lost, injured, or stranded individuals.',
        },
        price: '0',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Disaster Response',
          description: 'Emergency support during natural disasters including evacuations and supply transport.',
        },
        price: '0',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Medical Evacuation',
          description: 'Emergency medical evacuation from areas inaccessible to standard ambulances.',
        },
        price: '0',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Community Education',
          description: 'Free training programs on wilderness safety, survival skills, and emergency preparedness.',
        },
        price: '0',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Event Standby',
          description: 'Safety coverage for outdoor events with on-site emergency response and first aid.',
        },
        price: '0',
        priceCurrency: 'USD',
      },
    ],
  },
}

export const emergencyServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'EmergencyService',
  '@id': `${SITE_URL}/#emergencyservice`,
  name: SITE_NAME,
  description:
    'Volunteer emergency search and rescue team specializing in 4x4 vehicle operations for wilderness and backcountry rescue missions in Pierce County, Washington',
  url: SITE_URL,
  telephone: '911',
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
    'Technical Rope Rescue',
    'Off-Road Vehicle Rescue',
  ],
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: `${SITE_URL}/contact`,
    availableLanguage: 'English',
  },
  provider: { '@id': ORGANIZATION_ID },
  isRelatedTo: [
    {
      '@type': 'GovernmentOrganization',
      name: "Pierce County Sheriff's Department",
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

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#localbusiness`,
  name: SITE_NAME,
  description:
    'Volunteer search and rescue organization serving Pierce County, Washington. Free 24/7/365 emergency search and rescue services.',
  url: SITE_URL,
  email: 'pcsar4x4@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '2501 S. 35th St. Suite D',
    addressLocality: 'Tacoma',
    addressRegion: 'WA',
    postalCode: '98409',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 47.0676,
    longitude: -122.1295,
  },
  // No openingHoursSpecification: PCSAR4X4 has no physical office hours.
  // 24/7 availability is captured on EmergencyService.
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

export const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  alternateName: 'PC4x4SAR',
  url: SITE_URL,
  publisher: { '@id': ORGANIZATION_ID },
  inLanguage: 'en-US',
}

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

const nextMeeting = getNextMonthlyMeeting()

export const monthlyMeetingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  '@id': `${SITE_URL}/#monthly-meeting`,
  name: 'Pierce County 4x4 SAR Monthly Meeting',
  description:
    'General meeting held on the second Wednesday of each month at 7:00 PM for current and prospective members.',
  url: `${SITE_URL}/contact`,
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  location: {
    '@type': 'Place',
    name: 'Pierce County Dept. of Emergency Management',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2501 S. 35th St. Suite D',
      addressLocality: 'Tacoma',
      addressRegion: 'WA',
      postalCode: '98409',
      addressCountry: 'US',
    },
  },
  organizer: { '@id': ORGANIZATION_ID },
  startDate: nextMeeting.startDate,
  endDate: nextMeeting.endDate,
  eventSchedule: {
    '@type': 'Schedule',
    repeatFrequency: 'P1M',
    byDay: ['https://schema.org/Wednesday'],
    startTime: '19:00',
    endTime: '21:00',
    scheduleTimezone: 'America/Los_Angeles',
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    url: `${SITE_URL}/volunteer`,
    availability: 'https://schema.org/InStock',
  },
}

export const joinActionSchema = {
  '@context': 'https://schema.org',
  '@type': 'JoinAction',
  name: 'Volunteer with Pierce County 4x4 Search and Rescue',
  agent: { '@id': ORGANIZATION_ID },
  target: {
    '@type': 'EntryPoint',
    urlTemplate: `${SITE_URL}/volunteer`,
    actionPlatform: [
      'https://schema.org/DesktopWebPlatform',
      'https://schema.org/MobileWebPlatform',
    ],
    inLanguage: 'en-US',
  },
}

export const donateActionSchema = {
  '@context': 'https://schema.org',
  '@type': 'DonateAction',
  name: 'Support Pierce County 4x4 Search and Rescue',
  recipient: { '@id': ORGANIZATION_ID },
  target: {
    '@type': 'EntryPoint',
    urlTemplate: `${SITE_URL}/contact?subject=donation`,
    actionPlatform: [
      'https://schema.org/DesktopWebPlatform',
      'https://schema.org/MobileWebPlatform',
    ],
    inLanguage: 'en-US',
  },
}

export function createBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: new URL(item.path, SITE_URL).toString(),
    })),
  }
}
