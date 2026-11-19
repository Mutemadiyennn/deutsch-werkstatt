/**
 * Kelime Bahçesi (PM-049, #54 A13): günlük kelime tekrar turu — kartlar öğrenciye SORU olarak döner.
 * Saf fonksiyonlar; ekran `screens/Garden.tsx`.
 *
 * Soru türleri (PM-049 §2):
 *  a listen_meaning  dinle → anlamını seç                 (pasif)
 *  e article         der / die / das seç                  (pasif; renk cevaptan sonra)
 *  f colloc          eşdizimi tamamla (fiil seç)           (pasif)
 *  b photo_say       fotoğraf → artikeliyle söyle/yaz      (aktif; yalnızca isim + fotoğraf sorgusu)
 *  c tr_de           Türkçe → Almanca söyle/yaz            (aktif)
 *  d gap             boşluk doldur (forms)                 (aktif)
 *  h sep_perfekt     ayrılabilir fiil / Perfekt (forms)    (aktif; yalnızca fiil)
 *  g own_sentence    kelimeyle kendi cümleni kur           (aktif; değerlendirme kural → yoksa öğrenci, ceza yok)
 *
 * Kurallar:
 *  - Aktif soru yalnızca tanıtılmış karta sorulur (pasif yolda en az bir doğru ya da senaryoda görülmüş; PM-049 kabul).
 *  - `card: false` (işlev kelimesi, PM-047 §2) ve `tier: passive` (yalnızca tanıma) kartlar aktif soruya girmez;
 *    `card: false` hiç ayrı kart olarak sorulmaz.
 *  - Aynı karta art arda aynı tür sorulmaz (`LearnerItem.lastQ` ve tur içi).
 *  - Tur 8–12 soru: önce vadesi gelenler, sonra yeni kartlar (tekrar yükü artınca yeni sayısı düşer).
 *  - Yanlışta kart turun sonunda başka örnek cümle (ve başka fotoğraf) ile yeniden gelir.
 *  - PM-062: soru cümlesi kartın gösterim sayacından (`exSeen`) kurulur: her gün başka cümle ve onun fotoğrafı. Güçlü kartta
 *    fotoğraf cevaptan önce gösterilmez (fotoğraf sorusu seçilmez; tanıtımda ve cevap ekranında fotoğraf var).
 */
import { kartMi, type Lexeme } from "@dw/shared";
import type { LearnerItem, PersonalWord } from "@dw/shared";
import { isDue } from "./srs.ts";

export type QType = "listen_meaning" | "article" | "colloc" | "photo_say" | "tr_de" | "gap" | "sep_perfekt" | "own_sentence";
export const PASSIVE_Q: QType[] = ["listen_meaning", "article", "colloc"];
export const ACTIVE_Q: QType[] = ["tr_de", "photo_say", "gap", "sep_perfekt", "own_sentence"];
export const pathOf = (t: QType): "passive" | "active" => (PASSIVE_Q.includes(t) ? "passive" : "active");

export interface GardenQ {
  lexId: string;
  type: QType;
  /** yeni kart: soru öncesi tanıtım (fotoğraf, kelime, ses, anlam) */
  intro?: boolean;
  /** örnek cümle sırası (yanlışta bir sonraki örnek) */
  ex: number;
  /** PM-069 madde 3: tanıtımı ayrı yapılmış yeni kartın ilk sorusu (tanıtımdan en az 2 öğe sonra gelir) */
  ilkSoru?: boolean;
  /** turda kaçıncı deneme (yanlıştan sonra 1) */
  retry?: number;
  /** B16: yeni kart "Biliyorum, sına beni" — tanıtım yok; tek üretim sorusu (TR→DE, ipucusuz, isimde artikel) */
  sina?: boolean;
}

/** B16 sına kabulü: isimde artikel zorunlu (artikelsiz kabul edilmez), öteki türlerde TR→DE kabulü */
export const sinaKabul = (l: Lexeme): string[] => (isNoun(l) ? [`${l.art} ${l.de}`] : accepted(l, "tr_de"));
/** Kendiliğinden öneri: art arda bu kadar yeni kart ilk tanıma sorusunda hızlı (≤ HIZLI_SN) ve doğru bilinince */
export const ONERI_ART_ARDA = 3;
export const HIZLI_SN = 8;
/** Tura hızlı şerit uygula: yeni kartların tanıtımı sına sorusuna döner (tekrar kartları ve yanlış tekrarları aynen) */
export const sinaTuru = (round: GardenQ[], bas = 0): GardenQ[] => round.map((q, i) => (i >= bas && q.intro && !q.retry ? { ...q, intro: false, sina: true, type: "tr_de" as QType } : q));

export const isNoun = (l: Lexeme) => l.pos === "noun" && !!l.art;

/**
 * PM-062 4(b): üretim yolunda bu kararlılığa (gün) ulaşan kart "güçlü" sayılır; fotoğraf ezberini kırmak için fotoğraf
 * sorusu (photo_say) artık seçilmez. `policy.json` gelene kadar sabit (D-111).
 */
export const GUCLU_GUN = 10;
export const guclu = (it: LearnerItem | undefined) => (it?.active.fsrs?.stability ?? 0) >= GUCLU_GUN;
/** Gösterilen cümleden sonra yazılacak sayaç (geri gitmez): sonraki oturum gösterilenin ardından başlar */
export const sonrakiExSeen = (it: LearnerItem | undefined, gosterilen: number) => Math.max(it?.exSeen ?? 0, gosterilen + 1);
/** Kartın sıradaki cümle sırası: gösterim sayacı (havuz kendi uzunluğuna göre döner) */
export const siradakiEx = (it: LearnerItem | undefined) => it?.exSeen ?? 0;
/** Soru türüne göre cümle havuzu: boşluk soruları `forms`, ötekiler `examples` */
export function havuz(l: Lexeme, t: QType): number { return t === "gap" ? otherForms(l).length : t === "sep_perfekt" ? verbForms(l).length : l.examples.length; }
/** yalnızca çoğul isim (die Daten, die Eltern): artikel sorusu "die"yi cinsiyet gibi öğretmesin (inceleme #59 P2-4) */
const PLURALIA = new Set(["Eltern", "Großeltern", "Leute", "Geschwister", "Ferien", "Kosten", "Daten", "Personalien", "Masern", "Pommes", "Spaghetti", "Möbel"]);
export const pluralOnly = (l: Lexeme) => isNoun(l) && PLURALIA.has(l.de);
const tokens = (s: string) => s.trim().replace(/[.,!?;:„“"»«()]/g, " ").split(/\s+/).filter(Boolean);
/** Eşdizim sorusuna uygun eşdizim: en az 2 kelime ve gövdesi kartın diğer eşdizimlerinde tekrar etmiyor (tek doğru cevap) */
export function collocOf(l: Lexeme): { de: string; tr: string; stem: string; last: string } | null {
  // yer tutuculu eşdizim ("Ich mag …") soru olamaz: doğru şık "…" olurdu (inceleme #59 2. tur Y-1)
  const all = l.collocations.filter((c) => !/…|\.\.\./.test(c.de)).map((c) => { const w = tokens(c.de); return { de: c.de, tr: c.tr, last: w[w.length - 1] ?? "", stem: w.slice(0, -1).join(" ") }; }).filter((c) => c.stem && c.last);
  return all.find((c) => all.filter((x) => x.stem.toLowerCase() === c.stem.toLowerCase()).length === 1) ?? null;
}
/** PM-047 §2: işlev kelimeleri kart değildir (ortak kural `kartMi`, içerik derlemesi de kullanır) */
export const isCard = (l: Lexeme) => kartMi(l);
const verbForms = (l: Lexeme) => l.forms.filter(() => l.pos === "verb");
const otherForms = (l: Lexeme) => l.forms.filter(() => l.pos !== "verb");

/** Bu karta bu yolda sorulabilecek türler (içeriğin taşıdığı veriye göre) */
export function availableTypes(l: Lexeme, path: "passive" | "active"): QType[] {
  if (path === "passive") {
    const t: QType[] = ["listen_meaning"];
    // `tier: passive` yalnızca tanıma: dinle → anlamını seç (a); artikel ve eşdizim üretime yakın (inceleme #55 2. tur kabulü)
    if (l.tier === "passive") return t;
    if (isNoun(l) && !pluralOnly(l)) t.push("article");
    if (collocOf(l)) t.push("colloc");
    return t;
  }
  if (!isCard(l) || l.tier === "passive") return [];
  const t: QType[] = ["tr_de"];
  if (isNoun(l) && l.img) t.push("photo_say");
  if (otherForms(l).length) t.push("gap");
  if (verbForms(l).length) t.push("sep_perfekt");
  t.push("own_sentence");
  return t;
}

/** Aynı tür art arda gelmez; kalanlar arasında sırayla (rng ile karıştırılabilir) */
export function pickType(l: Lexeme, path: "passive" | "active", last: string | undefined, rng: () => number = Math.random, exclude: QType[] = []): QType | null {
  const all0 = availableTypes(l, path);
  const all = all0.filter((t) => !exclude.includes(t)).length ? all0.filter((t) => !exclude.includes(t)) : all0;
  if (!all.length) return null;
  const pool = all.length > 1 ? all.filter((t) => t !== last) : all;
  return pool[Math.floor(rng() * pool.length) % pool.length]!;
}

/**
 * PM-069 madde 3: tanıtım ile o kartın ilk sorusu arasına en az 2 öğe girer ("tanıt A, tanıt B, tanıt C, sor A, …").
 * Tanıtım bitince ilk soru `ARALIK` öğe sonrasına eklenir (tur kısaysa sona). `exi`: tanıtımda en son gösterilen cümle.
 */
export const ARALIK = 2;
export function ertele(round: GardenQ[], i: number, exi: number): GardenQ[] {
  const q = round[i]!;
  const soru: GardenQ = { lexId: q.lexId, type: "listen_meaning", ex: exi, ilkSoru: true };
  // sorular sırasını korur ve kümelenmez (tanıt A, tanıt B, tanıt C, sor A, tanıt D, sor B, …): son ilk sorudan en az bir öğe sonra
  let son = -1; round.forEach((x, k) => { if (k > i && x.ilkSoru) son = k; });
  const yer = Math.min(Math.max(i + 1 + ARALIK, son + 2), round.length);
  return [...round.slice(0, yer), soru, ...round.slice(yer)];
}
/** İlk üretim sorusundan önce köprü: artikel ya da eşdizim seçmeli (PM-069 madde 3); bu kartta henüz sorulmadıysa */
export function kopruGerek(it: LearnerItem, l: Lexeme): boolean {
  const kopru = availableTypes(l, "passive").filter((t) => t !== "listen_meaning");
  return !it.active.fsrs && kopru.length > 0 && !["article", "colloc"].includes(it.lastQ ?? "") && it.passive.n < 3;
}

/** Kart tanıtılmış mı (aktif soru için ön koşul) */
export const introduced = (it: LearnerItem | undefined) => !!it && (it.passive.ok > 0 || it.active.ok > 0 || (it.passive.n > 0 && it.active.n > 0));

export interface RoundOpts {
  max?: number; min?: number; newMax?: number; rng?: () => number; now?: Date;
  /** öncelikli yeni kartlar ("Duyduğum kelime", "Nasıl derim?"; LS-7.5): tekrar yükü ne olursa olsun en çok 2'si bu turda */
  priority?: string[];
  /** bugün için kalan yeni kart hakkı (LS-7.4: ~25 pasif, ~12 aktif) */
  newLeft?: number; activeLeft?: number;
  /**
   * M1 günü (Seans 1): yeni kartlara ayrılan yer — tekrar yükü ne olursa olsun turda en az bu kadar yeni kart
   * (havuzda varsa) gelir; günün kartları vadesi gelen tekrarların arkasında kalmaz (inceleme #66 P1-3)
   */
  yeniAyir?: number;
}

/** Tanıtılmış ama henüz üretim (aktif) yolu açılmamış kart: aktif soruya geçmeye hazır (inceleme #59 P0-2) */
export const activatable = (it: LearnerItem | undefined, l: Lexeme) => !!it && it.passive.ok > 0 && !it.active.fsrs && availableTypes(l, "active").length > 0;

/** Bugün tanıtılan (pasif) ve üretime açılan (aktif) kart sayısı (LS-7.4 günlük sınır) */
export function startedToday(items: Iterable<LearnerItem>, now = new Date()): { passive: number; active: number } {
  // yerel gün (öğrencinin gece yarısı), UTC değil
  const day = localDay(now);
  const on = (iso?: string) => !!iso && localDay(new Date(iso)) === day;
  let passive = 0, active = 0;
  for (const it of items) { if (on(it.firstAt?.passive)) passive++; if (on(it.firstAt?.active)) active++; }
  return { passive, active };
}
const localDay = (d: Date) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
export const DAILY_NEW = 25, DAILY_ACTIVE = 12;

/**
 * M1 günü yeni kart hakkı (inceleme #66): günün kartları takvim sınırına takılmaz; kişisel kelimeler (duyduğum, nasıl derim)
 * yalnızca takvim hakkı kalmışsa ve günün kartlarının yerini almadan gelir (en çok 2).
 */
export function m1Hak(takvim: number, kalan: number, kisisel: number): { newLeft: number; kisiselIzin: boolean } {
  const izin = takvim > 0 && kisisel > 0;
  return { newLeft: kalan + (izin ? Math.min(2, takvim, kisisel) : 0), kisiselIzin: izin };
}

/**
 * Bir tur kurar. `items`: öğrenci modeli (yalnızca lexeme türü kullanılır). `pool`: yeni kart adayları sırasıyla.
 * Sıra: vadesi gelen aktif → üretime açılan (tanıtılmış) kartlar → vadesi gelen pasif → öncelikli yeni (duyduğum) → yeni.
 */
export function buildRound(lex: Map<string, Lexeme>, items: Map<string, LearnerItem>, pool: string[], o: RoundOpts = {}): GardenQ[] {
  const max = o.max ?? 12, min = o.min ?? 8, rng = o.rng ?? Math.random, now = o.now ?? new Date();
  const newLeft = Math.max(0, o.newLeft ?? DAILY_NEW), activeLeft = Math.max(0, o.activeLeft ?? DAILY_ACTIVE);
  const prio = (o.priority ?? []).filter((id) => !items.has(id) && lex.has(id) && isCard(lex.get(id)!)).slice(0, Math.min(2, newLeft));
  const ayir = Math.max(0, Math.min(o.yeniAyir ?? 0, newLeft - prio.length));
  const cap = max - prio.length - ayir;
  const out: GardenQ[] = [];
  const used = new Set<string>();
  const add = (id: string, path: "passive" | "active") => {
    if (out.length >= cap || used.has(id)) return;
    // ilk üretim sorusu "kendi cümlen" olmaz: önce kelimeyi söyletir (inceleme #59 2. tur)
    const first = path === "active" && !items.get(id)?.active.fsrs;
    const it = items.get(id);
    const t = pickType(lex.get(id)!, path, it?.lastQ, rng, [...(first ? ["own_sentence" as const] : []), ...(guclu(it) ? ["photo_say" as const] : [])]);
    if (t) { out.push({ lexId: id, type: t, ex: siradakiEx(it) }); used.add(id); }
  };
  const kopru: { id: string; at: number }[] = [];
  const addKopru = (id: string) => {
    if (out.length >= cap || used.has(id)) return;
    const t = pickType(lex.get(id)!, "passive", items.get(id)?.lastQ, rng, ["listen_meaning"]);
    if (t && t !== "listen_meaning") { out.push({ lexId: id, type: t, ex: siradakiEx(items.get(id)) }); used.add(id); }
  };
  const dueA: { id: string; at: number }[] = [], dueP: { id: string; at: number }[] = [], ready: { id: string; at: number }[] = [];
  for (const it of items.values()) {
    if (it.kind !== "lexeme" || !lex.has(it.itemId)) continue;
    const l = lex.get(it.itemId)!;
    if (!isCard(l)) continue;
    if (introduced(it) && availableTypes(l, "active").length && isDue(it, "active", now)) dueA.push({ id: it.itemId, at: Date.parse(it.active.fsrs!.due) });
    else if (activatable(it, l) && kopruGerek(it, l)) kopru.push({ id: it.itemId, at: Date.parse(it.passive.last || "0") });
    else if (activatable(it, l)) ready.push({ id: it.itemId, at: Date.parse(it.passive.last || it.passive.fsrs?.due || "0") });
    else if (isDue(it, "passive", now)) dueP.push({ id: it.itemId, at: Date.parse(it.passive.fsrs!.due) });
  }
  // 1) vadesi gelen üretim, 2) tanıtılmış kartların ilk üretim sorusu (günlük ve tur sınırıyla), 3) vadesi gelen tanıma
  for (const d of dueA.sort((a, b) => a.at - b.at)) add(d.id, "active");
  for (const d of ready.sort((a, b) => a.at - b.at).slice(0, Math.min(4, activeLeft))) add(d.id, "active");
  // köprü: üretime açılacak kartın artikel/eşdizim seçmelisi (tanıma yolunda, dinle-anlam dışında)
  for (const d of kopru.sort((a, b) => a.at - b.at)) addKopru(d.id);
  for (const d of dueP.sort((a, b) => a.at - b.at)) add(d.id, "passive");
  // 4) yeni kartlar: tanıtım + pasif soru; tekrar yükü arttıkça yeni sayısı düşer; öncelikliler her zaman (ayrılmış yer)
  for (const id of prio) { out.push({ lexId: id, type: "listen_meaning", intro: true, ex: 0 }); used.add(id); }
  const room = Math.max(0, max - out.length);
  const left = newLeft - prio.length;
  // vadesi gelen az ise tur yeni kartlarla en az `min`e tamamlanır (tek başına yeni kart turu 10); tekrar yükü yüksekse en çok 2 yeni
  const newMax = Math.max(0, Math.min(left, ayir ? Math.min(Math.max(ayir, o.newMax ?? 10), room) : out.length >= min ? Math.min(2, room) : Math.min(o.newMax ?? 10, room)));
  let added = 0;
  for (const id of pool) {
    if (added >= newMax) break;
    if (used.has(id) || items.has(id)) continue;
    const l = lex.get(id);
    if (!l || !isCard(l)) continue;
    out.push({ lexId: id, type: "listen_meaning", intro: true, ex: 0 }); used.add(id); added++;
  }
  return out;
}

/**
 * Kişisel banka (#58 A3, LS-7.5): "Duyduğum kelime" ve "Nasıl derim?" ile eklenen kelimeler sözlükte bir karta karşılık
 * geliyorsa öncelikli yeni kart olur (`RoundOpts.priority`; tekrar yükü yüksek olsa da turda yer ayrılır).
 * Eşleşme: önce büyük/küçük harf dahil birebir (essen ≠ Essen), yoksa tek adaylıysa harf duyarsız; artikel (der/die/das,
 * ein/eine/einen…) atılır; çoğul biçim (Termine) de eşleşir. Karşılığı olmayan kelime kişisel listede kalır.
 */
export function personalMatch(personal: { de: string }[], all: Lexeme[]): string[] {
  const ART = /^(der|die|das|ein|eine|einen|einem|einer)\s+/i;
  const cards = all.filter((l) => isCard(l) && l.tier !== "passive");
  const find = (k: string, exact: boolean, by: (l: Lexeme) => string | undefined) =>
    cards.filter((l) => { const f = by(l); return !!f && (exact ? f === k : f.toLowerCase() === k.toLowerCase()); });
  const mine: string[] = [];
  for (const w of personal) {
    const raw = w.de.trim().replace(/[.!?]+$/, "");
    const art = ART.exec(raw)?.[1]?.toLowerCase();
    const k = raw.replace(ART, "").trim();
    // sıra: tekil birebir → tekil harf duyarsız (tek aday) → çoğul birebir; artikel verilmişse uyan aday seçilir ("die Daten" ≠ das Datum)
    let hit: Lexeme | undefined;
    // kartın kendisi noktalamalı olabilir ("Freut mich!"), ifade artikel gibi başlayabilir ("ein bisschen"; inceleme #78 P1-4)
    const sing = (l: Lexeme) => l.de.replace(/[.!?]+$/, ""), plur = (l: Lexeme) => (l.pl && l.pl !== "-" ? l.pl : undefined);
    for (const [exact, by, key] of [[true, sing, k], [true, sing, raw], [false, sing, k], [true, plur, k]] as const) {
      const c = find(key, exact, by);
      // belirli artikel: tekilde kartın artikeli, çoğulda "die"
      const fit = art && ["der", "die", "das"].includes(art) ? c.filter((l) => (by === plur ? art === "die" : !l.art || l.art === art)) : c;
      const pick = fit.length ? fit : c;
      if (pick.length === 1 || (exact && pick.length)) { hit = pick[0]; break; }
    }
    if (hit && !mine.includes(hit.id)) mine.push(hit.id);
  }
  return mine;
}

/** Yanlış cevap: kart turun sonuna, başka örnek cümleyle ve (aynı yolda) başka türle geri gelir — bir kez */
export function requeue(round: GardenQ[], q: GardenQ, l: Lexeme, rng: () => number = Math.random, it?: LearnerItem): GardenQ[] {
  if (q.retry) return round;
  // güçlü kartta tekrar da fotoğraf sorusu olmaz (PM-062 4b; inceleme #92 P1-2)
  const t = pickType(l, pathOf(q.type), q.type, rng, guclu(it) ? ["photo_say"] : []) || q.type;
  // ham sayaç: her havuz (örnekler, boşluklar) kendi uzunluğuna göre döner; mod örnek sayısıyla alınırsa boşluk havuzunda
  // aynı cümleye düşebilirdi (PM-062 madde 3)
  const ex = q.ex + 1;
  return [...round, { lexId: q.lexId, type: t, ex, retry: 1 }];
}

/** Çeldirici yakınlığı (PM 7011722598 madde 5): `tur` = bu turun ve M1 gününün kartları; `bilinen` = öğrencinin tanıdığı kartlar */
export interface Yakinlik { tur?: Set<string>; bilinen?: Set<string> }

/**
 * Anlam seçenekleri: doğru + aynı türden 3 çeldirici. Çeldirici eleme ile değil ayırt ederek bilinsin: önce **aynı turun /
 * günün kartları** (günler için öteki günler), sonra öğrencinin tanıdığı ve aynı alandan kartlar; en çok **1 uzak**
 * çeldirici (yakın sıklıkta, tercihen tanıdık). Yakın aday yoksa eski davranış (yakın sıklık).
 */
export function meaningOptions(l: Lexeme, all: Lexeme[], rng: () => number = Math.random, y: Yakinlik = {}): { opts: string[]; ans: number } {
  // tek doğru cevap: aynı Almanca kelime (eşsesli kart) ve Türkçe anlamı kesişen kart çeldirici olamaz (inceleme #100 P1-1:
  // Uhr "saat" ↔ Stunde "saat, ders saati")
  const benim = trAnahtar(l.tr), deKucuk = l.de.toLowerCase();
  const uygun = all.filter((x) => x.id !== l.id && x.pos === l.pos && x.tr !== l.tr && isCard(x) && x.de.toLowerCase() !== deKucuk && ![...trAnahtar(x.tr)].some((k) => benim.has(k)));
  const alan = new Set(l.domains ?? []);
  const derece = (x: Lexeme) => (y.tur?.has(x.id) ? 2 : y.bilinen?.has(x.id) && (x.domains ?? []).some((d) => alan.has(d)) ? 1 : 0);
  const uzaklik = (x: Lexeme) => Math.abs((x.freqRank ?? 9e9) - (l.freqRank ?? 9e9));
  const pick: string[] = [];
  const al = (havuz: Lexeme[], n: number) => {
    const h = [...havuz];
    while (pick.length < n && h.length) { const x = h.splice(Math.floor(rng() * h.length) % h.length, 1)[0]!; if (!pick.includes(x.tr)) pick.push(x.tr); }
  };
  // yakın: önce tur/gün, sonra tanıdık + aynı alan; her kademede sıklıkça en yakın 8'den rastgele
  for (const d of [2, 1]) al(uygun.filter((x) => derece(x) === d).sort((a, b) => uzaklik(a) - uzaklik(b)).slice(0, 8), 3);
  const yakinSayi = pick.length;
  // uzak: yakın ≥2 ise en çok 1 (toplam 3); tanıdık kart önce
  const uzak = uygun.filter((x) => derece(x) === 0).sort((a, b) => Number(!!y.bilinen?.has(b.id)) - Number(!!y.bilinen?.has(a.id)) || uzaklik(a) - uzaklik(b)).slice(0, 12);
  al(uzak, yakinSayi >= 2 ? Math.min(3, yakinSayi + 1) : 3);
  const opts = [...pick];
  const ans = Math.floor(rng() * (opts.length + 1)) % (opts.length + 1);
  opts.splice(ans, 0, l.tr);
  return { opts, ans };
}

/** Eşdizim sorusu: "einen Termin ___" → doğru son kelime + 2 çeldirici. Çeldirici, gövdeyle birlikte herhangi bir kartta
 *  geçerli bir eşdizim oluşturuyorsa kullanılmaz ("Zeit ___": verbringen de doğru); noktalama atılır (inceleme #59 P1-5). */
export function collocQuestion(l: Lexeme, all: Lexeme[], rng: () => number = Math.random): { stem: string; tr: string; opts: string[]; ans: number } | null {
  const c = collocOf(l);
  if (!c) return null;
  const key = (s: string) => tokens(s).join(" ").toLowerCase();
  const valid = new Set<string>();
  for (const x of all) for (const k of x.collocations) valid.add(key(k.de));
  const lower = /^[a-zäöüß]/.test(c.last);
  const others = new Set<string>();
  for (const x of all) for (const k of x.collocations) {
    const lw = tokens(k.de).pop();
    if (!lw || lw.toLowerCase() === c.last.toLowerCase() || /^[a-zäöüß]/.test(lw) !== lower || lw.length < 3) continue;
    if (valid.has(key(`${c.stem} ${lw}`))) continue;
    others.add(lw);
    if (others.size > 60) break;
  }
  const pool = [...others];
  const opts: string[] = [];
  while (opts.length < 2 && pool.length) opts.push(pool.splice(Math.floor(rng() * pool.length) % pool.length, 1)[0]!);
  if (opts.length < 2) return null;
  const ans = Math.floor(rng() * (opts.length + 1)) % (opts.length + 1);
  opts.splice(ans, 0, c.last);
  return { stem: c.stem + " ___", tr: c.tr, opts, ans };
}

/** Üretim sorusunun kabul edilen cevapları */
export function accepted(l: Lexeme, t: QType, formIdx = 0): string[] {
  const withArt = isNoun(l) ? `${l.art} ${l.de}` : l.de;
  switch (t) {
    case "photo_say": return [withArt];
    // çok biçimli başlık ("anderer, andere, anderes"): her biçim tek başına doğru (inceleme #59 2. tur Y-2)
    case "tr_de": {
      // "weh (tun)": parantezli kısım isteğe bağlı → "weh" ve "weh tun"
      const heads = l.de.split(/\s*,\s*/).flatMap((h) => /\(.+\)/.test(h) ? [h.replace(/\s*\(.*?\)\s*/g, " ").trim(), h.replace(/[()]/g, "").trim()] : [h]).filter(Boolean);
      return isNoun(l) ? [withArt, l.de] : heads.length > 1 || heads[0] !== l.de ? [...new Set([...heads, l.de])] : [l.de];
    }
    case "gap": case "sep_perfekt": {
      const f = (t === "gap" ? otherForms(l) : verbForms(l))[formIdx % Math.max(1, l.forms.length)];
      if (!f) return [l.de];
      // boşluğa gelen kelime(ler) ya da bütün cümle (inceleme #59 P1-2): "sage … ab" → "Ich sage den Termin ab."
      // `also_ok`: eş anlamlı başka doğru cevaplar da aynı biçimlerle (İÇ 7003635425-2)
      const bicim = (cevap: string) => {
        const a = cevap.trim(), parts = a.split(/\s*…\s*/);
        let k = 0;
        const full = f.de.replace(/___/g, () => parts[k++] ?? "").replace(/\s+/g, " ").trim();
        return [a, a.replace(/\s*…\s*/g, " ").replace(/\s+/g, " "), ...(k === parts.length ? [full] : [])];
      };
      return [...new Set([f.answer, ...(f.also_ok ?? [])].flatMap(bicim))];
    }
    default: return [l.de];
  }
}
export function formFor(l: Lexeme, t: QType, i = 0) { const list = t === "gap" ? otherForms(l) : verbForms(l); return list.length ? list[i % list.length] : undefined; }

/**
 * PM-069 P0 ("öğretilmeden isteme yok"): boşluğun cevabı öğrenciye gösterilmiş mi?
 * Cevabın her kelimesi şunlardan birinde olmalı: kartın kendi kelimesi ve çekimleri (gövde eşleşmesi), kartın eşdizimleri
 * (tanıtım kartında hepsi gösterilir), öğrencinin daha önce gördüğü (tanıtılmış) kartların kelimeleri (`gorulen`).
 */
/** Kartta gösterilen çoğul ("-" ya da boşsa yok); Bahçe tanıtım ve cevap kartı bunu basar, boşluk kuralı da bunu sayar (inceleme #122 2. tur) */
export const gosterilenCogul = (l: Lexeme): string | undefined => (l.pl && l.pl.trim() !== "-" && l.pl.trim() !== l.de ? l.pl.trim() : undefined);
export function cevapGosterildi(l: Lexeme, cevap: string, gorulen: Set<string> = new Set()): boolean {
  const kelimeler = tokens(cevap.toLowerCase().replace(/\s*…\s*/g, " "));
  if (!kelimeler.length) return false;
  // kartın kendi kelimesi: yalnızca kartta GÖSTERİLEN biçimler (başlık, artikel, çoğul). Gövde eşleşmesi yok: Perfekt ortacı,
  // Präteritum ve hâl biçimleri tanıtılmadıkça sorulmaz (inceleme #122 P0-1)
  const kendi = new Set(tokens(`${l.art ?? ""} ${l.de} ${gosterilenCogul(l) ?? ""}`.toLowerCase().replace(/[()]/g, " ")));
  const eszizim = new Set(l.collocations.flatMap((c) => tokens(c.de.toLowerCase())));
  return kelimeler.every((x) => kendi.has(x) || eszizim.has(x) || gorulen.has(x));
}
/**
 * Sorulabilir boşluk: `i`'den başlayarak cevabı gösterilmiş ilk biçim; hiçbiri yoksa null (soru türü değişir).
 */
export function ogretilmisForm(l: Lexeme, t: QType, i = 0, gorulen: Set<string> = new Set()): number | null {
  const list = t === "gap" ? otherForms(l) : verbForms(l);
  for (let d = 0; d < list.length; d++) {
    const k = (i + d) % list.length;
    if (cevapGosterildi(l, list[k]!.answer, gorulen)) return k;
  }
  return null;
}
/** Artikel ve hâl biçimleri: başka kartın artikeli bu kartın hâl boşluğunu "görülmüş" yapmaz (inceleme #122 P1-1) */
const ARTIKEL = new Set(["der", "die", "das", "den", "dem", "des", "ein", "eine", "einen", "einem", "einer", "eines"]);
/** Öğrencinin gördüğü kelimeler: tanıtılmış kartların başlık kelimeleri ve eşdizimleri (artikeller hariç), küçük harf */
export function gorulenKelimeler(lex: Map<string, Lexeme>, tanitilan: Iterable<string>): Set<string> {
  const g = new Set<string>();
  for (const id of tanitilan) {
    const x = lex.get(id); if (!x) continue;
    for (const w of tokens([x.de, gosterilenCogul(x) ?? "", ...x.collocations.map((c) => c.de)].join(" ").toLowerCase().replace(/[()]/g, " "))) if (!ARTIKEL.has(w)) g.add(w);
  }
  return g;
}
/** Tanıtılmış kart: Bahçe'de değerlendirilmiş (FSRS kaydı) ya da doğru cevaplanmış; tespitte yalnızca yanlış görülen sayılmaz (P1-2) */
export const tanitildi = (it: LearnerItem) => !!(it.passive.fsrs || it.active.fsrs || it.passive.ok > 0 || it.active.ok > 0);
/** Boşluk sorusunun gerçekleşen türü ve biçimi (Garden bunu kullanır; birim testli) */
export function boslukSecimi(l: Lexeme, t: QType, ex: number, gorulen: Set<string>): { tip: QType; fi: number; sorulabilir: number } {
  if (t !== "gap" && t !== "sep_perfekt") return { tip: t, fi: ex, sorulabilir: 0 };
  const list = t === "gap" ? otherForms(l) : verbForms(l);
  const sorulabilir = list.filter((f) => cevapGosterildi(l, f.answer, gorulen)).length;
  const fi = ogretilmisForm(l, t, ex, gorulen);
  return fi === null ? { tip: "tr_de", fi: ex, sorulabilir } : { tip: t, fi, sorulabilir };
}

/** Ayrılabilir fiil önekleri (absagen → sage … ab) */
const SEP = ["ab", "an", "auf", "aus", "bei", "ein", "fest", "fort", "her", "hin", "los", "mit", "nach", "vor", "weg", "zu", "zurück", "zusammen"];
/**
 * (g) kendi cümlesi: en az 3 kelime ve kelime (ya da çekimi) cümlede mi. Değerlendirme yapay zekâsız ve CEZASIZ:
 * "missing" yalnızca öğrenciye ipucudur; karar öğrencinindir (inceleme #59 P1-1). Çekim: gövde (sag-, ruf-), Präsens 3
 * (nimmt → nimm-), Perfekt ortacı, çoğul; ayrılabilir fiilde gövde + önek ayrı kelimeler olabilir.
 */
export function ownSentenceCheck(l: Lexeme, answer: string): "ok" | "missing" | "short" {
  const w = tokens(answer.toLowerCase());
  if (w.length < 3) return "short";
  const lemma = l.de.toLowerCase().split(/[\s,]+/)[0]!;
  const prefix = l.pos === "verb" ? SEP.filter((p) => lemma.startsWith(p) && lemma.length > p.length + 3).sort((a, b) => b.length - a.length)[0] : undefined;
  const base = prefix ? lemma.slice(prefix.length) : lemma;
  const stemOf = (x: string) => x.replace(/(en|n|e|t|st)$/, "");
  const stems = [stemOf(base), l.verb?.praesens3 ? stemOf(l.verb.praesens3.toLowerCase().split(/\s+/)[0]!) : ""].filter((x) => x.length >= 3);
  const forms = [lemma, l.pl?.toLowerCase(), l.verb?.praesens3?.toLowerCase().split(/\s+/)[0], l.verb?.perfekt?.toLowerCase().split(/\s+/).pop()].filter(Boolean) as string[];
  const hasStem = w.some((x) => forms.includes(x) || stems.some((st) => x.startsWith(st) || x.startsWith("ge" + st) || (!!prefix && (x.startsWith(prefix + st) || x.startsWith(prefix + "ge" + st)))));
  if (!hasStem) return "missing";
  // ayrılabilir fiil çekimli kullanılmışsa önek de cümlede olmalı (sage … ab); mastar/ortaç biçiminde önek bitişik
  if (prefix && !w.some((x) => x.startsWith(prefix)) && !w.includes(prefix)) return "missing";
  return "ok";
}

/**
 * Aynı Türkçe karşılığı taşıyan başka kart (sprechen/reden, Arbeit/Job): öğrenci onu söylediyse ceza yok, aranan kelime
 * istenir. Aynı sözcük türü şartı; parantezli açıklama anlamın parçası sayılır (inceleme #59 3. tur).
 */
/** Türkçe anlam anahtarları; parantezli açıklama anlamın parçasıdır: "tutmak (süre)" ≠ "tutmak (fiyat)" */
export const trAnahtar = (tr: string) => new Set(tr.toLowerCase().split(/[,;/](?![^(]*\))|\bya da\b/).map((x) => x.replace(/\s+/g, " ").trim()).filter((x) => x.length > 1));

export function synonymHit(l: Lexeme, answer: string, all: Lexeme[]): Lexeme | null {
  const keys = trAnahtar;
  const mine = keys(l.tr);
  const a = answer.trim().toLowerCase().replace(/[.!?]+$/, "").replace(/^(der|die|das)\s+/, "");
  for (const x of all) {
    if (x.id === l.id || !isCard(x) || x.pos !== l.pos) continue;
    if (![...keys(x.tr)].some((k) => mine.has(k))) continue;
    if (x.de.toLowerCase().split(/\s*,\s*/).includes(a)) return x;
  }
  return null;
}
