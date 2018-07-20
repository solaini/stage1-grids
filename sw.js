/*
@reviewCache is the static name for the new cache version
*/

let reviewCache = 'stage1-v2';


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
        if(response) return response;
        return fetch(event.request);
    })
    );
});



