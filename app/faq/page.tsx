import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import SiteShell from '@/components/SiteShell'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import StructuredDataScript from '@/components/StructuredDataScript'
import { buildMetadata } from '@/lib/metadata'
import { createBreadcrumbSchema, faqSchema } from '@/lib/structured-data'

export const metadata: Metadata = buildMetadata({
  title: 'Frequently Asked Questions | Pierce County 4x4 SAR',
  description:
    'Find answers to common questions about Pierce County 4x4 Search and Rescue, including emergency response, volunteer requirements, costs, training, and community support.',
  path: '/faq',
  keywords: [
    'search and rescue FAQ',
    'volunteer SAR questions',
    'Pierce County 4x4 SAR',
    'wilderness rescue questions',
  ],
})

export default function FAQPage() {
  return (
    <SiteShell>
      <StructuredDataScript
        data={createBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'FAQ', path: '/faq' },
        ])}
      />
      <StructuredDataScript data={faqSchema} />
      <PageHero
        eyebrow="Common Questions"
        title="Frequently Asked Questions"
        description="Get quick answers about how Pierce County 4x4 Search and Rescue serves the community, coordinates emergencies, and welcomes new volunteers."
        primaryHref="/contact"
        primaryLabel="Ask a Question"
      />
      <FAQ />
      <Contact />
    </SiteShell>
  )
}
