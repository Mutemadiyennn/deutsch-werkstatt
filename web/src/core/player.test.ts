import { describe, it, expect } from "vitest";
import { review, sessionKey, isDue } from "./srs.ts";
import { ruleVerdict, verdict } from "./answer.ts";
import { localSayIt } from "./sayit.ts";

const T = (h: number) => new Date(Date.UTC(2026, 10, 17, h, 0, 0));

describe("FSRS çift yol", () => {
  it("pasif ve aktif kartlar ayrı zamanlanır", () => {
    let it = review(undefined, { itemId: "lx:Termin", path: "passive", outcome: "correct", session: sessionKey("s1", T(9).getTime()) }, T(9));
    expect(it.passive.fsrs).toBeTruthy();
    expect(it.active.fsrs).toBeUndefined();
    it = review(it, { itemId: "lx:Termin", path: "active", outcome: "wrong", session: sessionKey("s1", T(9).getTime()) }, T(9));
    expect(it.active.fsrs!.lapses + it.active.fsrs!.reps).toBeGreaterThan(0);
    expect(new Date(it.active.due!) < new Date(it.passive.due!)).toBe(true); // yanlış → daha erken
    expect(it.inBank).toBe(true);
    expect(it.gaps.at(-1)).toMatchObject({ type: "active" });
  });
  it("v1 kalıcılık kuralı: iki ayrı oturumda ≥3 sa arayla doğru üretim", () => {
    let it = review(undefined, { itemId: "x", path: "active", outcome: "correct", session: sessionKey("a", T(8).getTime()) }, T(8));
    it = review(it, { itemId: "x", path: "active", outcome: "correct", session: sessionKey("a", T(8).getTime()) }, T(9));
    expect(it.durable).toBe(false); // aynı oturum
    it = review(it, { itemId: "x", path: "active", outcome: "correct", session: sessionKey("b", T(10).getTime()) }, T(10));
    expect(it.durable).toBe(false); // 2 sa
    it = review(it, { itemId: "x", path: "active", outcome: "correct", session: sessionKey("c", T(12).getTime()) }, T(12));
    expect(it.durable).toBe(true); // 4 sa
  });
  it("vadesi gelen kart", () => {
    const it = review(undefined, { itemId: "x", path: "passive", outcome: "correct", session: "s@1" }, T(9));
    expect(isDue(it, "passive", T(9))).toBe(false);
    expect(isDue(it, "passive", new Date(T(9).getTime() + 3 * 86400_000))).toBe(true);
  });
});

describe("cevap politikası", () => {
  const acc = ["Ich möchte einen Termin machen.", "Ich hätte gern einen Termin.", "Ich bräuchte einen Termin."];
  it("accepted varyantı ve normalizasyon yapay zekâsız kabul edilir", () => {
    expect(ruleVerdict(acc, "ich hätte gern einen termin").kind).toBe("correct");
    expect(ruleVerdict(acc, "Ich bräuchte einen Termin")).toMatchObject({ kind: "correct", via: "exact" }); // accepted listesindeki varyant
    expect(ruleVerdict(acc, "Also, ich bräuchte einen Termin")).toMatchObject({ kind: "correct", via: "variant" }); // baştaki ünlem atılarak
  });
  it("yakın ama eşleşmeyen cevap yapay zekâya sorulur; çok uzak cevap sorulmaz", () => {
    expect(ruleVerdict(acc, "Ich will einen Termin machen").kind).toBe("ask_ai");
    expect(ruleVerdict(acc, "Guten Morgen").kind).toBe("wrong");
  });
  it("yapay zekâ hata verirse 'kontrol edilemedi' (ceza yok)", async () => {
    const v = await verdict(acc, "Ich will einen Termin machen", "x", async () => { throw { message_tr: "Google sunucusu şu an yoğun." }; });
    expect(v).toMatchObject({ kind: "unchecked" });
  });
  it("yapay zekâ kabul ederse doğru", async () => {
    const v = await verdict(acc, "Ich will einen Termin machen", "x", async () => ({ ok: true, reason_tr: "Doğru ama 'möchte' daha kibar." }));
    expect(v).toMatchObject({ kind: "correct", via: "ai" });
  });
});

describe("Almanca nasıl derim (yerel arama)", () => {
  const E = [
    { de: "Könnten Sie das bitte wiederholen?", tr: "Bunu tekrar edebilir misiniz?", kind: "chunk" as const },
    { de: "Ich habe Halsschmerzen.", tr: "Boğazım ağrıyor.", kind: "example" as const },
    { de: "Termin", tr: "randevu", kind: "lexeme" as const }
  ];
  it("Türkçe eklere rağmen bulur", () => {
    expect(localSayIt("tekrar edebilir misiniz", E)[0]!.de).toContain("wiederholen");
    expect(localSayIt("boğazım ağrıyor", E)[0]!.de).toBe("Ich habe Halsschmerzen.");
    expect(localSayIt("randevu", E)[0]!.de).toBe("Termin");
  });
  it("bulamazsa boş döner (yapay zekâya gidilir)", () => {
    expect(localSayIt("şemsiyemi otobüste unuttum", E)).toEqual([]);
  });
});

describe("iOS klavye davranışı notu etkilemez (EK2 §1)", () => {
  const acc = ["Können Sie das bitte wiederholen?"];
  it.each([
    ["otomatik nokta + boşluk", "Können Sie das bitte wiederholen. "],
    ["çift boşluk → nokta", "Können Sie das bitte wiederholen.  "],
    ["ilk harf otomatik büyük / hepsi küçük", "können sie das bitte wiederholen"],
    ["akıllı tırnaklar", "„Können Sie das bitte wiederholen?“"],
    ["kesme işareti ’", "Können Sie’s bitte wiederholen"],
    ["bölünmez boşluk", "Können Sie das bitte wiederholen?"],
    ["ümlautsuz yazım", "Koennen Sie das bitte wiederholen"]
  ])("%s", (_n, a) => {
    const v = ruleVerdict(_n === "kesme işareti ’" ? ["Können Sie's bitte wiederholen?"] : acc, a);
    expect(v.kind).toBe("correct");
  });
});

import { expandAccepted, fillName, showText, redact, unredact, personalizeDeep } from "./persona.ts";
describe("öğrenci kimliği yer tutucuları (D-061)", () => {
  it("hitap yoksa iki biçim de kabul, gösterimde A/B", () => {
    expect(expandAccepted(["Ich bin schon {Patient|Patientin} bei Ihnen."], {})).toEqual(["Ich bin schon Patient bei Ihnen.", "Ich bin schon Patientin bei Ihnen."]);
    expect(showText("Ich bin {Patient|Patientin}.", {})).toBe("Ich bin Patient/Patientin.");
    expect(showText("Ich bin {Patient|Patientin}.", { address: "Frau" })).toBe("Ich bin Patientin.");
  });
  it("ad yoksa cevaptaki ad yuvası serbest", async () => {
    expect(fillName("Guten Tag, hier ist {name}.", "guten tag hier ist Ayşe Kaya")).toBe("Guten Tag, hier ist Ayşe Kaya.");
    expect(fillName("Mein Name ist {name}, ich habe einen Termin.", "Mein Name ist Novak, ich habe einen Termin")).toBe("Mein Name ist Novak, ich habe einen Termin.");
    const { ruleVerdict } = await import("./answer.ts");
    const exp = fillName("Guten Tag, hier ist {name}.", "Guten Tag, hier ist Novak.");
    expect(ruleVerdict([exp], "Guten Tag, hier ist Novak.").kind).toBe("correct");
    // boş ad yuvası doğru sayılmaz (inceleme #65 3. tur P2)
    const bos = fillName("Guten Tag, hier ist {name}.", "Guten Tag, hier ist.");
    expect(bos).toBe("Guten Tag, hier ist (adın).");
    expect(ruleVerdict([bos], "Guten Tag, hier ist.").kind).not.toBe("correct");
  });
  it("yapay zekâya ad gitmez", () => {
    expect(redact("Ich heiße Novak.", { name: "Novak" })).toBe("Ich heiße [Name].");
    expect(unredact("Danke, Frau [Name]!", { name: "Novak" })).toBe("Danke, Frau Novak!");
  });
  it("D-061: Türkçe harfli, büyük harfli, Türkçe klavyesiz ve iki kelimeli adlar da maskelenir (#73 incelemesi T-1..T-3)", () => {
    for (const ad of ["Çağrı", "Özge", "Ömer", "Ümit", "Şule", "İbrahim", "Ayşe", "Gül", "Jean-Luc", "O'Neil"]) {
      expect(redact(`Guten Tag, hier ist ${ad}.`, { name: ad }), ad).toBe("Guten Tag, hier ist [Name].");
      expect(redact(`Ich bin ${ad.toLocaleUpperCase("tr")}!`, { name: ad }), ad).toBe("Ich bin [Name]!");
    }
    expect(redact("Ich bin ALİ.", { name: "Ali" })).toBe("Ich bin [Name].");
    expect(redact("Hier ist Cagri, nicht Ozge.", { name: "Çağrı" })).toBe("Hier ist [Name], nicht Ozge.");
    expect(redact("Ich heiße Oezge.", { name: "Özge" })).toBe("Ich heiße [Name].");
    expect(redact("Hier ist Anna Maria. Anna kommt.", { name: "Anna Maria" })).toBe("Hier ist [Name]. [Name] kommt.");
    expect(redact("Hier ist Anna  Maria.", { name: "Anna Maria" })).toBe("Hier ist [Name].");
    // kelimenin içi maskelenmez
    expect(redact("Alina und Ali", { name: "Ali" })).toBe("Alina und [Name]");
    expect(redact("Guten Tag", {})).toBe("Guten Tag");
  });
  it("senaryo metinleri derinlemesine hazırlanır", () => {
    const s = personalizeDeep({ build: [{ prompt_tr: "x", accepted: ["Hier ist {name}.", "{Herr|Frau} {name} hier."] }], de: "{Patient|Patientin}" }, { address: "Herr", name: "Novak" });
    expect(s.build[0]!.accepted).toEqual(["Hier ist Novak.", "Herr Novak hier."]);
    expect(s.de).toBe("Patient");
  });
});
