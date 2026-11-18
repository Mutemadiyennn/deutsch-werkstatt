/**
 * Yapay zekâ görevleri: prompt şablonları YALNIZCA burada (sunucuda), sürümlü.
 * Kişisel bilgi girmez: yalnızca öğrenme görevi, senaryo ve öğrencinin cevabı.
 * PEDAGOGY.md §7: yapılandırılmış çıktı (JSON şeması) + doğrulama; bozuksa bir kez onarım; zaman bütçesi + yedek model.
 */
import { z } from "zod";
import { AiTasks, type AiTaskName } from "@dw/shared";
import { HttpError } from "../http.ts";
import type { Env } from "../env.ts";
import { generateJSON, models } from "./gemini.ts";

interface Template { system: (v: any) => string; user: (v: any) => string; version: string }
const J = (x: unknown) => JSON.stringify(x);

export const TEMPLATES: Record<AiTaskName, Template> = {
  equiv_check: {
    version: "equiv_check.v2",
    system: () => [
      "Du bist eine faire Deutschlehrerin für eine türkischsprachige Lernende.",
      "Entscheide, ob die Antwort dieselbe Bedeutung hat wie eine der erwarteten Lösungen UND korrektes, natürliches Deutsch ist.",
      "Andere Wortstellung, Synonyme, Umgangssprache (hab, gibt's, mal) und Höflichkeitsvarianten sind richtig, wenn sie korrekt und natürlich sind.",
      "Falsch sind: falscher Kasus, falsche Verbform oder Verbstellung, falsches Genus, fehlende Pflichtwörter, andere Bedeutung, Englisch/Türkisch.",
      "Groß-/Kleinschreibung, Satzzeichen und kleine Tippfehler in sonst richtigen Wörtern ignorieren.",
      'Antworte nur als JSON {"ok": boolean, "reason_tr": string}. reason_tr: ein kurzer Satz auf Türkisch, kein Englisch.'
    ].join("\n"),
    user: (v) => `Aufgabe (Türkisch): ${v.prompt_tr}\nErwartete Lösungen: ${J(v.expected)}\nAntwort der Lernenden: ${J(v.answer)}`
  },
  explain_tr: {
    version: "explain_tr.v1",
    system: () => [
      "Du erklärst einer türkischsprachigen Lernenden (A1–B1) ein deutsches Wort oder eine Wendung.",
      "Erklärung auf Türkisch, kurz und praktisch. Kein Englisch. Keine erfundenen Dialektformen.",
      'Antworte nur als JSON {"tr": string, "note_tr": string (Gebrauch, 1–2 Sätze), "examples": [{"de": string, "tr": string}] (max. 2)}.'
    ].join("\n"),
    user: (v) => `Wort/Wendung: ${J(v.de)}${v.context ? `\nKontext: ${J(v.context)}` : ""}`
  },
  say_it_de: {
    version: "say_it_de.v1",
    system: (v) => [
      `Eine türkischsprachige Deutschlernende (Niveau ${v.level}) möchte etwas sagen und weiß nicht wie.`,
      "Gib die EINFACHSTE natürliche deutsche Formulierung, wie man sie im Alltag in Deutschland wirklich sagt (Niveau beachten, kurze Sätze).",
      "Optional eine Umschreibung mit noch einfacheren Wörtern (paraphrase_de) und einen sehr kurzen Hinweis auf Türkisch (note_tr). Kein Englisch.",
      'Antworte nur als JSON {"de_simple": string, "paraphrase_de"?: string, "note_tr"?: string}.'
    ].join("\n"),
    user: (v) => `Türkisch: ${J(v.tr)}${v.context_de ? `\nGesprächskontext: ${J(v.context_de)}` : ""}`
  },
  roleplay_turn: {
    version: "roleplay_turn.v2",
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
      'Setze "end": true nur, wenn das Gespräch natürlich zu Ende ist (Verabschiedung).',
      'Antworte nur als JSON {"reply_de": string, "end": boolean}.'
    ].filter(Boolean).join("\n"),
    user: (v) => `Bisheriges Gespräch:\n${(v.history as { r: string; de: string }[]).map((h) => `${h.r === "partner" ? "DU" : "LERNENDER"}: ${h.de}`).join("\n") || "(noch nichts)"}\n\nAntworte jetzt als DU.`
  },
  feedback_tr: {
    version: "feedback_tr.v1",
    system: () => [
      "Du bist ein Beobachter, NICHT Teil des Gesprächs. Du wertest ein Rollenspiel einer türkischsprachigen Deutschlernenden aus.",
      "goals: Für jedes Ziel: wurde es im Gespräch tatsächlich erreicht (Inhalt zählt, nicht exakte Sätze)?",
      "strengths_tr: höchstens 3 konkrete Stärken, Türkisch.",
      "fixes: höchstens 3 WICHTIGSTE Fehler der Lernenden (nicht der Figur): said = Originalsatz, better = natürliche korrekte Version, why_tr = sehr kurze Erklärung auf Türkisch. Bedeutungsrichtige, verständliche Varianten sind KEINE Fehler. Wenn es keine echten Fehler gibt: leere Liste.",
      "english_fallbacks: Anzahl der Beiträge der Lernenden ganz oder teilweise auf Englisch oder Türkisch.",
      "gaps_de: deutsche Wörter oder Wendungen, die der Lernenden sichtbar gefehlt haben (höchstens 10).",
      "summary_tr: 1–2 ermutigende, ehrliche Sätze auf Türkisch. Kein Englisch.",
      'Antworte nur als JSON {"goals":[{"id":string,"done":boolean}],"strengths_tr":[string],"fixes":[{"said":string,"better":string,"why_tr":string}],"english_fallbacks":number,"gaps_de":[string],"summary_tr":string}.'
    ].join("\n"),
    user: (v) => `Situation: ${v.scene_tr}\nZiele: ${J(v.goals)}\nGespräch:\n${(v.transcript as { r: string; de: string }[]).map((h) => `${h.r === "partner" ? "FIGUR" : "LERNENDE"}: ${h.de}`).join("\n")}`
  }
};

/** Toplam zaman bütçesi: quick ≤ 12 sn (8 + 4), default ≤ 30 sn (20 + 10) */
const BUDGET = { quick: [8000, 4000], default: [20000, 10000] } as const; // quick: p95 ≤ 8 sn hedefi; default (rol oyunu, rapor): kalite, toplam ≤45 sn içinde

export function schemaOf(name: AiTaskName): object {
  try { const j = z.toJSONSchema(AiTasks[name].output) as Record<string, unknown>; delete j.$schema; return j; } catch { return {}; }
}

export async function runTask(env: Env, taskName: string, vars: unknown): Promise<{ output: unknown; model: string }> {
  if (!(taskName in AiTasks)) throw new HttpError("invalid_request", "unknown task");
  const name = taskName as AiTaskName;
  const spec = AiTasks[name];
  const parsed = spec.input.safeParse(vars);
  if (!parsed.success) throw new HttpError("invalid_request", parsed.error.issues[0]?.message);
  // PM-019: sağlayıcı yapılandırmayla seçilir; Gemini varsayılan olarak kapalı (istemci yapay zekâsız yola geçer)
  if ((env.AI_PROVIDER || "none").trim() !== "gemini") throw new HttpError("not_configured", "ai_disabled");
  if (!env.GEMINI_KEY) throw new HttpError("not_configured", "GEMINI_KEY");
  const tpl = TEMPLATES[name];
  const m = await models(env);
  const order = spec.tier === "quick" ? m.quick : m.full;
  const budget = BUDGET[spec.tier];
  const schema = schemaOf(name);
  const sys = tpl.system(parsed.data), usr = tpl.user(parsed.data);
  let last: HttpError = new HttpError("upstream_busy");
  for (let i = 0; i < Math.min(2, order.length); i++) {
    const model = order[i]!;
    const t0 = Date.now();
    try {
      const text = await generateJSON(env, model, sys, usr, budget[i]!, schema);
      const ok = spec.output.safeParse(safeJson(text));
      if (ok.success) return { output: ok.data, model };
      // bir kez onarım denemesi (aynı model, kalan bütçe içinde)
      const left = budget[i]! - (Date.now() - t0);
      if (left > 1500) {
        const fixed = await generateJSON(env, model, "Repariere das JSON, sodass es exakt dem Schema entspricht. Inhalt beibehalten. Nur JSON ausgeben.", `Schema: ${J(schema)}\nFehlerhaftes JSON: ${text.slice(0, 3000)}\nFehler: ${ok.error.issues[0]?.message}`, left, schema);
        const ok2 = spec.output.safeParse(safeJson(fixed));
        if (ok2.success) return { output: ok2.data, model };
      }
      last = new HttpError("bad_output", ok.error.issues[0]?.message);
    } catch (e) {
      if (!(e instanceof HttpError)) throw e;
      if (["not_configured", "invalid_request", "quota_user"].includes(e.code)) throw e;
      last = e;
    }
  }
  throw last;
}

export function safeJson(text: string): unknown {
  try { return JSON.parse(text); } catch {}
  const m = /\{[\s\S]*\}/.exec(text);
  if (m) { try { return JSON.parse(m[0]); } catch {} }
  return null;
}
