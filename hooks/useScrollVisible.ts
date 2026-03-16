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
 * Custom hook for scroll-triggered visibility animations.
 * Returns a ref to attach to the target element and a boolean
 * indicating whether the element has scrolled into view.
 *
 * Falls back to visible=true if IntersectionObserver is unavailable.
 */
export function useScrollVisible(threshold = 0.2) {
  const ref = useRef<HTMLElement>(null)
  const supportsObserver = typeof window !== 'undefined'
    && typeof IntersectionObserver !== 'undefined'
  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [isVisible, setIsVisible] = useState(!supportsObserver || prefersReducedMotion)

  useEffect(() => {
    if (!supportsObserver || prefersReducedMotion || isVisible || !ref.current) {
      return
    }

    const element = ref.current
    const bucket = getObserverBucket(threshold)
    bucket.callbacks.set(element, () => setIsVisible(true))
    bucket.observer.observe(element)

    return () => {
      bucket.callbacks.delete(element)
      bucket.observer.unobserve(element)
    }
  }, [threshold, supportsObserver, prefersReducedMotion, isVisible])

  return { ref, isVisible }
}
