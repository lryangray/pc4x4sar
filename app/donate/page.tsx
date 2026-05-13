import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import SiteShell from '@/components/SiteShell'
import StructuredDataScript from '@/components/StructuredDataScript'
import { buildMetadata } from '@/lib/metadata'
import { createBreadcrumbSchema } from '@/lib/structured-data'

export const metadata: Metadata = buildMetadata({
  title: 'Donate to Pierce County 4x4 Search and Rescue',
  description:
    'Support Pierce County 4x4 Search and Rescue with a tax-deductible donation. As a 501(c)(3) all-volunteer organization, every dollar funds equipment, training, and rescue readiness for Pierce County, Washington.',
  path: '/donate',
  keywords: [
    'donate search and rescue',
    'Pierce County SAR donation',
    'support volunteer rescue',
    '501(c)(3) donation Washington',
  ],
})

const impactStatements = [
  {
    title: 'Equipment',
    description:
      'Radios, GPS units, rescue gear, and vehicle maintenance for our 4x4s, ATVs, snowmobiles, and SnoCat.',
  },
  {
    title: 'Training',
    description:
      'Winter Driving Courses, advanced first aid, rope rescue, and ongoing certifications keep our team mission-ready.',
  },
  {
    title: 'Readiness',
    description:
      'Fuel, communications, and the command trailer that lets us deploy 24/7/365 when Pierce County needs us.',
  },
]

export default function DonatePage() {
  return (
    <SiteShell>
      <StructuredDataScript
        data={createBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Donate', path: '/donate' },
        ])}
      />
      <PageHero
        eyebrow="Support Our Mission"
        title="Donate to Pierce County 4x4 SAR"
        description="Every donation directly funds rescue equipment, training, and the readiness that lets our all-volunteer team respond at any hour. Pierce County 4x4 SAR is a 501(c)(3) — your gift is tax deductible."
        primaryHref="#donate-options"
        primaryLabel="Donation Options"
        secondaryHref="/volunteer"
        secondaryLabel="Volunteer Instead"
      />

      {/* Impact */}
      <section
        aria-label="Donation Impact"
        className="section-padding bg-white"
      >
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-rescue-orange font-semibold text-sm uppercase tracking-wider">
              Where Donations Go
            </span>
            <h2 className="font-display uppercase tracking-wide text-4xl md:text-5xl text-navy-900 mt-2 mb-6">
              100% Volunteer. 100% Free. Funded by You.
            </h2>
            <p className="text-navy-700 text-lg leading-relaxed">
              We don&apos;t charge for rescues and we don&apos;t receive tax dollars.
              Every search-and-rescue mission, every training course, and every
              piece of gear is paid for by donations, grants, and our membership.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {impactStatements.map((item) => (
              <div
                key={item.title}
                className="bg-navy-50 rounded-xl p-6 shadow-sm"
              >
                <h3 className="font-bold text-navy-900 text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-navy-700 leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation options */}
      <section
        id="donate-options"
        aria-label="Donation Options"
        className="section-padding bg-navy-50"
      >
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Online donation embed slot */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-rescue-orange/10 rounded-lg text-rescue-orange mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-navy-900 mb-3">
                Donate Online
              </h3>
              <p className="text-navy-700 leading-relaxed mb-6">
                Coming soon — we&apos;re setting up secure online donations so you can
                give in seconds. In the meantime, mail-in donations are processed
                quickly and qualify for the same 501(c)(3) tax deduction.
              </p>

              {/*
                TODO: Replace this notice with your donation provider's embed.
                Recommended options (pick one, paste their snippet here):

                Donorbox:
                  <iframe
                    src="https://donorbox.org/embed/YOUR_CAMPAIGN_SLUG"
                    name="donorbox"
                    seamless
                    scrolling="no"
                    height="900px"
                    width="100%"
                    style={{ maxWidth: 500 }}
                    allow="payment"
                    title="Donate to Pierce County 4x4 SAR"
                  />

                Stripe Payment Link:
                  <a href="https://buy.stripe.com/YOUR_LINK" className="btn-primary">
                    Give via Stripe
                  </a>

                PayPal Giving Fund: (free for verified 501c3s)
                  <a href="https://www.paypal.com/fundraiser/charity/YOUR_ID" className="btn-primary">
                    Give via PayPal
                  </a>
              */}
              <div className="bg-navy-50 border-l-4 border-rescue-orange rounded-r-lg p-4">
                <p className="text-navy-700 text-sm">
                  Want to contribute now? Use the mail-in instructions on the right,
                  or{' '}
                  <Link
                    href="/contact?subject=donation"
                    className="text-rescue-orange font-semibold hover:underline"
                  >
                    contact us
                  </Link>{' '}
                  for other donation options.
                </p>
              </div>
            </div>

            {/* Mail-in donation */}
            <div className="bg-navy-900 text-white rounded-2xl p-8 shadow-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-rescue-orange/20 rounded-lg text-rescue-orange mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Donate by Mail</h3>
              <p className="text-navy-200 leading-relaxed mb-6">
                Make checks payable to <strong>Pierce County Department of Emergency
                Management</strong> with <strong>&ldquo;PC SAR 4x4&rdquo;</strong> in the memo line.
              </p>
              <address className="not-italic bg-navy-800 rounded-lg p-5 text-navy-100 leading-relaxed mb-4">
                Pierce County Dept. of Emergency Management<br />
                Attn: PC SAR 4x4<br />
                2501 S. 35th St. Suite D<br />
                Tacoma, WA 98409
              </address>
              <p className="text-navy-300 text-sm">
                You&apos;ll receive a receipt for your tax-deductible contribution.
                Pierce County 4x4 SAR is a registered 501(c)(3) non-profit.
              </p>
            </div>
          </div>

          {/* Other ways */}
          <div className="max-w-3xl mx-auto mt-12 text-center">
            <h3 className="text-xl font-bold text-navy-900 mb-3">
              Other Ways to Support Us
            </h3>
            <p className="text-navy-700 leading-relaxed mb-6">
              Corporate sponsors fund equipment, fuel, and training. In-kind donations
              of gear, services, or vehicle maintenance support are equally welcome.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact?subject=donation"
                className="btn-primary"
              >
                Ask About Sponsorship <span className="btn-arrow">→</span>
              </Link>
              <Link href="/volunteer" className="btn-secondary">
                Donate Your Time
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
