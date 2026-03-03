const SITE_URL = 'https://piercecounty4x4sar.org'

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Pierce County 4x4 Search and Rescue',
  alternateName: 'PC4x4SAR',
  description:
    'Volunteer search and rescue organization providing FREE emergency response services 24/7/365 to Pierce County, Washington',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
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
    { '@type': 'AdministrativeArea', name: 'Pierce County, Washington' },
    { '@type': 'City', name: 'Tacoma, Washington' },
    { '@type': 'City', name: 'Puyallup, Washington' },
    { '@type': 'City', name: 'Lakewood, Washington' },
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
  ],
  slogan: '100% Volunteer. 100% Free. 24/7/365.',
  nonprofitStatus: '501(c)(3)',
}

export const emergencyServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'EmergencyService',
  '@id': `${SITE_URL}/#emergencyservice`,
  name: 'Pierce County 4x4 Search and Rescue',
  description:
    'Volunteer emergency search and rescue team specializing in 4x4 vehicle operations for wilderness and backcountry rescue missions',
  url: SITE_URL,
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
  name: 'Pierce County 4x4 Search and Rescue',
  description:
    'Volunteer search and rescue organization serving Pierce County, Washington',
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
