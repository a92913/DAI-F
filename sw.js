importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js");
const staticAssets = [
    './',
    './index.html'
];
self.addEventListener('install', async event => {
    console.log('install event')
    const cache = await caches.open('smth');
    cache.addAll(staticAssets);
});

self.addEventListener('fetch', async event => {
    console.log('fetch event')
    const req = event.request;
    event.respondWith(cacheFirst(req));
});

async function cacheFirst(req) {
    const cache = await caches.open('smth');
    const cachedResponse = await cache.match(req);
    return cachedResponse || fetch(req);
}