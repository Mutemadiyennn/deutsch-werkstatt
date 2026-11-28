/**
 * Hafta kapısının konuşma payı bölümü (PM-148 karar 3, [ANA-V] md. 3). Gün başına planlayıcının kendi planı (`planGun`, sayim.ts ile
 * aynı girdi) + günün ses/prova/okuma durakları → `web/src/core/konusmaPayi.ts`. Eşik `policy.akis.konusma_payi_min`.
 * Bayrak (`policy.serbest_konus.acik`, PM-135 ek 14) kapalıyken eşiğin altı **uyarı**dır (içerik — K-06 — gelmeden kapı kırmızı olmasın);
 * açıkken kapı kalır. Plan bayrağın kendi değeriyle kurulur (serbest_konus adımları yalnız açıkken plana girer).
 */
import { genelAdlarAyikla, kumeDizini, type DilNoktasi, type Gun, type TemelDers } from "../../packages/shared/src/index.ts";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import POLICY from "../../web/src/policy.json" with { type: "json" };
import { planGun } from "../../web/src/core/akis.ts";
import { gunPayi, haftaPayi, type Pay } from "../../web/src/core/konusmaPayi.ts";
import { haftaOf } from "./dikis.ts";
import { ROOT, type Loaded } from "./load.ts";

export interface HaftaPayi { hafta: number; pay: number; esik: number; gecti: boolean; zorunlu: boolean; gunler: { gun: number; pay: number | null }[] }

/** `gunler` ve `dn`: kapının kendi okuduğu gün dizininden (`--m1`; içerikten bağımsız fikstür, PM-117 A.1) */
export function konusmaPaylari(c: Loaded, gunHam: readonly Gun[], dn: readonly DilNoktasi[], haftalar: readonly number[], serbestKonus: boolean = POLICY.serbest_konus.acik): HaftaPayi[] {
  const ga = join(ROOT, "docs/v2/reviews/genel-adlar.md");
  const temel = c.temel.map((t) => t.data);
  const dizin = kumeDizini(c.lexemes, temel, c.world, existsSync(ga) ? genelAdlarAyikla(readFileSync(ga, "utf8")) : [], [...c.grammar, ...dn]);
  const dersler = new Map<string, TemelDers>(temel.map((t) => [t.id, t]));
  const dilNoktalari = new Map<string, { h_tr: string }>([...c.grammar, ...dn].map((n) => [n.id, n]));
  const gunler = [...gunHam].sort((a, b) => a.day - b.day);
  return haftalar.map((hafta) => {
    const pay: { gun: number; p: Pay }[] = [];
    for (const g of gunler.filter((x) => haftaOf(x.day) === hafta)) {
      const once = gunler.filter((x) => x.day < g.day);
      const plan = planGun({ gun: g, dersler, dizin, items: new Map(), oncekiKartlar: new Set(once.flatMap((x) => x.yeni_kartlar)), bitenDersler: new Set(once.flatMap((x) => x.dersler)),
        dilNoktalari, tohum: `akis:${g.day}`, simdi: new Date("2026-12-01T08:00:00Z"), serbestKonus });
      pay.push({ gun: g.day, p: gunPayi(g, plan, dersler) });
    }
    const h = haftaPayi(pay.map((x) => x.p));
    return { hafta, ...h, zorunlu: serbestKonus, gunler: pay.map((x) => ({ gun: x.gun, pay: x.p.aktif_sn ? x.p.konusma_sn / x.p.aktif_sn : null })) };
  });
}

const yuzde = (x: number) => `%${(x * 100).toFixed(1).replace(".", ",")}`;
export function payRaporu(r: HaftaPayi): string {
  const durum = r.gecti ? "✓" : r.zorunlu ? "✗ KALDI" : "⚠ uyarı (bayrak kapalı)";
  return `Konuşma payı (süreye göre) ${r.hafta}. hafta: ${yuzde(r.pay)} · eşik ${yuzde(r.esik)} · ${durum} · günler: ${r.gunler.map((g) => `${g.gun} ${g.pay === null ? "—" : yuzde(g.pay)}`).join(", ")}`;
}
