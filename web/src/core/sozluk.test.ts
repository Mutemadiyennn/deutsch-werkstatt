import { describe, expect, it } from "vitest";
import { yerelAcikla } from "./sozluk.ts";

const L = (x: Record<string, unknown>) => ({ collocations: [], patterns: [], register: "neutral", related: [], mistakes_tr: [], examples: [], domains: [], legacy: [], ...x }) as never;
const LEX = [
  L({ id: "termin", de: "Termin", tr: "randevu", pos: "noun", art: "der", pl: "Termine", collocations: [{ de: "einen Termin machen", tr: "randevu almak" }], examples: [{ de: "Ich habe morgen einen Termin.", tr: "Yarın randevum var." }] }),
  L({ id: "haben", de: "haben", tr: "sahip olmak", pos: "verb", verb: { praesens3: "hat" } }),
  L({ id: "morgen", de: "morgen", tr: "yarın", pos: "adv" }),
  L({ id: "wiederholen", de: "wiederholen", tr: "tekrarlamak", pos: "verb", head: { de: "Können Sie das wiederholen?", tr: "Tekrar edebilir misiniz?" } })
];

describe("yerel sözlük (#58 A11)", () => {
  it("bütün ifade: eşdizim, örnek, başlık ifadesi", () => {
    expect(yerelAcikla("einen Termin machen", LEX)).toMatchObject({ kaynak: "ifade", tr: "randevu almak", kart: "Termin" });
    expect(yerelAcikla("„Ich habe morgen einen Termin.“", LEX)).toMatchObject({ kaynak: "ifade", tr: "Yarın randevum var." });
    expect(yerelAcikla("Können Sie das wiederholen", LEX)).toMatchObject({ kaynak: "ifade", tr: "Tekrar edebilir misiniz?" });
  });
  it("tek kelime: çekimli biçimden kart", () => {
    expect(yerelAcikla("Termine", LEX)).toMatchObject({ kaynak: "kelime", de: "Termin", art: "der", tr: "randevu" });
    expect(yerelAcikla("hat,", LEX)).toMatchObject({ kaynak: "kelime", de: "haben" });
    expect(yerelAcikla("Fahrrad", LEX)).toBeNull();
  });
  it("cümle: kelime kelime, aynı kart bir kez", () => {
    const a = yerelAcikla("Er hat morgen keinen Termin, er hat Zeit.", LEX)!;
    expect(a.kaynak).toBe("kelimeler");
    expect(a.kelimeler!.map((k) => k.de)).toEqual(["haben", "morgen", "Termin"]);
  });
  it("cümledeki kalıp bütün açıklanır: Grüß Gott = merhaba, Gott ayrıca Tanrı diye açıklanmaz (PM finali #218)", () => {
    const lx = [...LEX, L({ id: "Gott", de: "Gott", tr: "Tanrı", pos: "noun", art: "der", collocations: [{ de: "Grüß Gott!", tr: "Merhaba!" }, { de: "Gott sei Dank!", tr: "Çok şükür!" }], exp: { anlam_tr: "Tanrıyı söyler.", ne_zaman_tr: "Güneyde selamlaşırken **Grüß Gott** dersin.", parcalar: [] } }), L({ id: "fuehren", de: "führen", tr: "götürmek", pos: "verb" })];
    const a = yerelAcikla("Grüß Gott! Was führt Sie zu mir?", lx)!;
    expect(a.kaynak).toBe("kelimeler");
    expect(a.ifadeler).toEqual([{ de: "Grüß Gott!", tr: "Merhaba!", not: "Güneyde selamlaşırken Grüß Gott dersin." }]);
    expect(a.kelimeler!.map((k) => k.de)).not.toContain("Gott");
    // içerikteki açılış cümlesi (küçük harfle, soru işaretiyle)
    expect(yerelAcikla("Praxis Dr. Weber, Huber, grüß Gott?", lx)!.ifadeler!.map((x) => x.tr)).toEqual(["Merhaba!"]);
    expect(a.kelimeler!.map((k) => k.de)).toContain("führen");
  });
  it("iletişim kalıbı önce: senaryonun kalıbı ne zaman söylendiğiyle gelir; bütün ifade de kalıbın kendisi", () => {
    const ch = [{ id: "ch:gruess-gott", tr: "Merhaba (güneyde selam)", lexemes: [], register: "neutral", layers: { hd: "Guten Tag!", alltag: "Grüß Gott!" }, alltag_exp: { anlam_tr: "Merhaba.", ne_zaman_tr: "Bavyera'da **selamlaşırken** söylenir.", parcalar: [] }, requires: [], mistakes_tr: [] }] as never;
    const lx = [...LEX, L({ id: "Gott", de: "Gott", tr: "Tanrı", pos: "noun", art: "der", collocations: [{ de: "Grüß Gott!", tr: "Merhaba!" }] })];
    expect(yerelAcikla("Grüß Gott!", lx, { chunks: ch })).toEqual({ kaynak: "ifade", de: "Grüß Gott!", tr: "Merhaba.", not: "Bavyera'da selamlaşırken söylenir." });
    const a = yerelAcikla("Grüß Gott, Frau Huber!", lx, { chunks: ch })!;
    expect(a.ifadeler).toEqual([{ de: "Grüß Gott!", tr: "Merhaba.", not: "Bavyera'da selamlaşırken söylenir." }]);
  });
  it("kalıp örneği bütün olarak; yer tutuculu eşdizim (___, [Name]) eşleşmez", () => {
    const pt = [{ id: "pt:ich-habe", examples: [{ de: "Ich habe morgen Zeit.", tr: "Yarın vaktim var.", layer: "hd" }] }] as never;
    expect(yerelAcikla("Ich habe morgen Zeit.", LEX, { patterns: pt })).toMatchObject({ kaynak: "ifade", tr: "Yarın vaktim var." });
    const lx = [L({ id: "x", de: "machen", tr: "yapmak", pos: "verb", collocations: [{ de: "___ machen", tr: "yapmak" }] }), ...LEX];
    expect(yerelAcikla("Sie machen das gut.", lx)?.ifadeler).toBeUndefined();
  });
  it("yalnız işlev sözcüklerinden iki kelimelik eşdizim cümlede kalıp sayılmaz; aynı kalıp iki kez geçerse ikisi de kapanır (inceleme #249)", () => {
    const lx = [...LEX, L({ id: "ich", de: "ich", tr: "ben", pos: "pron", collocations: [{ de: "ich nicht", tr: "ben değil" }] }), L({ id: "kennen", de: "kennen", tr: "tanımak", pos: "verb" }), L({ id: "nicht", de: "nicht", tr: "değil", pos: "adv" }),
      L({ id: "Gott", de: "Gott", tr: "Tanrı", pos: "noun", art: "der", collocations: [{ de: "Grüß Gott!", tr: "Merhaba!" }] })];
    const a = yerelAcikla("Das Wort kenne ich nicht.", lx)!;
    expect(a.ifadeler).toBeUndefined();
    expect(a.kelimeler!.map((k) => k.de)).toEqual(expect.arrayContaining(["ich", "nicht"]));
    // ünlem/soru kalıbı işlev sözcüklerinden oluşsa da bütün: "Wie bitte?" = Efendim?
    const wb = [...lx, L({ id: "bitte", de: "bitte", tr: "lütfen", pos: "adv", collocations: [{ de: "Wie bitte?", tr: "Efendim? Pardon?" }] })];
    expect(yerelAcikla("Wie bitte? Hier ist die Praxis.", wb)!.ifadeler).toEqual([{ de: "Wie bitte?", tr: "Efendim? Pardon?" }]);
    const b = yerelAcikla("Grüß Gott, Grüß Gott!", lx)!;
    expect(b.ifadeler).toEqual([{ de: "Grüß Gott!", tr: "Merhaba!" }]);
    expect(b.kelimeler!.map((k) => k.de)).not.toContain("Gott");
  });
  it("iletişim kalıbının gündelik biçimi kendi anlamıyla", () => {
    const ch = [{ id: "ch:x", tr: "Nasılsınız?", lexemes: [], register: "neutral", layers: { hd: "Wie geht es Ihnen?", alltag: "Wie geht's?" }, alltag_exp: { anlam_tr: "Nasılsın?", parcalar: [] }, requires: [], mistakes_tr: [] }] as never;
    expect(yerelAcikla("Wie geht's?", LEX, { chunks: ch })).toMatchObject({ kaynak: "ifade", tr: "Nasılsın?" });
  });
});
