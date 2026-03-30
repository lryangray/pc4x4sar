'use client'

import { useState } from 'react'
import Image from 'next/image'
import { handleScrollClick } from '@/lib/scroll'

export default function Hero() {
  const [heroImageFailed, setHeroImageFailed] = useState(false)

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-8 bg-noise"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-navy-900">
        {!heroImageFailed && (
          <Image
            src="/images/hero-jeep-rainier.jpg"
            alt="Pierce County 4x4 Search and Rescue Jeep with Mt. Rainier in the background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            onError={() => setHeroImageFailed(true)}
          />
        )}
        {/* Dark Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-900/70 to-navy-950/90 ${
            heroImageFailed
              ? 'bg-[radial-gradient(circle_at_top,_rgba(255,107,53,0.25),_rgba(10,22,40,0.95)_55%)]'
              : ''
          }`}
        />
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

          <h1 className="font-display uppercase tracking-wide text-5xl md:text-7xl lg:text-8xl text-white mb-6 text-shadow leading-none">
            Pierce County 4x4
            <span className="block text-rescue-orange">Search & Rescue</span>
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
              onClick={(e) => handleScrollClick(e, "#contact")}
              className="btn-primary text-lg"
            >
              Get In Touch <span className="btn-arrow">→</span>
            </a>
            <a
              href="#mission"
              onClick={(e) => handleScrollClick(e, "#mission")}
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
          onClick={(e) => handleScrollClick(e, "#mission")}
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
