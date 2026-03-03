'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Custom hook for scroll-triggered visibility animations.
 * Returns a ref to attach to the target element and a boolean
 * indicating whether the element has scrolled into view.
 *
 * Falls back to visible=true if IntersectionObserver is unavailable.
 */
export function useScrollVisible(threshold = 0.2) {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}
