/** Uygulama durumu: tek bir bağlam (context). Gezinme hash tabanlı (#/today …). */
import { createContext } from "preact";
import { useContext } from "preact/hooks";
import type { Assessment, ContentIndex, Profile } from "@dw/shared";
import type { AuthUser } from "./services/auth.ts";
import type { Api } from "./services/api.ts";

export type Route =
  | { name: "today" }
  | { name: "learn" }
  | { name: "domain"; id: string }
  | { name: "scenario"; id: string }
  | { name: "section"; id: string; section: string }
  | { name: "progress" }
  | { name: "profile" }
  | { name: "assess" }
  | { name: "assessResult"; id?: string }
  | { name: "onboarding" }
  | { name: "call"; id: string }
  | { name: "garden"; day?: number }
  | { name: "yol" }
  | { name: "m1day"; day: number }
  | { name: "rehber"; day: number }
  | { name: "m1medya"; day: number; id: string }
  | { name: "ders"; id: string }
  | { name: "prova"; day: number }
  | { name: "okuma"; day: number }
  | { name: "sozluk"; q?: string; id?: string };

export function parseHash(h: string): Route {
  const p = h.replace(/^#\/?/, "").split("/").map(decodeURIComponent);
  switch (p[0]) {
    case "learn": return p[1] ? { name: "domain", id: p[1] } : { name: "learn" };
    case "scenario": return p[2] ? { name: "section", id: p[1]!, section: p[2] } : { name: "scenario", id: p[1] || "" };
    case "progress": return { name: "progress" };
    case "profile": return { name: "profile" };
    case "assess": return p[1] === "result" ? { name: "assessResult", id: p[2] } : { name: "assess" };
    case "onboarding": return { name: "onboarding" };
    case "call": return { name: "call", id: p[1] || "" };
    case "garden": return p[1] && Number(p[1]) ? { name: "garden", day: Number(p[1]) } : { name: "garden" };
    case "yol": return { name: "yol" };
    case "ders": return { name: "ders", id: p[1] || "" };
    case "prova": return { name: "prova", day: Number(p[1]) || 1 };
    case "okuma": return { name: "okuma", day: Number(p[1]) || 1 };
    case "sozluk": return { name: "sozluk", q: p[1] || undefined, id: p[2] || undefined };
    case "rehber": return { name: "rehber", day: Number(p[1]) || 1 };
    case "m1": return p[2] ? { name: "m1medya", day: Number(p[1]) || 1, id: p[2] } : { name: "m1day", day: Number(p[1]) || 1 };
    default: return { name: "today" };
  }
}
export const go = (path: string) => { location.hash = "#/" + path.replace(/^#?\/?/, ""); };

/** Öğrenme ekranları: odak süresi yalnızca bunlarda sayılır (v1: menü ekranları sayılmaz) */
export const LEARNING_ROUTES = new Set<Route["name"]>(["assess", "section", "garden", "m1medya", "ders", "prova", "okuma"]);

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
