import EmergencyBanner from '@/components/EmergencyBanner'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Mission from '@/components/Mission'
import Services from '@/components/Services'
import SafetyResources from '@/components/SafetyResources'
import Capabilities from '@/components/Capabilities'
import Partners from '@/components/Partners'
import Gallery from '@/components/Gallery'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <EmergencyBanner />
      <Header />
      <main>
        <Hero />
        <Mission />
        <Services />
        <SafetyResources />
        <Capabilities />
        <Partners />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
