import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import SiteShell from '@/components/SiteShell'
import SafetyResources from '@/components/SafetyResources'
import Contact from '@/components/Contact'
import StructuredDataScript from '@/components/StructuredDataScript'
import { buildMetadata } from '@/lib/metadata'
import { createBreadcrumbSchema } from '@/lib/structured-data'

export const metadata: Metadata = buildMetadata({
  title: 'Outdoor Safety Resources | Pierce County 4x4 SAR',
  description:
    'Review Pierce County 4x4 SAR safety resources, prevention tips, and preparedness guidance for outdoor recreation in Pierce County and the Mount Rainier foothills.',
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
        description="The best rescue is the one that never has to happen. Use these preparedness tips and resources before heading into the mountains, forests, and backroads of Pierce County."
        primaryHref="/contact?subject=general"
        primaryLabel="Request a Safety Guide"
      />
      <SafetyResources />
      <Contact />
    </SiteShell>
  )
}
