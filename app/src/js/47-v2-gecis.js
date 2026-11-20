/* ===== v2'ye geçiş (PM 7025664499, onaylı küçük v1 dokunuşu): v1 verisine dokunmaz.
   1) Her sekmenin en üstünde sabit tek satır "Yeni uygulama (2.0) → Aç".
   2) Kurulum: "Her açılışta yeni uygulamayı aç" (varsayılan kapalı). Açıksa kök adres /v2/'ye yönlenir;
      v2 Profil'deki "Eski uygulamaya dön" anahtarı kapatıp köke gelir (aynı köken, aynı localStorage). ===== */
const V2_AC = "dw-v2-ac";
const v2Ac = () => { try { return localStorage.getItem(V2_AC) === "1"; } catch { return false; } };
if (v2Ac() && !/[?&]v1\b/.test(location.search) && !/\/v2\//.test(location.pathname)) location.replace("./v2/");
function v2AcAyarla(on) { try { localStorage.setItem(V2_AC, on ? "1" : "0"); } catch {} }
{
  const _rV2 = render;
  render = function () {
    const r = _rV2.apply(this, arguments);
    // seans açıkken gösterilmez; ekranın başlık çubuğu (.fbar/.sbar) varsa onun altına girer: güvenli alana ve
    // saat/Dynamic Island bölgesine düşmez (inceleme #130 B1, safearea.py)
    if (["plan", "seviye", "more", "kurulum"].includes(S.view) && !S.sess) {
      const v = $("#view");
      if (v && !v.querySelector("[data-test=v2-bant]")) {
        const satir = `<a class="v2-bant" href="./v2/" data-test="v2-bant"><b>Yeni uygulama (2.0)</b><b>Aç →</b></a>`;
        const bas = v.querySelector(".fbar, .sbar");
        if (bas) bas.insertAdjacentHTML("afterend", satir); else v.insertAdjacentHTML("afterbegin", satir);
      }
    }
    return r;
  };
  const _kV2 = renderKurulum;
  renderKurulum = function () {
    return _kV2.apply(this, arguments) + `<section class="card" data-test="v2-ac-ayar"><label class="row" style="gap:12px;flex-wrap:nowrap;min-height:44px;align-items:center">
      <input type="checkbox" data-test="v2-ac" ${v2Ac() ? "checked" : ""} onchange="v2AcAyarla(this.checked)" style="width:24px;height:24px">
      <span><b>Her açılışta yeni uygulamayı aç</b><br><span class="small muted">Açıksa uygulama doğrudan 2.0 ile açılır. Eskiye 2.0'ın Profil ekranından dönersin.</span></span></label></section>`;
  };
  if (VIEWS.kurulum) VIEWS.kurulum = () => renderKurulum();
}
