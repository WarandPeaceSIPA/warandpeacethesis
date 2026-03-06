// Service Worker for War and Peace Thesis PWA
// Version 1.0.0

const CACHE_NAME = 'war-peace-thesis-v1';
const urlsToCache = [
  '/warandpeacethesis/',
  '/warandpeacethesis/index.html',
  '/warandpeacethesis/styles.css',
  '/warandpeacethesis/script.js',
  '/warandpeacethesis/logo.svg',
  '/warandpeacethesis/papers-database.json',
  '/warandpeacethesis/manifest.json',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&display=swap',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js'
];

// Install Service Worker
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching all files');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('[Service Worker] Cache failed:', error);
      })
  );
  self.skipWaiting();
});

// Activate Service Worker
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Strategy: Network First, falling back to Cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // If we got a valid response, clone it and update cache
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(event.request).then(response => {
          if (response) {
            return response;
          }
          // If not in cache and network failed, return offline page
          if (event.request.mode === 'navigate') {
            return caches.match('/warandpeacethesis/index.html');
          }
        });
      })
  );
});

// Background Sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'sync-papers') {
    event.waitUntil(syncPapers());
  }
});

async function syncPapers() {
  try {
    const cache = await caches.open(CACHE_NAME);
    const response = await fetch('/warandpeacethesis/papers-database.json');
    await cache.put('/warandpeacethesis/papers-database.json', response);
    console.log('[Service Worker] Papers database synced');
  } catch (error) {
    console.error('[Service Worker] Sync failed:', error);
  }
}

// Push Notifications (optional - for future updates)
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'تحديث جديد متاح',
    icon: '/warandpeacethesis/logo.svg',
    badge: '/warandpeacethesis/logo.svg',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'استكشف الآن',
        icon: '/warandpeacethesis/logo.svg'
      },
      {
        action: 'close',
        title: 'إغلاق',
        icon: '/warandpeacethesis/logo.svg'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('رسالة الماجستير', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/warandpeacethesis/')
    );
  }
});
