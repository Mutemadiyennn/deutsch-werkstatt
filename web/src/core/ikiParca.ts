/**
 * İki parçalı boşluk (DENETİM-A1 P1-1, PM-148 [ANA-T] md. 1): sözlükteki biçim cümlesi iki "___" taşıyabilir, cevabı da
 * "…" ile ayrılmış iki parça ("Ich ___ mich kurz ___." / "stelle … vor"). Her boşluk kendi parçasıyla, sırayla dolar.
 * Eskiden bütün cevap her boşluğa yazılıyordu: "Ich stelle … vor mich kurz stelle … vor."
 */
export const cevapParcalari = (cevap: string): string[] => cevap.trim().split(/\s*…\s*/).filter(Boolean);

/** boşlukları cevabın parçalarıyla sırayla doldurur; boşluk ve parça sayısı tutmazsa null */
export function boslukDoldur(de: string, cevap: string): string | null {
  const p = cevapParcalari(cevap), n = (de.match(/___/g) ?? []).length;
  if (n === 0 || n !== p.length) return null;
  let k = 0;
  return de.replace(/___/g, () => p[k++]!).replace(/\s+/g, " ").trim();
}

/** eski (hatalı) doldurma: kayıtlı planlarda kalmış cümleyi doğrusuna bağlamak için anahtar */
export const eskiDoldurma = (de: string, cevap: string): string => de.replace(/___/g, cevap);

/** ekranda gösterilecek parçalar: boşluklar arası metin + boşluğa gelen doğru parçalar (cümle bu biçimden geliyorsa) */
export function boslukParcalari(de: string, cevap: string): { metin: string[]; dogru: string[] } | null {
  if (boslukDoldur(de, cevap) === null) return null;
  return { metin: de.split("___"), dogru: cevapParcalari(cevap) };
}

export interface BoslukGorunumu { metin: string[]; dogru: string[]; kabul: string[] }
/**
 * Boşluk adımının görünümü: cümle kartın bir biçiminden geliyorsa boşluklar o biçimin "___" yerleri (iki parçalıda iki boşluk);
 * gelmiyorsa `bosluk` sözcüklerinden cümlede ilk geçen tek sözcük boş bırakılır. `metin` boşluklar arası parçalar
 * (metin.length = dogru.length + 1); `kabul` doğru sayılan cevaplar. Hiçbiri yoksa null (çağıran üretim adımına düşer).
 */
export function boslukGorunumu(de: string, bosluk: string[], formlar: { de: string; answer: string; also_ok?: string[] }[] = []): BoslukGorunumu | null {
  for (const f of formlar) {
    const p = boslukDoldur(f.de, f.answer) === de ? boslukParcalari(f.de, f.answer) : null;
    if (!p) continue;
    const iki = p.dogru.length > 1;
    // iki parçada kabul: "stelle vor", "stelle … vor", "stelle ... vor" (parçalar sırayla); biçimin eş anlamlı cevapları da
    const kabul = [...(iki ? [p.dogru.join(" "), p.dogru.join(" … "), p.dogru.join(" ... ")] : p.dogru), ...(f.also_ok ?? []).map((a) => a.replace(/\s*…\s*/g, " ").trim())];
    return { ...p, kabul: [...new Set(kabul)] };
  }
  const k = new Set(bosluk.map((x) => x.toLowerCase()));
  const t = de.split(/(\s+)/);
  const i = t.findIndex((x) => k.has(x.replace(/[.,!?;:]/g, "").toLowerCase()));
  if (i < 0) return null;
  const dogru = t[i]!.replace(/[.,!?;:]/g, "");
  return { metin: [t.slice(0, i).join(""), t[i]!.replace(/^[^.,!?;:]*/, "") + t.slice(i + 1).join("")], dogru: [dogru], kabul: [dogru] };
}
