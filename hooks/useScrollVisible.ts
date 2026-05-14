'use client'

import { useEffect, useRef, useState } from 'react'

type VisibilityCallback = () => void

type ObserverBucket = {
  callbacks: Map<Element, VisibilityCallback>
  observer: IntersectionObserver
}

const observerBuckets = new Map<number, ObserverBucket>()

function getObserverBucket(threshold: number) {
  const existingBucket = observerBuckets.get(threshold)
  if (existingBucket) {
    return existingBucket
  }

  const callbacks = new Map<Element, VisibilityCallback>()
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          continue
        }

        const callback = callbacks.get(entry.target)
        if (!callback) {
          continue
        }

        callback()
        callbacks.delete(entry.target)
        observer.unobserve(entry.target)
      }
    },
    { threshold }
  )

  const bucket = { callbacks, observer }
  observerBuckets.set(threshold, bucket)
  return bucket
}

/**
 * Returns a ref + isVisible flag for scroll-triggered animations.
 *
 * Always initializes isVisible=false to match SSR output (no IntersectionObserver
 * server-side). The effect then promotes to true immediately for reduced-motion
 * users or browsers without IntersectionObserver, or observes the element otherwise.
 */
export function useScrollVisible(threshold = 0.2) {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hasObserver = typeof IntersectionObserver !== 'undefined'

    if (!hasObserver || reducedMotion) {
      // Intentional: promoting from false→true on mount avoids the hydration
      // mismatch that occurs if we initialize state based on browser-only APIs.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(true)
      return
    }

    const element = ref.current
    if (!element) {
      return
    }

    const bucket = getObserverBucket(threshold)
    bucket.callbacks.set(element, () => setIsVisible(true))
    bucket.observer.observe(element)

    return () => {
      bucket.callbacks.delete(element)
      bucket.observer.unobserve(element)
    }
  }, [threshold])

  return { ref, isVisible }
}
