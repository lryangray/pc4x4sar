'use client'

import { useScrollVisible } from '@/hooks/useScrollVisible'
import { testimonials } from '@/lib/data/content'

export default function Testimonials() {
  const { ref: sectionRef, isVisible } = useScrollVisible(0.1)

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      aria-label="Testimonials"
      className="section-padding bg-white"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-rescue-orange font-semibold text-sm uppercase tracking-wider">
            What They Say
          </span>
          <h2 className="font-display uppercase tracking-wide text-4xl md:text-5xl lg:text-6xl text-navy-900 mt-2 mb-6">
            Trusted Partners
          </h2>
          <p className="text-navy-700 text-lg leading-relaxed">
            Hear from the agencies and community members who work alongside us
            in Pierce County&apos;s toughest moments.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.org}
              className={`bg-navy-50 rounded-2xl p-8 relative transition-all duration-500 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${Math.min(index * 150, 300)}ms` }}
            >
              {/* Quote mark */}
              <svg
                className="w-10 h-10 text-rescue-orange/20 mb-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              {/* Quote text */}
              <blockquote className="text-navy-700 leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Attribution */}
              <div className="border-t border-navy-200 pt-4">
                <p className="font-bold text-navy-900">{testimonial.name}</p>
                <p className="text-navy-500 text-sm">{testimonial.title}</p>
                <p className="text-rescue-orange text-sm font-medium">{testimonial.org}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
