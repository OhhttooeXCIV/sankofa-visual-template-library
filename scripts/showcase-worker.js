// BUILD is supplied by Vite from the generated public assets.
const cacheName = 'sankofa-library:' + BUILD.version;
const scope = new URL(self.registration.scope);
const cacheURLs = new Set(BUILD.paths.map((path) => new URL(path, scope).href));
const index = new URL('index.html', scope).href;

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(cacheName).then((cache) =>
    cache.addAll([...cacheURLs].map((url) => new Request(url, { cache: 'reload' })))));
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key.startsWith('sankofa-library:') && key !== cacheName)
      .map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== scope.origin) return;
  if (request.mode === 'navigate' && url.pathname === scope.pathname) {
    // Serve a coherent document and asset version while this worker controls the page.
    event.respondWith(caches.open(cacheName).then(async (cache) => (await cache.match(index)) || fetch(request)));
  } else if (cacheURLs.has(url.href)) {
    event.respondWith(caches.open(cacheName).then(async (cache) => (await cache.match(url.href)) || fetch(request)));
  }
});
