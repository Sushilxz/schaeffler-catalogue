self.addEventListener('install', e => {
  console.log('[SW] Installing');
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  console.log('[SW] Activated');
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .then(r => {
        if (r.ok) {
          return caches.open('v1').then(cache => {
            cache.put(e.request, r.clone());
            return r;
          });
        }
        return r;
      })
      .catch(() => caches.match(e.request).then(r => r || new Response('Offline', {status: 503})))
  );
});
