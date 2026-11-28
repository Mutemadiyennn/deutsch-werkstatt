/**
 * İçerik paketini derler: web/public/content/<sürüm>/… ve web/public/content/current.json
 * Sürüm = içeriğin SHA-1 özetinin ilk 12 karakteri (içerik değişmedikçe aynı kalır; önbellek dostu).
 */
import { mkdirSync, writeFileSync, rmSync, existsSync, copyFileSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { loadContent, checkRules, ROOT, parseFile } from "./load.ts";
import { Gun, medyalar } from "../../packages/shared/src/m1.ts";
import { Deneme } from "../../packages/shared/src/deneme.ts";
import { readdirSync } from "node:fs";
import { kartMi, type ContentIndex } from "../../packages/shared/src/content.ts";
import { Halka, SerbestKonus, genelAdlarAyikla, kumeDizini } from "../../packages/shared/src/index.ts";
import { z } from "zod";
import { klipVideolari } from "./klip.ts";
import { notoDosya, notoSvg } from "./emoji.ts";
import { tmpdir } from "node:os";
import { fotoPaketle, type FotoKaydi } from "./medya.ts";
import { tespitPaketi } from "./tespit.ts";
import { kesinPaketi, type KesinPaket } from "./kesin.ts";
import { haftaBecerileri, haftaTestleri, type HaftaTestiPaket } from "./haftaTesti.ts";

const c = checkRules(loadContent());
if (c.errors.length) { console.error(c.errors.join("\n")); process.exit(1); }

// PM-045 §3a: K1 pasif listesindeki kart yalnızca tanıma (tier passive) — içerikte işaretlenene kadar paket bunu uygular
// (Bahçe'de üretim sorusu ve yeni kart havuzu dışında; inceleme #59 P1-4)
if (c.k1) { const pas = new Set(c.k1.pasif); for (const l of c.lexemes) if (pas.has(l.id)) l.tier = "passive"; }

// M1 günleri: içerikte yoksa ve DW_E2E_FIXTURES=1 ise e2e için örnek gün (content/tools/fixtures/m1) — yayın paketine girmez
const days = [...c.m1];
if (process.env.DW_E2E_FIXTURES === "1") {
  const fx = join(ROOT, "content/tools/fixtures/m1");
  for (const f of readdirSync(fx).filter((x) => /^gun-\d{2}\.json$/.test(x))) {
    const g = parseFile(join(fx, f), Gun, c.errors);
    // e2e paketinde örnek gün aynı numaralı gerçek günün YERİNE geçer: oynatıcı testi içerik değişince kırılmaz (inceleme #60 P1-8)
    // bayrak PR'ı md. 9: halkasız fikstür gerçek günün halkalarını (ve günün sınavını: gün sonu 'kendini dene') alır (1. günün akışı e2e'de, uçak modunda ve yükleme ölçümünde sınanır)
    if (g) { const i = days.findIndex((d) => d.data.day === g.day); const gercek = i >= 0 ? days[i]!.data : undefined; if (i >= 0) days.splice(i, 1); days.push({ file: `fixtures/m1/${f}`, data: !g.halkalar?.length && gercek?.halkalar?.length ? { ...g, halkalar: gercek.halkalar, ...(!g.gun_sinavi && gercek.gun_sinavi ? { gun_sinavi: gercek.gun_sinavi } : {}) } : g }); }
  }
  // #243 takip c: kilitli hafta satırı için 3. haftanın tek günü (15) 9. gün fikstüründen türetilir (dosya kopyası depoya girmez)
  const g9 = days.find((d) => d.file === "fixtures/m1/gun-09.json");
  if (g9 && !days.some((d) => d.data.day === 15)) days.push({ file: "fixtures/m1/gun-09.json→15", data: { ...g9.data, day: 15, id: "m1:gun:15", title_tr: "15. gün (e2e fikstürü)" } });
  // PM-114 B ("A2'den başla"): A2'nin ilk günü (57) aynı fikstürden; 9. hafta açılır ve oynanır (dosya kopyası depoya girmez)
  if (g9 && !days.some((d) => d.data.day === 57)) days.push({ file: "fixtures/m1/gun-09.json→57", data: { ...g9.data, day: 57, id: "m1:gun:57", level: "A2", title_tr: "57. gün (e2e fikstürü)" } });
  // AKIS AK-10 4. adım: `halkalar` henüz gün dosyalarında değil (İÇ taşıyacak). e2e paketinde, fikstürle değiştirilmemiş
  // günlere İÇ'in halka önerisi (docs/v2/reviews/halka/gun-NN-halkalar.json) eklenir — yayın paketine girmez
  const hk = join(ROOT, "docs/v2/reviews/halka");
  for (const d of days) {
    const f = join(hk, `gun-${String(d.data.day).padStart(2, "0")}-halkalar.json`);
    if (d.file.startsWith("fixtures/") || d.data.halkalar?.length || !existsSync(f)) continue;
    const r = z.array(Halka).safeParse(JSON.parse(readFileSync(f, "utf8")).halkalar);
    if (r.success) d.data = { ...d.data, halkalar: r.data }; else { console.error(`${f}: ${r.error.message}`); process.exit(1); }
  }
  // PM-148 serbest konuşma: içeriği gelmemiş günlere e2e maddesi (fixtures/serbest-konus-e2e.json, gün → maddeler) — yayın paketine girmez
  const sk = z.record(z.string(), z.array(SerbestKonus)).parse(JSON.parse(readFileSync(join(ROOT, "content/tools/fixtures/serbest-konus-e2e.json"), "utf8")));
  for (const d of days) { const m = sk[String(d.data.day)]; if (m && !d.data.serbest_konus?.length) d.data = { ...d.data, serbest_konus: m }; }
  if (c.errors.length) { console.error(c.errors.join("\n")); process.exit(1); }
}
// sınav günü (PM-110): incelenmiş düzey denemeleri pakete girer (taslak deneme öğrenciye gitmez; sınav günü "hazırlanıyor" der).
// e2e paketinde fikstür denemesi (content/tools/fixtures/assess) içerikte yoksa eklenir
const denemeler = c.deneme.map((d) => d.data).filter((d) => d.review.status === "reviewed");
if (process.env.DW_E2E_FIXTURES === "1") {
  const fx = join(ROOT, "content/tools/fixtures/assess");
  for (const f of existsSync(fx) ? readdirSync(fx).filter((x) => x.endsWith(".json")) : []) {
    const d = parseFile(join(fx, f), Deneme, c.errors);
    if (d && !denemeler.some((x) => x.id === d.id)) denemeler.push(d);
  }
  if (c.errors.length) { console.error(c.errors.join("\n")); process.exit(1); }
}
// AKIS AK-3: istemcideki bilinen küme (kumeDizini) aynı genel adlar listesini kullanır (doğrulayıcıyla tek kaynak)
const gaYol = join(ROOT, "docs/v2/reviews/genel-adlar.md");
const genelAdlar = existsSync(gaYol) ? genelAdlarAyikla(readFileSync(gaYol, "utf8")) : [];
days.sort((a, b) => a.data.day - b.data.day);
const medyaKaynak = [join(ROOT, ".medya"), ...(process.env.DW_E2E_FIXTURES === "1" ? [join(ROOT, "tests/e2e/fixtures")] : [])];
// A9 (PM-069 madde 4): gerçek insan klibi günün videosu olur — İÇ'in klip dosyası + hattın hizalı metni (.medya, Releases m1-medya)
try {
  for (const v of klipVideolari(join(ROOT, "content/v2/m1/video"), medyaKaynak)) {
    const d = days.find((x) => x.data.day === v.day);
    if (d && !d.data.video) { d.data = { ...d.data, video: v.video }; console.log(`video: ${v.day}. gün ← ${v.video.id} (${v.video.cumleler.length} cümle)`); }
  }
} catch (e) { console.error(String(e)); process.exit(1); }

// PM-115 PR 2: A1 seviye tespiti paketi (havuz dosyası varsa; e2e paketinde kaynak sırası aşağıda, PM-147 md. 2). Hatalı havuz
// pakete girmez (doğrulayıcı zaten durdurur). Gün dosyası olmayan günün kartları kesin tablodan gelir (tablo paketi #231 zinciriyle).
const tespitAdlar = new Map<string, string>([...c.grammar.map((g) => [g.id, g.h_tr] as [string, string]), ...c.dn.flatMap((x) => x.data).map((d) => [d.id, d.h_tr] as [string, string]), ...c.temel.map((t) => [t.data.id, t.data.title_tr] as [string, string])]);
if (existsSync(join(ROOT, "content/v2/assess/a1-seviye-tespiti.json")) && !tespitPaketi(join(ROOT, "content/v2"), tespitAdlar)) {
  console.error("seviye tespiti havuzu hatalı: npm run content:validate"); process.exit(1);
}
// PM-147 md. 2: e2e paketinde fikstür havuzu ÖNCELİKLİ (v2_seviye'nin B/C yolları fikstür sayılarına bağlı; KAPI-İŞ 7222688448);
// DW_E2E_TESPIT=gercek ile gerçek havuz (ci-v2.yml'de ayrı paket, yalnız A yolu). Yayın paketi her zaman gerçek havuz.
const tespitGercek = () => tespitPaketi(join(ROOT, "content/v2"), tespitAdlar);
const tespitFikstur = () => tespitPaketi(join(ROOT, "content/tools/fixtures/tespit-e2e"), tespitAdlar); // 8 haftalık e2e fikstürü (PM-115 PR 2b)
const tespitE2e = process.env.DW_E2E_FIXTURES === "1";
const [tespitPkt, tespitKaynak] = ((): [ReturnType<typeof tespitPaketi>, string] => {
  const sira = tespitE2e && process.env.DW_E2E_TESPIT !== "gercek" ? [[tespitFikstur, "fikstür havuzu"], [tespitGercek, "gerçek havuz"]] as const
    : tespitE2e ? [[tespitGercek, "gerçek havuz"], [tespitFikstur, "fikstür havuzu"]] as const : [[tespitGercek, "gerçek havuz"]] as const;
  for (const [f, ad] of sira) { const p = f(); if (p) return [p, ad]; }
  return [null, "havuz yok"];
})();
if (tespitE2e) console.log(`seviye tespiti (e2e): ${tespitKaynak}${process.env.DW_E2E_TESPIT === "gercek" && tespitKaynak !== "gerçek havuz" ? " (DW_E2E_TESPIT=gercek ama içerikte havuz yok)" : ""}`);
for (const h of tespitPkt?.haftalar ?? []) for (const d of h.dil_noktasi) if (!d.ad_tr) console.log(`uyarı: seviye tespiti: ${d.id} dil noktasının adı yok (grammar.json / dn-HH.json / temel)`);
// PM-092 md. 1: haftaların dil noktaları (dn-HH.json) tek dosyada; uygulama dil noktası durağını ve kume tablosunu buradan kurar
const dnNotlar = c.dn.flatMap((x) => x.data);
// PM-100 md. 2: kesin kelime tabloları (curriculum/*-kesin.json) → gün → {kartlar, dersler}. Uygulama yalnız önceki günün dosyası
// pakette YOKSA kullanır (K(t) tamamlama; doğrulayıcı ve hafta kapısıyla aynı kaynak). Dosya varken ölçü cihazda görülen karttır.
let kesinGunler: KesinPaket;
try { kesinGunler = kesinPaketi(join(ROOT, "content/v2/curriculum")); } catch (e) { console.error(String(e)); process.exit(1); }
// PR B-3: hafta sonu testleri (hafta-sonu-testi-HH.json; 1. hafta eski adla) → hafta/hafta-HH.json; e2e paketinde fikstür haftası içerikte yoksa eklenir
let haftaTest: HaftaTestiPaket;
try {
  haftaTest = haftaTestleri(join(ROOT, "content/v2/m1"));
  if (process.env.DW_E2E_FIXTURES === "1") for (const [h, t] of Object.entries(haftaTestleri(join(ROOT, "content/tools/fixtures/m1")))) haftaTest[h] ??= t;
  // #243 PM finali takip a: her test maddesi haftanın bir "yapabiliyorum" cümlesine bağlanır (düşük sonuçta zayıf cümleler)
  const dizin = kumeDizini(c.lexemes, c.temel.map((t) => t.data), c.world, genelAdlar, [...c.grammar, ...dnNotlar] as never);
  const b = haftaBecerileri(haftaTest, days.map((d) => d.data), kesinGunler, dizin);
  for (const u of b.uyarilar) console.log(`uyarı: ${u}`);
  if (b.hatalar.length) throw new Error(b.hatalar.join("\n"));
  haftaTest = b.paket;
} catch (e) { console.error(String(e)); process.exit(1); }

const payload = {
  tespit: tespitPkt,
  m1: days.map((d) => d.data),
  dn: dnNotlar,
  kesin: kesinGunler,
  hafta: haftaTest,
  deneme: denemeler,
  temel: c.temel.map((t) => t.data),
  lexemes: c.lexemes,
  grammar: c.grammar,
  assess: c.assess,
  patterns: c.patterns,
  scenarios: Object.fromEntries(c.scenarios.map((s) => [s.data.id, s.data])),
  genelAdlar
};
// Medya (A9/A12): günlerin başvurduğu "media/<ad>" dosyaları içerik paketine kopyalanır (Pages'ten aynı kaynaktan sunulur,
// servis işçisi önbelleğe alır; Safari aralıklı istek ister). Kaynak: `.medya/` (deploy adımı GitHub Releases'ten indirir;
// ses ve video depoya girmez, #42 §4.6) ve e2e'de tests/e2e/fixtures. Bulunamayan dosya pakete girmez; oynatıcı kaynağa
// bağlantı gösterir (Video şeması). Medya adları ve içerik özetleri SÜRÜME katılır: medyasız ve medyalı paket aynı
// sürümü almaz, yeniden kesilen klip yeni sürümle önbelleğe girer (inceleme #74 P1-1).
const medyaBul: { src: string; yol: string; ozet: string }[] = [], medyaEksik: string[] = [];
const medyaAdlari = new Set<string>();
for (const { data: g } of days) for (const m of medyalar(g)) {
  if (m.video) { for (const s2 of m.video.medya) medyaAdlari.add(s2.src); if (m.video.poster) medyaAdlari.add(m.video.poster); }
  for (const c2 of m.cumleler) if (c2.audio?.src) medyaAdlari.add(c2.audio.src);
}
for (const src of [...medyaAdlari].sort()) {
  if (!/^media\/[\w-][\w.-]*$/.test(src) || src.includes("..")) continue; // dış adres ya da beklenmeyen yol: pakete girmez
  const ad = src.slice("media/".length);
  const yol = medyaKaynak.map((k) => join(k, ad)).find((p) => existsSync(p));
  if (!yol) { medyaEksik.push(src); continue; }
  medyaBul.push({ src, yol, ozet: createHash("sha1").update(readFileSync(yol)).digest("hex") });
}
// PM-081 B: kart → Noto Emoji (İÇ haritası). SVG'ler pakete girer (`media/noto-<kod>.svg`, çevrimdışı); `resim.json` kart → yerel yol
const resimYol = join(ROOT, "content/v2/media/resim/harita.json");
const resimHarita = existsSync(resimYol) ? (JSON.parse(readFileSync(resimYol, "utf8")) as { lisans?: string; kaynak?: string; kartlar: Record<string, { kod: string; emoji?: string; not?: string }> }) : null;
const resimKart = new Map<string, string>(), resimEksik: string[] = [];
// İÇ haritasındaki "Aynı halkada çıkmasın: X, Y." notu → `ayri` (Almanca sözcükler): bu kartlar birbirine çeldirici olmaz (inceleme #193 P1-1)
const resimAyri = new Map<string, string[]>();
if (resimHarita) {
  const gecici = join(tmpdir(), `dw-noto-${process.pid}`); mkdirSync(gecici, { recursive: true });
  for (const [id, r] of Object.entries(resimHarita.kartlar)) {
    const svg = notoSvg(r.kod); if (!svg) { resimEksik.push(id); continue; }
    const ad = notoDosya(r.kod), yol = join(gecici, ad);
    if (!medyaBul.some((m) => m.src === `media/${ad}`)) { writeFileSync(yol, svg); medyaBul.push({ src: `media/${ad}`, yol, ozet: createHash("sha1").update(svg).digest("hex") }); }
    resimKart.set(id, `media/${ad}`);
    const ayri = r.not?.match(/Aynı halkada çıkmasın:\s*([^.]+)/)?.[1]?.split(/\s*,\s*/).map((x) => x.trim()).filter(Boolean);
    if (ayri?.length) resimAyri.set(id, ayri);
  }
  process.on("exit", () => rmSync(gecici, { recursive: true, force: true }));  // geçici SVG klasörü derleme sonunda silinir (inceleme #193 P2)
  if (resimEksik.length) console.warn(`uyarı: Noto'da bulunmayan emoji kodu (${resimEksik.length}): ${resimEksik.slice(0, 5).join(", ")}`);
}
// PM 7055725467 md. 4: `medya` dalındaki açık fotoğraflar (acik.json `src: "medya:foto/<ad>"`; eski kayıtta dalın raw adresi) pakete girer ve
// yerel yoldan sunulur (uçak modu: servis işçisi `files.medya` ve `files.foto` ile önbelleğe alır). Dosyası yoksa kayıt pakete girmez.
// e2e paketinde bir kart (fixtures/foto/acik-e2e.json) yerel fotoğrafla gelir: uçak modu testi gerçek dosyayla (inceleme #187 P1-1)
const acikYol = join(ROOT, "content/v2/media/foto/acik.json");
const acik = existsSync(acikYol) ? (JSON.parse(readFileSync(acikYol, "utf8")) as { foto: Record<string, FotoKaydi> }) : null;
if (acik && process.env.DW_E2E_FIXTURES === "1") Object.assign(acik.foto, (JSON.parse(readFileSync(join(ROOT, "content/tools/fixtures/foto/acik-e2e.json"), "utf8")) as { foto: Record<string, FotoKaydi> }).foto);
const fotoPaket = fotoPaketle(acik?.foto ?? {}, medyaKaynak);
for (const d of fotoPaket.dosyalar) if (!medyaBul.some((m) => m.src === d.src)) medyaBul.push({ ...d, ozet: createHash("sha1").update(readFileSync(d.yol)).digest("hex") });
if (fotoPaket.eksik.length) console.warn(`uyarı: dosyası .medya/foto/ altında olmayan açık fotoğraf pakete girmez (${fotoPaket.eksik.length}): ${fotoPaket.eksik.slice(0, 5).join(", ")}`);
if (medyaEksik.length) console.warn(`uyarı: pakete girmeyen medya (${medyaEksik.length}): ${medyaEksik.slice(0, 5).join(", ")}`);
const toplamMedya = medyaBul.reduce((n, m) => n + statSync(m.yol).size, 0);
// D-103 PM koşulu (7002348227): M1 medyası toplam ≤ 60 MB; aşılırsa yayın günlüğünde görünür uyarı, PM'e yazılır
if (toplamMedya > 60 * 1024 * 1024) console.warn(`::warning::paketteki medya ${Math.round(toplamMedya / 1048576)} MB > 60 MB (D-103 sınırı; PM'e yaz)`);
else if (toplamMedya > 50 * 1024 * 1024) console.warn(`uyarı: paketteki medya ${Math.round(toplamMedya / 1048576)} MB, D-103 sınırına (60 MB) yaklaşıyor`);
// acik.json da sürüme katılır: yalnız atıf düzeltmesi de yeni sürümle önbelleğe girer (inceleme #187 P2-2)
// resim.json (kart → emoji, ayri) da sürüme girer: harita değişince kurulu cihaz yeni dosyayı alır
const version = createHash("sha1").update(JSON.stringify([c.domains, payload, medyaBul.map((m) => [m.src, m.ozet]), acik, [...resimKart], [...resimAyri]])).digest("hex").slice(0, 12);
const base = join(ROOT, "web/public/content");
if (existsSync(base)) rmSync(base, { recursive: true });
const dir = join(base, version);
mkdirSync(join(dir, "scenarios"), { recursive: true });
const w = (p: string, v: unknown) => writeFileSync(join(dir, p), JSON.stringify(v));
w("lexemes.json", { lexemes: c.lexemes, patterns: c.patterns });
w("grammar.json", c.grammar);
w("dn.json", dnNotlar);
w("kesin.json", { gunler: kesinGunler });
w("assess.json", c.assess);
// B12 3. parça: seçilmiş açık fotoğraflar (kapalı medya pakete girmez; raftan gelir, D-112)
if (acik) w("foto.json", { ...acik, foto: fotoPaket.yaz(version) });
if (resimHarita) w("resim.json", { kaynak: resimHarita.kaynak ?? "Noto Emoji", lisans: resimHarita.lisans ?? "Apache-2.0", kartlar: Object.fromEntries([...resimKart].map(([id, src]) => [id, { src: `content/${version}/${src}`, ...(resimAyri.get(id) ? { ayri: resimAyri.get(id) } : {}) }])) });
// PM-064: karakterlerin sesi (cinsiyet, yaş, sıra) uygulamada ses ataması için
if (c.world) { mkdirSync(join(dir, "world"), { recursive: true }); w("world/world.json", c.world); }
const scenFiles: Record<string, string> = {};
for (const s of c.scenarios) {
  const f = `scenarios/${s.data.id.replace(/[^a-z0-9-]/gi, "_")}.json`;
  w(f, s.data);
  scenFiles[s.data.id] = f;
}
const lexById = new Map(c.lexemes.map((l) => [l.id, l]));
const m1Files: Record<string, string> = {};
if (days.length) mkdirSync(join(dir, "m1"), { recursive: true });
for (const d of days) { const f = `m1/gun-${String(d.data.day).padStart(2, "0")}.json`; w(f, d.data); m1Files[String(d.data.day)] = f; }
const haftaFiles: Record<string, string> = {};
if (Object.keys(haftaTest).length) mkdirSync(join(dir, "hafta"), { recursive: true });
for (const [h, t] of Object.entries(haftaTest)) { const f = `hafta/hafta-${h.padStart(2, "0")}.json`; w(f, t); haftaFiles[h] = f; }
const denemeFiles: Record<string, string> = {};
if (denemeler.length) mkdirSync(join(dir, "deneme"), { recursive: true });
for (const d of denemeler) { const f = `deneme/${d.id.replace(/[^a-z0-9-]/gi, "_")}.json`; w(f, d); denemeFiles[d.id] = f; }
// R0 temel dersler (yalnızca incelenmiş olanlar öğrenciye gider; taslak ders pakete girmez)
const temelFiles: Record<string, string> = {};
const temel = c.temel.map((t) => t.data).filter((t) => t.review.status === "reviewed").sort((a, b) => a.order - b.order);
if (temel.length) mkdirSync(join(dir, "temel"), { recursive: true });
for (const t of temel) { const f = `temel/${t.id.replace(/[^a-z0-9-]/gi, "_")}.json`; w(f, t); temelFiles[t.id] = f; }
const medyaFiles: string[] = [];
for (const m of medyaBul) { mkdirSync(join(dir, "media"), { recursive: true }); copyFileSync(m.yol, join(dir, m.src)); medyaFiles.push(m.src); }
const index: ContentIndex = {
  version,
  builtAt: new Date().toISOString(),
  domains: c.domains,
  scenarios: c.scenarios.map(({ data: s }) => ({ id: s.id, domain: s.domain, order: s.order, level: s.level, title_tr: s.title_tr, title_de: s.title_de, review: s.review.status, format: s.format, ...(s.season ? { season: s.season } : {}) })),
  m1: days.map(({ data: g }) => ({ day: g.day, id: g.id, title_tr: g.title_tr, review: g.review.status,
    kartlar: g.yeni_kartlar.filter((id) => { const l = lexById.get(id); return !!l && kartMi(l); }), medya: medyalar(g).map((m) => ({ id: m.id, kind: m.kind, title_tr: m.title_tr })) })),
  temel: temel.map((t) => ({ id: t.id, order: t.order, title_tr: t.title_tr, title_de: t.title_de, review: t.review.status })),
  counts: { lexemes: c.lexemes.length, grammar: c.grammar.length, assess: c.assess.length, scenarios: c.scenarios.length },
  files: { lexemes: "lexemes.json", grammar: "grammar.json", assess: "assess.json", scenarios: scenFiles, m1: m1Files, temel: temelFiles, medya: medyaFiles, ...(acik ? { foto: "foto.json" } : {}), ...(resimHarita ? { resim: "resim.json" } : {}), genelAdlar: "genel-adlar.json", dn: "dn.json", kesin: "kesin.json", hafta: haftaFiles, deneme: denemeFiles, ...(tespitPkt ? { tespit: "tespit.json" } : {}) }
};
w("genel-adlar.json", genelAdlar);
if (tespitPkt) w("tespit.json", tespitPkt);
w("index.json", index);
writeFileSync(join(base, "current.json"), JSON.stringify({ version }));
console.log(`içerik paketi ${version} → web/public/content/${version}/ (${c.scenarios.length} senaryo, ${c.lexemes.length} kelime, ${c.assess.length} tespit maddesi)`);
