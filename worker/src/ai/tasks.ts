/**
 * Yapay zekâ görevleri: prompt şablonları YALNIZCA burada (sunucuda), sürümlü.
 * Kişisel bilgi girmez: yalnızca öğrenme görevi, senaryo ve öğrencinin cevabı.
 * PEDAGOGY.md §7: yapılandırılmış çıktı (JSON şeması) + doğrulama; bozuksa bir kez onarım; zaman bütçesi + yedek model.
 * Dil güvencesi (PM-112 A.1): `*_tr` alanı Türkçe değilse bir kez yeniden sorulur; yine tutmazsa kural tabanlı Türkçe yedek
 * (`dilYedegi`, @dw/shared) ya da yedek yoksa bad_output (istemci yapay zekâsız yola düşer).
 */
import { z } from "zod";
import { AiTasks, dilBozuk, dilYedegi, type AiTaskName } from "@dw/shared";
import { HttpError } from "../http.ts";
import type { Env } from "../env.ts";
import { generateJSON, models } from "./gemini.ts";
import { WA, generateWA, kisalt } from "./workersai.ts";

interface Template { system: (v: any) => string; user: (v: any) => string; version: string }
const J = (x: unknown) => JSON.stringify(x);
/** PM-112 A.1: Türkçe alan kuralı her istemde aynı cümle */
const TR_KURAL = "SPRACHE (Pflicht): Jedes Feld, dessen Name auf _tr endet, ist auf TÜRKISCH (Türkçe) – nie Deutsch, nie Englisch. Deutsche Wörter darin nur in Anführungszeichen.";

export const TEMPLATES: Record<AiTaskName, Template> = {
  equiv_check: {
    version: "equiv_check.v3",
    system: () => [
      "Du bist eine faire Deutschlehrerin für eine türkischsprachige Lernende.",
      "Entscheide, ob die Antwort dieselbe Bedeutung hat wie eine der erwarteten Lösungen UND korrektes, natürliches Deutsch ist.",
      "Andere Wortstellung, Synonyme, Umgangssprache (hab, gibt's, mal) und Höflichkeitsvarianten sind richtig, wenn sie korrekt und natürlich sind.",
      "Falsch sind: falscher Kasus, falsche Verbform oder Verbstellung, falsches Genus, fehlende Pflichtwörter, andere Bedeutung, Englisch/Türkisch.",
      "Groß-/Kleinschreibung, Satzzeichen und kleine Tippfehler in sonst richtigen Wörtern ignorieren.",
      'Antworte nur als JSON {"ok": boolean, "reason_tr": string}. reason_tr: ein kurzer Satz auf Türkisch, z. B. "Anlam aynı, cümle doğru."',
      TR_KURAL
    ].join("\n"),
    user: (v) => `Aufgabe (Türkisch): ${v.prompt_tr}\nErwartete Lösungen: ${J(v.expected)}\nAntwort der Lernenden: ${J(v.answer)}`
  },
  explain_tr: {
    version: "explain_tr.v2",
    system: () => [
      "Du erklärst einer türkischsprachigen Lernenden (A1–B1) ein deutsches Wort oder eine Wendung.",
      "Erklärung auf Türkisch, kurz und praktisch. Kein Englisch. Keine erfundenen Dialektformen.",
      'Antworte nur als JSON {"tr": string, "note_tr": string (Gebrauch, 1–2 Sätze), "examples": [{"de": string, "tr": string}] (max. 2)}.',
      "tr, note_tr und examples[].tr sind Türkisch; nur examples[].de ist Deutsch.",
      TR_KURAL
    ].join("\n"),
    user: (v) => `Wort/Wendung: ${J(v.de)}${v.context ? `\nKontext: ${J(v.context)}` : ""}`
  },
  say_it_de: {
    version: "say_it_de.v2",
    system: (v) => [
      `Eine türkischsprachige Deutschlernende (Niveau ${v.level}) möchte etwas sagen und weiß nicht wie.`,
      "Gib die EINFACHSTE natürliche deutsche Formulierung, wie man sie im Alltag in Deutschland wirklich sagt (Niveau beachten, kurze Sätze).",
      "Optional eine Umschreibung mit noch einfacheren Wörtern (paraphrase_de) und einen sehr kurzen Hinweis auf Türkisch (note_tr). Kein Englisch.",
      'Antworte nur als JSON {"de_simple": string, "paraphrase_de"?: string, "note_tr"?: string}.',
      TR_KURAL
    ].join("\n"),
    user: (v) => `Türkisch: ${J(v.tr)}${v.context_de ? `\nGesprächskontext: ${J(v.context_de)}` : ""}`
  },
  roleplay_turn: {
    version: "roleplay_turn.v3",
    system: (v) => [
      `Du spielst in einem Alltagsgespräch in Deutschland (Bayern) GENAU EINE Figur: ${v.partner_de}`,
      `Situation (Türkisch, nur zu deiner Information): ${v.scene_tr}`,
      "REGELN – sehr wichtig:",
      "1. Du bist NUR diese Figur, KEIN Lehrer. Korrigiere nie, erkläre nie Grammatik, lobe nicht die Sprache, bitte NIE darum, einen bestimmten Satz zu sagen oder zu wiederholen.",
      "2. Reagiere natürlich auf jede verständliche Antwort, auch mit Fehlern und auch wenn sie anders ist als erwartet. Inhalt zählt.",
      `3. Niveau ${v.level}: ${v.level === 1 ? "sehr einfache, kurze Sätze, langsam und deutlich" : v.level === 2 ? "normale Alltagssprache, kurze Sätze" : "schnell und umgangssprachlich (hab ich, gibt's, mal), gelegentlich eine unerwartete Frage"}. ${v.level <= 2 ? "Höchstens 2 kurze Sätze pro Antwort." : "Höchstens 3 Sätze."}`,
      v.style_de ? `4. Stil: ${v.style_de}` : "4. Stil: freundlich, realistisch.",
      `5. Der Lernende kam ${v.stuck} Mal in Folge nicht weiter. Wenn das 2 oder mehr ist: sprich einfacher, benutze einfachere Wörter und stelle eine Ja/Nein-Frage oder biete zwei Möglichkeiten an.`,
      "6. Schreibt der Lernende Englisch oder Türkisch: bleib in der Rolle, antworte auf einfachem Deutsch und reagiere, wenn möglich, auf den Inhalt. Wechsle nie selbst die Sprache.",
      "7. Bleib immer in der Rolle. Keine Meta-Kommentare, keine Erklärungen außerhalb der Figur.",
      `8. Gesprächsziele (nicht erwähnen, nur damit das Gespräch realistisch verläuft): ${J(v.goals_de)}.`,
      v.surprise_de ? `9. Bring an einer passenden Stelle diese Wendung ein: ${v.surprise_de}` : "",
      `10. Der Name des Lernenden ist unbekannt und erscheint als [Name]. Schreib ihn, wenn nötig, genau so: ${v.address_de ? `"${v.address_de} [Name]"` : '"[Name]"'}. Erfinde keinen Namen.`,
      `11. Sprich auf Niveau ${WA.level}: einfache, häufige Wörter. Antworte in höchstens ${WA.reply_max_words} Wörtern.`,
      'Setze "end": true nur, wenn das Gespräch natürlich zu Ende ist (Verabschiedung).',
      'Antworte nur als JSON {"reply_de": string, "end": boolean}.'
    ].filter(Boolean).join("\n"),
    user: (v) => `Bisheriges Gespräch:\n${(v.history as { r: string; de: string }[]).map((h) => `${h.r === "partner" ? "DU" : "LERNENDER"}: ${h.de}`).join("\n") || "(noch nichts)"}\n\nAntworte jetzt als DU.`
  },
  feedback_tr: {
    version: "feedback_tr.v2",
    system: () => [
      "Du bist ein Beobachter, NICHT Teil des Gesprächs. Du wertest ein Rollenspiel einer türkischsprachigen Deutschlernenden aus.",
      "goals: Für jedes Ziel: wurde es im Gespräch tatsächlich erreicht (Inhalt zählt, nicht exakte Sätze)?",
      'strengths_tr: höchstens 3 konkrete Stärken, jede ein kurzer Satz AUF TÜRKISCH (z. B. "İsteğini açıkça söyledin."), nicht auf Deutsch.',
      "fixes: höchstens 3 WICHTIGSTE Fehler der Lernenden (nicht der Figur): said = Originalsatz, better = natürliche korrekte Version, why_tr = sehr kurze Erklärung auf Türkisch. Bedeutungsrichtige, verständliche Varianten sind KEINE Fehler. Wenn es keine echten Fehler gibt: leere Liste.",
      "english_fallbacks: Anzahl der Beiträge der Lernenden ganz oder teilweise auf Englisch oder Türkisch.",
      "gaps_de: deutsche Wörter oder Wendungen, die der Lernenden sichtbar gefehlt haben (höchstens 10).",
      "summary_tr: 1–2 ermutigende, ehrliche Sätze auf Türkisch. Kein Englisch.",
      'Antworte nur als JSON {"goals":[{"id":string,"done":boolean}],"strengths_tr":[string],"fixes":[{"said":string,"better":string,"why_tr":string}],"english_fallbacks":number,"gaps_de":[string],"summary_tr":string}.',
      "Deutsch sind NUR said, better und gaps_de. strengths_tr, why_tr und summary_tr sind Türkisch.",
      TR_KURAL
    ].join("\n"),
    user: (v) => `Situation: ${v.scene_tr}\nZiele: ${J(v.goals)}\nGespräch:\n${(v.transcript as { r: string; de: string }[]).map((h) => `${h.r === "partner" ? "FIGUR" : "LERNENDE"}: ${h.de}`).join("\n")}`
  }
};

/** Toplam zaman bütçesi: quick ≤ 12 sn (8 + 4), default ≤ 30 sn (20 + 10) */
const BUDGET = { quick: [8000, 4000], default: [20000, 10000] } as const; // quick: p95 ≤ 8 sn hedefi; default (rol oyunu, rapor): kalite, toplam ≤45 sn içinde

export function schemaOf(name: AiTaskName): object {
  try { const j = z.toJSONSchema(AiTasks[name].output) as Record<string, unknown>; delete j.$schema; return j; } catch { return {}; }
}

/**
 * `dil`: dil güvencesi devreye girdiyse ("yeniden": ikinci soruda tuttu · "yedek": kural tabanlı Türkçe); `dil_alanlar`: ilk
 * çıktıda Türkçe tutmayan alanlar. Öz-sınama okur: "yedek" kaldı sayılır (sapma görünür kalır; inceleme #248 P1-2).
 */
export interface GorevCiktisi { output: unknown; model: string; dil?: "yeniden" | "yedek"; dil_alanlar?: string[] }

/** Yeniden soruda istemin sonuna eklenen uyarı: hangi alanlar Türkçe değildi + önceki cevap (yalnız o alanlar değişsin; inceleme #248 P2-2) */
export const dilUyarisi = (bozuk: string[], onceki: unknown) =>
  `\nACHTUNG: In deiner letzten Antwort waren diese Felder NICHT Türkisch: ${bozuk.join(", ")}. Schreibe sie jetzt auf Türkisch (Türkçe). Alles andere unverändert.\nDeine letzte Antwort: ${J(onceki).slice(0, 3000)}`;

/** Yeniden soruda kararlar değişmez: ilk cevabın kararı korunur (equiv_check.ok; feedback_tr hedefleri ve sayaçlar) */
function kararKoru(name: AiTaskName, ilk: any, yeni: any): unknown {
  if (name === "equiv_check") return { ...yeni, ok: ilk.ok };
  if (name === "feedback_tr") return { ...yeni, goals: ilk.goals, english_fallbacks: ilk.english_fallbacks, gaps_de: ilk.gaps_de };
  return yeni;
}

export async function runTask(env: Env, taskName: string, vars: unknown): Promise<GorevCiktisi> {
  if (!(taskName in AiTasks)) throw new HttpError("invalid_request", "unknown task");
  const name = taskName as AiTaskName;
  const spec = AiTasks[name];
  const parsed = spec.input.safeParse(vars);
  if (!parsed.success) throw new HttpError("invalid_request", parsed.error.issues[0]?.message);
  // PM-019: sağlayıcı yapılandırmayla seçilir; Gemini kapalı. PM 7022002310-5: Workers AI (deneme), model + yedek policy.json'da
  const saglayici = (env.AI_PROVIDER || "none").trim();
  let order: string[], gen: typeof generateJSON;
  if (saglayici === "workers-ai") {
    if (!env.AI) throw new HttpError("not_configured", "AI binding");
    order = [WA.model, WA.fallback]; gen = generateWA;
  } else if (saglayici === "gemini") {
    if (!env.GEMINI_KEY) throw new HttpError("not_configured", "GEMINI_KEY");
    const m = await models(env);
    order = spec.tier === "quick" ? m.quick : m.full; gen = generateJSON;
  } else throw new HttpError("not_configured", "ai_disabled");
  const tpl = TEMPLATES[name];
  const budget = BUDGET[spec.tier];
  const schema = schemaOf(name);
  const sys = tpl.system(parsed.data), usr = tpl.user(parsed.data);
  let last: HttpError = new HttpError("upstream_busy");
  for (let i = 0; i < Math.min(2, order.length); i++) {
    const model = order[i]!;
    const t0 = Date.now();
    try {
      const text = await gen(env, model, sys, usr, budget[i]!, schema);
      const ok = spec.output.safeParse(safeJson(text));
      if (ok.success) return await dilGuvencesi(name, kisa(name, ok.data), model, () => budget[i]! - (Date.now() - t0), (u, kalan) => gen(env, model, sys + u, usr, kalan, schema), spec.output);
      // bir kez onarım denemesi (aynı model, kalan bütçe içinde)
      const left = budget[i]! - (Date.now() - t0);
      if (left > 1500) {
        const fixed = await gen(env, model, "Repariere das JSON, sodass es exakt dem Schema entspricht. Inhalt beibehalten. Nur JSON ausgeben.", `Schema: ${J(schema)}\nFehlerhaftes JSON: ${text.slice(0, 3000)}\nFehler: ${ok.error.issues[0]?.message}`, left, schema);
        const ok2 = spec.output.safeParse(safeJson(fixed));
        if (ok2.success) return await dilGuvencesi(name, kisa(name, ok2.data), model, () => budget[i]! - (Date.now() - t0), (u, kalan) => gen(env, model, sys + u, usr, kalan, schema), spec.output);
      }
      last = new HttpError("bad_output", ok.error.issues[0]?.message);
    } catch (e) {
      if (!(e instanceof HttpError)) throw e;
      if (["not_configured", "invalid_request", "quota_user"].includes(e.code)) throw e;
      // dil güvencesi bir kez yeniden sordu ve yedek yok: yedek modele geçilmez (öğrenci beklemez; PM-112 A.1)
      if (e.code === "bad_output" && e.detail === "dil") throw e;
      // Workers AI: ücretsiz pay bittiyse yedek model de aynı paydan yer; denenmez
      if (saglayici === "workers-ai" && e.code === "quota_upstream") throw e;
      last = e;
    }
  }
  throw last;
}

/** Yeniden soru için en az bu kadar bütçe kalmalı; yoksa doğrudan yedeğe geçilir (öğrenci beklemez) */
export const DIL_YENIDEN_EN_AZ_MS = 1500;

/**
 * PM-112 A.1: şemaya uyan çıktının `*_tr` alanları Türkçe mi. Değilse aynı modele bir kez, uyarılı istemle, kalan bütçe
 * içinde yeniden sorulur. Yine tutmazsa (ya da yeniden soru düşerse) bozuk alanlar kural tabanlı Türkçe ile doldurulur;
 * yedeği olmayan alan (explain_tr'nin asıl karşılığı) bad_output verir: istemci yapay zekâsız yola düşer (#218).
 */
export async function dilGuvencesi(
  name: AiTaskName, out: unknown, model: string, kalanMs: () => number,
  yenidenSor: (uyari: string, kalanMs: number) => Promise<string>, sema: z.ZodType
): Promise<GorevCiktisi> {
  const bozuk = dilBozuk(name, out);
  if (!bozuk.length) return { output: out, model };
  let son = out, sonBozuk = bozuk;
  const kalan = kalanMs();
  if (kalan > DIL_YENIDEN_EN_AZ_MS) {
    try {
      const p = sema.safeParse(safeJson(await yenidenSor(dilUyarisi(bozuk, out), kalan)));
      const yeni = p.success ? kararKoru(name, out, kisa(name, p.data)) : null;
      if (yeni && sema.safeParse(yeni).success) {
        const yb = dilBozuk(name, yeni);
        if (!yb.length) return { output: yeni, model, dil: "yeniden", dil_alanlar: bozuk };
        son = yeni; sonBozuk = yb;
      }
    } catch (e) {
      // yeniden soru zaman aşımı/kota/meşgul: ilk çıktı yedekle kurtarılır; programlama hatası yutulmaz
      if (!(e instanceof HttpError)) throw e;
    }
  }
  const y = dilYedegi(name, son, sonBozuk);
  if (y === null || !sema.safeParse(y).success) throw new HttpError("bad_output", "dil");
  return { output: y, model, dil: "yedek", dil_alanlar: bozuk };
}

/** Rol oyunu cevabı en çok WA.reply_max_words kelime (PM 7022002310-5) */
function kisa(name: AiTaskName, out: unknown): unknown {
  if (name !== "roleplay_turn") return out;
  const b = out as { reply_de: string; end?: boolean };
  return { ...b, reply_de: kisalt(b.reply_de, undefined, !!b.end) };
}

export function safeJson(text: string): unknown {
  try { return JSON.parse(text); } catch {}
  const m = /\{[\s\S]*\}/.exec(text);
  if (m) { try { return JSON.parse(m[0]); } catch {} }
  return null;
}
