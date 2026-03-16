'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { scrollToSection } from '@/lib/scroll'
import {
  navigationItems,
  resolveNavigationHref,
} from '@/lib/navigation'

export default function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50)
          ticking = false
        })
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMobileMenuOpen])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  // Focus trap within mobile menu
  const handleMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !menuRef.current) return

    const focusable = menuRef.current.querySelectorAll<HTMLElement>('a, button')
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (!first || !last) return

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    scrollToSection(href)
    setIsMobileMenuOpen(false)
  }

  const logoHref = pathname === '/' ? '#hero' : '/'
  const isLogoScrollLink = logoHref.startsWith('#')

  return (
    <header
      className={`fixed top-8 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-navy-900/95 backdrop-blur-sm shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-custom mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a
            href={logoHref}
            onClick={isLogoScrollLink ? (e) => handleNavClick(e, logoHref) : undefined}
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-rescue-orange rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm md:text-base">4x4</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-bold text-lg">Pierce County</span>
              <span className="text-rescue-orange font-semibold text-sm block -mt-1">
                Search & Rescue
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item) => {
              const href = resolveNavigationHref(item, pathname)
              const isScrollLink = href.startsWith('#')

              return (
                <li key={item.name}>
                  <a
                    href={href}
                    onClick={isScrollLink ? (e) => handleNavClick(e, href) : undefined}
                    className="text-white hover:text-rescue-orange focus-visible:text-rescue-orange transition-colors duration-200 font-medium focus-visible:outline-none"
                  >
                    {item.name}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal={isMobileMenuOpen || undefined}
          aria-label="Navigation menu"
          inert={!isMobileMenuOpen ? true : undefined}
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
          }`}
          onKeyDown={isMobileMenuOpen ? handleMenuKeyDown : undefined}
        >
          <ul className="flex flex-col space-y-2 pt-4 border-t border-white/20">
            {navigationItems.map((item) => {
              const href = resolveNavigationHref(item, pathname)
              const isScrollLink = href.startsWith('#')

              return (
                <li key={item.name}>
                  <a
                    href={href}
                    onClick={isScrollLink ? (e) => handleNavClick(e, href) : undefined}
                    className="block text-white hover:text-rescue-orange transition-colors duration-200 font-medium py-2"
                  >
                    {item.name}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
    </header>
  )
}
