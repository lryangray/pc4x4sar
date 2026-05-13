import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import SiteShell from '@/components/SiteShell'
import Contact from '@/components/Contact'
import StructuredDataScript from '@/components/StructuredDataScript'
import { buildMetadata } from '@/lib/metadata'
import { createBreadcrumbSchema } from '@/lib/structured-data'

export const metadata: Metadata = buildMetadata({
  title: 'Contact Pierce County 4x4 Search and Rescue',
  description:
    'Contact Pierce County 4x4 Search and Rescue with volunteer questions, training inquiries, donation questions, or event standby requests. For emergencies, always call 911 first.',
  path: '/contact',
  keywords: [
    'contact search and rescue',
    'Pierce County SAR contact',
    'volunteer inquiry Pierce County',
    'event standby request',
  ],
})

export default function ContactPage() {
  return (
    <SiteShell>
      <StructuredDataScript
        data={createBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />
      <PageHero
        eyebrow="Get In Touch"
        title="Contact Our Volunteer Team"
        description="Reach out with questions about volunteering, training, donations, or event support. For urgent emergencies, call 911 so dispatch can coordinate the appropriate responders."
        primaryHref="/faq"
        primaryLabel="Read Our FAQs"
        secondaryHref="/volunteer"
        secondaryLabel="Explore Volunteering"
      />
      <Contact />
    </SiteShell>
  )
}
