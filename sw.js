const CACHE_NAME = 'zavod-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  // Agar CSS, JS yoki rasm fayllaringiz bo'lsa, ularni ham kiriting:
  // '/style.css',
  // '/script.js',
  // '/icon-512.png'
];

// O'rnatish: fayllarni keshga saqlash
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Faollashtirish
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// So'rovlarni tutib olish: Internet bo'lmasa keshdan berish
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
