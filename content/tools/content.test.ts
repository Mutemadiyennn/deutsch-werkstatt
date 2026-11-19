import { describe, it, expect } from "vitest";
import { loadContent, checkRules, checkScenario, icerikGuvenligi, b4Uyarilar, guvenlikTara, boslukCakismasi, ornekteKelime, essesliOrnek } from "./load.ts";
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

describe("#58 B4 doğrulayıcı (#54 D16)", () => {
  const L = (x: Record<string, unknown>) => ({ collocations: [], patterns: [], register: "neutral", related: [], mistakes_tr: [], examples: [], domains: [], legacy: [], forms: [], ...x }) as never;
  const bos = { scenarios: [], temel: [], m1: [], patterns: [] };
  const tur = (t: string, tr = false) => guvenlikTara(t, tr)?.tur ?? null;
  it("kaba ve hakaret: çekimli, birleşik ve Türkçe biçimler yakalanır (inceleme #88 kaçakları)", () => {
    for (const t of ["Das ist Scheiße.", "So ein Scheißkerl!", "Hundescheiße überall", "scheiß drauf", "Ihr Arschlöcher", "diese Hurensöhne", "verfickt noch mal", "verdammt!", "Verdammt noch mal"])
      expect(tur(t), t).toBe("kaba");
    for (const t of ["orospuçocuğu", "yavşağın teki", "İbne", "aq ya", "siktir git"]) expect(tur(t, true), t).toBe("kaba");
    // 2. tur: kelime başı kökler ve kalan kaçaklar
    for (const t of ["Leck mich am Arsch!", "Halt die Fresse!", "du Kanake"]) expect(tur(t), t).toBe("kaba");
    for (const t of ["hassiktir", "göt herif"]) expect(tur(t, true), t).toBe("kaba");
  });
  it("şiddet ve aşırıcılık: çekimli biçimler; aşırıcılık her yerde", () => {
    for (const t of ["Er wurde getötet.", "Sie haben ihn erschossen.", "der Mord", "Der Mörder ist weg.", "eine Leiche", "Ich bring dich um!", "Er bringt ihn um.", "I bring di um!", "eine Pistole"]) expect(tur(t), t).toBe("siddet");
    expect(tur("Heil Hitler")).toBe("asiri");
  });
  it("masum metin yakalanmaz: benzer kökler, deyim, kriegen fiili, Türkçe açıklamada geçen Almanca kelime", () => {
    for (const t of ["Ich bringe sie um acht in die Kita.", "Bringst du ihn um 9 Uhr zum Arzt?", "der tote Winkel", "Hier ist tote Hose.", "Der Marsch ist lang.", "ein Barsch", "Warschau"]) expect(tur(t), t).toBeNull();
    expect(tur("Bu film bomba gibi.", true)).toBeNull();
    for (const t of ["Das Schiff", "Ich habe einen Pickel.", "Mordsgaudi auf der Wiesn!", "Mein Rücken bringt mich um.", "Krieg ich das Pfand zurück?", "Kriegst du das hin?", "Das ist mir Wurst.", "Ich wähle die Suppe.", "die Auswahl", "Die Kirche ist alt.", "Die Party war toll.", "So ein Mist!"])
      expect(tur(t), t).toBeNull();
    // Türkçe açıklama alanı (üst dil): Almanca kaba kelime orada hata değildir
    expect(tur("„Scheiße“ deme; kibar ortamda „So ein Mist“ de.", true)).toBeNull();
    expect(tur("Der Krieg ist vorbei.")).toBe("hassas");
  });
  it("kart düzeyi: aktif kartta hata; tanıma kartında kullanım uyarısı varsa sessiz, yoksa uyarı; açıklamada geçen kelime kartı işaretlemez", () => {
    expect(icerikGuvenligi({ ...bos, lexemes: [L({ id: "lx:x", de: "Das ist Scheiße.", tr: "x", pos: "phrase", tier: "K1" })] }).hata).toHaveLength(1);
    const uyarili = icerikGuvenligi({ ...bos, lexemes: [L({ id: "lx:y", de: "Scheiße", tr: "bok", pos: "noun", tier: "passive", mistakes_tr: ["Kaba: kibar ortamda deme."] })] });
    expect(uyarili.hata).toHaveLength(0); expect(uyarili.uyari).toHaveLength(0);
    const uyarisiz = icerikGuvenligi({ ...bos, lexemes: [L({ id: "lx:z", de: "Waffe", tr: "silah", pos: "noun", tier: "passive" })] });
    expect(uyarisiz.hata).toHaveLength(0); expect(uyarisiz.uyari[0]).toMatch(/kullanım uyarısı yok/);
    const mist = icerikGuvenligi({ ...bos, lexemes: [L({ id: "lx:Mist", de: "Mist", tr: "kahretsin (kibar)", pos: "noun", tier: "K1", mistakes_tr: ["„Scheiße“ yerine bunu söyle."] })] });
    expect(mist.hata).toHaveLength(0);
  });
  it("bütün pasif kartlar (süzgece takılmasa da) M1 yeni kartı ve K1 çekirdeği olamaz; kullanım uyarısı kelime sınırıyla aranır", () => {
    const lx = [L({ id: "lx:Idiot", de: "Idiot", tr: "aptal", pos: "noun", tier: "passive" })];
    const r = icerikGuvenligi({ ...bos, lexemes: lx, m1: [{ file: "m1/gun-01.json", data: { yeni_kartlar: ["lx:Idiot"] } as never }], k1: { cekirdek: ["lx:Idiot"], pasif: [] } });
    expect(r.hata).toHaveLength(2);
    // "ödeme", "kargo" kullanım uyarısı sayılmaz
    const k = icerikGuvenligi({ ...bos, lexemes: [L({ id: "lx:W", de: "Waffe", tr: "silah", pos: "noun", tier: "passive", mistakes_tr: ["ödeme ve kargo ile ilgisi yok"] })] });
    expect(k.uyari[0]).toMatch(/kullanım uyarısı yok/);
  });
  it("kaba/şiddet tanıma kartı üretim havuzuna giremez: M1 yeni kart, senaryo temel öğesi, K1 çekirdek", () => {
    const lx = [L({ id: "lx:S", de: "Scheiße", tr: "bok", pos: "noun", tier: "passive", mistakes_tr: ["kaba"] })];
    const r = icerikGuvenligi({ ...bos, lexemes: lx, m1: [{ file: "m1/gun-01.json", data: { yeni_kartlar: ["lx:S"] } as never }], k1: { cekirdek: ["lx:S"], pasif: [] } });
    expect(r.hata.join("\n")).toMatch(/günün yeni kartı olamaz/); expect(r.hata.join("\n")).toMatch(/çekirdekte olamaz/);
  });
  it("taranan kaynaklar: dünya, seviye tespiti, dilbilgisi, alanlar; ders metninde hata", () => {
    const r = icerikGuvenligi({ ...bos, lexemes: [], world: { x: "Er ist ein Arschloch." } as never, assess: [{ id: "as:1", q_de: "verdammt" } as never], grammar: [{ id: "g:1", ex: "Heil Hitler" } as never], domains: [{ id: "d", title_de: "Mord" } as never],
      temel: [{ file: "temel/r0-01.json", data: { teach: [{ de: "Fick dich" }] } as never }] });
    expect(r.hata.length).toBe(5);
  });
  it("hassas konu uyarısı incelenince kapanır (b4-taban.json hassas_onay)", () => {
    const lx = [L({ id: "lx:Kampf", de: "der Kampf", tr: "mücadele", pos: "noun", tier: "K1", examples: [{ de: "Der Krieg ist vorbei.", tr: "x" }] })];
    expect(icerikGuvenligi({ ...bos, lexemes: lx }).uyari).toHaveLength(1);
    expect(icerikGuvenligi({ ...bos, lexemes: lx }, { hassas_onay: ["lx:Kampf"] }).uyari).toHaveLength(0);
  });
  it("kart kuralları sayılı uyarı; taban aşılınca hata (gerileme durur)", () => {
    const lx = [L({ id: "lx:a", de: "Tisch", tr: "masa", pos: "noun", tier: "K1", img: "table", examples: [{ de: "x", tr: "y" }] })];
    const u = b4Uyarilar(lx).uyari.join("\n");
    expect(u).toMatch(/forms yok: 1/); expect(u).toMatch(/3'ten az eşdizim: 1/); expect(u).toMatch(/görselsiz örnek: 1/);
    expect(b4Uyarilar(lx, { uyari: { k1_isim_formsuz: 0 } }).hata.join("\n")).toMatch(/taban 0.*arttı/);
    expect(b4Uyarilar(lx, { uyari: { k1_isim_formsuz: 1 } }).hata).toHaveLength(0);
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

describe("PM-062 anlam güvenliği (doğrulayıcı)", () => {
  const V = (de: string, pos = "verb", x: Record<string, unknown> = {}) => ({ de, pos, forms: [], ...x }) as never;
  it("örnek cümlede kartın kelimesi: gövde, çekim, birleşik isim, ayrılabilir fiil", () => {
    expect(ornekteKelime(V("anfangen"), "Fangen wir an?")).toBe(true);
    expect(ornekteKelime(V("Fach", "noun"), "Sport war mein Lieblingsfach.")).toBe(true);
    expect(ornekteKelime(V("Termin", "noun", { pl: "Termine" }), "Ich habe zwei Termine.")).toBe(true);
    expect(ornekteKelime(V("öffnen"), "Mach mal auf, ich bin's!")).toBe(false);
    // inceleme #92: düzensiz çekim, dönüşlü ve önekli fiil, tireli isim, emir; başka kelime yakalanır
    expect(ornekteKelime(V("sein"), "Ich bin heute sehr müde.")).toBe(true);
    expect(ornekteKelime(V("sich anmelden"), "Ich melde mich für den Kurs an.")).toBe(true);
    expect(ornekteKelime(V("zurückgeben", "verb", { verb: { praesens3: "gibt zurück" } }), "Wann gibst du mir das Buch zurück?")).toBe(true);
    expect(ornekteKelime(V("aufgeben", "verb", { verb: { praesens3: "gibt auf" } }), "Gib nicht auf!")).toBe(true);
    expect(ornekteKelime(V("U-Bahn", "noun"), "Die U-Bahn kommt gleich.")).toBe(true);
    expect(ornekteKelime(V("Wagen", "noun"), "Nehmen Sie einen Einkaufswagen.")).toBe(true);
    expect(ornekteKelime(V("Wiedersehen", "noun"), "Auf Wiederhören, Frau Wagner.")).toBe(false);
    expect(ornekteKelime(V("Brot", "noun"), "Der Zug kommt um acht.")).toBe(false);
  });
  it("eşsesli kartlarda aynı örnek cümle bulunur", () => {
    const e = (de: string) => ({ id: "x", de, tr: "y", layer: "hd" as const });
    expect(essesliOrnek([{ id: "lx:stehen", de: "stehen", examples: [e("Das Auto steht vor dem Haus.")], forms: [] }, { id: "lx:stehen#2", de: "stehen", examples: [e("Das Auto steht vor dem Haus.")], forms: [] }] as never)).toHaveLength(1);
    expect(essesliOrnek([{ id: "lx:a", de: "a", examples: [e("Gleich.")], forms: [] }, { id: "lx:b", de: "b", examples: [e("Gleich.")], forms: [] }] as never)).toHaveLength(0);
    // boşluk cümleleri de havuzdur (inceleme #92 P1-3)
    const f = (de: string) => ({ de, answer: "x" });
    expect(essesliOrnek([{ id: "lx:p", de: "passen", examples: [], forms: [f("Passt ___ das am Montag?")] }, { id: "lx:p#2", de: "passen", examples: [], forms: [f("Passt ___ das am Montag?")] }] as never)).toHaveLength(1);
  });
});
