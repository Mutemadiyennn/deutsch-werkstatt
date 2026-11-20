/**
 * "Eski uygulamaya dön" (PM 7025664499; inceleme #130 B3): v1'deki "Her açılışta yeni uygulamayı aç" ayarını kapatır ve
 * v1'i `?v1` ile açar (aynı köken, aynı localStorage). Kabukta adres çubuğu olmadığından bu bağlantı Profil'de, giriş
 * ekranında (ayar açıkken) ve kök hata sayfasında bulunur.
 */
import { V1_URL } from "../core/planner.ts";

export const V2_AC = "dw-v2-ac";
export const V1_DON_URL = `${V1_URL}?v1`;

/** v1'deki ayar açık mı (v1 açılışı v2'ye yönleniyor mu) */
export function v2AcAcik(): boolean { try { return localStorage.getItem(V2_AC) === "1"; } catch { return false; } }

export function EskiyeDon({ cls = "btn sm" }: { cls?: string }) {
  return <a class={cls} href={V1_DON_URL} data-test="v1-don" onClick={() => { try { localStorage.setItem(V2_AC, "0"); } catch { /* özel kip */ } }}>Eski uygulamaya dön</a>;
}
