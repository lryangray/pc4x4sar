export type NavigationItem = {
  name: string
  homeHash: `#${string}`
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
  preferRouteOnHome = false
) {
  if (pathname === '/') {
    if (preferRouteOnHome && item.routePath && item.routePath !== '/') {
      return item.routePath
    }

    return item.homeHash
  }

  if (item.routePath && pathname === item.routePath) {
    return item.homeHash
  }

  if (item.routePath) {
    return item.routePath
  }

  return `/${item.homeHash}`
}
