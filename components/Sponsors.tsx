'use client'

import Image from 'next/image'
import { useScrollVisible } from '@/hooks/useScrollVisible'
import { scrollToSection } from '@/lib/scroll'
import { sponsors } from '@/lib/data/content'

export default function Sponsors() {
  const { ref: sectionRef, isVisible } = useScrollVisible(0.2)

  return (
    <section
      id="sponsors"
      ref={sectionRef}
      aria-label="Our Sponsors"
      className="section-padding bg-navy-50"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-rescue-orange font-semibold text-sm uppercase tracking-wider">
            Thank You
          </span>
          <h2 className="font-display uppercase tracking-wide text-4xl md:text-5xl lg:text-6xl text-navy-900 mt-2 mb-6">
            Our Sponsors
          </h2>
          <p className="text-navy-700 text-lg leading-relaxed">
            These organizations help keep our rescue operations running.
            Their support funds equipment, training, and community programs.
          </p>
        </div>

        {/* Sponsor Logos */}
        <div
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          {sponsors.map((sponsor, index) => (
            <a
              key={sponsor.name}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 flex flex-col items-center justify-center text-center transition-all duration-300"
              style={{ transitionDelay: `${Math.min(index * 100, 300)}ms` }}
              aria-label={`Visit ${sponsor.name} (opens in new tab)`}
            >
              <div className="w-full h-20 flex items-center justify-center mb-3">
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={160}
                  height={64}
                  className="max-h-16 w-auto object-contain"
                  loading="lazy"
                />
              </div>
              <span className="text-navy-700 text-sm font-medium">{sponsor.name}</span>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div
          className={`mt-12 text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <p className="text-navy-600 text-sm">
            Interested in sponsoring Pierce County 4x4 SAR?{' '}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('#contact')
              }}
              className="text-rescue-orange hover:underline font-medium"
            >
              Get in touch
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
