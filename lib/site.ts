export const SITE_URL = 'https://pcsar4x4.org'
export const SITE_NAME = 'Pierce County 4x4 Search and Rescue'
export const SITE_SHORT_NAME = 'PC4x4SAR'
export const DEFAULT_OG_IMAGE = '/images/hero-jeep-rainier.jpg'
export const THEME_COLOR = '#0a1628'

// Origins permitted to submit the contact form. Includes the future
// pc4x4sar.org domain so the form works the moment DNS flips.
export const ALLOWED_CONTACT_ORIGINS = [
  SITE_URL,
  'https://pc4x4sar.org',
  'https://pc4x4sar-preview.ryan-gray-210.workers.dev',
] as const
