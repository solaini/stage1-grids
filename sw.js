/*
@reviewCache is the static name for the new cache version
Updates to fetch event are leveraging code from Google's website on the service worker
found at: https://developers.google.com/web/fundamentals/primers/service-workers/
*/

let reviewCache = 'stage2-v2';


self.addEventListener('install', function(event){
    event.waitUntil(
    caches.open(reviewCache).then(function(cache) {
        return cache.addAll([
            '/',
            'img/',
            'css/styles.css',
            'js/',
            'index.html',
            'restaurant.html',
            'package.json',
            'data/'
        ]);
        })
    );
});


//Compare cache to previous version after install and remove
//Old Cache's
self.addEventListener('activate', function(event){
    event.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(
                cacheNames.filter(function(cacheName){
                    return cacheName.startsWith('stage1-') && cacheName != reviewCache;
        }).map(function(cacheName) {
            return caches.delete(cacheName);
            })
        )      
        })
    )
});

self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request).then(function(response){
            //Returns repsonse if cache is found
            if(response) return response;
        const fetchRequest = event.request.clone();
            console.log(response.json());
        return fetch(fetchRequest).then(
            function(response){
                if(!response || response.status !== 200 || response.type !=='basic'){
                    return response;
                }

                var responseToCache = response.clone();

                caches.open(reviewCache).then(function(cache){
                    cache.put(event.request, responseToCache);
                })
            }
        )    
    })
    );
});



