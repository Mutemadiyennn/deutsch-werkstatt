/* ===== v2'ye geçiş (PM 7025664499, PM-116; onaylı küçük v1 dokunuşları): v1 verisine dokunmaz.
   Kök adres doğrudan /v2/'ye yönlenir (legacy.html <head>, PM-116); v1 yalnız ?eski=1 ile açılır.
   O kaçışta Bugün, Seviyem, Daha fazla ve Kurulum'un en üstünde (başlık çubuğunun altında) tek satır "Yeni uygulama (2.0) → Aç".
   Kurulum'daki "Her açılışta yeni uygulamayı aç" anahtarı PM-116 ile kalktı (yönlenme artık hep açık). ===== */
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
}
