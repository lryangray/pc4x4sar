const CACHE_NAME = 'pc4x4sar-v1'

// Core pages and assets to cache on install
const PRECACHE_URLS = [
  '/',
  '/404.html',
  '/logo.svg',
]

// Install: precache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  )
  self.skipWaiting()
})

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  )
  self.clients.claim()
})

// Fetch: network-first for pages, cache-first for static assets
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)

  // Skip non-GET and cross-origin requests
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return

  // Static assets: cache-first
  if (url.pathname.match(/\.(js|css|woff2?|png|jpg|jpeg|svg|ico|webp)$/) || url.pathname.startsWith('/_next/static/')) {
    event.respondWith(
      caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
        const clone = response.clone()
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone))
        return response
      }))
    )
    return
  }

  // Pages: network-first, fall back to cache
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone()
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone))
        return response
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match('/')))
  )
})
