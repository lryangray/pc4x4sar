import EmergencyBanner from '@/components/EmergencyBanner'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Mission from '@/components/Mission'
import Services from '@/components/Services'
import SafetyResources from '@/components/SafetyResources'
import Capabilities from '@/components/Capabilities'
import Partners from '@/components/Partners'
import Gallery from '@/components/Gallery'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ErrorBoundary from '@/components/ErrorBoundary'

export default function Home() {
  return (
    <>
      <EmergencyBanner />
      <Header />
      <main>
        <Hero />
        <ErrorBoundary>
          <Mission />
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
          <Gallery />
        </ErrorBoundary>
        <ErrorBoundary>
          <FAQ />
        </ErrorBoundary>
        <ErrorBoundary>
          <Contact />
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  )
}
