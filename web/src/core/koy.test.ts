/** Köy (PM-084 md. 4): dükkân ızgarasının kuralları — gerçek sayı ya da tanım, kilit, köşe noktası, Telefon kartı */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import type { LearnerItem } from "@dw/shared";
import { KOY_ADI, acikAdimlar, bekleyenKart, dukkanlar, hazirDurum, mekanMedya, mekanMi, telefon, vadesiGelen, type KoyVeri, type YolGunu } from "./koy.ts";
import type { Adim } from "./gun.ts";
import { parseHash } from "../state.ts";
import { sekme } from "../ui/components.tsx";

const NOW = Date.parse("2026-11-22T10:00:00Z");
const medya = (day: number, video = false) => [
  { id: `m1:0${day}:a1`, kind: "ses" as const, title_tr: "Kayıt 1" }, { id: `m1:0${day}:a2`, kind: "ses" as const, title_tr: "Kayıt 2" },
  { id: `m1:0${day}:v1`, kind: "sahne" as const, title_tr: "**Sahne**" }, ...(video ? [{ id: `m1:0${day}:video`, kind: "video" as const, title_tr: "Video" }] : [])
];
const gun = (day: number, video = false) => ({ day, id: `m1:gun:0${day}`, title_tr: `Gün ${day}`, review: "draft", kartlar: [], medya: medya(day, video) });
const sc = (id: string, domain: string) => ({ id, domain, order: 1, level: "A1", title_tr: "", title_de: "", review: "reviewed", format: "full" }) as unknown as KoyVeri["index"]["scenarios"][number];
const index = (o: Partial<KoyVeri["index"]> = {}): KoyVeri["index"] => ({ m1: [gun(1), gun(2)], scenarios: [], domains: [], ...o });
const adim = (tur: Adim["tur"], id: string, o: Partial<Adim> = {}): Adim => ({ seans: 3, tur, id, title_tr: id, href: `#/x/${id}`, bitti: false, hazir: true, ...o });
const yolGunu = (day: number, durum: YolGunu["durum"], adimlar: Adim[]): YolGunu => ({ day, title_tr: `Gün ${day}`, adimlar, bitti: durum === "bitti", durum });
const veri = (o: Partial<KoyVeri> = {}): KoyVeri => ({ index: index(), bekleyen: 0, gunler: [], now: NOW, ...o });
const bul = (v: KoyVeri, id: string) => dukkanlar(v).find((d) => d.id === id)!;
const oge = (itemId: string, o: Partial<LearnerItem> = {}): LearnerItem => ({ itemId, kind: "lexeme", passive: { s: 0, n: 1, ok: 1 }, active: { s: 0, n: 0, ok: 0, sessions: [] }, durable: false, gaps: [], inBank: false, u: 0, ...o });
const fsrs = (due: string) => ({ due }) as unknown as NonNullable<LearnerItem["passive"]["fsrs"]>;

describe("Köy: dükkânlar", () => {
  it("köyün adı dünya dosyasındaki adla aynı", () => {
    const w = JSON.parse(readFileSync(new URL("../../../content/v2/world/world.json", import.meta.url), "utf8")) as { town: { name: string } };
    expect(w.town.name.split(" ")[0]).toBe(KOY_ADI);
  });
  it("dokuz dükkân hedefteki sırayla: altısı açık, üçü kilitli", () => {
    const d = dukkanlar(veri());
    expect(d.map((x) => x.ad)).toEqual(["Bahçe", "Sinema", "Radyo", "Atölye", "Kütüphane", "Pazar meydanı", "Kafe", "Tiyatro", "Gazete bayisi"]);
    expect(d.filter((x) => x.kilitli).map((x) => x.id)).toEqual(["kafe", "tiyatro", "gazete"]);
    for (const x of d) { expect(!!x.href).toBe(!x.kilitli); if (x.kilitli) { expect(x.alt).toMatch(/açılır$/); expect(x.nokta).toBe(false); } }
    expect(d.filter((x) => !x.kilitli).map((x) => x.href)).toEqual(["#/koy/bahce", "#/koy/sinema", "#/koy/radyo", "#/kalip", "#/koy/kutuphane", "#/koy/pazar"]);
  });
  it("açık dükkânın adresi var olan bir ekrana çıkar ve Köy sekmesinde kalır", () => {
    for (const d of dukkanlar(veri()).filter((x) => !x.kilitli)) { const r = parseHash(d.href!); expect(["mekan", "kalip"]).toContain(r.name); expect(sekme(r.name)).toBe("koy"); }
    expect(parseHash("#/koy/olmayan").name).toBe("koy");
    expect(mekanMi("bahce")).toBe(true); expect(mekanMi("atolye")).toBe(false); expect(mekanMi(undefined)).toBe(false);
  });
  it("veri yokken sayı yok, tanım satırı var; hiçbir satırda uydurma sayı ya da 0 yok", () => {
    const d = dukkanlar(veri());
    expect(bul(veri(), "bahce")).toMatchObject({ alt: "Kelime tekrarı", nokta: false });
    expect(bul(veri(), "sinema").alt).toBe("Köy dizisi");
    expect(bul(veri(), "pazar").alt).toBe("Gündelik durumlar");
    for (const x of d.filter((y) => !y.kilitli)) expect(x.alt).not.toMatch(/\d/);
  });
  it("sayılar gerçek veriden: vadesi gelen kart, paketteki video, hazır durum", () => {
    const v = veri({ bekleyen: 12, index: index({ m1: [gun(1, true), gun(2, true)], scenarios: [sc("a", "telefon"), sc("b", "telefon"), sc("c", "arzt")] }) });
    expect(bul(v, "bahce")).toMatchObject({ alt: "12 tekrar bekliyor", nokta: true });
    expect(bul(v, "sinema").alt).toBe("2 gerçek video");
    expect(bul(v, "pazar").alt).toBe("2 durum hazır");
    expect(hazirDurum(v.index, NOW)).toBe(2);
  });
  it("açacak içeriği olmayan dükkân kilitli gösterilir", () => {
    const v = veri({ index: index({ m1: [] }) });
    for (const id of ["sinema", "radyo"]) { expect(bul(v, id).kilitli).toBe(true); expect(bul(v, id).href).toBeUndefined(); expect(bul(v, id).alt).toMatch(/açılır$/); }
    expect(bul(v, "bahce").kilitli).toBe(false);
  });
  it("Sinema'da köşe noktası: açılmış günde izlenmemiş video varsa; kilitli günün videosu sayılmaz", () => {
    const i = index({ m1: [gun(1, true), gun(2, true)] });
    const v1 = adim("medya", "m1:01:video", { alt: "video" }), v2 = adim("medya", "m1:02:video", { alt: "video" });
    expect(bul(veri({ index: i, gunler: [yolGunu(1, "simdi", [v1]), yolGunu(2, "kilitli", [v2])] }), "sinema").nokta).toBe(true);
    expect(bul(veri({ index: i, gunler: [yolGunu(1, "bitti", [{ ...v1, bitti: true }]), yolGunu(2, "kilitli", [v2])] }), "sinema").nokta).toBe(false);
  });
});

describe("Köy: Telefonun kartı", () => {
  const s = (id: string, o: Partial<Adim> = {}) => adim("medya", id, { alt: "ses", ...o });
  it("yalnız açılmış günlerde dinlenmemiş ses kaydı varsa; ilk dinlenmemiş kaydı açar", () => {
    const g = [yolGunu(1, "bitti", [s("a1", { bitti: true }), s("a2")]), yolGunu(2, "simdi", [s("b1"), adim("medya", "v", { alt: "video" })]), yolGunu(3, "kilitli", [s("c1"), s("c2")])];
    expect(telefon({ gunler: g })).toEqual({ sayi: 2, href: "#/x/a2", alt: "2 ses kaydı seni bekliyor" });
  });
  it("dinlenmemiş kayıt yoksa ya da plan yüklenmediyse kart çizilmez", () => {
    expect(telefon({ gunler: [] })).toBeNull();
    expect(telefon({ gunler: [yolGunu(1, "simdi", [s("a1", { bitti: true }), s("a2", { hazir: false })]), yolGunu(2, "kilitli", [s("b1")])] })).toBeNull();
  });
});

describe("Köy: mekân listeleri", () => {
  it("Radyo ses kayıtlarını, Sinema video ve köy dizisini gün gün verir; kaydı olmayan gün yazılmaz", () => {
    const i = index({ m1: [gun(2, true), gun(1), { ...gun(3), medya: [] }] });
    const r = mekanMedya(i, "radyo"), si = mekanMedya(i, "sinema");
    expect(r.map((g) => g.day)).toEqual([1, 2]);
    expect(r.flatMap((g) => g.kayitlar.map((k) => k.kind))).toEqual(["ses", "ses", "ses", "ses"]);
    expect(si.flatMap((g) => g.kayitlar.map((k) => k.kind))).toEqual(["sahne", "sahne", "video"]);
    expect(r[0]!.kayitlar[0]!.href).toBe("#/m1/1/m1%3A01%3Aa1");
    expect(parseHash(r[0]!.kayitlar[0]!.href)).toEqual({ name: "m1medya", day: 1, id: "m1:01:a1" });
  });
  it("okuma ve prova yalnız açılmış günlerden listelenir", () => {
    const g = [yolGunu(1, "bitti", [adim("prova", "p1", { bitti: true }), adim("okuma", "o1")]), yolGunu(2, "simdi", [adim("prova", "p2"), adim("okuma", "o2", { hazir: false })]), yolGunu(3, "kilitli", [adim("prova", "p3"), adim("okuma", "o3")])];
    expect(acikAdimlar(g, "prova").map((a) => [a.id, a.day, a.bitti])).toEqual([["p1", 1, true], ["p2", 2, false]]);
    expect(acikAdimlar(g, "okuma").map((a) => a.id)).toEqual(["o1"]);
  });
});

describe("Köy: Bahçe'de bekleyen kart", () => {
  const simdi = new Date(NOW), dun = "2026-11-21T10:00:00Z", yarin = "2026-11-23T10:00:00Z";
  const lex = new Map([["lx:Tag", { pos: "noun" }], ["lx:und", { pos: "conj" }], ["lx:kartsiz", { pos: "noun", card: false }]]) as unknown as Parameters<typeof bekleyenKart>[1];
  it("yalnız vadesi gelmiş sözcük kartları sayılır", () => {
    const items = [
      oge("lx:Tag", { passive: { s: 0, n: 1, ok: 1, fsrs: fsrs(dun) } }),
      oge("lx:und", { passive: { s: 0, n: 1, ok: 1, fsrs: fsrs(dun) } }),
      oge("lx:kartsiz", { passive: { s: 0, n: 1, ok: 1, fsrs: fsrs(dun) } }),
      oge("lx:yok", { passive: { s: 0, n: 1, ok: 1, fsrs: fsrs(dun) } }),
      oge("ch:x", { kind: "chunk", passive: { s: 0, n: 1, ok: 1, fsrs: fsrs(dun) } })
    ];
    expect(bekleyenKart(items, lex, simdi)).toBe(1);
    expect(bekleyenKart([oge("lx:Tag", { passive: { s: 0, n: 1, ok: 1, fsrs: fsrs(yarin) } }), oge("lx:Tag")], lex, simdi)).toBe(0);
    expect(bekleyenKart([oge("lx:Tag", { active: { s: 0, n: 1, ok: 1, sessions: [], fsrs: fsrs(dun) } })], lex, simdi)).toBe(1);
  });
  it("ön eleme sözlüksüz: vadesi gelmiş sözcük öğesi", () => {
    expect(vadesiGelen(oge("lx:Tag", { passive: { s: 0, n: 1, ok: 1, fsrs: fsrs(dun) } }), simdi)).toBe(true);
    expect(vadesiGelen(oge("lx:Tag"), simdi)).toBe(false);
    expect(vadesiGelen(oge("ch:x", { kind: "chunk", passive: { s: 0, n: 1, ok: 1, fsrs: fsrs(dun) } }), simdi)).toBe(false);
  });
});
