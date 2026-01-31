'use client'

import { useEffect, useRef, useState } from 'react'

const safetyTips = [
  {
    title: 'Tell Someone Your Plans',
    description: 'Always let a friend or family member know where you\'re going and when you expect to return.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    title: 'Carry the Ten Essentials',
    description: 'Navigation, sun protection, insulation, illumination, first-aid, fire, repair tools, nutrition, hydration, and emergency shelter.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
  },
  {
    title: 'Check Weather Conditions',
    description: 'Mountain weather changes rapidly. Check forecasts before heading out and be prepared to turn back.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
  {
    title: 'Know Your Limits',
    description: 'Choose trails and activities that match your fitness level and experience. It\'s okay to turn back.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Stay On Marked Trails',
    description: 'Going off-trail increases your risk of getting lost and makes it harder for rescuers to find you.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    title: 'Carry a Charged Phone',
    description: 'Keep your phone charged and consider a portable battery. Turn on location services in case of emergency.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
]

const resources = [
  {
    title: 'Trip Planning Checklist',
    description: 'A comprehensive checklist to prepare for your outdoor adventure.',
    type: 'PDF',
  },
  {
    title: 'Ten Essentials Guide',
    description: 'Detailed guide on what to pack for any outdoor excursion.',
    type: 'PDF',
  },
  {
    title: 'Emergency Signal Guide',
    description: 'Learn how to signal for help if you become lost or injured.',
    type: 'PDF',
  },
]

export default function SafetyResources() {
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
      id="safety"
      ref={sectionRef}
      className="section-padding bg-white"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-rescue-orange font-semibold text-sm uppercase tracking-wider">
            Stay Safe Outdoors
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mt-2 mb-6">
            Safety Resources
          </h2>
          <p className="text-navy-700 text-lg leading-relaxed">
            Prevention is the best rescue. Use these resources to stay safe on your
            outdoor adventures in Pierce County and beyond.
          </p>
        </div>

        {/* Safety Tips Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {safetyTips.map((tip, index) => (
            <div
              key={tip.title}
              className={`flex items-start space-x-4 p-6 bg-navy-50 rounded-xl transition-all duration-500 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              <div className="w-12 h-12 bg-rescue-orange/10 rounded-lg flex items-center justify-center text-rescue-orange flex-shrink-0">
                {tip.icon}
              </div>
              <div>
                <h3 className="font-bold text-navy-900 mb-1">{tip.title}</h3>
                <p className="text-navy-600 text-sm leading-relaxed">
                  {tip.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Downloadable Resources */}
        <div
          className={`bg-navy-900 rounded-2xl p-8 md:p-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Downloadable Resources
            </h3>
            <p className="text-navy-200 max-w-2xl mx-auto">
              Free guides and checklists to help you prepare for your next outdoor adventure.
              Share these with friends and family to help everyone stay safe.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <div
                key={resource.title}
                className="bg-navy-800 rounded-xl p-6 hover:bg-navy-700 transition-colors group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-rescue-orange bg-rescue-orange/10 px-2 py-1 rounded">
                    {resource.type}
                  </span>
                  <svg
                    className="w-5 h-5 text-navy-400 group-hover:text-rescue-orange transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </div>
                <h4 className="font-bold text-white mb-2">{resource.title}</h4>
                <p className="text-navy-300 text-sm">{resource.description}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-navy-400 text-sm mt-6">
            Resources coming soon. Contact us if you&apos;d like to request specific materials.
          </p>
        </div>
      </div>
    </section>
  )
}
