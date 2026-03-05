const SITE_URL = 'https://piercecounty4x4sar.org'
const SITE_NAME = 'Pierce County 4x4 Search and Rescue'

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: ['PC4x4SAR', 'Pierce County 4x4 SAR'],
  description:
    'Volunteer search and rescue organization providing FREE emergency response services 24/7/365 to Pierce County, Washington',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=630&fit=crop&q=75&fm=auto',
  foundingDate: '1985',
  sameAs: [
    'https://www.facebook.com/PierceCounty4x4SAR',
    'https://www.instagram.com/piercecounty4x4searchandrescue/',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'info@piercecounty4x4sar.org',
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
    serviceUrl: SITE_URL,
    availableLanguage: 'English',
  },
  provider: { '@id': `${SITE_URL}/#organization` },
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

export const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  alternateName: 'PC4x4SAR',
  url: SITE_URL,
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'en-US',
}

export const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_URL,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Mission',
      item: `${SITE_URL}/#mission`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Services',
      item: `${SITE_URL}/#services`,
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'Safety Resources',
      item: `${SITE_URL}/#safety`,
    },
    {
      '@type': 'ListItem',
      position: 5,
      name: 'Partners',
      item: `${SITE_URL}/#partners`,
    },
    {
      '@type': 'ListItem',
      position: 6,
      name: 'FAQ',
      item: `${SITE_URL}/#faq`,
    },
    {
      '@type': 'ListItem',
      position: 7,
      name: 'Contact',
      item: `${SITE_URL}/#contact`,
    },
  ],
}
