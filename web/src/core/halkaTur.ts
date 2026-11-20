/**
 * AKIS AK-10 3. adım (TARGET3b 3. ve 4. ekran): halkanın iki yeni adım türü, saf çekirdek.
 *  - `resimden_sec`: kelime duyulur, dört görselden doğrusu seçilir. Görseller yalnız seçilmiş açık fotoğraflardan (atıflı, çevrimdışı
 *    önbellekte); sunucu araması kullanılmaz. Kartın kendi fotoğrafı ya da 3 fotoğraflı çeldirici yoksa tür bu kart için uygun değildir.
 *  - `eslestir`: 4–6 Almanca kelime Türkçesiyle eşleşir. "Kontrol et" yok; yanlışta ceza yok, kart halkada bir kez daha gelir.
 * Ekran yok (AK-10 4. adım); bileşenler `ui/halkaTur.tsx`.
 */
import type { Lexeme } from "@dw/shared";
import { isCard, isNoun, trAnahtar } from "./garden.ts";

/** Tohumlu, kararlı rastgele (aynı tohum → aynı seçenekler; plan tekrar kurulunca soru değişmez) */
export function tohumluRng(tohum: string): () => number {
  let h = 1779033703 ^ tohum.length;
  for (let i = 0; i < tohum.length; i++) { h = Math.imul(h ^ tohum.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
  return () => { h = Math.imul(h ^ (h >>> 16), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); h ^= h >>> 16; return (h >>> 0) / 4294967296; };
}

const karistir = <T>(a: readonly T[], r: () => number): T[] => {
  const x = [...a];
  for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)) % (i + 1); [x[i], x[j]] = [x[j]!, x[i]!]; }
  return x;
};

/** Kartın görselinin anahtarı (seçilmiş açık fotoğraf haritası: `lx:Winter#kart`) */
export const kartGorsel = (id: string) => `${id}#kart`;

/** Kartın duyulan biçimi: isimde artikelle */
export const duyulan = (l: Lexeme) => (isNoun(l) ? `${l.art} ${l.de}` : l.de);

/** İki kartın anlamı karışabilir mi (aynı Almanca ya da kesişen Türkçe anlam): ikisi aynı soruda seçenek olamaz */
export function karisir(a: Lexeme, b: Lexeme): boolean {
  if (a.id === b.id || a.de.toLowerCase() === b.de.toLowerCase() || a.tr === b.tr) return true;
  const ka = trAnahtar(a.tr);
  return [...trAnahtar(b.tr)].some((k) => ka.has(k));
}

export interface ResimSecenek { kart: string; gorsel: string }
export interface ResimSoru { kart: string; secenekler: ResimSecenek[]; dogru: number }

/**
 * Resimden seç: doğru kart + 3 fotoğraflı çeldirici. Çeldirici sırası: önce aynı tür (isim–isim), sonra öteki kartlar.
 * Aynı fotoğraf (src) iki kez çıkmaz. Uygun değilse null (planlayıcı bu türü o kart için önermez).
 * @param harita seçilmiş açık fotoğraf haritası (`foto.json`): anahtar → { src }
 */
export function resimSecenekleri(kart: Lexeme, adaylar: readonly Lexeme[], harita: Readonly<Record<string, { src: string }>>, tohum: string): ResimSoru | null {
  const kendi = harita[kartGorsel(kart.id)];
  if (!kendi) return null;
  const r = tohumluRng(`${tohum}|resim|${kart.id}`);
  const goruldu = new Set([kendi.src]);
  const uygun = adaylar.filter((x) => isCard(x) && !!harita[kartGorsel(x.id)] && !karisir(kart, x));
  const ayniTur = karistir(uygun.filter((x) => x.pos === kart.pos), r), oteki = karistir(uygun.filter((x) => x.pos !== kart.pos), r);
  const cel: Lexeme[] = [];
  for (const x of [...ayniTur, ...oteki]) {
    if (cel.length >= 3) break;
    const src = harita[kartGorsel(x.id)]!.src;
    // çeldiriciler birbirine de karışmasın (iki "kış" görseli tek doğruyu bozar)
    if (goruldu.has(src) || cel.some((c) => karisir(c, x))) continue;
    goruldu.add(src); cel.push(x);
  }
  if (cel.length < 3) return null;
  const dogru = Math.floor(r() * 4) % 4;
  const kartlar = cel.map((x) => x.id); kartlar.splice(dogru, 0, kart.id);
  return { kart: kart.id, secenekler: kartlar.map((k) => ({ kart: k, gorsel: harita[kartGorsel(k)]!.src })), dogru };
}

/* ---------- Eşleştir ---------- */

export const ESLESTIR_EN_AZ = 4, ESLESTIR_EN_COK = 6;

export interface EslestirDurum {
  /** sol sütun (Almanca), sağ sütun (Türkçe): kart kimlikleri */
  sol: string[]; sag: string[];
  /** kilitlenen (doğru eşleşmiş) kartlar */
  bitti: string[];
  /** en az bir kez yanlış eşleştirilen ya da "göster" ile açılan kartlar: halkada bir kez daha gelir */
  yanlis: string[];
  /** seçili hücre */
  secili: { yan: "sol" | "sag"; kart: string } | null;
  /** son yanlış denemenin iki hücresi (sallanma için; bir sonraki dokunuşta temizlenir) */
  salla: { sol: string; sag: string } | null;
  /** "Bilmiyorum, göster" ile açılanlar */
  gosterildi: string[];
}

/**
 * Eşleştirme kurulur: 4–6 kart (fazlası kesilir; az ise null). Kartlar arasında anlamı karışan çift varsa ikincisi atılır
 * (tek doğru eşleşme kuralı). Sağ sütun karıştırılır ve hiçbir satırda sol ile aynı karta denk gelmez (sıra ipucu vermez).
 */
export function eslestirKur(kartlar: readonly Lexeme[], tohum: string): EslestirDurum | null {
  const secilen: Lexeme[] = [];
  for (const l of kartlar) { if (secilen.length >= ESLESTIR_EN_COK) break; if (!secilen.some((x) => karisir(x, l))) secilen.push(l); }
  if (secilen.length < ESLESTIR_EN_AZ) return null;
  const r = tohumluRng(`${tohum}|eslestir|${secilen.map((x) => x.id).join(",")}`);
  const sol = karistir(secilen.map((x) => x.id), r);
  let sag = karistir(sol, r);
  // hiçbir satırda aynı kart yok: denk gelenler bir kaydırmayla ayrılır
  for (let i = 0; i < sag.length; i++) if (sag[i] === sol[i]) { const j = (i + 1) % sag.length; [sag[i], sag[j]] = [sag[j]!, sag[i]!]; }
  if (sag.some((k, i) => k === sol[i])) sag = [...sol.slice(1), sol[0]!];
  return { sol, sag, bitti: [], yanlis: [], secili: null, salla: null, gosterildi: [] };
}

export type EslestirOlay = "sec" | "birak" | "dogru" | "yanlis" | "yok";

/** Bir hücreye dokunuş. Aynı yanda dokunuş seçimi değiştirir; karşı yanda dokunuş eşleştirme denemesidir */
export function eslestirDokun(d: EslestirDurum, yan: "sol" | "sag", kart: string): { durum: EslestirDurum; olay: EslestirOlay } {
  if (d.bitti.includes(kart)) return { durum: d, olay: "yok" };
  const temiz = { ...d, salla: null };
  if (!d.secili || d.secili.yan === yan) {
    if (d.secili && d.secili.kart === kart) return { durum: { ...temiz, secili: null }, olay: "birak" };
    return { durum: { ...temiz, secili: { yan, kart } }, olay: "sec" };
  }
  const solK = yan === "sol" ? kart : d.secili.kart, sagK = yan === "sag" ? kart : d.secili.kart;
  if (solK === sagK) return { durum: { ...temiz, secili: null, bitti: [...d.bitti, solK] }, olay: "dogru" };
  // ceza yok: yalnız iki kart "bir kez daha" listesine girer (halka sonunda yeniden gelir)
  const yanlis = [...d.yanlis]; for (const k of [solK, sagK]) if (!yanlis.includes(k)) yanlis.push(k);
  return { durum: { ...temiz, secili: null, yanlis, salla: { sol: solK, sag: sagK } }, olay: "yanlis" };
}

/** "Bilmiyorum, göster": kalan çiftler açılır ve yanlış sayılır */
export function eslestirGoster(d: EslestirDurum): EslestirDurum {
  const kalan = d.sol.filter((k) => !d.bitti.includes(k));
  const yanlis = [...d.yanlis]; for (const k of kalan) if (!yanlis.includes(k)) yanlis.push(k);
  return { ...d, bitti: [...d.bitti, ...kalan], gosterildi: [...d.gosterildi, ...kalan], yanlis, secili: null, salla: null };
}

export const eslestirBitti = (d: EslestirDurum) => d.bitti.length === d.sol.length;

/** Adım sonucu: kart başına doğru mu (ilk denemede yanlışsız). Planlayıcı yanlışları halkada bir kez daha getirir */
export const eslestirSonuc = (d: EslestirDurum): { kart: string; dogru: boolean }[] => d.sol.map((k) => ({ kart: k, dogru: !d.yanlis.includes(k) }));
