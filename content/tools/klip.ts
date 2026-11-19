/**
 * A9 (#58, PM-069 madde 4): gerçek insan klibini günün videosuna bağlar — derleme anında.
 *   - İÇ: content/v2/m1/video/klip-NN.json (sorular, dikte, gölge, Türkçe çeviriler, atıf; transkript yok)
 *   - Hat (kaynak/video, scripts/video/m1_video.py): Releases `m1-medya` → klip-NN.mp4, klip-NN.jpg, klip-NN.metin.json
 *     (Almanca cümleler + iki ASR ile hizalanmış zamanlar; sapma > 300 ms olan tur zaten çıkarılmış). Deploy `.medya/`ya indirir.
 * Transkript metni depoya girmez (FORMAT.md A9); yalnızca yayın paketine (CC BY 4.0, atıf ekranda).
 * Yalnızca `durum: "hazir"` ve tek parçalı klip bağlanır; çok parçalı (`kesitler`) ve `kisa` klip ayrı karar bekler.
 * Hizalı cümlesi olmayan tura bağlı soru, dikte ve gölge pakete girmez (öğrenci o cümleyi metinde göremez).
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { Video, type Video as VideoT } from "../../packages/shared/src/m1.ts";

interface Tur { tur: number; tr?: string }
interface MetinCumle { id: string; tur: number; speaker?: string; de: string; t0: number; t1: number }

export function klipVideo(k: any, metin: { sure_sn: number; cumleler: MetinCumle[] }, olcum?: { kesit_kaynak_sn?: [number, number] } | null): VideoT | null {
  if (k?.durum !== "hazir" || k.kesitler || !metin?.cumleler?.length) return null;
  const ad = String(k.dosya ?? "").replace(/\.json$/, "") || null;
  const trOf = new Map<number, string>((k.turlar as Tur[]).map((t) => [t.tur, t.tr ?? ""]));
  const cumleler = metin.cumleler.filter((c) => trOf.get(c.tur)).map((c) => ({ id: c.id, de: c.de, tr: trOf.get(c.tur)!, speaker: c.speaker, t0: c.t0, t1: c.t1 }));
  if (!cumleler.length || !ad) return null;
  const idOf = new Map(metin.cumleler.map((c) => [c.tur, c.id]));
  const var_ = (tur?: number) => tur != null && cumleler.some((c) => c.id === idOf.get(tur));
  const b = k.bolum ?? {};
  const tum = cumleler.map((c) => c.id);
  const ayrinti = (b.ayrinti ?? []).filter((q: any) => var_(q.tur)).map((q: any, i: number) => ({ id: `a${i + 1}`, kind: "detail" as const, q_tr: q.q_tr, opts: q.opts, ans: q.ans, kanit: [idOf.get(q.tur)!] }));
  const dikte = (b.dikte ?? []).filter((d: any) => d.seviye === "gercek" || var_(d.tur)).map((d: any) => {
    const cumle = d.tur != null ? idOf.get(d.tur)! : "";
    switch (d.seviye) {
      case "kolay": return { id: d.id, seviye: "kolay", cumle, q_tr: d.q_tr, opts: d.opts, ans: d.ans };
      case "orta": return { id: d.id, seviye: "orta", cumle, de: d.de, accepted: d.accepted };
      case "zor": return { id: d.id, seviye: "zor", cumle, banka: d.banka, accepted: d.accepted };
      case "usta": return { id: d.id, seviye: "usta", cumle, accepted: d.accepted };
      default: return { id: d.id, seviye: "gercek", gorev_tr: d.gorev_tr, ornek_de: d.ornek_de, zorunlu: d.zorunlu ?? [] };
    }
  });
  const golge = (b.golge ?? []).filter((t: number) => var_(t)).map((t: number) => idOf.get(t)!);
  const cv = b.cevapla;
  const cevapla = cv && var_(cv.soru_tur) ? { id: cv.id, k: "guided_response" as const, situation_tr: cv.situation_tr, prompt_de: metin.cumleler.find((c) => c.tur === cv.soru_tur)!.de, accepted: cv.accepted, why_tr: cv.why_tr } : undefined;
  const kesit = olcum?.kesit_kaynak_sn;
  const v = {
    id: k.id,
    tur: "roportaj" as const,
    title_tr: `Gerçek röportaj: ${k.konusmaci}`,
    sure_sn: metin.sure_sn,
    gercek_insan: true as const,
    kaynak: { url: k.transkript_url || k.video_url, lisans: k.lisans, atif: k.atif, bas_sn: kesit?.[0] ?? 0, bit_sn: kesit?.[1] ?? metin.sure_sn },
    medya: [{ src: `media/${ad}.mp4`, type: "video/mp4" }],
    poster: `media/${ad}.jpg`,
    cumleler,
    bolumler: [{ id: "b1", cumleler: tum, ana_fikir: { id: "g1", kind: "gist" as const, q_tr: b.ana_fikir.q_tr, opts: b.ana_fikir.opts, ans: b.ana_fikir.ans, kanit: tum }, ayrinti, dikte, golge, ...(cevapla ? { cevapla } : {}) }]
  };
  const p = Video.safeParse(v);
  if (!p.success) throw new Error(`${ad}: video şemasına uymuyor: ${p.error.issues[0]?.path.join(".")} ${p.error.issues[0]?.message}`);
  return p.data;
}

/** Klasördeki klip dosyalarından, `.medya`da hizalı metni bulunanları günün videosu olarak döndürür */
export function klipVideolari(klipDir: string, medyaKaynak: string[]): { day: number; video: VideoT }[] {
  if (!existsSync(klipDir)) return [];
  const out: { day: number; video: VideoT }[] = [];
  for (const f of readdirSync(klipDir).filter((x) => /^klip-\d{2}\.json$/.test(x)).sort()) {
    const ad = f.replace(/\.json$/, "");
    const metinYol = medyaKaynak.map((m) => join(m, `${ad}.metin.json`)).find((p) => existsSync(p));
    if (!metinYol) continue;
    const k = { ...JSON.parse(readFileSync(join(klipDir, f), "utf8")), dosya: f };
    const olcumYol = join(klipDir, `${ad}.olcum.json`);
    const v = klipVideo(k, JSON.parse(readFileSync(metinYol, "utf8")), existsSync(olcumYol) ? JSON.parse(readFileSync(olcumYol, "utf8")) : null);
    if (v) out.push({ day: k.day, video: v });
  }
  return out;
}
