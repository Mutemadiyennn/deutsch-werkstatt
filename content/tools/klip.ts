/**
 * A9 (#58, PM-069 madde 4): gerçek insan klibini günün videosuna bağlar — derleme anında.
 *   - İÇ: content/v2/m1/video/klip-NN.json (sorular, dikte, gölge, Türkçe çeviriler, atıf; transkript yok)
 *   - Hat (kaynak/video, scripts/video/m1_video.py): Releases `m1-medya` → klip-NN.mp4, klip-NN.jpg, klip-NN.metin.json
 *     (Almanca cümleler + iki ASR ile hizalanmış zamanlar; sapma > 300 ms olan tur zaten çıkarılmış). Deploy `.medya/`ya indirir.
 * Transkript metni depoya girmez (FORMAT.md A9); yalnızca yayın paketine (CC BY 4.0, atıf ekranda).
 * `durum` hazir | kisa bağlanır (PM-078 F); çok parçalı (`kesitler`) klip hattın birleştirdiği tek videoyla, cümle kimliği t{tur} / k{sira}t{tur}.
 * Hizalı cümlesi olmayan tura bağlı soru, dikte ve gölge pakete girmez (öğrenci o cümleyi metinde göremez).
 */
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { Video, type Video as VideoT } from "../../packages/shared/src/m1.ts";

interface Tur { tur: number; tr?: string; basi?: string }
interface MetinCumle { id: string; tur: number; kesit?: number; speaker?: string; de: string; t0: number; t1: number }
interface Metin { sure_sn: number; kaynak_klip?: string; kaynak_klipler?: string[]; cumleler: MetinCumle[] }
type Ref = number | { kesit?: number; tur: number };

interface Parca { klip: string; turlar: Tur[]; konusmaci?: string; url?: string; bas?: number; son?: number; haric: Set<number> }
const haricSet = (h: any[] | undefined) => new Set<number>((h ?? []).map((x) => (typeof x === "number" ? x : x?.tur)).filter((x): x is number => typeof x === "number"));
/** Klibin parçaları (FORMAT.md A9 `kesitler`): sıra 0 üst düzey alanlarla aynıdır */
const parcalar = (k: any): Parca[] => {
  const ust: Parca = { klip: k.klip, turlar: k.turlar ?? [], konusmaci: k.konusmaci, url: k.transkript_url || k.video_url, bas: k.kesit?.bas_tur, son: k.kesit?.son_tur, haric: haricSet(k.haric) };
  const ks: any[] = k.kesitler ?? [];
  return ks.length ? ks.map((x, i) => (i === 0 ? { ...ust, konusmaci: x.konusmaci ?? ust.konusmaci }
    : { klip: x.klip, turlar: x.turlar ?? [], konusmaci: x.konusmaci, url: x.transkript_url || x.video_url, bas: x.bas_tur, son: x.son_tur, haric: haricSet(x.haric) })) : [ust];
};
/** `basi` denetimi için: küçük harf, noktalama yok, tek boşluk */
const sade = (t: string) => t.toLowerCase().normalize("NFC").replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();

/**
 * Klip + hattın hizalı metni → günün videosu. Bağlanır: `durum` hazir | kisa (PM-078 F) ve metin bu klibin GÜNCEL parçalarından
 * kesilmişse (`kaynak_klipler`/`kaynak_klip` eşleşmesi; eski kesimli medya bağlanmaz). Soru, dikte, gölge ve cevap (kesit, tur) ile
 * cümleye bağlanır; hizalı cümlesi olmayan tura bağlı madde pakete girmez.
 */
export function klipVideo(k: any, metin: Metin, olcum?: { kesit_kaynak_sn?: [number, number] } | null): VideoT | null {
  if (!["hazir", "kisa"].includes(k?.durum) || !metin?.cumleler?.length) return null;
  const ps = parcalar(k);
  const beklenen = ps.map((p) => p.klip);
  const gelen = metin.kaynak_klipler ?? (metin.kaynak_klip ? [metin.kaynak_klip] : []);
  if (gelen.length !== beklenen.length || gelen.some((x, i) => x !== beklenen[i])) return null;
  // inceleme #159 P1-1: her hizalı cümle kendi turunun `basi`siyle başlamalı; kesit aralığı dışı ve `haric` tur pakete girmez
  for (const c of metin.cumleler) {
    const p = ps[c.kesit ?? 0]; const t = p?.turlar.find((x) => x.tur === c.tur);
    if (t?.basi && !sade(c.de).startsWith(sade(t.basi))) { console.warn(`${k.dosya}: ${c.id} "basi" tutmuyor; klip bağlanmadı`); return null; }
  }
  const icinde = (c: MetinCumle) => { const p = ps[c.kesit ?? 0]; return !!p && !p.haric.has(c.tur) && (p.bas == null || c.tur >= p.bas) && (p.son == null || c.tur <= p.son); };
  metin = { ...metin, cumleler: metin.cumleler.filter(icinde) };
  const ad = String(k.dosya ?? "").replace(/\.json$/, "") || null;
  const anahtar = (kesit: number, tur: number) => `${kesit}:${tur}`;
  const trOf = new Map<string, string>(); ps.forEach((p, i) => p.turlar.forEach((t) => trOf.set(anahtar(i, t.tur), t.tr ?? "")));
  const idOf = new Map<string, string>(metin.cumleler.map((c) => [anahtar(c.kesit ?? 0, c.tur), c.id]));
  const cumleler = metin.cumleler.filter((c) => trOf.get(anahtar(c.kesit ?? 0, c.tur))).map((c) => ({ id: c.id, de: c.de, tr: trOf.get(anahtar(c.kesit ?? 0, c.tur))!, speaker: c.speaker, t0: c.t0, t1: c.t1 }));
  if (!cumleler.length || !ad) return null;
  const var_ = new Set(cumleler.map((c) => c.id));
  const idRef = (r: Ref | undefined, kesit?: number): string | undefined => {
    if (r == null) return undefined;
    const [ks, tur] = typeof r === "number" ? [kesit ?? 0, r] : [r.kesit ?? 0, r.tur];
    const id = idOf.get(anahtar(ks, tur));
    return id && var_.has(id) ? id : undefined;
  };
  const b = k.bolum ?? {};
  const tum = cumleler.map((c) => c.id);
  const ayrinti = (b.ayrinti ?? []).map((q: any) => ({ q, id: idRef(q.tur, q.kesit) })).filter((x: any) => x.id)
    .map(({ q, id }: any, i: number) => ({ id: `a${i + 1}`, kind: "detail" as const, q_tr: q.q_tr, opts: q.opts, ans: q.ans, kanit: [id] }));
  const dikte = (b.dikte ?? []).filter((d: any) => d.seviye === "gercek" || idRef(d.tur, d.kesit)).map((d: any) => {
    const cumle = d.tur != null ? idRef(d.tur, d.kesit) ?? "" : "";
    switch (d.seviye) {
      case "kolay": return { id: d.id, seviye: "kolay", cumle, q_tr: d.q_tr, opts: d.opts, ans: d.ans };
      case "orta": return { id: d.id, seviye: "orta", cumle, de: d.de, accepted: d.accepted };
      case "zor": return { id: d.id, seviye: "zor", cumle, banka: d.banka, accepted: d.accepted };
      case "usta": return { id: d.id, seviye: "usta", cumle, accepted: d.accepted };
      default: return { id: d.id, seviye: "gercek", gorev_tr: d.gorev_tr, ornek_de: d.ornek_de, zorunlu: d.zorunlu ?? [] };
    }
  });
  const golge = (b.golge ?? []).map((r: Ref) => idRef(r)).filter((x: string | undefined): x is string => !!x);
  const cv = b.cevapla;
  const cvId = cv ? idRef(cv.soru_tur, cv.kesit) : undefined;
  const cevapla = cv && cvId ? { id: cv.id, k: "guided_response" as const, situation_tr: cv.situation_tr, prompt_de: metin.cumleler.find((c) => c.id === cvId)!.de, accepted: cv.accepted, why_tr: cv.why_tr } : undefined;
  const kesit = olcum?.kesit_kaynak_sn;
  const konusmacilar = [...new Set(ps.map((p) => p.konusmaci).filter(Boolean))];
  const v = {
    id: k.id,
    tur: "roportaj" as const,
    title_tr: `Gerçek röportaj: ${konusmacilar.join(", ") || k.konusmaci}`,
    sure_sn: metin.sure_sn,
    gercek_insan: true as const,
    // çok parçalı klipte kaynak aralığı ilk parçanın; atıf bütün parçaları kapsar (aynı eser dizisi, CC BY 4.0)
    kaynak: { url: ps[0]!.url, lisans: k.lisans, atif: k.atif, bas_sn: ps.length === 1 ? kesit?.[0] ?? 0 : 0, bit_sn: ps.length === 1 ? kesit?.[1] ?? metin.sure_sn : metin.sure_sn },
    medya: [{ src: `media/${ad}.mp4`, type: "video/mp4" }],
    poster: `media/${ad}.jpg`,
    ...(k.ortam_tr ? { ortam_tr: k.ortam_tr } : {}),
    on_ogretim: (k.on_ogretim ?? []).map((x: any) => ({ de: x.de, tr: x.tr })),
    cumleler,
    bolumler: [{ id: "b1", cumleler: tum, ana_fikir: { id: "g1", kind: "gist" as const, q_tr: b.ana_fikir.q_tr, opts: b.ana_fikir.opts, ans: b.ana_fikir.ans, kanit: tum }, ayrinti, dikte, golge, ...(cevapla ? { cevapla } : {}) }]
  };
  const p = Video.safeParse(v);
  if (!p.success) throw new Error(`${ad}: video şemasına uymuyor: ${p.error.issues[0]?.path.join(".")} ${p.error.issues[0]?.message}`);
  return p.data;
}

/** Klasördeki klip dosyalarından, `.medya`da hizalı metni bulunanları günün videosu olarak döndürür */
export function klipVideolari(klipDir: string, medyaKaynak: string[]): { day: number; video: VideoT }[] {
  if (!existsSync(klipDir)) return [];
  const out: { day: number; video: VideoT }[] = [];
  for (const f of readdirSync(klipDir).filter((x) => /^klip-\d{2}\.json$/.test(x)).sort()) {
    const ad = f.replace(/\.json$/, "");
    const metinYol = medyaKaynak.map((m) => join(m, `${ad}.metin.json`)).find((p) => existsSync(p));
    if (!metinYol) continue;
    const k = { ...JSON.parse(readFileSync(join(klipDir, f), "utf8")), dosya: f };
    const olcumYol = join(klipDir, `${ad}.olcum.json`);
    const olcum = existsSync(olcumYol) ? JSON.parse(readFileSync(olcumYol, "utf8")) : null;
    // ölçümsüz klip bağlanmaz; hat "insan-orneklemi" dediyse İÇ'in örneklem onayı (`orneklem_onay: true`) gerekir (FORMAT.md A9)
    if (!olcum) { console.warn(`${ad}: ölçüm kaydı yok; bağlanmadı`); continue; }
    // yalnız hattın "birebir" dediği klip kendiliğinden bağlanır; öteki her etiket (ya da etiketsiz kayıt) İÇ'in örneklem onayını ister (inceleme #159 2. tur P2)
    if (olcum.etiket !== "birebir" && k.orneklem_onay !== true) { console.warn(`${ad}: örneklem onayı bekliyor (etiket: ${olcum.etiket ?? "yok"}); bağlanmadı`); continue; }
    const ham = readFileSync(metinYol);
    // inceleme #159 P1-1: ölçüm kaydı varsa metin tam o dosya olmalı (Releases'te sonradan değişen metin bağlanmaz)
    const beklenen = olcum?.varliklar?.[`${ad}.metin.json`]?.sha256;
    // özet zorunlu: ölçüm kaydında metnin sha256'sı yoksa da bağlanmaz (inceleme #159 2. tur P2)
    if (!beklenen || createHash("sha256").update(ham).digest("hex") !== beklenen) { console.warn(`${ad}: metin.json ölçüm kaydıyla doğrulanamadı (sha256 ${beklenen ? "farklı" : "yok"}); bağlanmadı`); continue; }
    const v = klipVideo(k, JSON.parse(ham.toString("utf8")), olcum);
    if (v) out.push({ day: k.day, video: v });
  }
  return out;
}
