/* ===== v2 köprüsü (H2, PM-007): Bugün ekranında tek kart → /v2/ "Gerçek hayat dersleri".
   v1 verisine dokunmaz; v2 aynı adreste /v2/ altında ayrı uygulama olarak açılır. ===== */
{
  const _rpV2 = renderPlan;
  renderPlan = function(){
    const h = _rpV2.apply(this, arguments);
    const card = `<section class="card hl" data-test="v2-card"><div class="kicker">Yeni</div><h2 style="margin:2px 0 4px">Gerçek hayat dersleri</h2><p class="small muted" style="margin:0 0 10px">Telefon, doktor, resmî daire: önce dinle, sonra parçala, sonra konuş. Yeni uygulama ayrı açılır; buradaki ilerlemen olduğu gibi kalır.</p><a class="btn primary block" href="./v2/" data-test="v2-open">Gerçek hayat derslerini aç</a></section>`;
    const j = h.indexOf("</section>"); return j < 0 ? card + h : h.slice(0, j + 10) + card + h.slice(j + 10);
  };
  VIEWS.plan = () => renderPlan();
}
