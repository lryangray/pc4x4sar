'use client'

import Link from 'next/link'
import { useScrollVisible } from '@/hooks/useScrollVisible'

const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: 'Missing Person Search',
    description: 'Coordinated ground searches for missing persons using trained search teams, tracking techniques, and systematic grid searches across varied terrain.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    title: 'Wilderness Rescue',
    description: 'Rescue operations in remote backcountry areas, including hikers, hunters, and outdoor enthusiasts who become lost, injured, or stranded.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Disaster Response',
    description: 'Support during natural disasters including floods, earthquakes, and severe storms. We assist with evacuations, damage assessment, and supply transport.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Medical Evacuation',
    description: 'Emergency medical evacuation from areas inaccessible to standard ambulances. Our trained EMTs and First Responders provide critical care during transport.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: 'Community Education',
    description: 'Free training programs and workshops on wilderness safety, survival skills, and emergency preparedness for schools, scout troops, and community groups.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Event Standby',
    description: 'Safety coverage for outdoor events, races, and community gatherings. Our team provides on-site emergency response and first aid services.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: 'Evidence Search & Recovery',
    description: 'Systematic searches for evidence, vehicles, and property in support of law enforcement investigations. Our 4x4 capabilities provide access to remote scenes.',
  },
]

export default function Services({ preview }: { preview?: boolean }) {
  const { ref: sectionRef, isVisible } = useScrollVisible(0.1)

  return (
    <section
      id="services"
      ref={sectionRef}
      aria-label="Our Services"
      className="section-padding bg-navy-50"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-rescue-orange font-semibold text-sm uppercase tracking-wider">
            What We Do
          </span>
          <h2 className="font-display uppercase tracking-wide text-4xl md:text-5xl lg:text-6xl text-navy-900 mt-2 mb-6">
            Our Services
          </h2>
          <p className="text-navy-700 text-lg leading-relaxed">
            We provide a comprehensive range of search and rescue services to
            Pierce County and surrounding areas. All our services are provided
            free of charge by our volunteer team.
          </p>
        </div>

        {/* Featured Service */}
        {services[0] && (
          <div
            className={`bg-navy-900 rounded-2xl p-8 md:p-10 mb-8 shadow-xl transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
              <div className="w-20 h-20 bg-rescue-orange rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                {services[0].icon}
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {services[0].title}
                </h3>
                <p className="text-navy-200 text-lg leading-relaxed">
                  {services[0].description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Remaining Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(1).map((service, index) => (
            <div
              key={service.title}
              className={`bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              } ${preview && index >= 2 ? 'hidden md:block' : ''}`}
              style={{ transitionDelay: `${Math.min((index + 1) * 100, 300)}ms` }}
            >
              <div className="w-14 h-14 bg-rescue-orange/10 rounded-xl flex items-center justify-center text-rescue-orange mb-5">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">
                {service.title}
              </h3>
              <p className="text-navy-600 leading-relaxed text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {preview && (
          <div className="md:hidden text-center mt-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 bg-rescue-orange/10 text-rescue-orange font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-rescue-orange/20 transition-colors"
            >
              View all {services.length} services
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
