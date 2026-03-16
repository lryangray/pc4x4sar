import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import SiteShell from '@/components/SiteShell'
import VolunteerJourney from '@/components/VolunteerJourney'
import Contact from '@/components/Contact'
import StructuredDataScript from '@/components/StructuredDataScript'
import { buildMetadata } from '@/lib/metadata'
import { createBreadcrumbSchema } from '@/lib/structured-data'

export const metadata: Metadata = buildMetadata({
  title: 'Volunteer With Pierce County 4x4 SAR',
  description:
    'Learn how to volunteer with Pierce County 4x4 Search and Rescue, from attending your first meeting to completing training and deploying with experienced team members.',
  path: '/volunteer',
  keywords: [
    'volunteer search and rescue',
    'Pierce County volunteer opportunities',
    '4x4 SAR volunteer',
    'search and rescue training Washington',
  ],
})

export default function VolunteerPage() {
  return (
    <SiteShell>
      <StructuredDataScript
        data={createBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Volunteer', path: '/volunteer' },
        ])}
      />
      <PageHero
        eyebrow="Join Our Team"
        title="Volunteer With Pierce County 4x4 SAR"
        description="From your first meeting to field deployments, see what it takes to become part of a volunteer search and rescue team serving Pierce County around the clock."
        primaryHref="/contact?subject=volunteer"
        primaryLabel="Start Volunteering"
      />
      <VolunteerJourney />
      <Contact />
    </SiteShell>
  )
}
