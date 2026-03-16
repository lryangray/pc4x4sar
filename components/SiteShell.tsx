import type { ReactNode } from 'react'
import EmergencyBanner from '@/components/EmergencyBanner'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <EmergencyBanner />
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  )
}
