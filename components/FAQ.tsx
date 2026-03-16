'use client'

import { useState } from 'react'
import { useScrollVisible } from '@/hooks/useScrollVisible'
import { scrollToSection } from '@/lib/scroll'
import { faqs } from '@/lib/data/content'

export default function FAQ() {
  const { ref: sectionRef, isVisible } = useScrollVisible(0.1)
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section
      id="faq"
      ref={sectionRef}
      aria-label="Frequently Asked Questions"
      className="section-padding bg-white"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-rescue-orange font-semibold text-sm uppercase tracking-wider">
            Common Questions
          </span>
          <h2 className="font-display uppercase tracking-wide text-4xl md:text-5xl lg:text-6xl text-navy-900 mt-2 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-navy-700 text-lg leading-relaxed">
            Find answers to common questions about our search and rescue services,
            volunteering, and how we operate in Pierce County.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className={`border-b border-navy-200 transition-all duration-500 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: `${Math.min(index * 75, 300)}ms` }}
            >
              <button
                id={`faq-question-${index}`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full py-6 flex items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rescue-orange focus-visible:ring-offset-2 rounded-sm"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-lg font-semibold text-navy-900 pr-8">
                  {faq.question}
                </span>
                <span
                  className={`flex-shrink-0 w-8 h-8 rounded-full bg-navy-100 flex items-center justify-center transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                >
                  <svg
                    className="w-4 h-4 text-navy-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>
              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
                }`}
              >
                <div className="border-l-4 border-rescue-orange pl-4 ml-1">
                  <p className="text-navy-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Help */}
        <div
          className={`mt-12 text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          <p className="text-navy-600 mb-4">
            Still have questions? We&apos;re here to help.
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('#contact')
            }}
            className="btn-primary"
          >
            Contact Us <span className="btn-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
