'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useScrollVisible } from '@/hooks/useScrollVisible'

const safetyTips = [
  {
    title: 'Tell Someone Your Plans',
    description: 'Always let a friend or family member know where you\'re going and when you expect to return.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    title: 'Carry the Ten Essentials',
    description: 'Navigation, sun protection, insulation, illumination, first-aid, fire, repair tools, nutrition, hydration, and emergency shelter.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
  },
  {
    title: 'Check Weather Conditions',
    description: 'Mountain weather changes rapidly. Check forecasts before heading out and be prepared to turn back.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
  {
    title: 'Know Your Limits',
    description: 'Choose trails and activities that match your fitness level and experience. It\'s okay to turn back.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Stay On Marked Trails',
    description: 'Going off-trail increases your risk of getting lost and makes it harder for rescuers to find you.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    title: 'Carry a Charged Phone',
    description: 'Keep your phone charged and consider a portable battery. Turn on location services in case of emergency.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
]

type Resource = { title: string; description: string; file: string; tag: string }

const guideCategories: Array<{
  heading: string
  subtitle: string
  columns: string
  items: Resource[]
}> = [
  {
    heading: 'Safety Guides',
    subtitle: 'In-depth guides to read before your trip.',
    columns: 'sm:grid-cols-2 lg:grid-cols-4',
    items: [
      { title: 'Trip Planning Checklist', description: 'Comprehensive pre-trip safety checklist.', file: '/guides/trip-planning-checklist.pdf', tag: 'Guide' },
      { title: 'Ten Essentials Guide', description: 'The 10 gear systems you should always carry.', file: '/guides/ten-essentials-guide.pdf', tag: 'Guide' },
      { title: 'Emergency Signal Guide', description: 'How to signal for help when lost or injured.', file: '/guides/emergency-signal-guide.pdf', tag: 'Guide' },
      { title: 'Tech Preparedness', description: 'Apps, offline maps, battery tips, satellite SOS.', file: '/guides/tech-preparedness-guide.pdf', tag: 'Guide' },
    ],
  },
  {
    heading: 'Activity Guides',
    subtitle: 'Safety tips specific to your activity in Pierce County.',
    columns: 'sm:grid-cols-2 lg:grid-cols-3',
    items: [
      { title: 'Hiking Safety', description: 'Trails, terrain, and hazards from sea level to Rainier.', file: '/guides/activity-hiking-safety.pdf', tag: 'Hiking' },
      { title: 'Offroad & 4x4 Safety', description: 'Vehicle prep, recovery, and trail etiquette.', file: '/guides/activity-offroad-safety.pdf', tag: '4x4' },
      { title: 'ATV, SxS & Dirt Bike', description: 'OHV laws, trail areas, and riding safety.', file: '/guides/activity-atv-sxs-safety.pdf', tag: 'OHV' },
      { title: 'Water Recreation', description: 'Kayaking, paddleboarding, boating, and cold water.', file: '/guides/activity-water-safety.pdf', tag: 'Water' },
      { title: 'Winter & Snowmobile', description: 'Avalanche, snowmobile, and snowshoe safety.', file: '/guides/activity-winter-safety.pdf', tag: 'Winter' },
      { title: 'Hunting & Fishing', description: 'Solo safety, backcountry risks, and game processing.', file: '/guides/activity-hunting-fishing-safety.pdf', tag: 'Hunting' },
    ],
  },
  {
    heading: 'Printable Field Cards',
    subtitle: 'One-page quick references. Print, laminate, keep in your pack.',
    columns: 'sm:grid-cols-2 lg:grid-cols-5',
    items: [
      { title: 'Trip Planning', description: 'Pre-trip checklist at a glance.', file: '/guides/field-card-trip-planning.pdf', tag: 'Card' },
      { title: 'Ten Essentials', description: 'Gear checklist for your pack.', file: '/guides/field-card-ten-essentials.pdf', tag: 'Card' },
      { title: 'Emergency Signals', description: 'S.T.O.P. and signaling reference.', file: '/guides/field-card-emergency-signals.pdf', tag: 'Card' },
      { title: 'Tech Prep', description: 'Apps, battery, and satellite SOS.', file: '/guides/field-card-tech-prep.pdf', tag: 'Card' },
      { title: 'Trip Plan Form', description: 'Leave with your emergency contact.', file: '/guides/trip-plan-form.pdf', tag: 'Form' },
    ],
  },
]

export default function SafetyResources({ preview }: { preview?: boolean }) {
  const { ref: sectionRef, isVisible } = useScrollVisible(0.1)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  return (
    <section
      id="safety"
      ref={sectionRef}
      aria-label="Safety Resources"
      className="section-padding bg-white"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-rescue-orange font-semibold text-sm uppercase tracking-wider">
            Stay Safe Outdoors
          </span>
          <h2 className="font-display uppercase tracking-wide text-4xl md:text-5xl lg:text-6xl text-navy-900 mt-2 mb-6">
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
              className={`flex items-start space-x-4 p-6 bg-navy-50 rounded-xl shadow-sm transition-all duration-500 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              } ${preview && index >= 3 ? 'hidden md:block' : ''}`}
              style={{ transitionDelay: `${Math.min(index * 75, 300)}ms` }}
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

        {preview && (
          <div className="md:hidden text-center mt-8 -mb-8">
            <Link
              href="/safety"
              className="inline-flex items-center gap-1.5 bg-rescue-orange/10 text-rescue-orange font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-rescue-orange/20 transition-colors"
            >
              All safety resources &amp; guides
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}

        {/* Downloadable Guides */}
        <div
          className={`bg-navy-900 rounded-2xl p-8 md:p-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          } ${preview ? 'hidden md:block' : ''}`}
          style={{ transitionDelay: '500ms' }}
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Free Safety Guides
            </h3>
            <p className="text-navy-200 max-w-2xl mx-auto">
              Download our guides and checklists to help you prepare for your next
              outdoor adventure in Pierce County. All free, all from our SAR team.
            </p>
          </div>

          {guideCategories.map((category, categoryIndex) => {
            const isOpen = expanded[category.heading] ?? false
            const panelId = `safety-guide-panel-${categoryIndex}`
            return (
              <div key={category.heading} className="mb-4">
                <button
                  onClick={() => setExpanded((prev) => ({ ...prev, [category.heading]: !prev[category.heading] }))}
                  className="w-full flex items-center justify-between bg-navy-800 hover:bg-navy-700 rounded-lg px-5 py-4 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <div className="text-left">
                    <h4 className="text-white font-semibold text-sm">{category.heading}</h4>
                    <p className="text-navy-400 text-xs">
                      {category.subtitle} <span className="text-navy-500">({category.items.length})</span>
                    </p>
                  </div>
                  <svg
                    className={`w-5 h-5 text-rescue-orange transition-transform duration-300 flex-shrink-0 ml-4 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  id={panelId}
                  role="region"
                  inert={!isOpen ? true : undefined}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[800px] opacity-100 mt-3' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className={`grid ${category.columns} gap-3`}>
                    {category.items.map((item) => (
                      <a
                        key={item.title}
                        href={item.file}
                        download
                        className="bg-navy-800 rounded-lg px-4 py-3 hover:bg-navy-700 transition-colors group block"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-semibold text-rescue-orange bg-rescue-orange/10 px-1.5 py-0.5 rounded">
                            {item.tag}
                          </span>
                          <svg
                            className="w-4 h-4 text-navy-400 group-hover:text-rescue-orange transition-colors"
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
                        <h4 className="font-bold text-white text-xs">{item.title}</h4>
                        <p className="text-navy-400 text-[10px]">{item.description}</p>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}

          {/* Optional outreach for seasonal safety content. Sends the user to
              the contact form with their email pre-filled in the message.
              Not a real mailing list — change to a real provider (Buttondown,
              Mailchimp, Cloudflare Mailing Lists) before promising "subscribe". */}
          <div className="border-t border-navy-700 pt-8 text-center">
            <p className="text-navy-200 mb-2">
              Want seasonal safety tips and guides?
            </p>
            <p className="text-navy-400 text-sm mb-5">
              Send your email and we&apos;ll reach out occasionally with useful
              outdoor safety content. No spam.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              onSubmit={(e) => {
                e.preventDefault()
                const form = e.target as HTMLFormElement
                const email = new FormData(form).get('email') as string
                if (email) {
                  const params = new URLSearchParams({
                    subject: 'general',
                    message: `I'd like to receive safety tips and guides. My email: ${email}`,
                  })
                  window.location.assign(`/contact?${params.toString()}`)
                }
              }}
            >
              <label htmlFor="safety-signup-email" className="sr-only">
                Email address
              </label>
              <input
                id="safety-signup-email"
                type="email"
                name="email"
                required
                placeholder="your@email.com"
                autoComplete="email"
                className="flex-1 px-4 py-3 rounded-lg bg-navy-800 border border-navy-600 text-white placeholder-navy-400 focus:border-rescue-orange focus:ring-2 focus:ring-rescue-orange/20 outline-none transition-all"
              />
              <button
                type="submit"
                className="btn-primary whitespace-nowrap"
              >
                Send Email
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
