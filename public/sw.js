const CACHE_NAME = 'pc4x4sar-static-v2'

const PRECACHE_URLS = [
  '/logo.svg',
]

const CACHEABLE_ASSET_PATTERN = /\.(?:css|js|woff2?|png|jpe?g|svg|ico|webp)$/i

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)

  if (
    event.request.method !== 'GET'
    || url.origin !== self.location.origin
    || event.request.mode === 'navigate'
    || url.pathname.startsWith('/api/')
  ) {
    return
  }

  const isCacheableAsset =
    url.pathname.startsWith('/_next/static/')
    || CACHEABLE_ASSET_PATTERN.test(url.pathname)

  if (!isCacheableAsset) {
    return
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cachedResponse = await cache.match(event.request)
      const networkResponsePromise = fetch(event.request).then((response) => {
        if (response.ok) {
          void cache.put(event.request, response.clone())
        }
        return response
      })

      if (cachedResponse) {
        void event.waitUntil(networkResponsePromise)
        return cachedResponse
      }

      return networkResponsePromise
    })
  )
})
