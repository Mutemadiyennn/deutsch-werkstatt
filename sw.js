/* Deutsch-Werkstatt service worker: internetsiz açılış + hızlı yükleme.
   Sayfa: önce ağ (4 sn), yoksa önbellek. Yazı tipleri ve Firebase kütüphaneleri: önbellek önce.
   Güncelleme kontrolü (?u=) ve bütün API çağrıları hiç önbelleğe girmez. */
const STATIC = "dw-static-v1", RUNTIME = "dw-runtime-v1";
const CORE = ["./", "manifest.webmanifest", "apple-touch-icon.png", "icon-192.png", "icon-512.png", "favicon.png"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(STATIC).then(c => c.addAll(CORE).catch(() => {})).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== STATIC && k !== RUNTIME).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
const timeout = (p, ms) => new Promise((res, rej) => { const t = setTimeout(() => rej(new Error("timeout")), ms); p.then(v => { clearTimeout(t); res(v); }, err => { clearTimeout(t); rej(err); }); });
async function pageFirst(req){
  const c = await caches.open(STATIC);
  try {
    const r = await timeout(fetch(req, {cache: "no-store"}), 4000);
    if(r && r.ok) c.put("./", r.clone());
    return r;
  } catch(e){
    return (await c.match("./")) || (await c.match(req, {ignoreSearch: true})) || Response.error();
  }
}
async function cacheFirst(req){
  const c = await caches.open(RUNTIME); const hit = await c.match(req);
  if(hit) return hit;
  const r = await fetch(req); if(r && (r.ok || r.type === "opaque")) c.put(req, r.clone()); return r;
}
async function staleRevalidate(req){
  const c = await caches.open(RUNTIME); const hit = await c.match(req);
  const net = fetch(req).then(r => { if(r && r.ok) c.put(req, r.clone()); return r; }).catch(() => hit);
  return hit || net;
}
self.addEventListener("fetch", e => {
  const req = e.request; if(req.method !== "GET") return;
  const u = new URL(req.url);
  if(u.origin === location.origin){
    if(u.searchParams.has("u")) return;                       /* güncelleme kontrolü: her zaman ağ */
    if(req.mode === "navigate" || u.pathname.endsWith("/") || u.pathname.endsWith("/index.html")) { e.respondWith(pageFirst(req)); return; }
    if(u.pathname.endsWith("sw.js")) return;
    e.respondWith(staleRevalidate(req)); return;
  }
  if(u.hostname === "fonts.googleapis.com" || u.hostname === "fonts.gstatic.com" || (u.hostname === "www.gstatic.com" && u.pathname.startsWith("/firebasejs/"))){ e.respondWith(cacheFirst(req)); return; }
  /* geri kalan her şey (yapay zekâ, ses, veritabanı) doğrudan ağa */
});
