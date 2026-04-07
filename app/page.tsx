import Hero from '@/components/Hero'
import Mission from '@/components/Mission'
import StatsBar from '@/components/StatsBar'
import Services from '@/components/Services'
import SafetyResources from '@/components/SafetyResources'
import Capabilities from '@/components/Capabilities'
import Partners from '@/components/Partners'
import Sponsors from '@/components/Sponsors'
import Gallery from '@/components/Gallery'
import FAQ from '@/components/FAQ'
import VolunteerJourney from '@/components/VolunteerJourney'
import Contact from '@/components/Contact'
import ErrorBoundary from '@/components/ErrorBoundary'
import SiteShell from '@/components/SiteShell'
import MobileSectionNav from '@/components/MobileSectionNav'
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
          <Services preview />
        </ErrorBoundary>
        <ErrorBoundary>
          <SafetyResources preview />
        </ErrorBoundary>
        <ErrorBoundary>
          <Capabilities preview />
        </ErrorBoundary>
        <ErrorBoundary>
          <Partners />
        </ErrorBoundary>
        <ErrorBoundary>
          <Sponsors />
        </ErrorBoundary>
        <ErrorBoundary>
          <Gallery />
        </ErrorBoundary>
        <ErrorBoundary>
          <FAQ preview />
        </ErrorBoundary>
        <ErrorBoundary>
          <VolunteerJourney />
        </ErrorBoundary>
        <ErrorBoundary>
          <Contact />
        </ErrorBoundary>
      </>
      <MobileSectionNav />
      {/* Spacer so fixed bottom nav doesn't cover footer content on mobile */}
      <div className="h-14 md:hidden" aria-hidden="true" />
    </SiteShell>
  )
}
