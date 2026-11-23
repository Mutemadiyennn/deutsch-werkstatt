/**
 * Dil güvencesi (PM-112 A.1): yapay zekâ çıktısında Türkçe beklenen alan (`*_tr`) Türkçe mi.
 * Ölçü öz-sınamadakiyle aynıdır (worker/src/ai/selftest.ts buradan alır): kaba ama sınanabilir, yalnız olumlu kanıtla düşürür.
 * Worker her çıktıyı bununla denetler; tutmazsa bir kez yeniden sorar, yine tutmazsa `dilYedegi` ile kural tabanlı
 * Türkçe yedeğe ya da (yedek yoksa) yapay zekâsız yola düşer. Öğrenci Türkçe beklenen yerde Almanca/İngilizce görmez.
 */
import type { AiTaskName } from "./api.ts";

export type Dil = "de" | "tr";

/* "gut", "klar", "richtig" gibi kısa övgüler Almanca kanıt sayılsın (tek başına "Gut gemacht!" kaçmasın; PM-112) */
const DE = new Set(("der die das den dem des ein eine einen einem einer ist sind bin bist ich du wir ihr sie und nicht mit für auf zu im vom zum zur von bitte haben habe hat möchte möchten kann können wie gern gerne ja nein auch aber noch schon sehr gut guten tag etwas hier heute morgen danke mal man nach oft soll" +
  " gemacht gesagt gefragt richtig klar toll prima hast dein deine deinen satz sätze wort wörter frage antwort höflich verständlich gesprochen").split(" "));
const TR = new Set("bir ve bu da de için ile çok ne mi mı mu mü değil var yok olarak gibi daha ama sen ben anlam anlamı anlama demek demektir cümle iyi sadece şu veya kullanılır doğru yanlış aynı olur oldu ya kısa güzel gelir".split(" "));
// "in", "an", "was", "will", "also", "die", "man", "hat", "so" Almancada; "on", "at", "can", "tablet" Türkçede de var: listeye girmez
const EN = new Set("the a and is are you your this that with of it be have has please thank thanks what i'm don't does very good would should could to for one two three take times day after before meals well great job done correct same meaning here okay sure yes by from my me they there their but if or how why when where which who need want answer right wrong".split(" "));

export function dilPuani(s: string) {
  const w = s.toLowerCase().match(/[\p{L}']+/gu) ?? [];
  const say = (k: Set<string>) => w.filter((x) => k.has(x)).length;
  return { de: say(DE) + (/[äß]/i.test(s) ? 2 : 0), tr: say(TR) + (/[ğışçİ]/.test(s) ? 2 : 0), en: say(EN) };
}
/** Tırnak içi (alıntı) çıkarılır: Türkçe açıklama Almanca örneği alıntılayabilir */
const alintisiz = (s: string) => s.replace(/'[^']*'|"[^"]*"|„[^“"]*[“"]|“[^”]*”|»[^«]*«|«[^»]*»|‚[^‘’]*[‘’]|\*\*[^*]+\*\*/g, " ");
/**
 * Alan beklenen dilde mi: değilse bulunan dil ("en" | "de" | "tr"), uygunsa null.
 * İngilizce: ≥ 2 İngilizce sözcük ve iki dilden de baskın, ya da hiç DE/TR kanıtı yokken ≥ 3 sözcüğün çoğu İngilizce.
 * Öbür dil: beklenen dilden hiç kanıt yok ve öbür dilden ≥ 2 puan (alıntı çıkarıldıktan sonra).
 */
export function dilHatasi(s: string, bek: Dil): Dil | "en" | null {
  const p = dilPuani(alintisiz(s));
  const sozcuk = (alintisiz(s).match(/[\p{L}']+/gu) ?? []).length;
  if (p.en >= 2 && p.en > p.de && p.en > p.tr) return "en";
  if (p.de === 0 && p.tr === 0 && sozcuk >= 3 && p.en * 2 >= sozcuk) return "en";
  const obur: Dil = bek === "de" ? "tr" : "de";
  if (p[bek] === 0 && p[obur] >= 2) return obur;
  return null;
}

/** Görev çıktısında Türkçe olması gereken alanlar: [yol, değer]. Yol biçimi öz-sınamanın neden koduyla aynı ("strengths_tr.0") */
export function trAlanlari(gorev: AiTaskName, o: any): [string, string][] {
  const a: [string, unknown][] =
    gorev === "equiv_check" ? [["reason_tr", o?.reason_tr]]
    : gorev === "explain_tr" ? [["tr", o?.tr], ["note_tr", o?.note_tr], ...((o?.examples ?? []) as any[]).map((e, i) => [`examples.${i}.tr`, e?.tr] as [string, unknown])]
    : gorev === "say_it_de" ? [["note_tr", o?.note_tr]]
    : gorev === "feedback_tr" ? [
        ...((o?.strengths_tr ?? []) as unknown[]).map((s, i) => [`strengths_tr.${i}`, s] as [string, unknown]),
        ...((o?.fixes ?? []) as any[]).map((f, i) => [`fixes.${i}.why_tr`, f?.why_tr] as [string, unknown]),
        ["summary_tr", o?.summary_tr]
      ]
    : [];
  return a.filter((x): x is [string, string] => typeof x[1] === "string" && x[1].trim() !== "");
}

/** Türkçe tutmayan alanların yolları (boş = temiz) */
export function dilBozuk(gorev: AiTaskName, o: unknown): string[] {
  return trAlanlari(gorev, o).filter(([, v]) => dilHatasi(v, "tr")).map(([y]) => y);
}

/** Kural tabanlı Türkçe yedek metinler (öğrenci dili; teknik söz yok) */
export const DIL_YEDEK = {
  reason_ok: "Cevabın anlamca doğru.",
  reason_yanlis: "Cevabın beklenen anlamı tam vermiyor; doğrusuna bak.",
  note_tr: "Bu cümlede bu anlamda kullanılmış.",
  why_tr: "Böyle söylemek daha doğru ve doğal."
} as const;

/**
 * Bozuk alanları kural tabanlı Türkçe ile doldurur. Döner: onarılmış çıktı ya da null (yedek yok → yapay zekâsız yol).
 * - equiv_check: gerekçe `ok`'a göre sabit cümle (karar modelin kararıdır).
 * - explain_tr: asıl karşılık (`tr`) bozuksa yedek yok (uydurma anlam yazılmaz) → null; not sabit cümle; bozuk örnek düşer.
 * - say_it_de: not isteğe bağlı, düşer.
 * - feedback_tr: bozuk güçlü yan düşer; düzeltmenin gerekçesi sabit cümle; özet hedef sayısından kurulur.
 */
export function dilYedegi(gorev: AiTaskName, o: any, bozuk: string[]): unknown | null {
  if (!bozuk.length) return o;
  const b = new Set(bozuk);
  if (gorev === "equiv_check") return { ...o, reason_tr: o.ok ? DIL_YEDEK.reason_ok : DIL_YEDEK.reason_yanlis };
  if (gorev === "explain_tr") {
    if (b.has("tr")) return null;
    return {
      ...o,
      note_tr: b.has("note_tr") ? DIL_YEDEK.note_tr : o.note_tr,
      examples: ((o.examples ?? []) as unknown[]).filter((_, i) => !b.has(`examples.${i}.tr`))
    };
  }
  if (gorev === "say_it_de") { const { note_tr: _n, ...geri } = o; return b.has("note_tr") ? geri : o; }
  if (gorev === "feedback_tr") {
    const hedef = (o.goals ?? []) as { done: boolean }[], yapildi = hedef.filter((g) => g.done).length;
    const ozet = !hedef.length ? "Konuşmayı tamamladın." : yapildi === hedef.length ? `${hedef.length} hedefin hepsini yaptın.` : `${hedef.length} hedeften ${yapildi} tanesini yaptın; kalanı bir dahaki konuşmada dene.`;
    return {
      ...o,
      strengths_tr: ((o.strengths_tr ?? []) as string[]).filter((_, i) => !b.has(`strengths_tr.${i}`)),
      fixes: ((o.fixes ?? []) as any[]).map((f, i) => (b.has(`fixes.${i}.why_tr`) ? { ...f, why_tr: DIL_YEDEK.why_tr } : f)),
      summary_tr: b.has("summary_tr") ? ozet : o.summary_tr
    };
  }
  return o;
}
