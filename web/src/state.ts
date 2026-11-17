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
  | { name: "progress" }
  | { name: "profile" }
  | { name: "assess" }
  | { name: "assessResult"; id?: string }
  | { name: "onboarding" };

export function parseHash(h: string): Route {
  const p = h.replace(/^#\/?/, "").split("/").map(decodeURIComponent);
  switch (p[0]) {
    case "learn": return p[1] ? { name: "domain", id: p[1] } : { name: "learn" };
    case "scenario": return { name: "scenario", id: p.slice(1).join("/") };
    case "progress": return { name: "progress" };
    case "profile": return { name: "profile" };
    case "assess": return p[1] === "result" ? { name: "assessResult", id: p[2] } : { name: "assess" };
    case "onboarding": return { name: "onboarding" };
    default: return { name: "today" };
  }
}
export const go = (path: string) => { location.hash = "#/" + path.replace(/^#?\/?/, ""); };

/** Öğrenme ekranları: odak süresi yalnızca bunlarda sayılır (v1: menü ekranları sayılmaz) */
export const LEARNING_ROUTES = new Set<Route["name"]>(["assess", "scenario"]);

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
