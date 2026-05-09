const CACHE_NAME = 'jigyasa-pwa-v1'

const APP_SHELL = [
  '/',
  '/courses/',
  '/contact/',
  '/manifest.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/maskable-512.png',
  '/images/logo-transparent.png',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
      )
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event

  if (request.method !== 'GET') {
    return
  }

  const url = new URL(request.url)

  if (url.origin !== self.location.origin) {
    return
  }

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request))
    return
  }

  if (isStaticAsset(request)) {
    event.respondWith(cacheFirst(request))
  }
})

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME)

  try {
    const response = await fetch(request)
    cache.put(request, response.clone())
    return response
  } catch {
    return (await cache.match(request)) || cache.match('/')
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME)
  const cached = await cache.match(request)

  if (cached) {
    return cached
  }

  const response = await fetch(request)
  cache.put(request, response.clone())
  return response
}

function isStaticAsset(request) {
  return ['script', 'style', 'image', 'font'].includes(request.destination)
}
