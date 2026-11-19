import { describe, it, expect } from "vitest";
import { near, tokens, untaught } from "./teach.ts";
import type { Scenario } from "../../packages/shared/src/content.ts";

// inceleme #49 P1-2: "öğretmeden isteme" kuralının kendi testleri
describe("öğretmeden isteme", () => {
  it("çekim eki aynı kelime, farklı kelime değil", () => {
    for (const [a, b] of [["mache", "machen"], ["machst", "machen"], ["zahle", "zahlen"], ["kenne", "kennen"], ["bleibe", "bleiben"]]) expect(near(a!, b!)).toBe(true);
    for (const [a, b] of [["mittwoch", "mittag"], ["vierzig", "vier"], ["achtung", "acht"], ["nichts", "nicht"], ["meinung", "mein"]]) expect(near(a!, b!)).toBe(false);
  });
  it("yer tutucu ve hitap seçenekleri kelime sayılmaz", () => {
    expect(tokens("Mein Name ist {name}. {Herr|Frau} Weber?")).toEqual(["mein", "name", "ist", "weber"]);
  });
  it("öğretilmemiş kelime build, drill, diyalog öğrenci satırı ve konuşma görevinde yakalanır", () => {
    const s = ({
      id: "sc:test:01", domain: "test", title_tr: "Test", goal_tr: "Test", level: "A2", situation_tr: "x",
      essentials: { lexemes: [], chunks: ["ch:test:termin"], patterns: [] },
      chunks: [{ id: "ch:test:termin", layers: { hd: "Ich möchte einen Termin." }, tr: "Randevu istiyorum." }],
      build: [{ id: "b1", prompt_tr: "x", accepted: ["Ich möchte einen Termin.", "a", "b"] }, { id: "b2", prompt_tr: "x", accepted: ["Ich brauche ein Rezept.", "a", "b"] }],
      drills: [], listening: [],
      dialogues: [{ id: "v1", title_tr: "x", lines: [{ r: "A", de: "Praxis Weber, guten Tag.", tr: "x" }, { r: "B", de: "Ich habe Fieber.", tr: "x" }] }],
      speaking: [{ task_tr: "x", model_de: "Ich habe Husten." }],
      review: { status: "draft" }
    } as unknown) as Scenario;
    const u = untaught(s, new Map());
    expect(u.map((x) => x.item)).toEqual(["b2", "dialog0#1", "speaking[0]"]);
    expect(u.find((x) => x.item === "b2")!.words).toEqual(["brauche", "rezept"]);
  });
});
