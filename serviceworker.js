const staticAssets = [
    './',
    './styles.css',
    './app.js'
];

var mode;

self.addEventListener('install', async event => {
    const cache = await caches.open('static-quote');
    cache.addAll(staticAssets);
});

self.addEventListener('fetch', event => {
    const {request} = event;
    const url = new URL(request.url);
    if(mode==false)
    event.respondWith(cacheData(request));
    else{
        if(url.origin === location.origin) {
            event.respondWith(cacheData(request));
        } else {
            event.respondWith(networkFirst(request));
        }
    }

});

self.addEventListener('message', function(event){
    if(event.data=="offline")
    mode=false
    else
    mode=true
    console.log("message: "+mode);
});

self.addEventListener('notificationclick', function(event){
    var notification = event.notification;
    var primaryKey = notification.data.primaryKey;
    var action = event.action;
    notification.close();
});

async function cacheData(request) 
{
    const cachedResponse = await caches.match(request);
    return cachedResponse || fetch(request);
}

async function networkFirst(request) 
{
    const cache = await caches.open('dynamic-qoute');

    try {
        const response = await fetch(request);
        cache.put(request, response.clone());
        return response;
    } catch (error){
        return await cache.match(request);
    }

}