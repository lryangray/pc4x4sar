/**
 * Smoothly scroll to a section by selector (e.g., '#contact').
 * No-op if the element doesn't exist.
 */
export function scrollToSection(selector: string) {
  document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })
}

/**
 * Click handler factory for anchor elements that scroll to a section.
 * Prevents default navigation and scrolls smoothly.
 */
export function handleScrollClick(
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string
) {
  e.preventDefault()
  scrollToSection(href)
}
