/** Senaryo ana sayfasının üst çubuk başlığı (PM 7048763794, yerleşim B3): çubuk nerede olduğunu söyler (alan adı, domains.json'daki
 *  Türkçe ad; büyük harfe çevrilmez), sayfa başlığı ne yapıldığını (h1 senaryo adı). Alan adı yoksa ya da senaryo adıyla aynıysa boş:
 *  üst çubukta başlık hiç gösterilmez, yer tutucu kalmaz. */
export const ustBaslik = (alan: string | undefined, senaryo: string): string =>
  alan && alan.trim() && alan.trim().toLocaleLowerCase("tr") !== senaryo.trim().toLocaleLowerCase("tr") ? alan.trim() : "";
