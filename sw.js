// Service worker de Karting League. VERSION la reescribe scripts/generate_app.py.
const VERSION = 'kl-0264031cb2';

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(['./', './index.html', './manifest.webmanifest', './img/logo.webp'])).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  // Solo borra cachés propias (kl-*): en GitHub Pages comparte dominio con Pitbike World.
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('kl-') && k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

// La página: primero la red (así los resultados nuevos se ven al momento), la caché si no hay cobertura.
// Imágenes y fuentes: primero la caché.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const esPagina = req.mode === 'navigate' || req.destination === 'document';
  if (esPagina) {
    e.respondWith(fetch(req.url, { cache: 'no-cache' }).then(r => { const copia = r.clone(); caches.open(VERSION).then(c => c.put(req, copia)); return r; })
      .catch(() => caches.match(req).then(r => r || caches.match('./index.html'))));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
    if (r.ok || r.type === 'opaque') { const copia = r.clone(); caches.open(VERSION).then(c => c.put(req, copia)); }
    return r;
  })));
});
