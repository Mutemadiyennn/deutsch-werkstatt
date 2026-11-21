# Yerleşim bekçisi: ilk ölçüm (main `14e96eb`, 20.11.2026)

> **Yerel Chromium, yalnız hızlı geri bildirim.** Kabul ölçümü KAPI'nın WebKit koşusudur (iPhone 15 / 15 Pro Max / 16 Pro Max); KAPI sonucu gelince bu liste onunla güncellenir. Ekran × boy: 64 (gezginin 32 ekranı × 390×844 ve 430×932). Toplam **30 ihlal** → PM 7047456551 gereği bekçi **rapor kipinde** girer (`KIP = "rapor"`); düzeltmeler ≤ 5'lik PR'larla gelir, sayı sıfıra inince tek satırlık PR ile `KIP = "kirmizi"`.

Ana ekranların (Bugün, Öğren, İlerlemem, Profil) B1, B2, B6, B7, B8 sonucu temiz; Öğren ve Profil'de B4/B5 ihlalleri aşağıda.

| kural | ekran | ayrıntı | boy |
|---|---|---|---|
| B3 | `#/scenario/sc:arbeit:m1-weihnachtsfeier` | aynı metin 2 kez: "İş yerinin Noel kutlaması (Weihnachtsfeier)" | 390x844, 430x932 |
| B3 | `#/scenario/sc:essen:m1-weihnachtsmarkt` | aynı metin 2 kez: "Weihnachtsmarkt'ta stantta sipariş" | 390x844, 430x932 |
| B3 | `#/scenario/sc:freizeit:m1-gluehwein-einladung` | aynı metin 2 kez: "İş çıkışı Glühwein daveti" | 390x844, 430x932 |
| B3 | `#/scenario/sc:strategie:01-nicht-verstanden` | aynı metin 2 kez: "Anlamadığını söylemek, tekrar ettirmek, yavaşlatmak" | 390x844, 430x932 |
| B3 | `#/scenario/sc:telefon:01-arzttermin` | aynı metin 2 kez: "Doktordan telefonla randevu almak" | 390x844, 430x932 |
| B4 | `#/learn` | açıklama 3 satır: "Gerçek hayattaki 20 durum, senin öncelik sırana gö" | 390x844, 430x932 |
| B4 | `#/profile` | açıklama 3 satır: "Ad ve hitap yalnızca bu cihazda kalır; diyaloglard" | 390x844, 430x932 |
| B4 | `#/profile` | açıklama 5 satır: "Yalnızca sana özel medya (lisansı herkese açık dağ" | 390x844, 430x932 |
| B4 | `#/profile` | açıklama 3 satır: "Yapay zekâ özellikleri anahtarları güvenle tutan s" | 390x844, 430x932 |
| B4 | `#/profile` | açıklama 3 satır: "İlerlemen bu cihazda saklanıyor; telefonda yer aza" | 390x844 |
| B5 | `#/learn` | "·" satır sonunda: "Yapabilmek, gerekmek, istemek · Können, müssen, dü" | 390x844 |
| B5 | `#/learn` | "·" satır sonunda: "Heceleme: adını harf harf söyle · Buchstabieren" | 390x844, 430x932 |
| B5 | `#/learn` | "·" satır sonunda: "İletişim stratejileri · Kommunikationsstrategien 1" | 390x844 |
| B5 | `#/learn/arzt` | "·" satır başında: "Şikâyetini anlatmak Beschwerden beschreiben · A2" | 390x844 |
| B5 | `#/learn/telefon` | "·" satır sonunda: "Doktordan telefonla randevu almak Einen Arzttermin" | 390x844 |
| B5 | `#/scenario/sc:telefon:01-arzttermin/build` | "·" satır sonunda: "Ich möchte + istediğin şey · Ich möchte + istediği" | 390x844 |
| B5 | `#/scenario/sc:telefon:01-arzttermin/build` | "·" satır başında: "Ich möchte + istediğin şey · Ich möchte + istediği" | 430x932 |
| B7 | `#/scenario/sc:arbeit:m1-weihnachtsfeier/chunks` | başlık sözcüğü bölünmüş: "Einladung" | 390x844, 430x932 |
| B7 | `#/scenario/sc:arzt:01-beschwerden` | başlık sözcüğü bölünmüş: "einfacher" | 430x932 |

**Düzeltme partileri (öneri, her biri ≤ 5):**
1. B3: senaryo ana sayfasında üst çubuk başlığı ile sayfa başlığı aynı (5 senaryo, tek bileşen düzeltmesi).
2. B4: Öğren ve Profil açıklamaları ≤ 2 satıra (5 metin).
3. B5: "·" ayraçlı başlıklar ayraçta satır kırmasın (Öğren listesi, alan başlıkları, kalıp kartı).
4. B7: `Einladung`, `einfacher` başlık sözcükleri bölünmesin (ifade kartı başlık kademesi).
