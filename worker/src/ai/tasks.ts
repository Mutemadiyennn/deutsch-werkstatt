/**
 * Yapay zekâ görevleri: prompt şablonları YALNIZCA burada (sunucuda) durur.
 * Kişisel bilgi girmez: yalnızca öğrenme görevi ve öğrencinin cevabı.
 */
import { AiTasks, type AiTaskName } from "@dw/shared";
import { HttpError } from "../http.ts";
import type { Env } from "../env.ts";
import { generateJSON, models } from "./gemini.ts";

interface Template { system: string; user: (v: any) => string; version: string }

const TEMPLATES: Record<AiTaskName, Template> = {
  equiv_check: {
    version: "equiv_check.v1",
    system: [
      "Du bist eine strenge, faire Deutschlehrerin für eine türkischsprachige Lernende.",
      "Entscheide, ob die Antwort der Lernenden dieselbe Bedeutung hat wie eine der erwarteten Lösungen UND grammatisch korrektes, natürliches Deutsch ist.",
      "Kleine Abweichungen in Wortstellung oder Synonyme sind ok, wenn sie korrekt und natürlich sind. Falscher Kasus, falsche Verbform, falsches Genus oder fehlende Wörter sind NICHT ok.",
      "Groß-/Kleinschreibung und Satzzeichen ignorieren.",
      'Antworte nur als JSON: {"ok": boolean, "reason_tr": string}. reason_tr: ein kurzer Satz auf Türkisch, ohne Englisch.'
    ].join("\n"),
    user: (v) => `Aufgabe (Türkisch): ${v.prompt_tr}\nErwartete Lösungen: ${JSON.stringify(v.expected)}\nAntwort der Lernenden: ${JSON.stringify(v.answer)}`
  },
  explain_tr: {
    version: "explain_tr.v1",
    system: [
      "Du erklärst einer türkischsprachigen Lernenden (Anfängerin bis B1) ein deutsches Wort oder eine Wendung.",
      "Erklärung auf Türkisch, kurz und praktisch. Kein Englisch. Keine erfundenen Dialektformen.",
      'Antworte nur als JSON: {"tr": string (Bedeutung), "note_tr": string (Gebrauch, 1–2 Sätze), "examples": [{"de": string, "tr": string}] (max. 2, einfach und natürlich)}.'
    ].join("\n"),
    user: (v) => `Wort/Wendung: ${JSON.stringify(v.de)}${v.context ? `\nKontext: ${JSON.stringify(v.context)}` : ""}`
  }
};

/** Toplam zaman bütçesi: quick ≤ 12 sn (8 + 4), default ≤ 45 sn (30 + 15) */
const BUDGET = { quick: [8000, 4000], default: [30000, 15000] } as const;

export async function runTask(env: Env, taskName: string, vars: unknown): Promise<{ output: unknown; model: string }> {
  if (!(taskName in AiTasks)) throw new HttpError("invalid_request", "unknown task");
  const name = taskName as AiTaskName;
  const spec = AiTasks[name];
  const parsed = spec.input.safeParse(vars);
  if (!parsed.success) throw new HttpError("invalid_request", parsed.error.issues[0]?.message);
  if (!env.GEMINI_KEY) throw new HttpError("not_configured", "GEMINI_KEY");
  const tpl = TEMPLATES[name];
  const m = await models(env);
  const order = spec.tier === "quick" ? m.quick : m.full;
  const budget = BUDGET[spec.tier];
  let last: HttpError = new HttpError("upstream_busy");
  for (let i = 0; i < Math.min(2, order.length); i++) {
    const model = order[i]!;
    try {
      const text = await generateJSON(env, model, tpl.system, tpl.user(parsed.data), budget[i]!);
      const out = safeJson(text);
      const ok = spec.output.safeParse(out);
      if (ok.success) return { output: ok.data, model };
      last = new HttpError("bad_output", ok.error.issues[0]?.message);
    } catch (e) {
      if (!(e instanceof HttpError)) throw e;
      // Kimlik/kota/istek hataları başka modelde düzelmez
      if (["not_configured", "invalid_request", "quota_user"].includes(e.code)) throw e;
      last = e;
    }
  }
  throw last;
}

function safeJson(text: string): unknown {
  try { return JSON.parse(text); } catch {}
  const m = /\{[\s\S]*\}/.exec(text);
  if (m) { try { return JSON.parse(m[0]); } catch {} }
  return null;
}
