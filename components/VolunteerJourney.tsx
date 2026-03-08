'use client'

import { useScrollVisible } from '@/hooks/useScrollVisible'
import { scrollToSection } from '@/lib/scroll'

const steps = [
  {
    number: 1,
    title: 'Reach Out',
    description: 'Contact us through our website or attend a monthly meeting. No prior experience needed — just a willingness to serve.',
  },
  {
    number: 2,
    title: 'Attend a Meeting',
    description: 'Join us on the first Tuesday of the month at 7:00 PM. Meet the team, learn about our mission, and ask questions.',
  },
  {
    number: 3,
    title: 'Complete Training',
    description: 'Receive hands-on training in wilderness navigation, search techniques, first aid, radio comms, and off-road driving.',
  },
  {
    number: 4,
    title: 'Deploy on Missions',
    description: 'Respond to real emergencies alongside experienced members. Make a difference when Pierce County needs you most.',
  },
]

export default function VolunteerJourney() {
  const { ref: sectionRef, isVisible } = useScrollVisible(0.1)

  return (
    <section
      id="volunteer"
      ref={sectionRef}
      aria-label="Volunteer Journey"
      className="section-padding bg-navy-900 text-white"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-rescue-orange font-semibold text-sm uppercase tracking-wider">
            Join Our Team
          </span>
          <h2 className="font-display uppercase tracking-wide text-4xl md:text-5xl lg:text-6xl text-white mt-2 mb-6">
            Your Path to Making a Difference
          </h2>
          <p className="text-navy-200 text-lg leading-relaxed">
            Becoming a volunteer is simpler than you think. Here&apos;s how you go
            from interested citizen to field-ready rescuer.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {/* Desktop: horizontal, Mobile: vertical */}
          <div className="grid md:grid-cols-4 gap-8 md:gap-6 relative">
            {/* Connecting line - desktop only */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-navy-700" aria-hidden="true" />

            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`relative text-center transition-all duration-500 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${Math.min(index * 150, 450)}ms` }}
              >
                {/* Step badge */}
                <div className="w-16 h-16 bg-rescue-orange rounded-full flex items-center justify-center mx-auto mb-4 relative z-10 shadow-lg shadow-rescue-orange/20">
                  <span className="text-white font-bold text-xl">{step.number}</span>
                </div>

                {/* Mobile connecting line */}
                {index < steps.length - 1 && (
                  <div className="md:hidden w-0.5 h-6 bg-navy-700 mx-auto -mt-2 mb-2" aria-hidden="true" />
                )}

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-navy-300 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className={`mt-14 text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('#contact')
            }}
            className="btn-primary"
          >
            Start Your Journey <span className="btn-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
