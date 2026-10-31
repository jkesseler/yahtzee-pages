// The old Vue build registered a caching service worker at this URL. Browsers keep serving the
// cached old app until that worker is replaced, so this one removes itself and its caches and
// reloads open tabs, handing returning players the current app. Safe to delete after a few months.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) {
      await caches.delete(key);
    }
    await self.registration.unregister();
    for (const client of await self.clients.matchAll({ type: 'window' })) {
      client.navigate(client.url);
    }
  })());
});
