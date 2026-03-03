'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop&q=75&fm=auto',
    alt: 'Mount Rainier with lake reflection - Pierce County iconic landmark',
    span: 'md:col-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1542332213-31f87348057f?w=400&h=400&fit=crop&q=75&fm=auto',
    alt: 'Pacific Northwest forest trail near Puyallup',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1509515837298-2c67a3933321?w=400&h=400&fit=crop&q=75&fm=auto',
    alt: 'Puget Sound waterfront - Tacoma service area',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop&q=75&fm=auto',
    alt: 'Dense forest terrain typical of Carbon River valley searches',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=600&h=400&fit=crop&q=75&fm=auto',
    alt: 'Mt. Rainier National Park wilderness where rescue operations occur',
    span: 'md:col-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=400&fit=crop&q=75&fm=auto',
    alt: 'Alpine terrain in the Mt. Rainier foothills',
    span: '',
  },
]

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
      if (typeof IntersectionObserver === 'undefined') {
        setIsVisible(true)
        return
      }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="section-padding bg-white"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-rescue-orange font-semibold text-sm uppercase tracking-wider">
            Our Work
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mt-2 mb-6">
            Photo Gallery
          </h2>
          <p className="text-navy-700 text-lg leading-relaxed">
            From the majestic slopes of Mt. Rainier to the forests of the Carbon River
            valley and the shores of Puget Sound, we&apos;re prepared to respond anywhere
            in Pierce County. These images showcase the diverse terrain our team trains for.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={image.src}
              className={`relative overflow-hidden rounded-xl ${
                image.span
              } aspect-square group cursor-pointer ${
                isVisible
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-95'
              }`}
              style={{
                transition: 'all 0.5s ease-out',
                transitionDelay: `${index * 75}ms`,
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/40 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm font-medium">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div
          className={`mt-12 text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          <p className="text-navy-600 mb-4">
            Follow us on social media for more photos and updates
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-navy-100 hover:bg-rescue-orange rounded-full flex items-center justify-center text-navy-700 hover:text-white transition-all duration-300"
              aria-label="Follow us on Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-navy-100 hover:bg-rescue-orange rounded-full flex items-center justify-center text-navy-700 hover:text-white transition-all duration-300"
              aria-label="Follow us on Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2.16c3.2,0,3.58,0,4.85.07,3.25.15,4.77,1.69,4.92,4.92.06,1.27.07,1.65.07,4.85s0,3.58-.07,4.85c-.15,3.23-1.66,4.77-4.92,4.92-1.27.06-1.65.07-4.85.07s-3.58,0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s0-3.58.07-4.85C2.38,3.92,3.9,2.38,7.15,2.23,8.42,2.18,8.8,2.16,12,2.16ZM12,0C8.74,0,8.33,0,7.05.07c-4.35.2-6.78,2.62-7,7C0,8.33,0,8.74,0,12s0,3.67.07,4.95c.2,4.36,2.62,6.78,7,7C8.33,24,8.74,24,12,24s3.67,0,4.95-.07c4.35-.2,6.78-2.62,7-7C24,15.67,24,15.26,24,12s0-3.67-.07-4.95c-.2-4.35-2.62-6.78-7-7C15.67,0,15.26,0,12,0Zm0,5.84A6.16,6.16,0,1,0,18.16,12,6.16,6.16,0,0,0,12,5.84ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16ZM18.41,4.15a1.44,1.44,0,1,0,1.44,1.44A1.44,1.44,0,0,0,18.41,4.15Z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-navy-100 hover:bg-rescue-orange rounded-full flex items-center justify-center text-navy-700 hover:text-white transition-all duration-300"
              aria-label="Follow us on Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.95,4.57a10,10,0,0,1-2.82.77,4.96,4.96,0,0,0,2.16-2.72,9.9,9.9,0,0,1-3.12,1.19,4.92,4.92,0,0,0-8.39,4.49A14,14,0,0,1,1.64,3.16,4.92,4.92,0,0,0,3.2,9.72,4.86,4.86,0,0,1,.96,9.11v.06a4.93,4.93,0,0,0,3.95,4.83,4.86,4.86,0,0,1-2.22.08,4.93,4.93,0,0,0,4.6,3.42A9.87,9.87,0,0,1,0,19.54a13.94,13.94,0,0,0,7.55,2.21A13.9,13.9,0,0,0,21.56,7.7c0-.21,0-.42,0-.63A10,10,0,0,0,24,4.59Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
