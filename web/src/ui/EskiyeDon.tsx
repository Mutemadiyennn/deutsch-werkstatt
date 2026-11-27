/**
 * "Eski uygulamaya dön" (PM 7025664499; inceleme #130 B3; PM-116): kök adres her zaman /v2/'ye yönlendiği için v1 yalnız
 * `?eski=1` ile açılır. PM-116 ile Profil'deki ve girişteki düğme kalktı; yalnız kök hata sayfasında acil çıkış olarak durur
 * (yeni uygulama hiç açılamıyorsa kabukta adres çubuğu yok).
 */
import { V1_URL } from "../core/planner.ts";

export const V1_DON_URL = `${V1_URL}?eski=1`;

export function EskiyeDon({ cls = "btn sm" }: { cls?: string }) {
  return <a class={cls} href={V1_DON_URL} data-test="v1-don">Eski uygulamaya dön</a>;
}
