/** Uygulama durumu: tek bir bağlam (context). Gezinme hash tabanlı (#/today …). */
import { createContext } from "preact";
import { useContext } from "preact/hooks";
import type { Assessment, ContentIndex, Profile } from "@dw/shared";
import type { AuthUser } from "./services/auth.ts";
import type { Api } from "./services/api.ts";
import { mekanMi, type MekanId } from "./core/koy.ts";

export type Route =
  | { name: "today" }
  | { name: "koy" }
  | { name: "mekan"; id: MekanId }
  | { name: "domain"; id: string }
  | { name: "scenario"; id: string }
  | { name: "section"; id: string; section: string }
  | { name: "ben" }
  | { name: "profile"; bolum?: "raf" }
  | { name: "benDuzen" }
  | { name: "assess" }
  | { name: "assessResult"; id?: string }
  | { name: "onboarding" }
  | { name: "call"; id: string }
  | { name: "garden"; day?: number }
  | { name: "yol" }
  | { name: "m1day"; day: number }
  | { name: "rehber"; day: number }
  | { name: "gorevler" }
  | { name: "odak" }
  | { name: "m1medya"; day: number; id: string; tur?: "ilk" | "ikinci" }
  | { name: "akis"; day: number }
  | { name: "hafta"; hafta: number }
  | { name: "haftaTekrar"; hafta: number; gunler: number[] }
  | { name: "haftaSonuc"; hafta: number }
  | { name: "sinav"; day: number; bolum?: string }
  | { name: "seviye" }
  | { name: "seviyeRapor" }
  | { name: "seviyeTekrar"; gunler: number[] }
  | { name: "seviyePlan" }
  | { name: "ders"; id: string }
  | { name: "prova"; day: number }
  | { name: "okuma"; day: number }
  | { name: "sozluk"; q?: string; id?: string }
  | { name: "ses" }
  | { name: "kalip"; id?: string };

export function parseHash(h: string): Route {
  const p = h.replace(/^#\/?/, "").split("/").map(decodeURIComponent);
  switch (p[0]) {
    // Hedef 3 sekmeleri (PM-084 md. 3): Bugün · Yol · Köy · Ben. Eski adresler (learn, progress, profile) yeni yerlerini açar;
    // adres çubuğunu `yeniAdres` düzeltir.
    case "koy": return mekanMi(p[1]) ? { name: "mekan", id: p[1] } : { name: "koy" };
    case "ben": return p[1] === "ayarlar" ? (p[2] === "raf" ? { name: "profile", bolum: "raf" } : { name: "profile" }) : p[1] === "duzen" ? { name: "benDuzen" } : { name: "ben" };
    case "learn": return p[1] ? { name: "domain", id: p[1] } : { name: "koy" };
    case "scenario": return p[2] ? { name: "section", id: p[1]!, section: p[2] } : { name: "scenario", id: p[1] || "" };
    case "progress": return { name: "ben" };
    case "profile": return { name: "profile" };
    case "assess": return p[1] === "result" ? { name: "assessResult", id: p[2] } : { name: "assess" };
    case "onboarding": return { name: "onboarding" };
    case "call": return { name: "call", id: p[1] || "" };
    case "garden": return p[1] && Number(p[1]) ? { name: "garden", day: Number(p[1]) } : { name: "garden" };
    case "yol": return { name: "yol" };
    case "ders": return { name: "ders", id: p[1] || "" };
    case "prova": return { name: "prova", day: Number(p[1]) || 1 };
    case "okuma": return { name: "okuma", day: Number(p[1]) || 1 };
    case "ses": return { name: "ses" };
    case "sozluk": return { name: "sozluk", q: p[1] || undefined, id: p[2] || undefined };
    case "rehber": return { name: "rehber", day: Number(p[1]) || 1 };
    case "gorevler": return { name: "gorevler" };
    case "odak": return { name: "odak" };
    case "kalip": return { name: "kalip", id: p[1] || undefined };
    case "akis": return { name: "akis", day: Number(p[1]) || 1 };
    // #/hafta/<H>/tekrar/<g,g,…>: düşük sonuçta zayıf "yapabiliyorum" cümlelerinin tekrarı (#243 takip a)
    // #/sinav/<gün>[/<bölüm>]: sınav günü denemesi (PM-110); bölümle o bölümü yeniden çözdürür
    case "sinav": return { name: "sinav", day: Number(p[1]) || 1, ...(p[2] ? { bolum: p[2] } : {}) };
    // PM-115: #/seviye (tespit), #/seviye/rapor (eski #/seviye/sonuc da rapora), #/seviye/tekrar/<g,g,…>; #/seviye/plan (PM-124 md. 4.1)
    case "seviye": return p[1] === "rapor" || p[1] === "sonuc" ? { name: "seviyeRapor" } : p[1] === "plan" ? { name: "seviyePlan" } : p[1] === "tekrar" ? { name: "seviyeTekrar", gunler: (p[2] ?? "").split(",").map(Number).filter((n) => Number.isInteger(n) && n > 0) } : { name: "seviye" };
    case "hafta": return p[2] === "sonuc" ? { name: "haftaSonuc", hafta: Number(p[1]) || 1 } : p[2] === "tekrar" ? { name: "haftaTekrar", hafta: Number(p[1]) || 1, gunler: (p[3] ?? "").split(",").map(Number).filter((n) => Number.isInteger(n) && n > 0) } : { name: "hafta", hafta: Number(p[1]) || 1 };
    // #/m1/<gün>/<kayıt>[/1|/2]: akışta sesin ilk ya da ikinci turu (PM-097 md. 1); ek yoksa bütün adımlar
    case "m1": return p[2] ? { name: "m1medya", day: Number(p[1]) || 1, id: p[2], ...(p[3] === "1" ? { tur: "ilk" as const } : p[3] === "2" ? { tur: "ikinci" as const } : {}) } : { name: "m1day", day: Number(p[1]) || 1 };
    default: return { name: "today" };
  }
}
/** Eski sekme adresleri yeni yerlerine yönlenir (PM-084 md. 3.2); yönlenecek bir şey yoksa null. Kayıtlı bağlantı ve
 *  geri düğmesi kırılmaz: ekran aynı kalır, yalnız adres yenisiyle değişir. */
const ESKI_ADRES = new Map([["learn", "#/koy"], ["progress", "#/ben"], ["profile", "#/ben/ayarlar"]]);
export function yeniAdres(h: string): string | null {
  const p = h.replace(/^#\/?/, "").split("/");
  return p.length === 1 || (p.length === 2 && p[1] === "") ? ESKI_ADRES.get(p[0]!) ?? null : null;
}
export const go = (path: string) => { location.hash = "#/" + path.replace(/^#?\/?/, ""); };

/** Ekranın bağlı olduğu sekme: Köy'ün mekânları (durumlar, senaryo, sözlük, kalıplar, günün kayıtları) Köy'de, ayarlar Ben'de kalır */
export function sekme(r: Route["name"]): string {
  switch (r) {
    case "yol": case "rehber": return "yol";
    case "koy": case "mekan": case "domain": case "scenario": case "sozluk": case "kalip": case "m1day": return "koy";
    case "ben": case "benDuzen": case "profile": case "ses": return "ben";
    default: return "today";
  }
}
/** Tam ekran akışlar (sekme çubuğu yok, tek çıkış X / geri; PM-133 md. 4) ve aileleri: aynı ailenin adresleri tek akıştır
 *  (sınav günü → bölüm, tespit → rapor → tekrar, hafta testi → sonuç); gelen arama rol oyunuyla aynı akış */
const TAM_TEK = new Set<string>(["onboarding", "assess", "section", "garden", "m1medya", "akis", "ders", "prova", "okuma", "sinav"]);
export function aile(r: string): string | null {
  if (r.startsWith("seviye")) return "seviye";
  if (r.startsWith("hafta")) return "hafta";
  if (r === "call") return "section";
  return TAM_TEK.has(r) ? r : null;
}
export const tamEkran = (r: string) => aile(r) !== null;
export const KOKLER = new Set<string>(["today", "yol", "koy", "ben"]);

/** Öğrenme ekranları: odak süresi yalnızca bunlarda sayılır (v1: menü ekranları sayılmaz) */
export const LEARNING_ROUTES = new Set<Route["name"]>(["assess", "section", "garden", "m1medya", "ders", "prova", "okuma", "akis", "hafta", "haftaTekrar", "sinav", "seviye", "seviyeTekrar"]);

export interface AppCtx {
  user: AuthUser | null;
  profile: Profile;
  setProfile: (p: Profile) => Promise<void>;
  index: ContentIndex | null;
  indexError: string | null;
  placement: Assessment | undefined;
  refreshPlacement: () => Promise<void>;
  api: Api;
  toast: (msg: string) => void;
  route: Route;
}
export const Ctx = createContext<AppCtx | null>(null);
export function useApp(): AppCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error("AppCtx yok");
  return c;
}
