import Hero from '@/components/Hero'
import Mission from '@/components/Mission'
import StatsBar from '@/components/StatsBar'
import Services from '@/components/Services'
import SafetyResources from '@/components/SafetyResources'
import Capabilities from '@/components/Capabilities'
import Partners from '@/components/Partners'
import Testimonials from '@/components/Testimonials'
import Sponsors from '@/components/Sponsors'
import Gallery from '@/components/Gallery'
import FAQ from '@/components/FAQ'
import VolunteerJourney from '@/components/VolunteerJourney'
import Contact from '@/components/Contact'
import ErrorBoundary from '@/components/ErrorBoundary'
import SiteShell from '@/components/SiteShell'
import StructuredDataScript from '@/components/StructuredDataScript'
import { faqSchema } from '@/lib/structured-data'

export default function Home() {
  return (
    <SiteShell>
      <StructuredDataScript data={faqSchema} />
      <>
        <Hero />
        <ErrorBoundary>
          <Mission />
        </ErrorBoundary>
        <ErrorBoundary>
          <StatsBar />
        </ErrorBoundary>
        <ErrorBoundary>
          <Services />
        </ErrorBoundary>
        <ErrorBoundary>
          <SafetyResources />
        </ErrorBoundary>
        <ErrorBoundary>
          <Capabilities />
        </ErrorBoundary>
        <ErrorBoundary>
          <Partners />
        </ErrorBoundary>
        <ErrorBoundary>
          <Testimonials />
        </ErrorBoundary>
        <ErrorBoundary>
          <Sponsors />
        </ErrorBoundary>
        <ErrorBoundary>
          <Gallery />
        </ErrorBoundary>
        <ErrorBoundary>
          <FAQ />
        </ErrorBoundary>
        <ErrorBoundary>
          <VolunteerJourney />
        </ErrorBoundary>
        <ErrorBoundary>
          <Contact />
        </ErrorBoundary>
      </>
    </SiteShell>
  )
}
