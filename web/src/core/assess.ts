/**
 * Seviye tespiti: pratik görevlerle (kelimeyi tanıma, kelimeyi üretme, dinleyip anlama, cümle kurma, konuşma)
 * tahmini başlangıç seviyesi. CEFR sınav sonucu DEĞİLDİR; planlayıcının başlangıç noktasıdır.
 * Uyarlama: her becerinin maddeleri A1 → A2 → B1 sırasıyla gelir; bir seviyede başarısız olunursa
 * o becerinin daha üst seviye maddeleri sorulmaz (gereksiz zorlama yok).
 */
import type { AssessItem, AssessSkill, Assessment, AssessAnswer, Level, SkillResult, Speed } from "@dw/shared";

export const PLAN: Record<AssessSkill, Record<Level, number>> = {
  vocab_passive: { A1: 4, A2: 4, B1: 4 },
  vocab_active: { A1: 3, A2: 3, B1: 3 },
  listening: { A1: 3, A2: 3, B1: 3 },
  building: { A1: 2, A2: 2, B1: 2 },
  speaking: { A1: 2, A2: 2, B1: 2 }
};
export const SKILL_ORDER: AssessSkill[] = ["vocab_passive", "listening", "vocab_active", "building", "speaking"];
export const SKILL_TR: Record<AssessSkill, string> = {
  vocab_passive: "Kelime tanıma",
  vocab_active: "Kelime üretme",
  listening: "Dinleyip anlama",
  building: "Cümle kurma",
  speaking: "Konuşma"
};
const LEVELS: Level[] = ["A1", "A2", "B1"];
/** Dinleme hızı seviyeyle birlikte artar: A1 yavaş, A2 normal, B1 hızlı (cihaz sesiyle; doğal kayıtlar sonraki fazda) */
export const LISTEN_SPEED: Record<Level, Speed> = { A1: "slow", A2: "normal", B1: "fast" };

function rng(seed: number) {
  return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const hash = (s: string) => { let h = 2166136261; for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return h >>> 0; };

/** Havuzdan beceri ve seviyeye göre tohumlu örneklem: aynı tespit kimliği → aynı sorular */
export function selectItems(bank: AssessItem[], seedKey: string, plan = PLAN): AssessItem[] {
  const r = rng(hash(seedKey));
  const out: AssessItem[] = [];
  for (const skill of SKILL_ORDER) {
    for (const lvl of LEVELS) {
      const pool = bank.filter((b) => b.skill === skill && b.level === lvl);
      const pick: AssessItem[] = [];
      const copy = pool.slice();
      while (pick.length < plan[skill][lvl] && copy.length) pick.push(copy.splice(Math.floor(r() * copy.length), 1)[0]!);
      out.push(...pick);
    }
  }
  return out;
}

/** Sıradaki madde: uyarlama kuralı uygulanmış hâliyle (atlanan seviyeler sorulmaz) */
export function nextItem(items: AssessItem[], answers: AssessAnswer[]): AssessItem | null {
  const done = new Set(answers.map((a) => a.itemId));
  for (const it of items) {
    if (done.has(it.id)) continue;
    if (blockedLevel(it.skill, it.level, items, answers)) continue;
    return it;
  }
  return null;
}

/** Bir becerinin bir alt seviyesinde maddelerin yarısından fazlası yanlışsa üst seviye sorulmaz */
function blockedLevel(skill: AssessSkill, level: Level, items: AssessItem[], answers: AssessAnswer[]): boolean {
  const li = LEVELS.indexOf(level);
  for (let k = 0; k < li; k++) {
    const lower = LEVELS[k]!;
    const asked = items.filter((i) => i.skill === skill && i.level === lower);
    const ans = answers.filter((a) => a.skill === skill && a.level === lower);
    if (ans.length < asked.length) continue; // alt seviye henüz bitmedi; sıra zaten ona gelir
    const ok = ans.filter((a) => a.correct).length;
    // denetlenemeyen cevap paydaya girmez (yanlış sayılmaz)
    const sayilan = asked.length - ans.filter((a) => a.unchecked).length;
    if (sayilan > 0 && ok / sayilan < 0.5) return true;
  }
  return false;
}

export function progress(items: AssessItem[], answers: AssessAnswer[]) {
  const remaining = items.filter((it) => !answers.some((a) => a.itemId === it.id) && !blockedLevel(it.skill, it.level, items, answers)).length;
  return { done: answers.length, total: answers.length + remaining };
}

/** Puanlama: her beceri için en yüksek seviye ki o seviye ve altındakilerde doğru oranı ≥ %60 */
export function score(items: AssessItem[], answers: AssessAnswer[]): { results: SkillResult[]; overall: Level | "below-A1"; bySpeed: Partial<Record<Speed, { correct: number; total: number }>>; summaryTr: string } {
  const results: SkillResult[] = [];
  for (const skill of SKILL_ORDER) {
    const byLevel = Object.fromEntries(LEVELS.map((l) => [l, { correct: 0, total: 0 }])) as SkillResult["byLevel"];
    // denetlenemeyen cevap (yapay zekâ hatası) puana girmez: ne doğru ne yanlış
    for (const a of answers.filter((x) => x.skill === skill && !x.unchecked)) { byLevel[a.level].total++; if (a.correct) byLevel[a.level].correct++; }
    // sorulmayan (uyarlama ile atlanan) üst seviye maddeleri yanlış sayılır
    for (const it of items.filter((i) => i.skill === skill)) if (!answers.some((a) => a.itemId === it.id)) byLevel[it.level].total++;
    let est: Level | "below-A1" = "below-A1";
    for (const l of LEVELS) { const b = byLevel[l]; if (b.total && b.correct / b.total >= 0.6) est = l; else break; }
    const total = LEVELS.reduce((s, l) => s + byLevel[l].total, 0);
    const correct = LEVELS.reduce((s, l) => s + byLevel[l].correct, 0);
    results.push({ skill, correct, total, byLevel, estimate: est, confidence: total >= 9 ? "high" : total >= 6 ? "medium" : "low" });
  }
  const rank = (l: Level | "below-A1") => (l === "below-A1" ? 0 : LEVELS.indexOf(l) + 1);
  const sorted = results.map((r) => rank(r.estimate)).sort((a, b) => a - b);
  const med = sorted[Math.floor((sorted.length - 1) / 2)]!; // alt medyan: iyimser değil
  const overall = med === 0 ? "below-A1" : LEVELS[med - 1]!;
  const bySpeed: Partial<Record<Speed, { correct: number; total: number }>> = {};
  for (const a of answers.filter((x) => x.skill === "listening" && !x.unchecked)) {
    const sp = (a.mode as Speed) || LISTEN_SPEED[a.level];
    const b = (bySpeed[sp] ||= { correct: 0, total: 0 }); b.total++; if (a.correct) b.correct++;
  }
  return { results, overall, bySpeed, summaryTr: summarize(results, overall) };
}

const LV_TR = (l: Level | "below-A1") => (l === "below-A1" ? "A1 öncesi" : l);
function summarize(results: SkillResult[], overall: Level | "below-A1"): string {
  const strong = results.filter((r) => r.total && r.correct / r.total >= 0.7).map((r) => SKILL_TR[r.skill].toLowerCase());
  const weak = results.filter((r) => r.total && r.correct / r.total < 0.5).map((r) => SKILL_TR[r.skill].toLowerCase());
  const parts = [`Tahmini başlangıç seviyen: ${LV_TR(overall)}. Bu bir sınav sonucu değil; çalışmaya nereden başlayacağımızı belirlemek için.`];
  if (strong.length) parts.push(`Güçlü olduğun alanlar: ${strong.join(", ")}.`);
  if (weak.length) parts.push(`Önce üzerinde duracağımız alanlar: ${weak.join(", ")}.`);
  const passive = results.find((r) => r.skill === "vocab_passive"), active = results.find((r) => r.skill === "vocab_active");
  if (passive && active && passive.total && active.total && passive.correct / passive.total - active.correct / active.total >= 0.3)
    parts.push("Kelimeleri tanıyorsun ama kendin üretmekte zorlanıyorsun; konuşmaya hazırlıkta bu farkı kapatmaya odaklanacağız.");
  return parts.join(" ");
}

export function finish(a: Assessment, items: AssessItem[], now = new Date()): Assessment {
  const s = score(items, a.answers);
  return { ...a, finishedAt: now.toISOString(), results: s.results, overall: s.overall, listeningBySpeed: s.bySpeed, summaryTr: s.summaryTr, u: now.getTime() };
}
