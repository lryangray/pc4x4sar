'use client'

import { useEffect, useRef, useState } from 'react'

const faqs = [
  {
    question: 'How do I request search and rescue assistance?',
    answer: 'In an emergency, always dial 911 first. Our team is dispatched through Pierce County Emergency Management and the Pierce County Sheriff\'s Department. Do not contact us directly for emergencies - 911 dispatchers will coordinate with our team when SAR resources are needed.',
  },
  {
    question: 'What areas does Pierce County 4x4 SAR cover?',
    answer: 'We serve all of Pierce County, Washington, including the Mt. Rainier foothills, Carbon River area, Puyallup, Tacoma, Lakewood, University Place, Bonney Lake, Buckley, Orting, and surrounding wilderness areas. We also provide mutual aid to neighboring counties when requested.',
  },
  {
    question: 'How much does a search and rescue operation cost?',
    answer: 'Nothing. All of our services are provided completely free of charge. We are a 501(c)(3) non-profit organization staffed entirely by volunteers. Our operations are funded through donations and grants.',
  },
  {
    question: 'How can I become a volunteer?',
    answer: 'We welcome new volunteers! No prior experience is required - we provide all necessary training. Attend one of our monthly meetings held on the first Tuesday of each month at 7:00 PM. You\'ll need a reliable 4x4 vehicle, a commitment to training, and a desire to help your community. Contact us through our website to learn more.',
  },
  {
    question: 'What kind of training do volunteers receive?',
    answer: 'Volunteers receive comprehensive training including wilderness navigation, GPS and mapping, search techniques, emergency first aid, radio communications, off-road driving skills, and incident command system (ICS) protocols. Training is ongoing throughout your membership.',
  },
  {
    question: 'How can I support Pierce County 4x4 SAR?',
    answer: 'You can support us by making a tax-deductible donation, becoming a corporate sponsor, volunteering your time, or simply spreading the word about outdoor safety. Every contribution helps us maintain our equipment and training programs.',
  },
]

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(0)

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

  // Generate FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="section-padding bg-white"
    >
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-rescue-orange font-semibold text-sm uppercase tracking-wider">
            Common Questions
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mt-2 mb-6">
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
              key={index}
              className={`border-b border-navy-200 transition-all duration-500 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full py-6 flex items-center justify-between text-left"
                aria-expanded={openIndex === index}
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
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
                }`}
              >
                <p className="text-navy-600 leading-relaxed">{faq.answer}</p>
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
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="btn-primary inline-block"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  )
}
