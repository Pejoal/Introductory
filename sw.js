const cacheName = "cache3"; // Change value to force update

self.addEventListener("install", e => {
	// console.log("installed twice"); // only works once

	// Kick out the old service worker
	self.skipWaiting();

	e.waitUntil(
		caches.open(cacheName).then(cache => {
			// can NOT cache PHP File
			return cache.addAll(
				[
					"./",
					"./index.html",
					"./style.css",
					"./main.js",
					"./auto_complete/",
					"./auto_complete/style.css",
					"./auto_complete/app.js",
					"./carousel/",
					"./carousel/new_style.css",
					"./carousel/new_app.js",
					"./demo 1/",
					"./demo 1/style.css",
					"./demo 1/script.js",
					"./demo 2/",
					"./demo 2/index22.css",
					"./demo 2/index2.js",
					"./form_validation/",
					"./form_validation/style.css",
					"./form_validation/appa.js",
					"./fun/",
					"./fun/style.css",
					"./fun/app.js",
					"./night_mode/",
					"./night_mode/z.css",
					"./night_mode/app.js",
					"./imgs/svg/html-1.svg",
					"./imgs/svg/css-3.svg",
					"./imgs/svg/logo-javascript.svg",
					"./imgs/svg/bootstrap-5-1.svg",
					"./imgs/svg/tailwind-css-2.svg",
					"./imgs/svg/gulp.svg",
					"./imgs/svg/pug.svg",
					"./imgs/svg/react-2.svg",
					"./imgs/svg/typescript.svg",
					"./imgs/svg/php-1.svg",
					"./imgs/svg/mysql-6.svg",
					"./imgs/svg/laravel-2.svg",
					"./imgs/svg/git-icon.svg",
					"./imgs/svg/github-icon-1.svg",
					"./imgs/svg/jest-2.svg",
					"./indexedDB/",
					"./indexedDB/indexedDB.js",
					"./quiz/",
					"./quiz/style.css",
					"./quiz/app.js",
					"./swiper/",
					"./swiper/style.css",
					"./swiper/app.js",
					"./pwa/imgs/android-chrome-192x192.png",
					"./pwa/imgs/android-chrome-512x512.png",
					"./pwa/imgs/favicon.ico",
					"./pwa/imgs/maskable_icon.png",
					"./pwa/imgs/maskable_icon_x512.png",
					"./bootstrap/bootstrap.min.css",
					"./bootstrap/bootstrap.bundle.min.js",
					"./bootstrap/all.min.css",
					"./bootstrap/all.min.js",
					"./bootstrap/swiper-bundle.min.css",
					"./bootstrap/swiper-bundle.min.js"
				])
		})
	);
});

self.addEventListener("activate", event => {
	// Delete any non-current cache
	event.waitUntil(
		caches.keys().then(keys => {
			Promise.all(
				keys.map(key => {
					if (![cacheName].includes(key)) {
						return caches.delete(key);
					}
				})
			)
		})
	);
});



// Offline-first, cache-first strategy
// Kick off two asynchronous requests, one to the cache and one to the network
// If there's a cached version available, use it, but fetch an update for next time.
// Gets data on screen as quickly as possible, then updates once the network has returned the latest data.
// <<Changed To Network First>>
self.addEventListener("fetch", event => {
	event.respondWith(
		caches.open(cacheName).then(cache => {
			return cache.match(event.request).then(response => {
				// return response || fetch(event.request).then(networkResponse => {
				// 	cache.put(event.request, networkResponse.clone());
				// 	return networkResponse || response;
				return fetch(event.request).then(networkResponse => {
					cache.put(event.request, networkResponse.clone());
					return networkResponse;
				}).catch(err => {
					return response;
				});
			})
		})
	);
});

// // Badges
// const unread = 31;
// navigator.setAppBadge(unread);

// setTimeout(() => {
// 	navigator.clearAppBadge();
// }, 5000);


/* 
self.addEventListener("fetch", e => {
	// console.log(`Intercepting fetch Request For: ${e.request.url}`);
	// Get Cached Data First
	e.respondWith(
		caches.match(e.request).then(response => {
			return response || fetch(e.request);
		})
	)
}) */

