'use client'

import { useScrollVisible } from '@/hooks/useScrollVisible'
import { scrollToSection } from '@/lib/scroll'
import { partners } from '@/lib/data/content'
import Image from 'next/image'

export default function Partners() {
  const { ref: sectionRef, isVisible } = useScrollVisible(0.2)

  return (
    <section
      id="partners"
      ref={sectionRef}
      aria-label="Our Partners"
      className="section-padding bg-navy-50"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-rescue-orange font-semibold text-sm uppercase tracking-wider">
            Working Together
          </span>
          <h2 className="font-display uppercase tracking-wide text-4xl md:text-5xl lg:text-6xl text-navy-900 mt-2 mb-6">
            Our Partners
          </h2>
          <p className="text-navy-700 text-lg leading-relaxed">
            We work closely with local law enforcement and emergency management agencies
            to provide coordinated, effective search and rescue operations.
          </p>
        </div>

        {/* Partners List */}
        <div className="space-y-4 mb-12">
          {partners.map((partner, index) => (
            <div
              key={partner.name}
              className={`bg-white rounded-xl p-6 md:p-8 shadow-lg transition-all duration-500 ${
                index % 2 === 1 ? 'lg:ml-12' : 'lg:mr-12'
              } ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : `opacity-0 ${index % 2 === 0 ? '-translate-x-10' : 'translate-x-10'}`
              }`}
              style={{ transitionDelay: `${Math.min(index * 150, 300)}ms` }}
            >
              <div className="flex items-center gap-5 md:gap-8">
                {partner.logo ? (
                  <div className="w-16 h-16 md:w-20 md:h-20 relative flex-shrink-0">
                    <Image
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      fill
                      className="object-contain"
                      sizes="80px"
                    />
                  </div>
                ) : (
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-navy-900 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-7 h-7 md:w-8 md:h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h3 className="text-lg md:text-xl font-bold text-navy-900">
                      {partner.name}
                    </h3>
                    <span className="text-xs font-semibold text-rescue-orange bg-rescue-orange/10 px-3 py-1 rounded-full">
                      {partner.type}
                    </span>
                  </div>
                  <p className="text-navy-600 leading-relaxed">
                    {partner.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Become a Partner CTA */}
        <div
          className={`bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-navy-100 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-navy-900 mb-2">
                Interested in Supporting Our Mission?
              </h3>
              <p className="text-navy-600">
                Local businesses and organizations can partner with us through sponsorships and donations.
                Your support helps keep our rescue operations running.
              </p>
            </div>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('#contact')
              }}
              className="btn-primary whitespace-nowrap"
            >
              Become a Sponsor <span className="btn-arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
