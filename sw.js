const V='toolbox-v4';
const CORE=['index.html','juegos.html','calma.html','flexibilidad.html','generador.html','descargas/pictogramas-arasaac.json','logo.svg','series.json','manifest.webmanifest','icons/icon-192.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
// Red primero: si hay conexión se ve siempre la última versión; sin conexión, la guardada.
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(n=>{if(n&&n.ok&&new URL(e.request.url).origin===location.origin){const cp=n.clone();caches.open(V).then(c=>c.put(e.request,cp))}return n}).catch(()=>caches.match(e.request)))});
