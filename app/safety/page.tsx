import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import SiteShell from '@/components/SiteShell'
import SafetyResources from '@/components/SafetyResources'
import StructuredDataScript from '@/components/StructuredDataScript'
import { buildMetadata } from '@/lib/metadata'
import { createBreadcrumbSchema } from '@/lib/structured-data'
import { safetyGuides, SAFETY_LIBRARY_PATH } from '@/lib/data/safety-guides'

export const metadata: Metadata = buildMetadata({
  title: 'Outdoor Safety Resources | Pierce County 4x4 SAR',
  description:
    'Free outdoor safety PDFs from Pierce County 4x4 SAR: trip checklists, activity guides, field cards, and a trip plan form. View, download, print, and share. No signup.',
  path: '/safety',
  keywords: [
    'outdoor safety Pierce County',
    'hiking safety Washington',
    'Mount Rainier safety tips',
    'search and rescue prevention',
  ],
})

export default function SafetyPage() {
  return (
    <SiteShell>
      <StructuredDataScript
        data={createBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Safety Resources', path: '/safety' },
        ])}
      />
      <PageHero
        eyebrow="Prevention First"
        title="Outdoor Safety Resources"
        description="Plan a safer trip and help someone else do the same. Free guides, checklists, and printable field cards for your next outdoor adventure — no signup or SAR membership needed."
        primaryHref={SAFETY_LIBRARY_PATH}
        primaryLabel={`Browse ${safetyGuides.length} Free Guides`}
        secondaryHref="/contact?subject=general"
        secondaryLabel="Ask a Non-Emergency Question"
      />
      <SafetyResources />
    </SiteShell>
  )
}
