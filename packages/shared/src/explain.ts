/**
 * OD-9 Türkçe açıklama standardı: "öğrenci tek okumada anlar" (PM-017).
 * Açıklama serbest metin değil, yapılandırılmış alanlardır; bu modül yazım kurallarını denetler.
 * Almanca kelime açıklama içinde **kalın** işaretlenir (ör. "**Einen** konuşmada kısalıp **'nen** olur.").
 * Doğrulayıcı (content/tools/load.ts) ve birim testleri bunu kullanır.
 */
import { z } from "zod";

/** OD-9.1 alanları */
export const Explanation = z.object({
  /** İfadenin doğal Türkçe karşılığı — 1 cümle */
  anlam_tr: z.string().min(1),
  /** Ne zaman, kime söylenir — ≤ 12 kelime */
  ne_zaman_tr: z.string().optional(),
  /** Kelime kelime karşılık: her parça bir çip (Almancası üstte, Türkçesi altta); parça ≤ 3 kelime */
  parcalar: z.array(z.object({ de: z.string().min(1), tr: z.string().min(1) })).default([]),
  /** İsteğe bağlı tek ipucu; ekranda kapalı, "Neden böyle?" ile açılır — tek fikir, ≤ 14 kelime */
  ipucu_tr: z.string().optional()
});
export type Explanation = z.infer<typeof Explanation>;

export const LIMITS = { sentenceWords: 14, neZamanWords: 12, ipucuWords: 14, parcaWords: 3 } as const;

/**
 * Öğretilmeden kullanılamayan dilbilgisi terimleri → gerektirdiği öğe (OD-9.2 §3).
 * Terim yalnızca öğe `requires` listesinde varsa ve önce Türkçe adıyla birlikte geçerse kullanılır ("-e hâli (Dativ)").
 */
export const TERMS: Record<string, string> = {
  dativ: "gr:dativ", akkusativ: "gr:akkusativ", nominativ: "gr:nominativ", genitiv: "gr:genitiv",
  partizip: "gr:partizip", präteritum: "gr:praeteritum", prateritum: "gr:praeteritum", konjunktiv: "gr:konjunktiv",
  infinitiv: "gr:infinitiv", imperativ: "gr:imperativ", reflexiv: "gr:reflexiv", passiv: "gr:passiv",
  özne: "gr:subjekt", nesne: "gr:objekt", yüklem: "gr:praedikat", "fiil çekimi": "gr:konjugation", çekimli: "gr:konjugation",
  "hâl eki": "gr:kasus", "hal eki": "gr:kasus", "yan cümle": "gr:nebensatz", "modal fiil": "gr:modal", "ayrılabilen fiil": "gr:trennbar",
  zamir: "gr:pronomen", edat: "gr:praeposition", "sıfat çekimi": "gr:adjektivdeklination", "yardımcı fiil": "gr:hilfsverb"
};

const QUOTE = /["“”„‚‘’»«]|(^|[\s(])'(?=\S)|(?<=\S)'($|[\s).,!?])/;
export function words(s: string): number { return s.trim().split(/\s+/).filter(Boolean).length; }
export function sentences(s: string): string[] { return s.split(/(?<=[.!?])\s+/).map((x) => x.trim()).filter(Boolean); }

/** Bir açıklama metnindeki OD-9.2 ihlalleri (boş dizi = geçti) */
export function textIssues(text: string, o: { maxWords?: number; oneSentence?: boolean; requires?: string[] } = {}): string[] {
  const out: string[] = [];
  const t = text.trim();
  if (!t) return ["boş"];
  if (/=/.test(t)) out.push("'=' işareti");
  if (/;/.test(t)) out.push("';' işareti");
  if (/…|\.\.\./.test(t)) out.push("'…' işareti");
  // Almanca kelimeler **kalın** işaretlenir (arayüz kalın gösterir); işaret içindeki kesme ('nen, gibt's) serbest
  if (QUOTE.test(t.replace(/\*\*[^*]+\*\*/g, "X"))) out.push("tırnak işareti (Almanca kelime tırnakla değil **kalın** yazılır)");
  const ss = sentences(t);
  if (o.oneSentence && ss.length > 1) out.push(`tek cümle olmalı (${ss.length})`);
  const max = o.maxWords ?? LIMITS.sentenceWords;
  for (const s of ss) if (words(s) > max) out.push(`cümle ${words(s)} kelime (en çok ${max})`);
  // İnceleme #39 P1-1: Türkçe yerelde "I" → "ı" olur (Infinitiv kaçar); iki küçük harf biçimi de denetlenir
  const lows = [t.toLocaleLowerCase("tr"), t.toLowerCase()];
  for (const [term, req] of Object.entries(TERMS)) {
    if (lows.some((low) => new RegExp(`(^|[^\\p{L}])${term}`, "u").test(low)) && !(o.requires || []).includes(req)) out.push(`öğretilmemiş terim: ${term}`);
  }
  return out;
}

/** Yapılandırılmış açıklamanın bütün ihlalleri, alan adıyla */
export function explanationIssues(e: Explanation, requires: string[] = []): string[] {
  const out: string[] = [];
  for (const x of textIssues(e.anlam_tr, { oneSentence: true, requires })) out.push(`anlam_tr: ${x}`);
  if (e.ne_zaman_tr) for (const x of textIssues(e.ne_zaman_tr, { maxWords: LIMITS.neZamanWords, oneSentence: true, requires })) out.push(`ne_zaman_tr: ${x}`);
  if (e.ipucu_tr) for (const x of textIssues(e.ipucu_tr, { maxWords: LIMITS.ipucuWords, oneSentence: true, requires })) out.push(`ipucu_tr: ${x}`);
  e.parcalar.forEach((p, i) => {
    if (words(p.de) > LIMITS.parcaWords) out.push(`parcalar[${i}].de ${words(p.de)} kelime (en çok ${LIMITS.parcaWords})`);
    for (const x of textIssues(p.tr, { maxWords: 6, requires })) out.push(`parcalar[${i}].tr: ${x}`);
  });
  return out;
}
