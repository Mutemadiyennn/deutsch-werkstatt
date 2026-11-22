/**
 * Profil → "Medya rafı" (PM-061 / D-112, #58 B12): adres ve anahtar yalnızca bu cihazda. "Rafı sına" sonucu öğrenciye
 * açıkça söylenir (bağlandı / anahtar yanlış / ulaşılamıyor; PM 14:40 madde 1b). Alanlar boşsa açık kaynaklı medya kullanılır.
 */
import { useEffect, useState } from "preact/hooks";
import { PAROLA_EN_AZ, RAF_DURUM_TR, rafOku, rafSina, rafYaz, type RafDurum } from "../services/raf.ts";

export function MedyaRafi() {
  const [adres, setAdres] = useState("");
  const [anahtar, setAnahtar] = useState("");
  const [durum, setDurum] = useState<RafDurum | null>(null);
  const [mesgul, setMesgul] = useState(false);
  const [hazir, setHazir] = useState(false);
  useEffect(() => { void rafOku().then((r) => { if (r) { setAdres(r.adres); setAnahtar(r.anahtar); } }).finally(() => setHazir(true)); }, []);
  const sina = async () => {
    setMesgul(true);
    try {
      // tek alan boşsa kayıtlı ayar silinmez (silmek için "Sil"; inceleme #98 2. tur P2)
      if (!adres.trim() || !anahtar.trim()) { setDurum(adres.trim() || anahtar.trim() ? "eksik" : "ayar-yok"); return; }
      // kısa parola girerken söylenir; hiçbir şey kaydedilmez ve rafa istek gitmez (PM 7020257764)
      if (anahtar.trim().length < PAROLA_EN_AZ) { setDurum("parola-kisa"); return; }
      if (!(await rafYaz({ adres, anahtar }))) { setDurum("adres-gecersiz"); return; }
      setDurum(await rafSina());
    } catch { setDurum("ulasilamiyor"); } finally { setMesgul(false); }
  };
  const sil = async () => { setAdres(""); setAnahtar(""); setDurum(null); await rafYaz(null); };
  return (
    <div class="stack" style={{ gap: 8 }} data-test="medya-rafi" data-hazir={hazir ? "1" : undefined}>
      <p class="small muted" id="raf-bilgi">Sana özel fotoğraflar. Adres ve parola yalnız bu cihazda. Boşsa herkese açık görseller.</p>
      <label class="lbl" for="raf-adres">Raf adresi</label>
      <input id="raf-adres" class="input" type="url" inputMode="url" autoComplete="off" autoCapitalize="off" spellcheck={false} value={adres}
        onInput={(e) => { setAdres((e.target as HTMLInputElement).value); setDurum(null); }} placeholder="https://…" data-test="raf-adres" />
      <label class="lbl" for="raf-anahtar">Parola</label>
      <input id="raf-anahtar" class="input" type="password" autoComplete="off" value={anahtar}
        onInput={(e) => { setAnahtar((e.target as HTMLInputElement).value); setDurum(null); }} data-test="raf-anahtar" />
      <div class="row">
        <button class="btn sm" disabled={mesgul} onClick={() => void sina()} data-test="raf-sina">{mesgul ? "Sınanıyor…" : "Kaydet ve rafı sına"}</button>
        {(adres || anahtar) && <button class="btn sm ghost" onClick={() => void sil()} data-test="raf-sil">Sil</button>}
      </div>
      {/* canlı bölge baştan var: VoiceOver sonradan eklenen role=status'u okumayabilir (inceleme #98 P2) */}
      <p class={`small ${durum === "bagli" ? "goalhit" : ""}`} role="status" aria-live="polite" data-test="raf-durum" data-durum={durum ?? undefined}>{durum ? RAF_DURUM_TR[durum] : ""}</p>
    </div>
  );
}
