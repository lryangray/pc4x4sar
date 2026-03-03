'use client'

import { useEffect, useRef, useState } from 'react'

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus('submitting')

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    try {
      const response = await fetch('https://formspree.io/f/PLACEHOLDER_FORM_ID', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })

      if (response.ok) {
        setFormStatus('success')
        form.reset()
        setTimeout(() => setFormStatus('idle'), 5000)
      } else {
        setFormStatus('error')
      }
    } catch {
      setFormStatus('error')
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding bg-navy-50"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-rescue-orange font-semibold text-sm uppercase tracking-wider">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mt-2 mb-6">
            Contact Us
          </h2>
          <p className="text-navy-700 text-lg leading-relaxed">
            Have questions about our services or interested in joining our team?
            We&apos;d love to hear from you. For emergencies, always call 911 first.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              {/* TODO: Replace PLACEHOLDER_FORM_ID in handleSubmit with real Formspree ID */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <p className="text-amber-800 text-sm font-medium">
                  ⚠️ Contact form is being set up. In the meantime, please reach us directly by phone or email below.
                </p>
              </div>
              <h3 className="text-2xl font-bold text-navy-900 mb-6">
                Send Us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-navy-700 font-medium mb-2"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-navy-200 focus:border-rescue-orange focus:ring-2 focus:ring-rescue-orange/20 outline-none transition-all"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-navy-700 font-medium mb-2"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-navy-200 focus:border-rescue-orange focus:ring-2 focus:ring-rescue-orange/20 outline-none transition-all"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-navy-700 font-medium mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-navy-200 focus:border-rescue-orange focus:ring-2 focus:ring-rescue-orange/20 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-navy-700 font-medium mb-2"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-navy-200 focus:border-rescue-orange focus:ring-2 focus:ring-rescue-orange/20 outline-none transition-all"
                  >
                    <option value="">Select a subject</option>
                    <option value="volunteer">Volunteer Inquiry</option>
                    <option value="training">Training Programs</option>
                    <option value="event">Event Standby Request</option>
                    <option value="donation">Donation Information</option>
                    <option value="general">General Question</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-navy-700 font-medium mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-navy-200 focus:border-rescue-orange focus:ring-2 focus:ring-rescue-orange/20 outline-none transition-all resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
                {formStatus === 'success' && (
                  <p className="text-green-600 text-center font-medium">
                    Thank you! Your message has been sent successfully.
                  </p>
                )}
                {formStatus === 'error' && (
                  <p className="text-red-600 text-center font-medium">
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="space-y-8">
              {/* Emergency Notice */}
              <div className="bg-rescue-red/10 border-l-4 border-rescue-red rounded-r-lg p-6">
                <h4 className="text-rescue-red font-bold text-lg mb-2">
                  Emergency?
                </h4>
                <p className="text-navy-700">
                  For all emergencies, please call <strong>911</strong> first.
                  Our team is dispatched through Pierce County Emergency
                  Management.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-rescue-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-rescue-orange"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-navy-900 font-bold text-lg">Phone</h4>
                    {/* TODO: Replace with real SAR phone number */}
                    <p className="text-navy-600">
                      <a href="tel:+12535550123" className="hover:text-rescue-orange transition-colors">(253) 555-0123</a>
                    </p>
                    <p className="text-navy-500 text-sm">
                      Non-emergency inquiries only
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-rescue-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-rescue-orange"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-navy-900 font-bold text-lg">Email</h4>
                    <p className="text-navy-600">
                      <a href="mailto:info@piercecounty4x4sar.org" className="hover:text-rescue-orange transition-colors">info@piercecounty4x4sar.org</a>
                    </p>
                    <p className="text-navy-500 text-sm">
                      We respond within 24-48 hours
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-rescue-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-rescue-orange"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-navy-900 font-bold text-lg">
                      Service Area
                    </h4>
                    <p className="text-navy-600">Pierce County, Washington</p>
                    <p className="text-navy-500 text-sm">
                      Including Mt. Rainier foothills region
                    </p>
                  </div>
                </div>
              </div>

              {/* Meeting Info */}
              <div className="bg-navy-900 rounded-2xl p-6 text-white">
                <h4 className="font-bold text-lg mb-3">Monthly Meetings</h4>
                <p className="text-navy-200 mb-4">
                  Join us for our monthly training meetings. New members and
                  interested volunteers are always welcome!
                </p>
                <div className="flex items-center space-x-2 text-rescue-orange">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-medium">
                    First Tuesday of every month, 7:00 PM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
