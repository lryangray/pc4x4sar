'use client'

import Image from 'next/image'
import { useScrollVisible } from '@/hooks/useScrollVisible'

export default function Mission() {
  const { ref: sectionRef, isVisible } = useScrollVisible()

  return (
    <section
      id="mission"
      ref={sectionRef}
      aria-label="Our Mission"
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
              src="/images/mission-mountain-lookout.jpg"
              alt="Two SAR members scanning misty mountain valley with binoculars during a search"
              fill
              loading="lazy"
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="bg-rescue-orange text-white text-sm font-semibold px-4 py-2 rounded-full">
                Serving Since 1984
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
            <h2 className="font-display uppercase tracking-wide text-4xl md:text-5xl lg:text-6xl text-navy-900 mt-2 mb-6">
              Saving Lives Through Dedication & Expertise
            </h2>
            <div className="space-y-4 text-navy-700 text-lg leading-relaxed">
              <p>
                We are an all-volunteer mobile search and rescue unit based in
                Pierce County, Washington. With a sea level coastline and the
                highest point in the state, we cover a diversity of urban, rural,
                and true wilderness across 1,800 square miles. We volunteer under
                the direction of the Pierce County Sheriff&apos;s Department, but are
                available to respond by request to any other county in the state.
              </p>
              <p>
                PCSAR4X4 was formed in 1984 by members of ground SAR who
                recognized the need for a transportation and mobile SAR resource.
                Since formation, we&apos;ve evolved skills and techniques, expanded
                duties, and branched out our mobility. In recent years we&apos;ve expanded
                beyond traditional street-legal four-wheel drive vehicles to include
                ATV/UTV, dual sport motorcycles, snowmobiles, and a SnoCat.
              </p>
              <p>
                Beyond search and rescue, we actively support Pierce County
                Emergency Management with logistical support when needs arise.
                As a non-profit 501(c)(3), our funding comes from donations,
                grants, and our membership. We do not charge for our services,
                nor do we receive tax dollars.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
