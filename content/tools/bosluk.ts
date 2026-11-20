/**
 * PM-069 P0 sayacı: M1'de gün sırasına göre "cevabı o güne kadar öğrenciye gösterilmemiş boşluk".
 * Gösterilmiş = kartın kendi kelimesi/çekimi, kartın eşdizimleri (tanıtımda hepsi gösterilir) ya da o güne kadar tanıtılmış
 * kartların kelimeleri. Uygulama aynı kuralla bu boşlukları sormaz (core/garden.ts `ogretilmisForm`); sayaç içeriğin
 * düzeltilmesi gereken boşlukları gösterir (İÇ iş listesi).
 */
import type { Lexeme } from "../../packages/shared/src/content.ts";
import { cevapGosterildi, gorulenKelimeler } from "../../web/src/core/garden.ts";

export function ogretilmemisBosluklar(lexemes: Lexeme[], gunler: { day: number; yeni_kartlar?: string[] }[]): { gun: number; kart: string; cevap: string }[] {
  const lex = new Map(lexemes.map((l) => [l.id, l]));
  const tanitilan: string[] = [];
  const out: { gun: number; kart: string; cevap: string }[] = [];
  for (const g of gunler.slice().sort((a, b) => a.day - b.day)) {
    tanitilan.push(...(g.yeni_kartlar ?? []));
    const gorulen = gorulenKelimeler(lex, tanitilan);
    for (const id of g.yeni_kartlar ?? []) {
      const l = lex.get(id); if (!l) continue;
      for (const f of l.forms) if (!cevapGosterildi(l, f.answer, gorulen)) out.push({ gun: g.day, kart: id, cevap: f.answer });
    }
  }
  return out;
}
