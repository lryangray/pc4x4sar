import { SITE_URL } from '../site'

export type SafetyGuide = {
  id: string
  title: string
  description: string
  file: `/guides/${string}.pdf`
  format: 'Guide' | 'Field card' | 'Form'
  featuredOrder?: number
}

export type GuideCategory = {
  id: string
  heading: string
  description: string
  items: readonly SafetyGuide[]
}

export const guideCategories: readonly GuideCategory[] = [
  {
    id: 'planning-guides',
    heading: 'Plan & prepare',
    description: 'Start here before heading out: trip planning, essential gear, and ways to call for help.',
    items: [
      { id: 'trip-planning-checklist', title: 'Trip Planning Checklist', description: 'Work through your route, conditions, gear, and emergency plan before you go.', file: '/guides/trip-planning-checklist.pdf', format: 'Guide', featuredOrder: 1 },
      { id: 'ten-essentials-guide', title: 'Ten Essentials Guide', description: 'Check the ten gear systems to carry for an unexpected delay or emergency.', file: '/guides/ten-essentials-guide.pdf', format: 'Guide', featuredOrder: 2 },
      { id: 'emergency-signal-guide', title: 'Emergency Signal Guide', description: 'Learn ways to signal for help if you are lost or injured.', file: '/guides/emergency-signal-guide.pdf', format: 'Guide' },
      { id: 'tech-preparedness-guide', title: 'Tech Preparedness', description: 'Prepare offline maps, phone batteries, and satellite SOS before leaving coverage.', file: '/guides/tech-preparedness-guide.pdf', format: 'Guide' },
    ],
  },
  {
    id: 'activity-guides',
    heading: 'Choose your activity',
    description: 'Preparation and hazards for outdoor recreation in Pierce County.',
    items: [
      { id: 'activity-hiking-safety', title: 'Hiking Safety', description: 'Plan for trails, terrain, and hazards from sea level to Rainier.', file: '/guides/activity-hiking-safety.pdf', format: 'Guide' },
      { id: 'activity-offroad-safety', title: 'Offroad & 4x4 Safety', description: 'Review vehicle preparation, recovery, and trail etiquette.', file: '/guides/activity-offroad-safety.pdf', format: 'Guide' },
      { id: 'activity-atv-sxs-safety', title: 'ATV, SxS & Dirt Bike', description: 'Review OHV rules, riding areas, and safe riding practices.', file: '/guides/activity-atv-sxs-safety.pdf', format: 'Guide' },
      { id: 'activity-water-safety', title: 'Water Recreation', description: 'Prepare for kayaking, paddleboarding, boating, and cold water.', file: '/guides/activity-water-safety.pdf', format: 'Guide' },
      { id: 'activity-winter-safety', title: 'Winter & Snowmobile', description: 'Prepare for avalanche terrain, snowmobiling, and snowshoeing.', file: '/guides/activity-winter-safety.pdf', format: 'Guide' },
      { id: 'activity-hunting-fishing-safety', title: 'Hunting & Fishing', description: 'Review solo travel, backcountry risks, and game processing safety.', file: '/guides/activity-hunting-fishing-safety.pdf', format: 'Guide' },
    ],
  },
  {
    id: 'field-cards',
    heading: 'Print & take along',
    description: 'Quick-reference field cards for your pack and a trip plan to leave with someone you trust.',
    items: [
      { id: 'field-card-trip-planning', title: 'Trip Planning Field Card', description: 'Keep a compact pre-trip checklist handy.', file: '/guides/field-card-trip-planning.pdf', format: 'Field card' },
      { id: 'field-card-ten-essentials', title: 'Ten Essentials Field Card', description: 'Print a gear checklist for your pack.', file: '/guides/field-card-ten-essentials.pdf', format: 'Field card' },
      { id: 'field-card-emergency-signals', title: 'Emergency Signals Field Card', description: 'Keep S.T.O.P. and signaling steps within reach.', file: '/guides/field-card-emergency-signals.pdf', format: 'Field card' },
      { id: 'field-card-tech-prep', title: 'Tech Prep Field Card', description: 'Check apps, battery power, and satellite SOS at a glance.', file: '/guides/field-card-tech-prep.pdf', format: 'Field card' },
      { id: 'trip-plan-form', title: 'Trip Plan Form', description: 'Write down your route and return time. Leave it with your emergency contact.', file: '/guides/trip-plan-form.pdf', format: 'Form', featuredOrder: 3 },
    ],
  },
]

export const safetyGuides = guideCategories.flatMap((category) => category.items)
export const featuredGuides = safetyGuides
  .filter((guide) => guide.featuredOrder !== undefined)
  .sort((a, b) => a.featuredOrder! - b.featuredOrder!)

export const SAFETY_LIBRARY_ID = 'safety-guides'
export const SAFETY_LIBRARY_PATH = `/safety#${SAFETY_LIBRARY_ID}`
export const SAFETY_LIBRARY_URL = `${SITE_URL}${SAFETY_LIBRARY_PATH}`

export function getGuideUrl(guide: SafetyGuide) {
  return `${SITE_URL}${guide.file}`
}
