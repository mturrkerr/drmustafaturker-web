// Göğüs Cerrahisi uygulaması: çevrimdışı çalışma.
// Önce internetten güncel hali alınır; internet yoksa son kaydedilen sürüm gösterilir.
// Pediatri bölümü (/pediatri/) kendi uygulaması ve önbelleğiyle ayrı çalışır.
const CACHE = 'gogus-cerrahisi-v1';
const FILES = ['/', '/pnomotoraks.html', '/akciger-grafileri.html', '/manifest.webmanifest',
  '/images/pnomotoraks-1.jpg', '/images/pnomotoraks-1-isaretli.jpg', '/icons/icon-192.png', '/icons/apple-touch-icon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('gogus-cerrahisi-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin || url.pathname.startsWith('/pediatri')) return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
        }
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }).then((r) => r || (e.request.mode === 'navigate' ? caches.match('/') : undefined)))
  );
});
