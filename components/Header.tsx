'use client'

import { useState, useEffect } from 'react'

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'Mission', href: '#mission' },
  { name: 'Services', href: '#services' },
  { name: 'Safety', href: '#safety' },
  { name: 'Partners', href: '#partners' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Contact', href: '#contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

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
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
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
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-white hover:text-rescue-orange transition-colors duration-200 font-medium"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
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
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
          }`}
        >
          <ul className="flex flex-col space-y-2 pt-4 border-t border-white/20">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="block text-white hover:text-rescue-orange transition-colors duration-200 font-medium py-2"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}
