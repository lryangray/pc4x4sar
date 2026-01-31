'use client'

import { useEffect, useRef, useState } from 'react'

const partners = [
  {
    name: 'Pierce County Sheriff\'s Department',
    description: 'Our primary coordinating agency for search and rescue operations throughout Pierce County.',
    type: 'Law Enforcement',
  },
  {
    name: 'Tacoma Police Department',
    description: 'Partnering on urban search operations and missing person cases within Tacoma city limits.',
    type: 'Law Enforcement',
  },
  {
    name: 'Pierce County Department of Emergency Management',
    description: 'Coordinating disaster response and emergency preparedness across the county.',
    type: 'Emergency Management',
  },
]

export default function Partners() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="partners"
      ref={sectionRef}
      className="section-padding bg-navy-50"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-rescue-orange font-semibold text-sm uppercase tracking-wider">
            Working Together
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mt-2 mb-6">
            Our Partners
          </h2>
          <p className="text-navy-700 text-lg leading-relaxed">
            We work closely with local law enforcement and emergency management agencies
            to provide coordinated, effective search and rescue operations.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {partners.map((partner, index) => (
            <div
              key={partner.name}
              className={`bg-white rounded-xl p-8 shadow-lg text-center transition-all duration-500 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-20 h-20 bg-navy-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {partner.type === 'Law Enforcement' ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  )}
                </svg>
              </div>
              <span className="inline-block text-xs font-semibold text-rescue-orange bg-rescue-orange/10 px-3 py-1 rounded-full mb-4">
                {partner.type}
              </span>
              <h3 className="text-xl font-bold text-navy-900 mb-3">
                {partner.name}
              </h3>
              <p className="text-navy-600 leading-relaxed">
                {partner.description}
              </p>
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
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="btn-primary whitespace-nowrap"
            >
              Become a Sponsor
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
