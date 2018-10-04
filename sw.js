var CACHE = "udacity-mws-restaurant-stage-1-v1";

self.addEventListener("fetch", function(evt) {
  console.log("The service worker is serving the asset.");

  evt.respondWith(fromCache(evt.request));
 
  evt.waitUntil(update(evt.request));
});
 
function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || fetch(request);
    });
  });
}
 
function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    }).catch(e => console.log("Error while updating cache", e));
  });
}