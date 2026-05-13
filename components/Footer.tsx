'use client'

import { handleScrollClick } from '@/lib/scroll'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import {
  navigationItems,
  resolveNavigationHref,
} from '@/lib/navigation'

export default function Footer() {
  const pathname = usePathname()
  const currentYear = new Date().getFullYear()
  const capabilitiesHref = pathname === '/' ? '#capabilities' : '/#capabilities'
  const isCapabilitiesScrollLink = capabilitiesHref.startsWith('#')

  return (
    <footer className="bg-navy-950 text-white bg-noise">
      <div className="container-custom section-padding pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-12 h-12 relative flex-shrink-0">
                <div className="absolute inset-[6%] rounded-full bg-white/90" />
                <Image
                  src="/images/logo-4x4-unit.png"
                  alt="Pierce County 4x4 Search and Rescue unit badge"
                  fill
                  className="object-contain relative"
                  sizes="48px"
                />
              </div>
              <div className="text-center">
                <span className="font-bold text-xl block">Pierce County 4x4</span>
                <span className="text-rescue-orange font-semibold text-sm block">
                  Search & Rescue
                </span>
              </div>
            </div>
            <p className="text-navy-300 max-w-md leading-relaxed mb-4">
              100% volunteer. 100% free. Available 24/7/365 to respond when our
              community needs us. Working alongside Pierce County Sheriff&apos;s Department,
              Tacoma Police Department, and Pierce County Emergency Management.
            </p>
            <p className="text-rescue-orange font-semibold text-sm mb-6">
              All rescue services provided at no charge.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/PierceCounty4x4SAR"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-navy-800 hover:bg-rescue-orange rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/piercecounty4x4searchandrescue/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-navy-800 hover:bg-rescue-orange rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2.16c3.2,0,3.58,0,4.85.07,3.25.15,4.77,1.69,4.92,4.92.06,1.27.07,1.65.07,4.85s0,3.58-.07,4.85c-.15,3.23-1.66,4.77-4.92,4.92-1.27.06-1.65.07-4.85.07s-3.58,0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s0-3.58.07-4.85C2.38,3.92,3.9,2.38,7.15,2.23,8.42,2.18,8.8,2.16,12,2.16ZM12,0C8.74,0,8.33,0,7.05.07c-4.35.2-6.78,2.62-7,7C0,8.33,0,8.74,0,12s0,3.67.07,4.95c.2,4.36,2.62,6.78,7,7C8.33,24,8.74,24,12,24s3.67,0,4.95-.07c4.35-.2,6.78-2.62,7-7C24,15.67,24,15.26,24,12s0-3.67-.07-4.95c-.2-4.35-2.62-6.78-7-7C15.67,0,15.26,0,12,0Zm0,5.84A6.16,6.16,0,1,0,18.16,12,6.16,6.16,0,0,0,12,5.84ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16ZM18.41,4.15a1.44,1.44,0,1,0,1.44,1.44A1.44,1.44,0,0,0,18.41,4.15Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {navigationItems.map((link) => {
                const href = resolveNavigationHref(link, pathname, true)
                const isScrollLink = href.startsWith('#')

                return (
                  <li key={link.name}>
                    <a
                      href={href}
                      onClick={isScrollLink ? (e) => handleScrollClick(e, href) : undefined}
                      className="text-navy-300 hover:text-rescue-orange transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                )
              })}
              <li>
                <a
                  href={capabilitiesHref}
                  onClick={isCapabilitiesScrollLink ? (e) => handleScrollClick(e, capabilitiesHref) : undefined}
                  className="text-navy-300 hover:text-rescue-orange transition-colors duration-200"
                >
                  Capabilities
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <ul className="space-y-3 text-navy-300">
              <li className="flex items-start space-x-3">
                <svg
                  className="w-5 h-5 text-rescue-orange mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>pcsar4x4@gmail.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <svg
                  className="w-5 h-5 text-rescue-orange mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Pierce County, WA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-navy-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-navy-400 text-sm">
              &copy; {currentYear} Pierce County 4x4 Search and Rescue. All
              rights reserved.
            </p>
            <p className="text-navy-400 text-sm">
              A 501(c)(3) non-profit volunteer organization
            </p>
          </div>
          {/* TODO: convert to a real link once pc4x4sar.org goes live. */}
          <p className="text-center text-navy-500 text-xs mt-6">
            Coming soon to a shorter address —{' '}
            <span className="font-medium text-navy-300">pc4x4sar.org</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
