/**
 * Çevrimdışı sözlük araması (#58 B1): Almanca ↔ Türkçe, cihazdaki kartlarda (içerik paketi).
 * Almanca: artikelli/artikelsiz, ümlautsuz (ae/oe/ue) ve çekimli biçim (kartBul); Türkçe: anlamın her parçası,
 * Türkçe klavyesiz yazım (ı→i, ş→s …). Sıra: tam eşleşme > baş eşleşmesi > kelime başı > içinde; eşitlikte sık kelime önce.
 */
import type { Lexeme } from "@dw/shared";
import { norm } from "./grading.ts";
import { kartBul } from "./medya.ts";

export interface AramaSonucu { l: Lexeme; puan: number; yon: "de" | "tr" }

const trKucuk = (s: string) => s.toLocaleLowerCase("tr").trim();
const trAscii = (s: string) => trKucuk(s).replace(/ı/g, "i").replace(/ş/g, "s").replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ö/g, "o").replace(/ü/g, "u").replace(/â/g, "a").replace(/î/g, "i").replace(/û/g, "u");
const artikelsiz = (s: string) => s.replace(/^(der|die|das|ein|eine|einen)\s+/, "");
/** Ümlautsuz yazım (Schlussel, mude, arztin): ae/oe/ue/ss tek harfe katlanır (yalnızca aramada; değerlendirmede değil) */
const katla = (s: string) => s.replace(/ae/g, "a").replace(/oe/g, "o").replace(/ue/g, "u").replace(/ss/g, "s");

function benzerlik(aday: string, q: string, tam: number): number {
  if (!aday || !q) return 0;
  if (aday === q) return tam;
  if (aday.startsWith(q)) return tam - 20 - Math.min(10, aday.length - q.length);
  if (aday.split(" ").some((w) => w.startsWith(q))) return tam - 40;
  if (q.length >= 3 && aday.includes(q)) return tam - 50;
  return 0;
}

export function sozlukAra(sorgu: string, lex: Lexeme[], n = 30): AramaSonucu[] {
  const q = sorgu.trim();
  if ([...q].length < 2) return [];
  const de = artikelsiz(norm(q));
  const tr = trKucuk(q), trA = trAscii(q);
  const cekim = kartBul(q, lex);
  const out: AramaSonucu[] = [];
  for (const l of lex) {
    const deAday = [l.de, l.head?.de, l.pl].filter((x): x is string => !!x).map((x) => artikelsiz(norm(x)));
    let pde = Math.max(0, ...deAday.map((x) => Math.max(benzerlik(x, de, 100), benzerlik(katla(x), katla(de), 94))));
    if (cekim === l) pde = Math.max(pde, 95);
    const trAday = [l.tr, l.head?.tr].filter((x): x is string => !!x).flatMap((x) => x.split(/[,;/()]/)).map((x) => x.trim()).filter(Boolean);
    let ptr = Math.max(0, ...trAday.map((x) => Math.max(benzerlik(trKucuk(x), tr, 98), benzerlik(trAscii(x), trA, 96))));
    // Türkçe anlamın içinde geçen parça (hoş "geld"iniz) Almanca eşleşmenin önüne geçmesin (inceleme #78 P2)
    if (ptr > 0 && ptr < 70) ptr -= 15;
    const puan = Math.max(pde, ptr);
    if (puan <= 0) continue;
    out.push({ l, puan: puan + (l.tier === "K1" ? 3 : 0) + (l.card === false ? -2 : 0), yon: pde >= ptr ? "de" : "tr" });
  }
  return out.sort((a, b) => b.puan - a.puan || (a.l.freqRank ?? 1e9) - (b.l.freqRank ?? 1e9) || a.l.de.localeCompare(b.l.de, "de")).slice(0, n);
}

/** Bahçede (kişisel listede) var mı: artikelsiz, büyük/küçük harf ve ümlaut yazımı fark etmez */
/** Sonuçlarda sorgunun kendisi (tam eşleşme) var mı: yoksa "Duyduğum kelime olarak ekle" de gösterilir (inceleme #78 P1-5) */
export const tamVar = (sonuc: AramaSonucu[]) => sonuc.some((s) => s.puan >= 95);
export const kisiselAnahtar = (de: string) => artikelsiz(norm(de));
