import 'regenerator-runtime';
import CacheHelper from './utils/cache-helper';

// Daftar asset yang akan di-caching
const assetsToCache = [
  './',
  './icons/icon-16x16.png',
  './icons/icon-32x32.png',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
  './index.html',
  './favicon.png',
  './app.bundle.js',
  './app.webmanifest',
  './sw.bundle.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(CacheHelper.cachingAppShell([...assetsToCache]));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(CacheHelper.revalidateCache(event.request));
});
