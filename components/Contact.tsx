'use client'

import { useState, useEffect, useRef } from 'react'
import { useScrollVisible } from '@/hooks/useScrollVisible'

const SUBJECT_OPTIONS = [
  { value: 'volunteer', label: 'Volunteer Inquiry' },
  { value: 'training', label: 'Training Programs' },
  { value: 'event', label: 'Event Standby Request' },
  { value: 'donation', label: 'Donation Information' },
  { value: 'general', label: 'General Question' },
] as const

const ALLOWED_SUBJECTS = new Set(SUBJECT_OPTIONS.map((option) => option.value))
const MAX_NAME_LENGTH = 80
const MAX_EMAIL_LENGTH = 254
const MAX_MESSAGE_LENGTH = 2000

function sanitizePrefillMessage(value: string | null) {
  return typeof value === 'string'
    ? value.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '').trim().slice(0, MAX_MESSAGE_LENGTH)
    : ''
}

function normalizeSubject(value: string | null) {
  return value && SUBJECT_OPTIONS.some((option) => option.value === value) ? value : ''
}

export default function Contact() {
  const { ref: sectionRef, isVisible } = useScrollVisible(0.1)
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formMessage, setFormMessage] = useState('')
  const subjectRef = useRef<HTMLSelectElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const url = new URL(window.location.href)
    const params =
      url.pathname === '/contact'
        ? url.searchParams
        : url.hash.startsWith('#contact?')
          ? new URLSearchParams(url.hash.replace('#contact?', ''))
          : null

    if (!params) {
      return
    }

    const subject = normalizeSubject(params.get('subject'))
    const message = sanitizePrefillMessage(params.get('message'))

    if (subjectRef.current && subject) {
      subjectRef.current.value = subject
    }

    if (messageRef.current && message) {
      messageRef.current.value = message
    }

    if (url.pathname === '/contact') {
      window.history.replaceState({}, '', '/contact')
    } else if (url.hash.startsWith('#contact?')) {
      window.history.replaceState({}, '', `${url.pathname}${url.search}#contact`)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus('submitting')
    setFormMessage('')

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      })

      const payload = (await response.json().catch(() => null)) as
        | { message?: string; error?: string }
        | null

      if (response.ok) {
        setFormStatus('success')
        setFormMessage(payload?.message || 'Thank you! Your message has been sent successfully.')
        form.reset()
        if (subjectRef.current) subjectRef.current.value = ''
        if (messageRef.current) messageRef.current.value = ''
        setTimeout(() => {
          setFormStatus('idle')
          setFormMessage('')
        }, 5000)
      } else {
        setFormStatus('error')
        setFormMessage(payload?.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('[Contact] Failed to submit form', error)
      setFormStatus('error')
      setFormMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-label="Contact Us"
      className="section-padding bg-white"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-rescue-orange font-semibold text-sm uppercase tracking-wider">
            Get In Touch
          </span>
          <h2 className="font-display uppercase tracking-wide text-4xl md:text-5xl lg:text-6xl text-navy-900 mt-2 mb-6">
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
                      First Name <span className="text-rescue-red" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      maxLength={MAX_NAME_LENGTH}
                      autoComplete="given-name"
                      className="w-full px-4 py-3 rounded-lg border border-navy-200 focus:border-rescue-orange focus:ring-2 focus:ring-rescue-orange/20 outline-none transition-all"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-navy-700 font-medium mb-2"
                    >
                      Last Name <span className="text-rescue-red" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      maxLength={MAX_NAME_LENGTH}
                      autoComplete="family-name"
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
                    Email Address <span className="text-rescue-red" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    maxLength={MAX_EMAIL_LENGTH}
                    autoComplete="email"
                    className="w-full px-4 py-3 rounded-lg border border-navy-200 focus:border-rescue-orange focus:ring-2 focus:ring-rescue-orange/20 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-navy-700 font-medium mb-2"
                  >
                    Subject <span className="text-rescue-red" aria-hidden="true">*</span>
                  </label>
                  <select
                    ref={subjectRef}
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-navy-200 focus:border-rescue-orange focus:ring-2 focus:ring-rescue-orange/20 outline-none transition-all"
                  >
                    <option value="">Select a subject</option>
                    {SUBJECT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-navy-700 font-medium mb-2"
                  >
                    Message <span className="text-rescue-red" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    ref={messageRef}
                    id="message"
                    name="message"
                    required
                    rows={5}
                    maxLength={MAX_MESSAGE_LENGTH}
                    className="w-full px-4 py-3 rounded-lg border border-navy-200 focus:border-rescue-orange focus:ring-2 focus:ring-rescue-orange/20 outline-none transition-all resize-none"
                    placeholder="Tell us how we can help..."
                  />
                  <p className="mt-2 text-xs text-navy-500">
                    For privacy, please avoid including sensitive medical or emergency
                    details in this form.
                  </p>
                </div>
                {/* Honeypot field — hidden from humans, filled by bots */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  aria-hidden="true"
                  autoComplete="off"
                  className="absolute opacity-0 pointer-events-none h-0 w-0"
                />
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  aria-busy={formStatus === 'submitting'}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {formStatus === 'submitting' && (
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  )}
                  {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
                {formStatus === 'success' && (
                  <p role="status" aria-live="polite" className="text-green-600 text-center font-medium">
                    {formMessage}
                  </p>
                )}
                {formStatus === 'error' && (
                  <p role="alert" className="text-red-600 text-center font-medium">
                    {formMessage}
                  </p>
                )}
                <p className="text-xs text-navy-500 text-center leading-relaxed">
                  Contact submissions are retained for up to 90 days. For emergencies or
                  time-sensitive incidents, call <strong>911</strong>.
                </p>
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
                      aria-hidden="true"
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
                      <a href="mailto:pcsar4x4@gmail.com" className="hover:text-rescue-orange transition-colors">pcsar4x4@gmail.com</a>
                    </p>
                    <p className="text-navy-500 text-sm">
                      Use this form for non-emergency questions and requests.
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
                      aria-hidden="true"
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
                  Join us for our general meeting. You&apos;ll have the opportunity
                  to meet the members, hear about current activities, and learn
                  about the opportunities ahead. New members and interested
                  volunteers are always welcome!
                </p>
                <div className="flex items-center space-x-2 text-rescue-orange mb-3">
                  <svg
                    className="w-5 h-5 flex-shrink-0"
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
                    Second Wednesday of every month, 7:00 PM
                  </span>
                </div>
                <div className="flex items-start space-x-2 text-navy-200 text-sm">
                  <svg
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
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
                  <span>
                    Pierce County Dept. of Emergency Management<br />
                    2501 S. 35th St. Suite D<br />
                    Tacoma, WA 98409
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
