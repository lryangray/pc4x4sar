import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import SiteShell from '@/components/SiteShell'
import Services from '@/components/Services'
import Capabilities from '@/components/Capabilities'
import Contact from '@/components/Contact'
import StructuredDataScript from '@/components/StructuredDataScript'
import { buildMetadata } from '@/lib/metadata'
import { createBreadcrumbSchema } from '@/lib/structured-data'

export const metadata: Metadata = buildMetadata({
  title: 'Search and Rescue Services | Pierce County 4x4 SAR',
  description:
    'Explore the free volunteer search and rescue services Pierce County 4x4 SAR provides, including missing person searches, wilderness rescue, disaster response, medical evacuation, and community education.',
  path: '/services',
  keywords: [
    'search and rescue services',
    'missing person search Pierce County',
    'wilderness rescue Washington',
    'volunteer disaster response',
  ],
})

export default function ServicesPage() {
  return (
    <SiteShell>
      <StructuredDataScript
        data={createBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ])}
      />
      <PageHero
        eyebrow="Operational Readiness"
        title="Search and Rescue Services"
        description="Pierce County 4x4 Search and Rescue provides free volunteer emergency response across urban, rural, and backcountry terrain throughout Pierce County, Washington."
        primaryHref="/contact"
        primaryLabel="Request Information"
      />
      <Services />
      <Capabilities />
      <Contact />
    </SiteShell>
  )
}
