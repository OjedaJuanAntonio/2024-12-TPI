if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(registration => console.log('Service Worker registrado con éxito:', registration))
        .catch(error => console.error('Error al registrar el Service Worker:', error));
}

const CACHE_NAME = 'v1';
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
    'public/'   // Añade aquí otros archivos necesarios
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
                return response || fetch(event.request);
            })
            .catch(() => caches.match('/offline.html')) // Página de respaldo si todo falla
    );
});
