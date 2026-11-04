/* Client Timesheet service worker: keeps the app's own files on the phone so it
   opens without internet. It never touches the timesheet entries, which live in
   the browser's local storage on this phone. Bump VERSION when files change. */
const VERSION = 'timesheet-v2';
const FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png',
  './fonts/fraunces-latin-500-normal.woff2',
  './fonts/fraunces-latin-600-normal.woff2',
  './fonts/ibm-plex-sans-latin-400-normal.woff2',
  './fonts/ibm-plex-sans-latin-500-normal.woff2',
  './fonts/ibm-plex-sans-latin-600-normal.woff2',
  './fonts/ibm-plex-mono-latin-500-normal.woff2',
  './fonts/ibm-plex-mono-latin-600-normal.woff2',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(VERSION).then((cache) => cache.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Open instantly from the saved copy, and quietly refresh that copy when online,
   so updates show up the next time the app is opened. */
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  const key = req.mode === 'navigate' ? './index.html' : req;
  event.respondWith(
    caches.open(VERSION).then(async (cache) => {
      const cached = await cache.match(key, { ignoreSearch: true });
      const fresh = fetch(req)
        .then((res) => { if (res && res.ok) cache.put(key, res.clone()); return res; })
        .catch(() => null);
      if (cached) { event.waitUntil(fresh); return cached; }
      const res = await fresh;
      return res || new Response('Offline', { status: 503, statusText: 'Offline' });
    })
  );
});
