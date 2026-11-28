/**
 * Konuşma payı (PM-148 karar 3, [ANA-V] md. 3): haftanın etkin süresinin ne kadarı sesli üretim için kurulmuş adımlarda geçiyor.
 * Eşik yalnız `policy.akis.konusma_payi_min`'den okunur. Sınıflama DENETİM-A1 sayımıyla aynıdır (`docs/v2/qa/a1-denetim/sayim.ts`):
 *   konusma: halka "soyle", serbest_konus, dersin "gorev"i, gün sınavının `sesli` maddeleri, ses gölge/cevapla, prova düğümü, okuma guided_response
 *   yazma / kurma / tanima: öbür üretim ve tanıma adımları · gosterim: cevapsız (tanit, kalip, sahne, tablo, hatirlat, dil noktası) payda dışı
 * Süre: halka adımları `Adim.sn` (yoksa `adim_sn`); ses, prova ve okuma durakları `sabit_dk`, durağın içindeki adım sayısına göre bölünür.
 */
import POLICY from "../policy.json" with { type: "json" };
import type { Gun, TemelDers } from "@dw/shared";
import { DIL_NOKTASI, type Adim, type GunPlani } from "./akis.ts";

export type Sinif = "konusma" | "yazma" | "kurma" | "tanima" | "gosterim";
const TUR_SINIF: Record<string, Sinif> = {
  soyle: "konusma", serbest_konus: "konusma", tr_de: "yazma", dikte: "yazma", gap: "yazma", order: "kurma",
  listen_meaning: "tanima", resimden_sec: "tanima", article: "tanima", colloc: "tanima", eslestir: "tanima", tekrar: "tanima",
  tanit: "gosterim", kalip: "gosterim", sahne: "gosterim", tablo: "gosterim", hatirlat: "gosterim", ders_madde: "yazma",
};
export interface Pay { konusma_sn: number; aktif_sn: number }
type Sayim = Record<Exclude<Sinif, "gosterim">, number>;
const bos = (): Sayim => ({ konusma: 0, yazma: 0, kurma: 0, tanima: 0 });

/** Planlanmış bir akış adımının sınıfı (sayim.ts ile aynı kural) */
export function adimSinifi(a: Adim, g: Gun, dersler: ReadonlyMap<string, TemelDers>): Sinif {
  if (a.ders?.oge === DIL_NOKTASI) return "gosterim";
  if (a.ders?.id === "gun_sinavi") {
    const m = (g.gun_sinavi?.maddeler ?? []).find((x) => x.id === a.ders!.oge);
    return (g.gun_sinavi?.sesli ?? []).includes(a.ders.oge) ? "konusma" : m?.k === "pick" ? "tanima" : "yazma";
  }
  if (a.ders && a.tur === "ders_madde") return dersler.get(a.ders.id)?.drills?.find((m) => m.id === a.ders!.oge)?.k === "pick" ? "tanima" : "yazma";
  if (a.ders?.oge === "gorev") return "konusma";
  return TUR_SINIF[a.tur] ?? "gosterim";
}

/** sabit süreli durağı içindeki adım sayılarına göre böl */
function bol(p: Pay, s: Sayim, sn: number) {
  const n = s.konusma + s.yazma + s.kurma + s.tanima;
  if (!n) return;
  p.konusma_sn += (sn * s.konusma) / n; p.aktif_sn += sn;
}

/** Bir günün konuşma payı. `plan` akış günü değilse null: yalnız ses, prova ve okuma sayılır. */
export function gunPayi(g: Gun, plan: GunPlani | null, dersler: ReadonlyMap<string, TemelDers>, pol = POLICY.akis): Pay {
  const p: Pay = { konusma_sn: 0, aktif_sn: 0 };
  for (const d of plan?.duraklar ?? []) for (const a of d.adimlar) {
    const k = adimSinifi(a, g, dersler);
    if (k === "gosterim") continue;
    const sn = a.sn ?? (pol.adim_sn as Record<string, number>)[a.tur] ?? 0;
    p.aktif_sn += sn; if (k === "konusma") p.konusma_sn += sn;
  }
  for (const m of g.sesler ?? []) {
    const s = bos();
    for (const b of m.bolumler ?? []) {
      if (b.ana_fikir) s.tanima++;
      s.tanima += (b.ayrinti ?? []).length;
      for (const x of b.dikte ?? []) { if (x.seviye === "kolay") s.tanima++; else if (x.seviye === "zor") s.kurma++; else s.yazma++; }
      s.konusma += (b.golge ?? []).length + (b.cevapla ? 1 : 0);
    }
    if (m.eylem) s.tanima++;
    bol(p, s, pol.sabit_dk.ses * 60);
  }
  if ((g.prova?.dugumler ?? []).some((n) => (n.secenekler ?? []).length)) bol(p, { ...bos(), konusma: 1 }, pol.sabit_dk.prova * 60);
  if (g.okuma_yazma) {
    const s = bos();
    for (const q of g.okuma_yazma.sorular ?? []) {
      const k = "k" in q ? q.k : "";   // anlama sorusunun `k`sı yok: tanıma
      if (k === "guided_response" || k === "listen_and_respond") s.konusma++;
      else if (k === "tr_de" || k === "gap" || k === "transform") s.yazma++;
      else s.tanima++;
    }
    if (g.okuma_yazma.yazma) s.yazma++;
    bol(p, s, pol.sabit_dk.okuma * 60);
  }
  return p;
}

/** Haftanın payı (0–1) ve eşik kararı */
export function haftaPayi(gunler: readonly Pay[], pol = POLICY.akis): { pay: number; esik: number; gecti: boolean } {
  const k = gunler.reduce((a, x) => a + x.konusma_sn, 0), t = gunler.reduce((a, x) => a + x.aktif_sn, 0);
  const pay = t ? k / t : 0;
  return { pay, esik: pol.konusma_payi_min, gecti: pay >= pol.konusma_payi_min };
}
