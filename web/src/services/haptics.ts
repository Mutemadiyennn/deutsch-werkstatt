/** Titreşim eşlemesi (EK 2 §7): doğru = success, yanlış = error, seçim = selection. iPhone kabuğunda Capacitor Haptics, web'de navigator.vibrate. */
type Kind = "success" | "error" | "selection";
let enabled = true;
export const setHaptics = (on: boolean) => { enabled = on; };
export function haptic(kind: Kind) {
  if (!enabled) return;
  try {
    const H = (globalThis as any).Capacitor?.Plugins?.Haptics;
    if (H) {
      if (kind === "selection") { H.selectionStart?.(); H.selectionChanged?.(); H.selectionEnd?.(); return; }
      H.notification?.({ type: kind === "success" ? "SUCCESS" : "ERROR" });
      return;
    }
    navigator.vibrate?.(kind === "success" ? 12 : kind === "error" ? [30, 40, 30] : 6);
  } catch {}
}
