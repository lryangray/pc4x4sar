'use client'

import Image from 'next/image'

export default function Hero() {
  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleScrollToMission = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.querySelector('#mission')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-8"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=1920&h=1080&fit=crop"
          alt="Rugged mountain terrain representing search and rescue operations"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-900/70 to-navy-950/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 md:px-8 max-w-5xl mx-auto">
        <div className="animate-fade-in-up">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <span className="inline-block bg-rescue-orange/90 text-white text-sm font-semibold px-4 py-2 rounded-full">
              100% Volunteer
            </span>
            <span className="inline-block bg-white/10 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full border border-white/20">
              24/7/365 Ready to Respond
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 text-shadow leading-tight">
            Pierce County
            <span className="block text-rescue-orange">4x4 Search & Rescue</span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-4 max-w-3xl mx-auto leading-relaxed">
            Dedicated volunteers providing professional search and rescue services
            across Pierce County, Washington. Ready to respond when you need us most.
          </p>

          <p className="text-base md:text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            Working alongside Pierce County Sheriff&apos;s Department, Tacoma Police Department,
            and Pierce County Emergency Management.
            <span className="block mt-2 text-rescue-orange font-semibold">
              All services provided free of charge.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              onClick={handleScrollToContact}
              className="btn-primary text-lg"
            >
              Get In Touch
            </a>
            <a
              href="#mission"
              onClick={handleScrollToMission}
              className="btn-secondary text-lg"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <a
          href="#mission"
          onClick={handleScrollToMission}
          className="text-white/80 hover:text-white transition-colors"
          aria-label="Scroll to mission section"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      </div>
    </section>
  )
}
