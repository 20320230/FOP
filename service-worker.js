const CACHE = 'isovolta-v1';
const PRECACHE = [
  'index.html',
  'manifest.json',
  'FORMAR AL PERSONAL.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE ? caches.delete(k) : null)))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(event.request);
    if (cached) return cached;
    try {
      const res = await fetch(event.request);
      cache.put(event.request, res.clone());   // cache runtime
      return res;
    } catch (err) {
      // Si estás offline y navegas, sirve tu pantalla principal o index
      if (event.request.mode === 'navigate') {
        return (await cache.match('FORMAR AL PERSONAL.html')) || (await cache.match('index.html'));
      }
      throw err;
    }
  })());
});
