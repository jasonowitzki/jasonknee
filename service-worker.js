const CACHE_NAME = 'jn-cache-v1';
const OFFLINE_URLS = [
  './',
  './index.html',
  './manifest.json'
  // icons if you add them: './icon-192.png','./icon-512.png'
];

self.addEventListener('install', event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(OFFLINE_URLS)));
  self.skipWaiting();
});

self.addEventListener('activate', event=>{
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event=>{
  // try network, fall back to cache
  event.respondWith(fetch(event.request).catch(()=>caches.match(event.request)).catch(()=>caches.match('./')));
});
