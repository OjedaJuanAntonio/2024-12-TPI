// Este archivo contiene el código necesario para registrar el service worker
//Hace falta hacer algunas revisiones en grupo para asegurarnos de que hace lo que se espera, no entiendo la logica en su totalidad(alan)
/* eslint-disable no-restricted-globals */


const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        
        checkValidServiceWorker(swUrl, config);

        navigator.serviceWorker.ready.then(() => {
          console.log(
            'Esta aplicación está cacheada por un service worker.'
          );
        });
      } else {
        
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log('Nuevo contenido está disponible; por favor, recarga la página.');

              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              console.log('El contenido está cacheado para usar sin conexión.');

              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };

      
      self.addEventListener('fetch', (event) => {
        event.respondWith(
          fetch(event.request)
            .then((response) => {
              
              const responseClone = response.clone();
              caches.open('app-cache').then((cache) => cache.put(event.request, responseClone));
              return response;
            })
            .catch(() => {
              
              return caches.match(event.request).then((cachedResponse) => {
                if (cachedResponse) {
                  return cachedResponse;
                } else {
                  
                  return caches.match('/offline.html');
                }
              });
            })
        );
      });
    })
    .catch((error) => {
      console.error('Error al registrar el service worker:', error);
    });
}


function checkValidServiceWorker(swUrl, config) {
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then((response) => {
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'Sin conexión a Internet. La aplicación se ejecuta en modo sin conexión.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
