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
  return cur.version;
}

/** Medya (A12): video ve ses ayrı önbellekte; kurulumu bekletmez (yalnızca "sync" mesajında), eksikse sonraki açılışta sürer */
async function ensureMedia() {
  const cur = await (await (await caches.open(CUR)).match("content/current.json"))?.json().catch(() => null);
  if (!cur) return;
  const c = await caches.open(`dw2-c-${cur.version}`);
  if (!(await c.match(DONE))) return;
  // medya (A12): video ve ses ayrı önbellekte; JSON paketinin tamamlanmasını bekletmez, eksikse sonraki açılışta sürer
  const mname = `dw2-m-${cur.version}`;
  const m = await caches.open(mname);
  if (!(await m.match(DONE))) {
    const idx = await (await c.match(`content/${cur.version}/index.json`))?.json().catch(() => null);
    if (!idx) return;
    const liste = ((idx && idx.files && idx.files.medya) || []).map((f) => `content/${cur.version}/${f}`);
    const eksik = [];
    for (const f of liste) if (!(await m.match(f))) eksik.push(f);
    await putAll(m, eksik);
    await m.put(DONE, new Response(String(liste.length)));
  }
  for (const k of await caches.keys()) if (k.startsWith("dw2-m-") && k !== mname) await caches.delete(k);
}

/** Safari <video>/<audio> aralıklı istek (Range) ister; önbellekteki tam yanıttan 206 kısmi yanıt üretilir */
async function aralikli(req, yanit) {
  const range = req.headers.get("range");
  if (!range || !yanit || yanit.status !== 200) return yanit;
  const m = /^bytes=(\d*)-(\d*)$/.exec(range.trim());
  // geçersiz sözdizimi (bytes=-, bytes=5-2): aralık yok sayılır, tam yanıt (RFC 9110 §14.2)
  if (!m || (m[1] === "" && m[2] === "") || (m[1] !== "" && m[2] !== "" && Number(m[2]) < Number(m[1]))) return yanit;
  // dosya belleğe bütünüyle okunmaz: Blob dilimi
  const blob = await yanit.clone().blob();
  const boy = blob.size;
  const bas = m[1] === "" ? Math.max(0, boy - Number(m[2])) : Number(m[1]);
  const son = m[1] !== "" && m[2] !== "" ? Math.min(Number(m[2]), boy - 1) : boy - 1;
  if (bas >= boy) return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${boy}` } });
  return new Response(blob.slice(bas, son + 1), { status: 206, headers: {
    "Content-Type": yanit.headers.get("Content-Type") || "application/octet-stream", "Content-Range": `bytes ${bas}-${son}/${boy}`,
    "Content-Length": String(son - bas + 1), "Accept-Ranges": "bytes" } });
}

let syncing = null;
const sync = (medya = true) => (syncing ||= (async () => {
  try { await ensureShell(); } catch (e) { console.warn("[sw] kabuk", e); }
  try { await ensureContent(); } catch (e) { console.warn("[sw] içerik", e); }
  if (medya) try { await ensureMedia(); } catch (e) { console.warn("[sw] medya", e); }
})().finally(() => { syncing = null; }));

// kurulum medya indirmesini beklemez (kabuk hemen etkinleşir); medya sayfanın "sync" mesajıyla gelir
self.addEventListener("install", (e) => { e.waitUntil(sync(false).then(() => self.skipWaiting())); });
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
    const hit = (await caches.match(req.url, { ignoreSearch: true })) || (await caches.match(key));
    if (hit) return aralikli(req, hit);
    const r = await fetch(req);
    // medya kısmi yanıtla (206) gelir: önbelleğe yalnızca tam yanıt girer (medya önbelleği sync ile tam dosyayı alır)
    if (r.status === 200 && (key.startsWith("assets/") || key.startsWith("content/"))) {
      const c = await caches.open(key.startsWith("assets/") ? SHELL : `dw2-c-${key.split("/")[1]}`);
      c.put(req, r.clone());
    }
    return r;
  })());
});
