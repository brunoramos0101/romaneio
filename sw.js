const CACHE_NAME = 'sucena-romaneio-v21';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js'
];

// Instala o Service Worker e salva os arquivos no cache
self.addEventListener('install', event => {
  self.skipWaiting(); // Força a ativação imediata do novo Service Worker
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepta as requisições com estratégia Network-First (tenta rede, se offline cai para o cache)
self.addEventListener('fetch', event => {
  // Apenas intercepta requisições GET
  if (event.request.method !== 'GET') return;
  
  // Apenas intercepta arquivos locais do app e bibliotecas externas do CDNjs
  const isLocal = event.request.url.startsWith(self.location.origin);
  const isCdn = event.request.url.startsWith('https://cdnjs.cloudflare.com');
  if (!isLocal && !isCdn) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Se a resposta for válida, clona e atualiza no cache
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Se a rede falhar (offline), busca no cache
        return caches.match(event.request);
      })
  );
});

// Atualiza o cache caso você mude a versão do app
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    Promise.all([
      self.clients.claim(), // Permite ao SW ativo controlar as abas imediatamente
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    ])
  );
});