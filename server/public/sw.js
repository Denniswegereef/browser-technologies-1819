// self.addEventListener('install', function(e) {
//   e.waitUntil(
//     caches.open('test').then(function(cache) {
//       return cache.addAll(['/'])
//     })
//   )
// })
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request).then(function(response) {
//       return response || fetch(event.request)
//     })
//   )

//   if (
//     event.request.url.includes('/js/') ||
//     event.request.url.includes('/css/')
//   ) {
//     event.waitUntil(
//       caches.open('test').then(function(cache) {
//         return cache.addAll([event.request.url])
//       })
//     )
//   }
// })
