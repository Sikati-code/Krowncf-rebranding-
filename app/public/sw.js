/* Krown Creative Factory service worker — offline shell + asset caching.
 * Bump VERSION to invalidate every cache on the next deploy. */
const VERSION = 'krown-v1';
const SHELL = `${VERSION}-shell`;
const RUNTIME = `${VERSION}-runtime`;
const IMAGES = `${VERSION}-images`;
const MAX_IMAGES = 80;

const PRECACHE = [
  '/',
  '/offline.html',
  '/manifest.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/assets/watermark-white.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(SHELL)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

async function trim(cacheName, max) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  for (let i = 0; i < keys.length - max; i++) await cache.delete(keys[i]);
}

// Pages: network first so deploys show up immediately; cached copy or the app
// shell when offline; branded offline page as a last resort.
async function handleNavigation(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const copy = response.clone();
      caches.open(RUNTIME).then((cache) => cache.put(request, copy));
    }
    return response;
  } catch {
    return (
      (await caches.match(request)) ||
      (await caches.match('/', { cacheName: SHELL })) ||
      (await caches.match('/offline.html'))
    );
  }
}

// Hashed build assets never change: cache first.
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) {
    const copy = response.clone();
    caches.open(RUNTIME).then((cache) => cache.put(request, copy));
  }
  return response;
}

// Images: serve cached, refresh in the background. Opaque (no-CORS) responses
// are never stored — browsers pad them to several MB each in the quota.
async function staleWhileRevalidate(request) {
  const cache = await caches.open(IMAGES);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((response) => {
      if (response.ok && response.type !== 'opaque') {
        cache.put(request, response.clone()).then(() => trim(IMAGES, MAX_IMAGES));
      }
      return response;
    })
    .catch(() => cached);
  return cached || network;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  if (request.mode === 'navigate') {
    if (url.origin === self.location.origin) event.respondWith(handleNavigation(request));
    return; // external links (wa.me, payment pages) go straight to the network
  }
  if (url.origin === self.location.origin && /^\/assets\/index-[\w-]+\.(js|css)$/.test(url.pathname)) {
    event.respondWith(cacheFirst(request));
    return;
  }
  if (request.destination === 'image') {
    event.respondWith(staleWhileRevalidate(request));
  }
  // Everything else (API calls, fetch() for downloads) passes through untouched.
});
