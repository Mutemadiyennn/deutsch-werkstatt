/* Deutsch Werkstatt v2 servis işçisi — uçak modu (DN-2 §5, BY-12, RQ-P06).
   Kapsam: yalnızca bu klasör (/v2/). Aynı kaynaktaki GET istekleri; sunucu (Worker), Firebase ve dış adresler hiç önbelleğe girmez.
   - Kurulumda: uygulama kabuğu + bütün içerik paketi (current.json → index.json → dosyalar) önbelleğe alınır.
   - Sayfa: önce ağ (3 sn), olmazsa önbellek. Varlıklar (hash'li): önce önbellek. İçerik: önbellek + arkada yenileme. */
const V = "dw2-v1", SHELL = `${V}-shell`, RT = `${V}-rt`;
const scope = new URL(self.registration.scope);
const inScope = (u) => u.origin === scope.origin && u.pathname.startsWith(scope.pathname);

async function precacheContent(cache) {
  try {
    const cur = await (await fetch("content/current.json", { cache: "no-cache" })).json();
    const idx = await (await fetch(`content/${cur.version}/index.json`, { cache: "no-cache" })).json();
    const files = new Set(["content/current.json", `content/${cur.version}/index.json`]);
    const walk = (o) => { if (typeof o === "string" && o.endsWith(".json")) files.add(`content/${cur.version}/${o}`); else if (o && typeof o === "object") Object.values(o).forEach(walk); };
    walk(idx.files);
    for (const f of ["lexemes.json", "assess.json", "grammar.json"]) files.add(`content/${cur.version}/${f}`);
    await Promise.all([...files].map((f) => fetch(f, { cache: "no-cache" }).then((r) => r.ok && cache.put(f, r)).catch(() => {})));
  } catch { /* içerik sonra çalışma anında önbelleğe girer */ }
}

self.addEventListener("install", (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(SHELL);
    await c.addAll(["./", "index.html"]).catch(() => {});
    // derlenmiş varlıklar: index.html'deki script/link adresleri
    try { const html = await (await fetch("index.html", { cache: "no-cache" })).text(); const urls = [...html.matchAll(/(?:src|href)="(\.?\/?assets\/[^"]+)"/g)].map((m) => m[1]); await c.addAll(urls); } catch {}
    await precacheContent(await caches.open(RT));
    await self.skipWaiting();
  })());
});
self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k.startsWith("dw2-") && !k.startsWith(V)) await caches.delete(k);
    await self.clients.claim();
  })());
});

const withTimeout = (p, ms) => new Promise((res, rej) => { const t = setTimeout(() => rej(new Error("timeout")), ms); p.then((v) => { clearTimeout(t); res(v); }, (e) => { clearTimeout(t); rej(e); }); });

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const u = new URL(req.url);
  if (!inScope(u)) return; // Worker, Firebase, fotoğraflar: doğrudan ağ
  if (req.mode === "navigate") {
    e.respondWith((async () => {
      const c = await caches.open(SHELL);
      try { const r = await withTimeout(fetch(req), 3000); if (r.ok) c.put("index.html", r.clone()); return r; }
      catch { return (await c.match("index.html")) || (await c.match("./")) || Response.error(); }
    })());
    return;
  }
  if (u.pathname.includes("/assets/")) {
    e.respondWith((async () => { const c = await caches.open(SHELL); const hit = await c.match(req); if (hit) return hit; const r = await fetch(req); if (r.ok) c.put(req, r.clone()); return r; })());
    return;
  }
  if (u.pathname.includes("/content/")) {
    e.respondWith((async () => {
      const c = await caches.open(RT);
      const key = u.pathname.slice(scope.pathname.length);
      const hit = (await c.match(req, { ignoreSearch: true })) || (await c.match(key));
      const net = fetch(req).then((r) => { if (r.ok) c.put(req, r.clone()); return r; }).catch(() => null);
      if (hit) { e.waitUntil(net); return hit; }
      return (await net) || Response.error();
    })());
  }
});
