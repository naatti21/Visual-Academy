'use strict';
const CACHE='visual-academy-v025-20261012';
const CORE=['./','./index.html','./styles.css?v=0.2.5','./app.js?v=0.2.5','./lessons/00b.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('visual-academy-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;
  // Network-first navigation means a GitHub Pages update is discoverable while online.
  if(e.request.mode==='navigate'){
    // A previously cached lesson must not be replaced by the app home page offline.
    const url=new URL(e.request.url);
    const dest=url.pathname.endsWith('/lessons/00b.html')?'./lessons/00b.html':'./index.html';
    e.respondWith(fetch(e.request).then(res=>{
      if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(dest,copy));}
      return res;
    }).catch(()=>caches.match(dest).then(cached=>cached||caches.match('./index.html'))));
    return;
  }
  e.respondWith(caches.match(e.request).then(v=>v||fetch(e.request)));
});
