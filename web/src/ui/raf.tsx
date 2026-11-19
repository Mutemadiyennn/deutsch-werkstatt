/**
 * Profil → "Medya rafı" (PM-061 / D-112, #58 B12): adres ve anahtar yalnızca bu cihazda. "Rafı sına" sonucu öğrenciye
 * açıkça söylenir (bağlandı / anahtar yanlış / ulaşılamıyor; PM 14:40 madde 1b). Alanlar boşsa açık kaynaklı medya kullanılır.
 */
import { useEffect, useState } from "preact/hooks";
import { RAF_DURUM_TR, rafOku, rafSina, rafYaz, type RafDurum } from "../services/raf.ts";

export function MedyaRafi() {
  const [adres, setAdres] = useState("");
  const [anahtar, setAnahtar] = useState("");
  const [durum, setDurum] = useState<RafDurum | null>(null);
  const [mesgul, setMesgul] = useState(false);
  useEffect(() => { void rafOku().then((r) => { if (r) { setAdres(r.adres); setAnahtar(r.anahtar); } }); }, []);
  const sina = async () => {
    setMesgul(true);
    await rafYaz(adres && anahtar ? { adres, anahtar } : null);
    setDurum(await rafSina()); setMesgul(false);
  };
  return (
    <div class="stack" style={{ gap: 8 }} data-test="medya-rafi">
      <p class="small muted">Yalnızca sana özel medya (lisansı herkese açık dağıtıma izin vermeyen fotoğraflar). Adres ve anahtar yalnızca bu cihazda saklanır, yedek dosyasına girmez. Boş bırakırsan açık kaynaklı medya gösterilir.</p>
      <label class="lbl" for="raf-adres">Raf adresi</label>
      <input id="raf-adres" class="input" type="url" inputMode="url" autoComplete="off" autoCapitalize="off" spellcheck={false} value={adres}
        onInput={(e) => { setAdres((e.target as HTMLInputElement).value); setDurum(null); }} placeholder="https://…" data-test="raf-adres" />
      <label class="lbl" for="raf-anahtar">Anahtar</label>
      <input id="raf-anahtar" class="input" type="password" autoComplete="off" value={anahtar}
        onInput={(e) => { setAnahtar((e.target as HTMLInputElement).value); setDurum(null); }} data-test="raf-anahtar" />
      <div class="row">
        <button class="btn sm" disabled={mesgul} onClick={() => void sina()} data-test="raf-sina">{mesgul ? "Sınanıyor…" : "Kaydet ve rafı sına"}</button>
        {(adres || anahtar) && <button class="btn sm ghost" onClick={() => { setAdres(""); setAnahtar(""); setDurum(null); void rafYaz(null); }} data-test="raf-sil">Sil</button>}
      </div>
      {durum && <p class={`small ${durum === "bagli" ? "goalhit" : ""}`} role="status" data-test="raf-durum" data-durum={durum}>{RAF_DURUM_TR[durum]}</p>}
    </div>
  );
}
