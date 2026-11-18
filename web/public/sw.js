/* Deutsch Werkstatt v2 servis işçisi — uçak modu (DN-2 §5, BY-12, RQ-P06).
   Kapsam: yalnızca bu klasör (/v2/). Aynı kaynaktaki GET istekleri; sunucu (Worker), Firebase ve dış adresler hiç önbelleğe girmez.
   Önbellekler (D-096):
   - dw2-shell-<derleme>: index.html + derlemenin bütün dosyaları (sw-assets.json; dinamik yüklenen Firebase parçaları dahil).
     Her derleme sw.js'yi farklı adresle (?b=<derleme>) kaydeder → yeni işçi kurulur, eski kabuk silinir.
   - dw2-c-<içerik sürümü>: bir içerik paketinin bütün dosyaları. Tamamı inince "__complete" işareti yazılır;
     işaret yoksa her açılışta (sayfadan "sync" mesajı) yeniden denenir. Yeni sürüm tamamlanınca eskiler silinir.
   - current.json: önce ağ (3 sn), olmazsa önbellek; içerik dosyaları sürüm yollu olduğu için önbellekten gelir.
   Başka bir işçi (ör. v1) önbellekleri silerse bir sonraki açılışta "sync" hepsini yeniden kurar. */
const BUILD = new URL(self.location.href).searchParams.get("b") || "dev";
const SHELL = `dw2-shell-${BUILD}`, CUR = "dw2-cur", DONE = "__complete";
const scope = new URL(self.registration.scope);
const inScope = (u) => u.origin === scope.origin && u.pathname.startsWith(scope.pathname);
const rel = (u) => u.pathname.slice(scope.pathname.length);

const withTimeout = (p, ms) => new Promise((res, rej) => { const t = setTimeout(() => rej(new Error("timeout")), ms); p.then((v) => { clearTimeout(t); res(v); }, (e) => { clearTimeout(t); rej(e); }); });
const getJson = async (f) => { const r = await fetch(f, { cache: "no-cache" }); if (!r.ok) throw new Error(`${f}: ${r.status}`); return r.json(); };

/** Bütün dosyalar inmezse hata fırlatır (yutmaz); işaret yalnızca tam başarıda yazılır */
async function putAll(cache, files) {
  const failed = [];
  for (let i = 0; i < files.length; i += 8) {
    await Promise.all(files.slice(i, i + 8).map(async (f) => {
      try { const r = await fetch(f, { cache: "no-cache" }); if (!r.ok) throw new Error(String(r.status)); await cache.put(f, r); }
      catch { failed.push(f); }
    }));
  }
  if (failed.length) throw new Error(`önbelleğe alınamadı: ${failed.length} dosya (${failed.slice(0, 3).join(", ")})`);
}

async function ensureShell() {
  const c = await caches.open(SHELL);
  if (await c.match(DONE)) return;
  let files = ["./", "index.html"];
  try { files = files.concat((await getJson("sw-assets.json")).files || []); } catch { /* geliştirme sunucusu: liste yok */ }
  await putAll(c, files);
  await c.put(DONE, new Response("1"));
}

async function ensureContent() {
  let cur;
  try {
    const r = await withTimeout(fetch("content/current.json", { cache: "no-cache" }), 5000);
    if (!r.ok) throw new Error(String(r.status));
    await (await caches.open(CUR)).put("content/current.json", r.clone());
    cur = await r.json();
  } catch { return; } // çevrimdışı: mevcut önbellekle devam
  const name = `dw2-c-${cur.version}`;
  const c = await caches.open(name);
  if (!(await c.match(DONE))) {
    const base = `content/${cur.version}/`;
    const idx = await getJson(`${base}index.json`);
    const files = new Set([`${base}index.json`, `${base}lexemes.json`, `${base}assess.json`, `${base}grammar.json`]);
    const walk = (o) => { if (typeof o === "string" && o.endsWith(".json")) files.add(base + o); else if (o && typeof o === "object") Object.values(o).forEach(walk); };
    walk(idx.files);
    await putAll(c, [...files]);
    await c.put(DONE, new Response(String(files.size)));
  }
  for (const k of await caches.keys()) if (k.startsWith("dw2-c-") && k !== name) await caches.delete(k);
}

let syncing = null;
const sync = () => (syncing ||= (async () => {
  try { await ensureShell(); } catch (e) { console.warn("[sw] kabuk", e); }
  try { await ensureContent(); } catch (e) { console.warn("[sw] içerik", e); }
})().finally(() => { syncing = null; }));

self.addEventListener("install", (e) => { e.waitUntil(sync().then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if ((k.startsWith("dw2-shell-") && k !== SHELL) || k.startsWith("dw2-v1")) await caches.delete(k);
    await self.clients.claim();
  })());
});
self.addEventListener("message", (e) => { if (e.data === "sync") e.waitUntil(sync()); });

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const u = new URL(req.url);
  if (!inScope(u)) return; // Worker, Firebase, fotoğraflar: doğrudan ağ
  if (req.mode === "navigate") {
    e.respondWith((async () => {
      const c = await caches.open(SHELL);
      try { const r = await withTimeout(fetch(req), 3000); if (r.ok) c.put("index.html", r.clone()); return r; }
      catch { return (await c.match("index.html")) || (await c.match("./")) || (await caches.match("index.html")) || Response.error(); }
    })());
    return;
  }
  const key = rel(u);
  if (key === "content/current.json") {
    e.respondWith((async () => {
      const c = await caches.open(CUR);
      try { const r = await withTimeout(fetch(req, { cache: "no-cache" }), 3000); if (r.ok) c.put(key, r.clone()); return r; }
      catch { return (await c.match(key)) || Response.error(); }
    })());
    return;
  }
  e.respondWith((async () => {
    const hit = (await caches.match(req, { ignoreSearch: true })) || (await caches.match(key));
    if (hit) return hit;
    const r = await fetch(req);
    if (r.ok && (key.startsWith("assets/") || key.startsWith("content/"))) {
      const c = await caches.open(key.startsWith("assets/") ? SHELL : `dw2-c-${key.split("/")[1]}`);
      c.put(req, r.clone());
    }
    return r;
  })());
});
