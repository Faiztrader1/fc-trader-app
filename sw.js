const CACHE_NAME = 'fc-trader-pro-v1';
const assets = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

// Tahap Install: Menyimpan file penting ke dalam cache
self.addEventListener('install', function(e) {
  console.log('SW: Installing...');
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('SW: Caching file utama');
      return cache.addAll(assets);
    })
  );
});

// Tahap Aktivasi: Menghapus cache lama jika ada update
self.addEventListener('activate', function(e) {
  console.log('SW: Activated');
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Tahap Fetch: Mengambil data dari cache jika sedang offline
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
