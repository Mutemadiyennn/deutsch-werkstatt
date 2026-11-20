# Yerleşim bekçisi: ilk ölçüm (main `14e96eb`, 20.11.2026)

> **Yerel Chromium, yalnız hızlı geri bildirim.** Kabul ölçümü KAPI'nın WebKit koşusudur (iPhone 15 / 15 Pro Max / 16 Pro Max); KAPI sonucu gelince bu liste onunla güncellenir. Ekran × boy: 64 (gezginin 32 ekranı × 390×844 ve 430×932). Toplam **28 ihlal** → PM 7047456551 gereği bekçi **rapor kipinde** girer (`KIP = "rapor"`); düzeltmeler ≤ 5'lik PR'larla gelir, sayı sıfıra inince tek satırlık PR ile `KIP = "kirmizi"`.

| kural | ekran | ayrıntı | boy |
|---|---|---|---|
| B4 | `#/learn` | açıklama 3 satır: "gerçek hayattaki 20 durum, senin öncelik sırana gö" | 390x844, 430x932 |
| B5 | `#/learn` | "·" satır sonunda: "yapabilmek, gerekmek, istemek · können, müssen, dü" | 390x844 |
| B5 | `#/learn` | "·" satır sonunda: "heceleme: adını harf harf söyle · buchstabieren" | 390x844, 430x932 |
| B5 | `#/learn` | "·" satır sonunda: "iletişim stratejileri · kommunikationsstrategien 1" | 390x844 |
| B4 | `#/profile` | açıklama 3 satır: "ad ve hitap yalnızca bu cihazda kalır; diyaloglard" | 390x844, 430x932 |
| B4 | `#/profile` | açıklama 5 satır: "yalnızca sana özel medya (lisansı herkese açık dağ" | 390x844, 430x932 |
| B4 | `#/profile` | açıklama 3 satır: "yapay zekâ özellikleri anahtarları güvenle tutan s" | 390x844, 430x932 |
| B4 | `#/profile` | açıklama 3 satır: "ilerlemen bu cihazda saklanıyor; telefonda yer aza" | 390x844 |
| B5 | `#/learn/arzt` | "·" satır başında: "şikâyetini anlatmak beschwerden beschreiben · a2" | 390x844 |
| B5 | `#/learn/telefon` | "·" satır sonunda: "doktordan telefonla randevu almak einen arzttermin" | 390x844 |
| B3 | `#/scenario/sc:arbeit:m1-weihnachtsfeier` | aynı metin 2 kez: "iş yerinin noel kutlaması (weihnachtsfeier)" | 390x844 |
| B3 | `#/scenario/sc:essen:m1-weihnachtsmarkt` | aynı metin 2 kez: "weihnachtsmarkt'ta stantta sipariş" | 390x844, 430x932 |
| B3 | `#/scenario/sc:freizeit:m1-gluehwein-einladung` | aynı metin 2 kez: "iş çıkışı glühwein daveti" | 390x844, 430x932 |
| B3 | `#/scenario/sc:strategie:01-nicht-verstanden` | aynı metin 2 kez: "anlamadığını söylemek, tekrar ettirmek, yavaşlatmak" | 390x844, 430x932 |
| B3 | `#/scenario/sc:telefon:01-arzttermin` | aynı metin 2 kez: "doktordan telefonla randevu almak" | 390x844, 430x932 |
| B5 | `#/scenario/sc:telefon:01-arzttermin/build` | "·" satır sonunda: "ıch möchte + istediğin şey · ıch möchte + istediği" | 390x844 |
| B7 | `#/scenario/sc:arbeit:m1-weihnachtsfeier/chunks` | başlık sözcüğü bölünmüş: "Einladung" | 390x844, 430x932 |
| B5 | `#/scenario/sc:telefon:01-arzttermin/build` | "·" satır başında: "ıch möchte + istediğin şey · ıch möchte + istediği" | 430x932 |

**Düzeltme partileri (öneri, her biri ≤ 5):**
1. B3: senaryo ana sayfasında üst çubuk başlığı ile sayfa başlığı aynı (5 senaryo, tek bileşen düzeltmesi).
2. B4: Öğren ve Profil açıklamaları ≤ 2 satıra (5 metin).
3. B5: "·" ayraçlı başlıklar ayraçta satır kırmasın (Öğren listesi, alan başlıkları, kalıp kartı).
4. B7: `Einladung` başlığı bölünmesin (ifade kartı başlık kademesi).
