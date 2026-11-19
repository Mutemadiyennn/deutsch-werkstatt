import { describe, expect, it } from "vitest";
import { havuzlar, konusanBul, sahneAta, sesAta, sesCinsi, sesKalitesi, type Ses } from "./sesSec.ts";
import { RATE } from "../services/speech.ts";

const v = (name: string, lang = "de-DE"): Ses => ({ name, lang });
// iPhone'da tipik liste: Anna, Helena (Gelişmiş), Petra, Markus, Martin, Viktor, eğlence sesleri + başka diller
const IPHONE = [v("Anna"), v("Helena (Erweitert)"), v("Petra (Premium)"), v("Markus"), v("Martin"), v("Viktor (Erweitert)"), v("Eddy (Deutsch (Deutschland))"), v("Grandma (Deutsch (Deutschland))"), v("Samantha", "en-US"), v("Yelda", "tr-TR")];
const KARAKTER = [
  { id: "ch:huber", name: "Sabine Huber", ses: { cinsiyet: "kadin" as const, sira: 2 } },
  { id: "ch:lechner", name: "Tobias „Tobi“ Lechner", ses: { cinsiyet: "erkek" as const, sira: 2 } },
  { id: "ch:weber", name: "Dr. Thomas Weber", ses: { cinsiyet: "erkek" as const, sira: 1 } },
  { id: "ch:stadler", name: "Gerti Stadler", ses: { cinsiyet: "kadin" as const, sira: 4 } }
];

describe("ses seçimi (PM-064, B15 1. adım)", () => {
  it("adlardan kadın/erkek havuzu; kaliteli sesler önce, eğlence sesleri son, başka diller yok", () => {
    expect(sesCinsi(v("Anna"))).toBe("kadin");
    expect(sesCinsi(v("Microsoft Conrad Online (Natural) - German (Germany)"))).toBe("erkek");
    expect(sesCinsi(v("Google Deutsch"))).toBe("kadin");
    expect(sesKalitesi(v("Helena (Erweitert)"))).toBeGreaterThan(sesKalitesi(v("Anna")));
    expect(sesKalitesi(v("Eddy (Deutsch (Deutschland))"))).toBeLessThan(0);
    const h = havuzlar(IPHONE);
    expect(h.kadin.map((x) => x.name)).toEqual(["Helena (Erweitert)", "Petra (Premium)", "Anna", "Grandma (Deutsch (Deutschland))"]);
    expect(h.erkek[0]!.name).toBe("Viktor (Erweitert)");
    expect([...h.kadin, ...h.erkek, ...h.diger].some((x) => !x.lang.startsWith("de"))).toBe(false);
  });
  it("aynı karakter her sahnede aynı ses; erkek karakter erkek, kadın karakter kadın sesi", () => {
    const tobi = konusanBul("ch:lechner", KARAKTER)!;
    const a1 = sahneAta([tobi, konusanBul("Frau Huber", KARAKTER)!], IPHONE).get("ch:lechner")!;
    const a2 = sahneAta([konusanBul("Dr. Weber", KARAKTER)!, tobi], IPHONE).get("ch:lechner")!;
    expect(a1.ses!.name).toBe(a2.ses!.name);
    expect(sesCinsi(a1.ses!)).toBe("erkek");
    expect(sesCinsi(sesAta(konusanBul("Sabine Huber", KARAKTER)!, IPHONE).ses!)).toBe("kadin");
  });
  it("iki konuşanlı sahnede iki farklı ses; havuz bitince perde farkı", () => {
    const m = sahneAta([konusanBul("Tobi", KARAKTER)!, konusanBul("Dr. Weber", KARAKTER)!], IPHONE);
    expect(m.get("ch:lechner")!.ses!.name).not.toBe(m.get("ch:weber")!.ses!.name);
    // tek erkek sesli cihaz: ikinci erkek aynı ses, farklı perde
    const tek = [v("Anna"), v("Markus")];
    const t = sahneAta([konusanBul("Tobi", KARAKTER)!, konusanBul("Dr. Weber", KARAKTER)!], tek);
    const [x, y] = [t.get("ch:lechner")!, t.get("ch:weber")!];
    expect(x.ses!.name).toBe(y.ses!.name);
    expect(x.pitch).not.toBe(y.pitch);
  });
  it("erkek havuzu boşsa kadın sesi alçak perdeyle ve uyarı işaretiyle", () => {
    const a = sesAta(konusanBul("Herr Pichler", [])!, [v("Anna"), v("Petra")]);
    expect(a.ses).toBeDefined(); expect(a.pitch).toBeLessThan(1); expect(a.cinsiyetYok).toBe(true);
  });
  it("tanınmayan konuşan: hitaptan cinsiyet, addan kararlı ses", () => {
    expect(konusanBul("Herr Maier", KARAKTER)!.cinsiyet).toBe("erkek");
    expect(konusanBul("Frau Kurz", KARAKTER)!.cinsiyet).toBe("kadin");
    expect(konusanBul("Kassierer", KARAKTER)).toEqual(konusanBul("Kassierer", KARAKTER));
  });
  it("Yavaş yalnızca hızı düşürür: normalden en az %20 yavaş (perde ve ses atamadan bağımsız)", () => {
    expect(RATE.slow).toBeLessThanOrEqual(RATE.normal * 0.8);
  });
});
