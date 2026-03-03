'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const capabilities = [
  {
    category: 'Vehicles & Equipment',
    items: [
      '12 specialized 4x4 rescue vehicles',
      'ATVs and UTVs for trail access',
      'Command and communications trailer',
      'Portable lighting systems',
      'Rescue stretchers and litters',
      'Technical rope rescue gear',
    ],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&q=75&fm=auto',
    imageAlt: '4x4 rescue vehicle equipped for search and rescue operations',
  },
  {
    category: 'Training & Certifications',
    items: [
      'NASAR certified search technicians',
      'Wilderness First Responder (WFR)',
      'Technical rope rescue Level II',
      'ICS-100 through ICS-400',
      'Swift water awareness',
      'GPS navigation & mapping',
    ],
    image: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=600&h=400&fit=crop&q=75&fm=auto',
    imageAlt: 'Search and rescue team training in wilderness setting',
  },
  {
    category: 'Search Capabilities',
    items: [
      'Grid search operations',
      'Tracking and sign cutting',
      'K-9 search team support',
      'Night operations capability',
      'Drone search assistance',
      'Evidence search protocols',
    ],
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop&q=75&fm=auto',
    imageAlt: 'Mountain terrain typical of search and rescue operations',
  },
]

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
      if (typeof IntersectionObserver === 'undefined') {
        setIsVisible(true)
        return
      }

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
      id="capabilities"
      ref={sectionRef}
      className="section-padding bg-navy-900 text-white"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-rescue-orange font-semibold text-sm uppercase tracking-wider">
            Our Resources
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-6">
            Capabilities & Equipment
          </h2>
          <p className="text-navy-200 text-lg leading-relaxed">
            Our team maintains a high level of readiness with specialized
            equipment and continuous training to handle any search and rescue
            scenario.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="space-y-16">
          {capabilities.map((cap, index) => (
            <div
              key={cap.category}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              } ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{
                transition: 'all 0.6s ease-out',
                transitionDelay: `${index * 150}ms`,
              }}
            >
              {/* Image */}
              <div
                className={`relative h-[300px] lg:h-[350px] rounded-2xl overflow-hidden ${
                  index % 2 === 1 ? 'lg:order-2' : ''
                }`}
              >
                <Image
                  src={cap.image}
                  alt={cap.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
              </div>

              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <h3 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
                  <span className="w-12 h-12 bg-rescue-orange rounded-lg flex items-center justify-center mr-4 text-lg">
                    {index + 1}
                  </span>
                  {cap.category}
                </h3>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {cap.items.map((item) => (
                    <li key={item} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-rescue-orange mt-1 mr-3 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-navy-100">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div
          className={`mt-16 text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="bg-navy-800 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Interested in Joining Our Team?
            </h3>
            <p className="text-navy-200 mb-6 max-w-2xl mx-auto">
              We&apos;re always looking for dedicated volunteers who want to make a
              difference. No prior experience required – we&apos;ll provide all the
              training you need.
            </p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="btn-primary inline-block"
            >
              Learn About Volunteering
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
