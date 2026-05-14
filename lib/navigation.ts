export type NavigationItem = {
  name: string
  /** Anchor on the home page. Omit for items that have no home-page section. */
  homeHash?: `#${string}`
  routePath?: `/${string}` | '/'
}

export const navigationItems: NavigationItem[] = [
  { name: 'Home', homeHash: '#hero', routePath: '/' },
  { name: 'Mission', homeHash: '#mission' },
  { name: 'Services', homeHash: '#services', routePath: '/services' },
  { name: 'Safety', homeHash: '#safety', routePath: '/safety' },
  { name: 'Partners', homeHash: '#partners' },
  { name: 'Sponsors', homeHash: '#sponsors' },
  { name: 'Gallery', homeHash: '#gallery' },
  { name: 'FAQ', homeHash: '#faq', routePath: '/faq' },
  { name: 'Volunteer', homeHash: '#volunteer', routePath: '/volunteer' },
  { name: 'Contact', homeHash: '#contact', routePath: '/contact' },
]

export function resolveNavigationHref(
  item: NavigationItem,
  pathname: string,
  preferRouteOnHome = false,
): string {
  if (pathname === '/') {
    if (preferRouteOnHome && item.routePath && item.routePath !== '/') {
      return item.routePath
    }
    if (item.homeHash) return item.homeHash
    if (item.routePath) return item.routePath
    return '/'
  }

  if (item.routePath && pathname === item.routePath && item.homeHash) {
    return item.homeHash
  }

  if (item.routePath) {
    return item.routePath
  }

  return item.homeHash ? `/${item.homeHash}` : '/'
}
