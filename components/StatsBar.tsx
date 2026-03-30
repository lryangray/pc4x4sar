'use client'

import { useEffect, useState, useRef } from 'react'
import { useScrollVisible } from '@/hooks/useScrollVisible'

function useCountUp(target: number, isVisible: boolean, duration = 2000) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return
    hasAnimated.current = true

    const start = performance.now()
    function animate(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isVisible, target, duration])

  return count
}

function StatItem({ value, suffix, label, isVisible }: {
  value: number
  suffix: string
  label: string
  isVisible: boolean
}) {
  const count = useCountUp(value, isVisible)

  return (
    <div className="text-center" aria-label={`${value}${suffix} ${label}`}>
      <span className="block text-4xl md:text-5xl lg:text-6xl font-bold text-white" aria-hidden="true">
        {count}{suffix}
      </span>
      <span className="text-rescue-orange font-semibold text-sm md:text-base mt-2 block">
        {label}
      </span>
    </div>
  )
}

export default function StatsBar() {
  const { ref: sectionRef, isVisible } = useScrollVisible(0.3)
  const yearsOfService = new Date().getFullYear() - 1984
  const statsWithYears = [
    { value: 40, suffix: '+', label: 'Active Members' },
    { value: 40, suffix: '+', label: 'Annual Missions' },
    { value: yearsOfService, suffix: '', label: 'Years of Service' },
    { value: 24, suffix: '/7', label: 'Availability' },
  ]

  return (
    <section
      ref={sectionRef}
      aria-label="Impact Statistics"
      className="section-padding bg-navy-900"
    >
      <div className="max-w-5xl mx-auto">
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {statsWithYears.map((stat) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
