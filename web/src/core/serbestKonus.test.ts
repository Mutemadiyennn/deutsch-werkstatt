import { describe, expect, it } from "vitest";
import { PROFIL_YUVALARI, SerbestKonus, toks } from "@dw/shared";
import { bosYuvalar, degerlendir, gizle, ornekCoz } from "./serbestKonus.ts";
import { konusmaEkle, konusmaSay } from "./konusma.ts";

const k = SerbestKonus.parse({
  id: "m1:01:k1", durum_tr: "Kursta biri seninle tanışmak istiyor.", gorev_tr: "Adını, nereli olduğunu ve nerede yaşadığını söyle.",
  hedefler: [
    { id: "h1", tr: "adını söyle", kaliplar: ["Ich heiße ___.", "Mein Name ist ___.", "Ich bin ___."], yuva: "name" },
    { id: "h2", tr: "nereli olduğunu söyle", kaliplar: ["Ich komme aus ___.", "Ich bin aus ___.", "Aus ___."], yuva: "ulke" },
    { id: "h3", tr: "nerede yaşadığını söyle", kaliplar: ["Ich wohne in ___.", "Ich lebe in ___.", "In ___."], yuva: "sehir" }
  ],
  ornek_de: "Ich heiße {name}. Ich komme aus {ulke}. Ich wohne in {sehir}.", ornek_tr: "…"
});

describe("serbest konuşma değerlendirmesi (çevrimdışı)", () => {
  it("noktalamalı döküm: hedefler ve cümle sayısı", () => {
    const r = degerlendir(k, "Ich heiße Mila. Ich wohne in Oberwiesing.");
    expect(r.hedefler.map((h) => h.tamam)).toEqual([true, false, true]);
    expect(r.cumle).toBe(2); expect(r.yeter).toBe(true); expect(r.tamam).toBe(2);
  });
  it("ses tanıma noktalama koymasa da hedefler bulunur, cümle sayısı hedeflerden", () => {
    const r = degerlendir(k, "ich heisse Mila ich komme aus Polen ich wohne in Oberwiesing");
    expect(r.tamam).toBe(3); expect(r.cumle).toBe(3); expect(r.yeter).toBe(true);
  });
  it("tek cümle yetmez; boş döküm hiçbir hedefi karşılamaz", () => {
    expect(degerlendir(k, "Hallo.").yeter).toBe(false);
    const bos = degerlendir(k, "  ");
    expect(bos.cumle).toBe(0); expect(bos.tamam).toBe(0);
  });
  it("kalıp sözcük sınırında aranır (\"in\" sözcüğün içinde eşleşmez)", () => {
    expect(degerlendir(k, "Kinder spielen gern.").hedefler[2]!.tamam).toBe(false);
  });
});

describe("profil yuvaları (karar 2)", () => {
  it("örnek profilden çözülür, boş alan …", () => {
    expect(ornekCoz(k.ornek_de, { name: "Mila", ulke: "Polen" })).toBe("Ich heiße Mila. Ich komme aus Polen. Ich wohne in …");
  });
  it("boş yuvalar: hedeflerden ve örnekten, ad hariç", () => {
    expect(bosYuvalar(k, { ulke: "Polen" })).toEqual(["sehir"]);
    expect(bosYuvalar(k, { ulke: "Polen", sehir: "Rosenheim" })).toEqual([]);
  });
  it("yapay zekâya giden dökümde profil değerleri ve ad gizlenir", () => {
    expect(gizle("Ich heiße Mila. Ich komme aus Polen und wohne in Bad Aibling.", { name: "Mila", ulke: "Polen", sehir: "Bad Aibling" }))
      .toBe("Ich heiße […]. Ich komme aus […] und wohne in […].");
    // sözcük içinde değil
    expect(gizle("Milano", { name: "Mila" })).toBe("Milano");
  });
  it("kume yer tutucusu profil yuvalarının hepsini ad yeri sayar (sözcük sayılmaz)", () => {
    for (const y of PROFIL_YUVALARI) expect(toks(`Ich komme aus {${y}}.`)).toEqual(["ich", "komme", "aus"]);
  });
});

describe("konuşma kaydı (karar 4)", () => {
  const t = new Date(2026, 10, 27, 10).getTime(), yarin = new Date(2026, 10, 28, 10).getTime();
  it("yalnız sesli adım konuşma sayılır; aynı adım bir kez, son sonuç geçerli", () => {
    let r = konusmaEkle(undefined, t, { id: "a", gun: 3, sesli: false });
    r = konusmaEkle(r, t, { id: "b", gun: 3, sesli: true });
    expect(konusmaSay(r, t)).toEqual({ sesli: 1, yazili: 1 });
    r = konusmaEkle(r, t, { id: "a", gun: 3, sesli: true });
    expect(konusmaSay(r, t)).toEqual({ sesli: 2, yazili: 0 });
  });
  it("gün değişince sayı sıfırdan", () => {
    const r = konusmaEkle(undefined, t, { id: "a", gun: 3, sesli: true });
    expect(konusmaSay(r, yarin)).toEqual({ sesli: 0, yazili: 0 });
    expect(konusmaEkle(r, yarin, { id: "b", gun: 4, sesli: true }).adimlar).toHaveLength(1);
  });
});
