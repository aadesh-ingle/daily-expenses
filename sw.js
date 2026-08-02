const CACHE_NAME = 'daily-expenses-5a97ddef1e17';
const APP_SCOPE = '/daily-expenses/';
const APP_SHELL = '/daily-expenses/index.html';
const PRECACHE_URLS = [
  "/daily-expenses/404.html",
  "/daily-expenses/app-icon.svg",
  "/daily-expenses/apple-touch-icon.png",
  "/daily-expenses/assets/index-BZKFL18d.js",
  "/daily-expenses/assets/index-DQjy4_fc.css",
  "/daily-expenses/assets/manrope-cyrillic-wght-normal-Dvxsihut.woff2",
  "/daily-expenses/assets/manrope-greek-wght-normal-DL7QRZyv.woff2",
  "/daily-expenses/assets/manrope-latin-ext-wght-normal-Ch3YOpNY.woff2",
  "/daily-expenses/assets/manrope-latin-wght-normal-DHIcAJRg.woff2",
  "/daily-expenses/assets/manrope-vietnamese-wght-normal-usUDDRr7.woff2",
  "/daily-expenses/assets/pdf-B8gDP5VY.js",
  "/daily-expenses/assets/pdf.worker-CPbhI6B3.mjs",
  "/daily-expenses/assets/src-DSkL1PKb.js",
  "/daily-expenses/dashboard/index.html",
  "/daily-expenses/favicon-32.png",
  "/daily-expenses/fonts/inter-variable.woff2",
  "/daily-expenses/history/index.html",
  "/daily-expenses/index.html",
  "/daily-expenses/manifest.webmanifest",
  "/daily-expenses/pwa-192.png",
  "/daily-expenses/pwa-512.png",
  "/daily-expenses/quick-add/index.html",
  "/daily-expenses/robots.txt",
  "/daily-expenses/settings/index.html",
  "/daily-expenses/setup/index.html",
  "/daily-expenses/tesseract/core/index.js",
  "/daily-expenses/tesseract/core/package.json",
  "/daily-expenses/tesseract/core/tesseract-core-lstm.js",
  "/daily-expenses/tesseract/core/tesseract-core-lstm.wasm",
  "/daily-expenses/tesseract/core/tesseract-core-lstm.wasm.js",
  "/daily-expenses/tesseract/core/tesseract-core-relaxedsimd-lstm.js",
  "/daily-expenses/tesseract/core/tesseract-core-relaxedsimd-lstm.wasm",
  "/daily-expenses/tesseract/core/tesseract-core-relaxedsimd-lstm.wasm.js",
  "/daily-expenses/tesseract/core/tesseract-core-relaxedsimd.js",
  "/daily-expenses/tesseract/core/tesseract-core-relaxedsimd.wasm",
  "/daily-expenses/tesseract/core/tesseract-core-relaxedsimd.wasm.js",
  "/daily-expenses/tesseract/core/tesseract-core-simd-lstm.js",
  "/daily-expenses/tesseract/core/tesseract-core-simd-lstm.wasm",
  "/daily-expenses/tesseract/core/tesseract-core-simd-lstm.wasm.js",
  "/daily-expenses/tesseract/core/tesseract-core-simd.js",
  "/daily-expenses/tesseract/core/tesseract-core-simd.wasm",
  "/daily-expenses/tesseract/core/tesseract-core-simd.wasm.js",
  "/daily-expenses/tesseract/core/tesseract-core.js",
  "/daily-expenses/tesseract/core/tesseract-core.wasm",
  "/daily-expenses/tesseract/core/tesseract-core.wasm.js",
  "/daily-expenses/tesseract/lang/eng.traineddata.gz",
  "/daily-expenses/tesseract/worker.min.js"
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS)));
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => Promise.all(cacheNames.filter(cacheName => cacheName.startsWith('daily-expenses-') && cacheName !== CACHE_NAME).map(cacheName => caches.delete(cacheName))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(APP_SCOPE)) {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(() => caches.match(request).then(response => response || caches.match(APP_SHELL))));
    return;
  }

  event.respondWith(
    caches.match(request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).then(networkResponse => {
        if (networkResponse.ok) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, responseToCache));
        }
        return networkResponse;
      });
    }),
  );
});
