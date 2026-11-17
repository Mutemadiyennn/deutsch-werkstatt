/**
 * Firebase ID token doğrulama (RS256, Google'ın açık anahtarları) + uid izin listesi.
 * iss = https://securetoken.google.com/<projectId>, aud = <projectId>, sub = uid.
 */
import { createRemoteJWKSet, jwtVerify, type JWTVerifyGetKey } from "jose";
import { HttpError } from "./http.ts";
import type { Env } from "./env.ts";

const GOOGLE_JWKS = "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com";
let jwks: JWTVerifyGetKey | null = null;
/** Testler yerel anahtar kümesi verir */
export function setJwksForTests(k: JWTVerifyGetKey | null) { jwks = k; }
function getJwks(): JWTVerifyGetKey {
  if (!jwks) jwks = createRemoteJWKSet(new URL(GOOGLE_JWKS), { cacheMaxAge: 6 * 3600 * 1000 });
  return jwks;
}

export interface AuthedUser { uid: string }

export async function authenticate(req: Request, env: Env): Promise<AuthedUser> {
  const h = req.headers.get("Authorization") || "";
  const m = /^Bearer\s+(.+)$/i.exec(h);
  if (!m) throw new HttpError("unauthenticated", "no bearer");
  let uid: string;
  try {
    const { payload } = await jwtVerify(m[1]!, getJwks(), {
      issuer: `https://securetoken.google.com/${env.FIREBASE_PROJECT_ID}`,
      audience: env.FIREBASE_PROJECT_ID,
      algorithms: ["RS256"],
      clockTolerance: 30
    });
    if (typeof payload.sub !== "string" || !payload.sub) throw new Error("no sub");
    const at = typeof payload.auth_time === "number" ? payload.auth_time : 0;
    if (at > Date.now() / 1000 + 30) throw new Error("auth_time in future");
    uid = payload.sub;
  } catch (e) {
    throw new HttpError("unauthenticated", (e as Error).message);
  }
  const allow = (env.ALLOWED_UIDS || "").split(",").map((s) => s.trim()).filter(Boolean);
  if (!allow.length || !allow.includes(uid)) throw new HttpError("forbidden");
  return { uid };
}
