/** "A1 tamam" kapısının bayrağı (`policy.a1_tamam.acik`; PM-135 ek 14). Bkz. core/a1Tamam.ts.
 *  Yalnız e2e paketinde `sessionStorage["e2e-a1-tamam"]` ("1" / "0") geçersiz kılar: yürüyüş bayrak açık ve kapalı iki kez koşar; üretimde okunmaz */
import { A1_TAMAM, a1TamamAskida, a1TamamEksik } from "../core/a1Tamam.ts";

export function a1TamamAcik(): boolean {
  if (import.meta.env.MODE === "e2e") { try { const x = sessionStorage.getItem("e2e-a1-tamam"); if (x === "1" || x === "0") return x === "1"; } catch { /* policy */ } }
  return A1_TAMAM.acik === true;
}

/** Ekranlar için: kapı askıdaysa eksik koşullar, değilse null */
export function a1Askida(): { id: string; tr: string }[] | null {
  return a1TamamAskida(A1_TAMAM, a1TamamAcik()) ? a1TamamEksik(A1_TAMAM) : null;
}
