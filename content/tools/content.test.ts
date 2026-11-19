import { describe, it, expect } from "vitest";
import { loadContent, checkRules, checkScenario, boslukCakismasi } from "./load.ts";
import { importV1, sameSense } from "./import-v1.ts";
import { AiTasks } from "../../packages/shared/src/api.ts";

describe("içerik v2", () => {
  const c = checkRules(loadContent());
  it("bütün dosyalar şemaya uyuyor ve kurallar 0 hata veriyor", () => {
    expect(c.errors).toEqual([]);
  });
  it("dünya (H4 §2): 10–12 kalıcı karakter, 26 haftalık hikâye, takvim; kimlikler tutarlı", () => {
    expect(c.world).toBeTruthy();
    expect(c.world!.characters.length).toBeGreaterThanOrEqual(10);
    expect(c.world!.characters.length).toBeLessThanOrEqual(12);
    expect(c.world!.story).toHaveLength(26);
    expect(c.world!.calendar.some((x) => x.id === "cal:advent")).toBe(true);
    // öğrenci karakteri adsız: hikâye metinlerinde öğrenciye ad verilmez
    for (const s of c.world!.story) expect(s.plot_tr).not.toMatch(/\{name\}/);
  });
  it("20 alan var (PEDAGOGY §4), strateji ilk sırada", () => {
    expect(c.domains).toHaveLength(20);
    expect(c.domains[0]!.id).toBe("strategie");
  });
  it("v1'in 715 kelime kaydının hepsi aktarılmış (aynı anlamdakiler birleşmiş)", () => {
    const keys = c.lexemes.flatMap((l) => l.legacy.map((x) => x.key));
    expect(keys).toHaveLength(715);
    expect(new Set(keys).size).toBe(715);
    expect(c.lexemes.reduce((a, l) => a + l.examples.length, 0)).toBeGreaterThanOrEqual(2860);
  });
  it("seviye tespiti havuzunda her beceri ve her seviyeden madde var", () => {
    for (const skill of ["vocab_passive", "vocab_active", "listening", "building", "speaking"]) {
      for (const level of ["A1", "A2", "B1"]) {
        expect(c.assess.filter((a) => a.skill === skill && a.level === level).length, `${skill}/${level}`).toBeGreaterThan(5);
      }
    }
  });
  it("pasif kelime maddelerinde doğru şık tek ve çeldiriciler farklı", () => {
    for (const a of c.assess) if (a.skill === "vocab_passive") expect(new Set(a.opts_tr).size).toBe(4);
  });
});

describe("v1 aktarımı", () => {
  it("anlam eşleştirme parantez içini yok sayar", () => {
    expect(sameSense("telefonla aramak", "telefonla aramak (ruft … an)")).toBe(true);
    expect(sameSense("… olarak (meslek)", "…dığında, …ken (geçmişte bir kez)")).toBe(false);
  });
  it("deterministik: iki çalıştırma aynı sonucu verir", () => {
    const u = [{ id: "a1-01", lvl: "A1.1", teach: [], drills: [], test: [], words: ["Haus:ev", "Baum:ağaç", "Auto:araba", "Tür:kapı", "Tisch:masa"].map((x) => ({ de: x.split(":")[0]!, tr: x.split(":")[1]!, art: "das", pl: "", t: "n" as const })) }];
    expect(JSON.stringify(importV1(u))).toBe(JSON.stringify(importV1(u)));
  });
  it("her senaryonun rol oyunu verisi sunucu görev sınırlarına sığıyor (roleplay_turn / feedback_tr)", () => {
    for (const { data: s } of checkRules(loadContent()).scenarios) {
      const rp = s.roleplay;
      const levels = rp.levels.length ? rp.levels : [{ level: 1, style_de: undefined }];
      for (const lv of levels) for (const sur of [undefined, ...rp.surprises.map((x) => x.de)]) {
        const r = AiTasks.roleplay_turn.input.safeParse({ partner_de: rp.partner_de, scene_tr: rp.scene_tr, goals_de: rp.goals.map((g) => g.de), level: lv.level, style_de: lv.style_de, surprise_de: sur, history: [{ r: "partner", de: rp.opener_de }], stuck: 0 });
        expect(r.success, `${s.id} roleplay_turn: ${r.success ? "" : r.error.issues[0]?.path.join(".") + " " + r.error.issues[0]?.message}`).toBe(true);
      }
      const f = AiTasks.feedback_tr.input.safeParse({ scene_tr: rp.scene_tr, goals: rp.goals.map((g) => ({ id: g.id, de: g.de })), transcript: [{ r: "partner", de: rp.opener_de }] });
      expect(f.success, `${s.id} feedback_tr`).toBe(true);
    }
  });
  it("LS-17.0: 'mini' biçim azaltılmış asgari sayılarla geçer, 'full' aynı veride hata verir", () => {
    const base = checkRules(loadContent()).scenarios[0]!.data;
    const keep = (k: string) => base.drills.filter((d) => d.k === k).slice(0, 3);
    const small = { ...structuredClone(base), build: base.build.slice(0, 10), drills: [...keep("gap"), ...keep("order"), ...keep("guided_response"), ...keep("tr_de")], dialogues: base.dialogues.slice(0, 1) };
    const full = checkScenario({ ...small, format: "full" });
    const mini = checkScenario({ ...small, format: "mini" });
    expect(full.some((e) => e.includes("cümle kurma en az 25"))).toBe(true);
    expect(full.some((e) => e.includes("alıştırma en az 35"))).toBe(true);
    expect(mini.filter((e) => /en az (10|12|1) |alıştırma türü eksik/.test(e))).toEqual([]);
  });
});

describe("boşluk çakışması uyarısı (İÇ 7003635425-3, inceleme #85)", () => {
  const f = (de: string, answer: string, also_ok?: string[], tr?: string) => ({ de, answer, also_ok, tr });
  it("aynı cümle farklı cevap kümesi: uyarı; also_ok bir kartta var ötekinde yok: uyarı", () => {
    expect(boslukCakismasi([{ id: "a", forms: [f("Ich bin krank, ___ komme ich nicht.", "deshalb", ["deswegen"])] }, { id: "b", forms: [f("Ich bin krank, ___ komme ich nicht.", "deshalb")] }])).toHaveLength(1);
    expect(boslukCakismasi([{ id: "a", forms: [f("X ___ y.", "eins", undefined, "bir")] }, { id: "b", forms: [f("X ___ y.", "zwei")] }])).toHaveLength(1);
  });
  it("aynı küme ya da farklı çeviri: uyarı yok; also_ok cevabı tekrar ediyorsa uyarı", () => {
    expect(boslukCakismasi([{ id: "a", forms: [f("X ___ y.", "eins", ["zwei"])] }, { id: "b", forms: [f("X ___ y.", "zwei", ["eins"])] }])).toHaveLength(0);
    expect(boslukCakismasi([{ id: "a", forms: [f("X ___ y.", "eins", undefined, "bir")] }, { id: "b", forms: [f("X ___ y.", "zwei", undefined, "iki")] }])).toHaveLength(0);
    expect(boslukCakismasi([{ id: "a", forms: [f("X ___ y.", "eins", ["Eins"])] }])[0]).toMatch(/tekrar/);
  });
});
