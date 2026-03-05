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
      className="section-padding bg-white"
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
          className={`flex flex-wrap items-center justify-center gap-8 md:gap-12 transition-all duration-700 ${
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
              className="grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
              style={{ transitionDelay: `${Math.min(index * 100, 300)}ms` }}
              title={sponsor.name}
            >
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={160}
                height={64}
                className="h-12 md:h-16 w-auto object-contain"
                loading="lazy"
              />
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
          <p className="text-navy-500 text-sm">
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
