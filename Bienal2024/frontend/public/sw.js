// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/sw.js')
//         .then(registration => console.log('Service Worker registrado con éxito:', registration))
//         .catch(error => console.error('Error al registrar el Service Worker:', error));
// }

const CACHE_NAME = 'v6';
const urlsToCache = [
    '/',
    '/public/index.html',
    '/styles.css',
    '/app.js',
    '/images/logo.png',
    '/src/assets/main_video.mp4',
    'Main.mp4',
    'Loginbackground.jpg',
    'Escultores.jpg',
    'ws.js'
      // Añade aquí otros archivos necesarios
];

// Evento de instalación: almacena archivos en la caché
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
            .then(self.skipWaiting())
    );
});

// Evento de activación: limpia la caché vieja
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Evento de fetch: sirve recursos desde la caché, si están disponibles
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si el recurso está en caché, se devuelve
                if (response) {
                    return response;
                }
                
                // Intentamos realizar la solicitud de red
                return fetch(event.request).then(networkResponse => {
                    // Verificamos que la respuesta sea válida antes de almacenarla en caché
                    if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                        return networkResponse;
                    }
                    
                    // Clonamos la respuesta para guardarla en el caché
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseToCache);
                    });
                    
                    return networkResponse;
                }).catch(error => {
                    console.error('Error en fetch:', error);
                    // Devolver una respuesta alternativa (ejemplo: offline.html) si fetch falla
                    return caches.match('/offline.html');
                });
            })
    );
});

