import { describe, it, expect } from "vitest";
import { Lexeme } from "@dw/shared";
import type { LearnerItem } from "@dw/shared";
import { synonymHit, personalMatch, availableTypes, pickType, buildRound, requeue, meaningOptions, accepted, ownSentenceCheck, introduced, collocQuestion, startedToday, activatable, m1Hak } from "./garden.ts";
import { review, sessionKey } from "./srs.ts";

const L = (o: Record<string, unknown>) => Lexeme.parse({ tr: "x", pos: "other", ...o });
const termin = L({ id: "lx:Termin", de: "Termin", tr: "randevu", pos: "noun", art: "der", pl: "Termine", img: "calendar appointment", freqRank: 900,
  collocations: [{ de: "einen Termin machen", tr: "randevu almak" }], forms: [{ de: "Ich habe ___ Termin.", answer: "einen" }],
  examples: [{ id: "e1", de: "Ich habe einen Termin.", tr: "Randevum var." }, { id: "e2", de: "Der Termin ist morgen.", tr: "Randevu yarın." }] });
const absagen = L({ id: "lx:absagen", de: "absagen", tr: "iptal etmek", pos: "verb", forms: [{ de: "Ich ___ den Termin ___.", answer: "sage … ab" }] });
const der = L({ id: "lx:der", de: "der, die, das", tr: "belirli tanımlık", pos: "det", card: false });
const toeten = L({ id: "lx:töten", de: "töten", tr: "öldürmek", pos: "verb", tier: "passive" });
const lex = new Map([termin, absagen, der, toeten].map((l) => [l.id, l]));
const seq = (...v: number[]) => { let i = 0; return () => v[i++ % v.length]!; };

describe("Kelime Bahçesi (PM-049)", () => {
  it("türler içeriğe göre: isimde artikel ve fotoğraf, fiilde ayrılabilir biçim", () => {
    expect(availableTypes(termin, "passive")).toEqual(["listen_meaning", "article", "colloc"]);
    expect(availableTypes(termin, "active")).toEqual(["tr_de", "photo_say", "gap", "own_sentence"]);
    expect(availableTypes(absagen, "active")).toContain("sep_perfekt");
  });
  it("işlev kelimesi (tanımlık, zamir…) card:false olmasa da ayrı kart olmaz (PM-047 §2)", () => {
    const kein = L({ id: "lx:kein", de: "kein", tr: "hiç", pos: "det" });
    expect(availableTypes(kein, "active")).toEqual([]);
    expect(buildRound(new Map([[kein.id, kein]]), new Map(), [kein.id])).toEqual([]);
  });
  it("card:false ve passive kartlar aktif soruya girmez", () => {
    expect(availableTypes(der, "active")).toEqual([]);
    expect(availableTypes(toeten, "active")).toEqual([]);
    // pasif kart yalnızca (a) dinle → anlamını seç; isim olsa da artikel/eşdizim sorulmaz (inceleme #55)
    const pasifIsim = L({ id: "lx:Behörde", de: "Behörde", tr: "resmî daire", pos: "noun", art: "die", tier: "passive", collocations: [{ de: "bei der Behörde anrufen", tr: "resmî daireyi aramak" }] });
    expect(availableTypes(pasifIsim, "passive")).toEqual(["listen_meaning"]);
  });
  it("aynı tür art arda gelmez", () => {
    for (let i = 0; i < 20; i++) expect(pickType(termin, "active", "tr_de", () => i / 20)).not.toBe("tr_de");
  });
  it("yeni kart tanıtım + pasif soru; card:false yeni kart olarak gelmez; tanıtılmamış karta aktif soru yok", () => {
    const r = buildRound(lex, new Map(), ["lx:der", "lx:Termin", "lx:absagen"]);
    expect(r.map((q) => q.lexId)).toEqual(["lx:Termin", "lx:absagen"]);
    expect(r.every((q) => q.intro && q.type === "listen_meaning")).toBe(true);
  });
  it("vadesi gelen tanıtılmış kart aktif soruyla gelir; tur en çok 12", () => {
    const t0 = new Date("2026-11-01T10:00:00Z");
    let it: LearnerItem = review(undefined, { itemId: "lx:Termin", kind: "lexeme", path: "passive", outcome: "correct", session: sessionKey("g", t0.getTime()) }, t0);
    it = review(it, { itemId: "lx:Termin", kind: "lexeme", path: "active", outcome: "correct", session: sessionKey("g", t0.getTime()) }, t0);
    expect(introduced(it)).toBe(true);
    const r = buildRound(lex, new Map([["lx:Termin", it]]), [], { now: new Date("2026-12-01T10:00:00Z") });
    expect(r[0]).toMatchObject({ lexId: "lx:Termin" });
    expect(["tr_de", "photo_say", "gap", "own_sentence"]).toContain(r[0]!.type);
    const many = new Map<string, LearnerItem>();
    for (let i = 0; i < 30; i++) { const l = L({ id: `lx:w${i}`, de: `w${i}`, tr: `t${i}`, pos: "adj" }); lex.set(l.id, l); many.set(l.id, review(undefined, { itemId: l.id, kind: "lexeme", path: "passive", outcome: "wrong", session: "s@1" }, t0)); }
    expect(buildRound(lex, many, [], { now: new Date("2026-12-01T10:00:00Z") }).length).toBe(12);
  });
  it("yanlışta kart turun sonunda başka örnek ve başka türle bir kez geri gelir", () => {
    const q = { lexId: "lx:Termin", type: "tr_de" as const, ex: 0 };
    const r = requeue([q], q, termin, seq(0));
    expect(r).toHaveLength(2);
    expect(r[1]).toMatchObject({ lexId: "lx:Termin", ex: 1, retry: 1 });
    expect(r[1]!.type).not.toBe("tr_de");
    expect(requeue(r, r[1]!, termin)).toHaveLength(2);
  });
  it("anlam seçenekleri doğruyu bir kez içerir; kabul cevapları artikelli", () => {
    const m = meaningOptions(termin, [...lex.values()], seq(0.3, 0.6, 0.1));
    expect(m.opts[m.ans]).toBe("randevu");
    expect(m.opts.filter((x) => x === "randevu")).toHaveLength(1);
    expect(accepted(termin, "photo_say")).toEqual(["der Termin"]);
    expect(accepted(absagen, "sep_perfekt")).toContain("sage ab");
  });
  it("kendi cümlesi: kelime yoksa ya da çok kısaysa geçmez", () => {
    expect(ownSentenceCheck(termin, "Ich habe morgen einen Termin.")).toBe("ok");
    expect(ownSentenceCheck(termin, "Termin.")).toBe("short");
    expect(ownSentenceCheck(termin, "Ich gehe heute nach Hause.")).toBe("missing");
  });
  it("kişisel banka: duyduğun kelime sözlükte varsa öncelikli; büyük/küçük harf, artikel ve çoğul doğru eşleşir (#58 A3, inceleme #59 P1-6)", () => {
    const essenV = L({ id: "lx:essen", de: "essen", tr: "yemek yemek", pos: "verb" });
    const essenN = L({ id: "lx:Essen", de: "Essen", tr: "yemek", pos: "noun", art: "das" });
    const datum = L({ id: "lx:Datum", de: "Datum", pl: "Daten", tr: "tarih", pos: "noun", art: "das" });
    const daten = L({ id: "lx:Daten", de: "Daten", pl: "Daten", tr: "veriler", pos: "noun", art: "die" });
    const all = [termin, absagen, der, toeten, essenV, essenN, datum, daten];
    const ids = personalMatch([{ de: "der Termin" }, { de: "ein Termin" }, { de: "Termine" }, { de: "absagen" }, { de: "töten" }, { de: "Quatsch" }, { de: "essen" }, { de: "Essen" }, { de: "die Daten" }], all);
    expect(ids).toEqual(["lx:Termin", "lx:absagen", "lx:essen", "lx:Essen", "lx:Daten"]);
    expect(personalMatch([{ de: "das Datum" }], all)).toEqual(["lx:Datum"]);
    // noktalamalı kart ve artikel gibi başlayan ifade (inceleme #78 P1-4)
    const freut = L({ id: "lx:freut", de: "Freut mich!", tr: "memnun oldum", pos: "phrase" });
    const bisschen = L({ id: "lx:bisschen", de: "ein bisschen", tr: "biraz", pos: "phrase" });
    expect(personalMatch([{ de: "Freut mich!" }, { de: "ein bisschen" }], [...all, freut, bisschen])).toEqual(["lx:freut", "lx:bisschen"]);
  });
  it("öncelikli (duyduğum) kart, vadesi gelen ≥12 kart olsa da turda yer bulur (LS-7.5)", () => {
    const t0 = new Date("2026-11-01T10:00:00Z");
    const lx2 = new Map(lex), many = new Map<string, LearnerItem>();
    for (let i = 0; i < 20; i++) { const l = L({ id: `lx:p${i}`, de: `p${i}`, tr: `t${i}`, pos: "adj" }); lx2.set(l.id, l); many.set(l.id, review(undefined, { itemId: l.id, kind: "lexeme", path: "passive", outcome: "wrong", session: "s@1" }, t0)); }
    const r = buildRound(lx2, many, [], { now: new Date("2026-12-01T10:00:00Z"), priority: ["lx:Termin"] });
    expect(r).toHaveLength(12);
    expect(r.filter((q) => q.lexId === "lx:Termin")).toEqual([{ lexId: "lx:Termin", type: "listen_meaning", intro: true, ex: 0 }]);
  });
  it("tanıtılmış kart (pasifte doğru) bir sonraki turda ilk üretim sorusunu alır; günlük aktif sınırı uyulur (inceleme #59 P0-2)", () => {
    const t0 = new Date("2026-11-01T10:00:00Z");
    const it = review(undefined, { itemId: "lx:Termin", kind: "lexeme", path: "passive", outcome: "correct", session: "g@1" }, t0);
    expect(activatable(it, termin)).toBe(true);
    const r = buildRound(lex, new Map([["lx:Termin", it]]), [], { now: new Date("2026-11-01T10:05:00Z") });
    expect(r[0]!.lexId).toBe("lx:Termin");
    expect(["tr_de", "photo_say", "gap", "own_sentence"]).toContain(r[0]!.type);
    const after = review(it, { itemId: "lx:Termin", kind: "lexeme", path: "active", outcome: "correct", session: "g@2" }, t0);
    expect(activatable(after, termin)).toBe(false);
    expect(after.firstAt).toMatchObject({ passive: t0.toISOString(), active: t0.toISOString() });
    expect(startedToday([after], t0)).toEqual({ passive: 1, active: 1 });
    expect(buildRound(lex, new Map([["lx:Termin", it]]), [], { now: t0, activeLeft: 0 }).some((q) => q.lexId === "lx:Termin")).toBe(false);
    // tanıtılmamış (yalnızca yanlış) kart üretime açılmaz
    expect(activatable(review(undefined, { itemId: "lx:Termin", kind: "lexeme", path: "passive", outcome: "wrong", session: "g@1" }, t0), termin)).toBe(false);
  });
  it("günlük yeni kart sınırı (LS-7.4): hak bitince yeni kart gelmez", () => {
    expect(buildRound(lex, new Map(), ["lx:Termin", "lx:absagen"], { newLeft: 1 }).map((q) => q.lexId)).toEqual(["lx:Termin"]);
    expect(buildRound(lex, new Map(), ["lx:Termin", "lx:absagen"], { newLeft: 0 })).toEqual([]);
  });
  it("son sorulan tür (lastQ) yeni turda tekrar edilmez", () => {
    const t0 = new Date("2026-11-01T10:00:00Z");
    let it = review(undefined, { itemId: "lx:Termin", kind: "lexeme", path: "passive", outcome: "correct", session: "g@1" }, t0);
    it = review(it, { itemId: "lx:Termin", kind: "lexeme", path: "active", outcome: "correct", session: "g@1" }, t0);
    it.lastQ = "tr_de";
    for (let k = 0; k < 10; k++) expect(buildRound(lex, new Map([["lx:Termin", it]]), [], { now: new Date("2026-12-01T10:00:00Z"), rng: () => k / 10 })[0]!.type).not.toBe("tr_de");
  });
  it("artikel sorusu yalnızca çoğul isimlerde sorulmaz (die Daten)", () => {
    const daten = L({ id: "lx:Daten", de: "Daten", pl: "Daten", tr: "veriler", pos: "noun", art: "die" });
    expect(availableTypes(daten, "passive")).not.toContain("article");
  });
  it("eşdizim: çeldirici gövdeyle geçerli bir eşdizim oluşturamaz, noktalama atılır; gövdesi tekrar eden eşdizim sorulmaz (inceleme #59 P1-5)", () => {
    const zeit = L({ id: "lx:Zeit", de: "Zeit", tr: "zaman", pos: "noun", art: "die", collocations: [{ de: "Zeit haben", tr: "vakti olmak" }] });
    const x1 = L({ id: "lx:x1", de: "x1", tr: "x", pos: "verb", collocations: [{ de: "Zeit verbringen", tr: "vakit geçirmek" }, { de: "Komm rein!", tr: "gir" }, { de: "Geld sparen", tr: "para biriktirmek" }, { de: "Sport machen", tr: "spor yapmak" }] });
    for (let k = 0; k < 10; k++) {
      const q = collocQuestion(zeit, [zeit, x1], () => k / 10)!;
      expect(q.opts[q.ans]).toBe("haben");
      expect(q.opts).not.toContain("verbringen");
      expect(q.opts.every((o) => !/[!?.,]/.test(o))).toBe(true);
    }
    const two = L({ id: "lx:y", de: "y", tr: "y", pos: "noun", art: "der", collocations: [{ de: "einen Termin machen", tr: "a" }, { de: "einen Termin absagen", tr: "b" }] });
    expect(availableTypes(two, "passive")).not.toContain("colloc");
  });
  it("boşlukta also_ok eş anlamlıları da kabul, cümle biçimiyle (İÇ 7003635425-2)", () => {
    const deshalb = L({ id: "lx:deshalb", de: "deshalb", tr: "bu yüzden", pos: "adv", forms: [{ de: "Ich bin krank, ___ komme ich nicht.", answer: "deshalb", also_ok: ["deswegen"] }] });
    expect(accepted(deshalb, "gap")).toEqual(expect.arrayContaining(["deshalb", "deswegen", "Ich bin krank, deswegen komme ich nicht.", "Ich bin krank, deshalb komme ich nicht."]));
    expect(accepted(deshalb, "gap")).not.toContain("trotzdem");
    const auf = L({ id: "lx:aufmachen", de: "aufmachen", tr: "açmak", pos: "adj", forms: [{ de: "Ich ___ das Fenster ___.", answer: "mache … auf", also_ok: ["öffne … "] }] });
    expect(accepted(auf, "gap")).toEqual(expect.arrayContaining(["mache auf", "Ich mache das Fenster auf."]));
  });
  it("boşluk sorusunda bütün cümle de kabul (inceleme #59 P1-2)", () => {
    expect(accepted(termin, "gap")).toContain("Ich habe einen Termin.");
    expect(accepted(absagen, "sep_perfekt")).toContain("Ich sage den Termin ab.");
  });
  it("kendi cümlesi: çekimli ve ayrılabilir kullanım tanınır (inceleme #59 P1-1)", () => {
    const anrufen = L({ id: "lx:anrufen", de: "anrufen", tr: "aramak", pos: "verb" });
    const nehmen = L({ id: "lx:nehmen", de: "nehmen", tr: "almak", pos: "verb", verb: { praesens3: "nimmt", perfekt: "hat genommen", aux: "haben", sep: false } });
    expect(ownSentenceCheck(absagen, "Ich sage den Termin ab.")).toBe("ok");
    expect(ownSentenceCheck(anrufen, "Ich rufe dich morgen an.")).toBe("ok");
    expect(ownSentenceCheck(nehmen, "Nimmst du den Bus?")).toBe("ok");
    expect(ownSentenceCheck(absagen, "Ich habe den Termin abgesagt.")).toBe("ok");
  });
  it("2. tur Y-1: yer tutuculu eşdizim soru olmaz", () => {
    const moegen = L({ id: "lx:mögen", de: "mögen", tr: "sevmek", pos: "verb", collocations: [{ de: "Ich mag …", tr: "… seviyorum" }] });
    expect(availableTypes(moegen, "passive")).not.toContain("colloc");
  });
  it("2. tur Y-2: çok biçimli başlıkta her biçim doğru; eş anlamlı kart cezasız tanınır", () => {
    const anderer = L({ id: "lx:anderer", de: "anderer, andere, anderes", tr: "başka", pos: "adj" });
    expect(accepted(anderer, "tr_de")).toContain("anderer");
    const sprechen = L({ id: "lx:sprechen", de: "sprechen", tr: "konuşmak", pos: "verb" });
    const reden = L({ id: "lx:reden", de: "reden", tr: "konuşmak, söylemek", pos: "verb" });
    expect(synonymHit(sprechen, "reden", [sprechen, reden])?.id).toBe("lx:reden");
    expect(synonymHit(sprechen, "laufen", [sprechen, reden])).toBeNull();
  });
  it("2. tur: artikel sorusu tekil isimde var (das Zimmer), gerçekten çoğul isimde yok (die Eltern)", () => {
    expect(availableTypes(L({ id: "lx:Zimmer", de: "Zimmer", pl: "Zimmer", tr: "oda", pos: "noun", art: "das" }), "passive")).toContain("article");
    expect(availableTypes(L({ id: "lx:Eltern", de: "Eltern", pl: "Eltern", tr: "anne baba", pos: "noun", art: "die" }), "passive")).not.toContain("article");
  });
  it("2. tur: ilk üretim sorusu 'kendi cümlen' olmaz", () => {
    const t0 = new Date("2026-11-01T10:00:00Z");
    const it = review(undefined, { itemId: "lx:Termin", kind: "lexeme", path: "passive", outcome: "correct", session: "g@1" }, t0);
    for (let k = 0; k < 10; k++) expect(buildRound(lex, new Map([["lx:Termin", it]]), [], { now: t0, rng: () => k / 10 })[0]!.type).not.toBe("own_sentence");
  });
  it("3. tur: isimde eş anlamlı kart (Arbeit/Job) tanınır; farklı sözcük türü ve parantezli anlam eşleşmez; 'weh (tun)'", () => {
    const arbeit = L({ id: "lx:Arbeit", de: "Arbeit", tr: "iş", pos: "noun", art: "die" });
    const job = L({ id: "lx:Job", de: "Job", tr: "iş", pos: "noun", art: "der" });
    const halten = L({ id: "lx:halten", de: "halten", tr: "tutmak (süre)", pos: "verb" });
    const kosten = L({ id: "lx:kosten", de: "kosten", tr: "tutmak (fiyat)", pos: "verb" });
    expect(synonymHit(arbeit, "der Job", [arbeit, job])?.id).toBe("lx:Job");
    expect(synonymHit(halten, "kosten", [halten, kosten])).toBeNull();
    const uhr = L({ id: "lx:Uhr", de: "Uhr", tr: "saat", pos: "noun", art: "die" });
    expect(synonymHit(uhr, "um", [uhr, L({ id: "lx:um", de: "um", tr: "saat", pos: "prep" })])).toBeNull();
    expect(accepted(L({ id: "lx:weh", de: "weh (tun)", tr: "acımak", pos: "adj" }), "tr_de")).toEqual(expect.arrayContaining(["weh", "weh tun"]));
  });
  it("inceleme #66 P1-3: M1 günü (yeniAyir) — tekrar yükü yüksekken de günün yeni kartları gelir", () => {
    const t0 = new Date("2026-11-01T10:00:00Z");
    const lx = new Map(lex);
    const many = new Map<string, LearnerItem>();
    for (let i = 0; i < 30; i++) { const l = L({ id: `lx:d${i}`, de: `d${i}`, tr: `t${i}`, pos: "adj" }); lx.set(l.id, l); many.set(l.id, review(undefined, { itemId: l.id, kind: "lexeme", path: "passive", outcome: "wrong", session: "s@1" }, t0)); }
    const yeni: string[] = [];
    for (let i = 0; i < 25; i++) { const l = L({ id: `lx:n${i}`, de: `n${i}`, tr: `y${i}`, pos: "adj" }); lx.set(l.id, l); yeni.push(l.id); }
    const now = new Date("2026-12-01T10:00:00Z");
    const eski = buildRound(lx, many, yeni, { now }).filter((q) => q.intro).length;
    expect(eski).toBe(0);
    const r = buildRound(lx, many, yeni, { now, yeniAyir: 8, newLeft: 25 });
    expect(r.length).toBe(12);
    expect(r.filter((q) => q.intro).map((q) => q.lexId)).toEqual(yeni.slice(0, 8));
    // tekrar yokken tur günün kartlarıyla dolar (en çok 10 yeni)
    expect(buildRound(lx, new Map(), yeni, { now, yeniAyir: 8, newLeft: 25 }).length).toBe(10);
  });
  it("inceleme #66 2. tur P1-A: kişisel kelimeler günün kartlarını geciktirmez", () => {
    const t0 = new Date("2026-11-01T10:00:00Z"), now = new Date("2026-12-01T10:00:00Z");
    const lx = new Map(lex);
    const yeni: string[] = [], kis: string[] = [];
    for (let i = 0; i < 3; i++) { const l = L({ id: `lx:g${i}`, de: `g${i}`, tr: `g${i}`, pos: "adj" }); lx.set(l.id, l); yeni.push(l.id); }
    for (let i = 0; i < 10; i++) { const l = L({ id: `lx:k${i}`, de: `k${i}`, tr: `k${i}`, pos: "adj" }); lx.set(l.id, l); kis.push(l.id); }
    // takvim hakkı bitmiş: kişisel kelime gelmez, günün 3 kartı gelir
    let h = m1Hak(0, 3, 10);
    expect(h).toEqual({ newLeft: 3, kisiselIzin: false });
    let r = buildRound(lx, new Map(), yeni, { now, priority: h.kisiselIzin ? kis : [], newLeft: h.newLeft, yeniAyir: 3 });
    expect(r.filter((q) => q.intro).map((q) => q.lexId)).toEqual(yeni);
    // takvim hakkı var: en çok 2 kişisel + günün bütün kartları
    h = m1Hak(25, 3, 10);
    r = buildRound(lx, new Map(), yeni, { now, priority: kis, newLeft: h.newLeft, yeniAyir: 3 });
    const intro = r.filter((q) => q.intro).map((q) => q.lexId);
    expect(yeni.every((id) => intro.includes(id))).toBe(true);
    expect(intro.filter((id) => kis.includes(id)).length).toBe(2);
    void t0;
  });
});
