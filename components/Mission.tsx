'use client'

import Image from 'next/image'
import { useScrollVisible } from '@/hooks/useScrollVisible'

export default function Mission() {
  const { ref: sectionRef, isVisible } = useScrollVisible()

  return (
    <section
      id="mission"
      ref={sectionRef}
      className="section-padding bg-white"
    >
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div
            className={`relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <Image
              src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=600&fit=crop&q=75&fm=auto"
              alt="Search and rescue team members preparing for a mission"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="bg-rescue-orange text-white text-sm font-semibold px-4 py-2 rounded-full">
                Serving Since 1985
              </span>
            </div>
          </div>

          {/* Content */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <span className="text-rescue-orange font-semibold text-sm uppercase tracking-wider">
              Our Mission
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mt-2 mb-6">
              Saving Lives Through Dedication & Expertise
            </h2>
            <div className="space-y-4 text-navy-700 text-lg leading-relaxed">
              <p>
                Pierce County 4x4 Search and Rescue is a volunteer organization
                committed to providing professional emergency search and rescue
                services throughout Pierce County, Washington. From the urban areas of
                Tacoma, Lakewood, and Puyallup to the rugged wilderness of the
                Mt. Rainier foothills, our team stands ready 24/7/365 to respond.
              </p>
              <p>
                Founded nearly four decades ago, we&apos;ve grown into a highly skilled
                unit equipped with specialized 4x4 vehicles capable of reaching
                the remote backcountry terrain of the Carbon River valley, Buckley,
                Orting, and surrounding wilderness areas. Our members undergo rigorous
                training in wilderness navigation, technical rescue, emergency
                medical response, and incident command.
              </p>
              <p>
                We work closely with the Pierce County Sheriff&apos;s Department,
                Tacoma Police Department, and Pierce County Department of Emergency
                Management to ensure coordinated and effective rescue operations
                across our service area.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-gray-200">
              <div className="text-center">
                <span className="block text-3xl md:text-4xl font-bold text-rescue-orange">
                  40+
                </span>
                <span className="text-navy-600 text-sm">Active Members</span>
              </div>
              <div className="text-center">
                <span className="block text-3xl md:text-4xl font-bold text-rescue-orange">
                  200+
                </span>
                <span className="text-navy-600 text-sm">Annual Missions</span>
              </div>
              <div className="text-center">
                <span className="block text-3xl md:text-4xl font-bold text-rescue-orange">
                  39
                </span>
                <span className="text-navy-600 text-sm">Years of Service</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
