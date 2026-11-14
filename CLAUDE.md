# drmustafaturker-web: çalışma notları

Ass. Dr. Mustafa Türker'in (göğüs cerrahisi) kişisel/eğitim sitesi. Düz HTML, derleme adımı yok. Asıl adres **drmustafaturker.com**: Cloudflare (alan adı/DNS Cloudflare'de; Workers statik dosya yayını, `.assetsignore`, `x.html` → `/x` 307 yönlendirmesi). `main`'e push'ta kendiliğinden güncellenir. Vercel sahibinin isteğiyle bırakıldı (`.vercelignore` silindi; Vercel projesini sahibi kendi hesabından siliyor); Vercel'e özel dosya/ayar ekleme.

## Yayınlama
- Site sahibi değişikliklerin **onay beklemeden doğrudan canlıya** (main dalına) gönderilmesini istedi. Değişikliği test et, commit'le, `main`'e gönder; sonra sahibine Türkçe ve sade bir dille ne yaptığını anlat.
- Göndermeden önce `git fetch origin main` yap: başka oturumlar da main'e yazıyor. Onların değişikliklerini silme; birleştir (merge), force push yapma.
- Geri alınması zor işlemlerden (dosya silme, geçmişi değiştirme) önce sor.

## Şifre koruması (bekliyor)
- Eski Vercel middleware denemesi (commit 553bec3, geri alındı) artık geçersiz; Vercel kullanılmıyor, geri getirme.
- Asıl adres Cloudflare'de olduğundan koruma Cloudflare Access (Zero Trust, e-posta ile giriş) veya Worker ile yapılmalı. Sahibi isterse birlikte kurulacak.

## Sıradaki konu (sahibi istedi)
- **Plörodez ve dekortikasyon** konu sayfası. Özellikle: talk plörodezi yapılan hastalarda gelişen inflamasyon (mekanizma, plörodezin inflamasyona dayalı oluşumu, sistemik inflamatuvar yanıt/ARDS riski, talk partikül boyutu) ve bu hastalara **NSAİİ verilmesi** tartışması (plörodez başarısına etkisi; TIME1 çalışması vb. kanıtlar). Kaynak: TGCD *Her Yönüyle Plevra ve Hastalıkları* (plörodez/dekortikasyon bölümleri), Hilmi Keskin notları (varsa); kendi SVG şemaları.

## Yapı
- `index.html`: giriş (bayrak, "Göğüs Cerrahisi", "Ass. Dr. Mustafa Türker", hamburger menü: Vaka Örnekleri, Konular).
- `pnomotoraks.html`, `akciger-grafileri.html`: vaka ve konu sayfaları. `toraks-anatomisi.html`: sekmesiz tek sayfa; genel anatomi ve iki seminer (Kayseri Şehir Hastanesi "Toraks Anatomisi" ve "Cerrahi Klinik Korelasyonlar") konulara göre 20 başlıkta birleşik. Alt blokların id'leri eski önekleri korur (`g-`, `s-`, `c-`); `toraks-anatomisi-semineri.html` ve `toraks-cerrahi-anatomi.html` yalnızca yönlendirme. `bronkoskopi.html`, `plevral-efuzyon.html`, `atelektazi.html`, `bul-ve-hava-kistleri.html` (bleb/bül/kist tanımları, oluşum, apeks yerleşiminin nedenleri, fizyopatoloji; BT görselleri kendi SVG şemalarımız), `toraks-bt.html` (sahibinin kontrastlı BT kesitleri `images/bt/`; ekran fotoğraflarından araç çubukları ve hasta adı içeren tarayıcı başlığı kırpıldı) konu sayfaları. `images/`: anonimleştirilmiş görüntüler.
- Pnömotoraks vakaları `vakalar/pnomotoraks.json` dosyasından çizilir (`pnomotoraks.html`; JSON alınamazsa sayfadaki statik Vaka 1-2 kalır). Yalnızca `isaretsiz` **ve** `isaretli` alanı olan vakalar sitede görünür. Sahibi grafi gönderdiğinde: anonimleştir/kırp, `images/vakalar/vaka-N.jpg` olarak koy, JSON'a sırayla `{id, baslik, aciklama, ipucu, isaretsiz}` ekle (`isaretli` olmadan; işaretlemeyi sahibi yapar). `vaka-ekle.html` ("Vaka Düzenle"): yalnızca uygulamada çalışır (web'de engelli, test için `?test=1`); sahibi tablet kalemiyle her yöne ok çizer (kalemi sürükleme yönü = kuyruk), okları sürükleyerek taşır/kuyruktan döndürür, kesikli hatla birleştirir (sıra: ekleme sırası değil yakınlık; en yakın komşu + 2-opt), iki parmakla sıkıştır = yakınlaştır (×8, Sığdır düğmesi), iki parmak kısa dokunuş = geri al, üç parmak = yeniden yap (Apple Pencil sıkma/çift dokunma web sayfalarına iletilmiyor) ve GitHub contents API ile (cihazdaki ince yetkili anahtarla) `images/vakalar/<id>-isaretli.jpg` + JSON'u doğrudan `main`'e yazar; ok koordinatları JSON'da `oklar` (0-1 oranı) ve `birlestir` olarak saklanır. Bu commit'ler uygulamadan gelir: göndermeden önce mutlaka `git fetch origin main` + merge. Hastane görüntüleme sistemine (PACS) sahibinin şifresiyle giriş yapılmaz; hasta verisi buluta çıkarılmaz.
- Kök PWA "Göğüs Cerrahisi": `manifest.webmanifest`, `sw.js`, `icons/`.
- `pediatri/`: sahibinin eşi (Ass. Dr. Merve Türker) için ayrı PWA "Pediatri" (ilaç dozları, kiloya göre hesaplama). Ana menüde **gösterilmiyor** ama silinmemeli; geliştirilmeye devam ediyor. `pediatri-ilac-dozlari.html` eski adres yönlendirmesi.
- Görsel dil: arka plan #edf2f5, lacivert #1f3a52, bayrak kırmızısı #E30A17; kartlar beyaz, yuvarlak köşe.

## İçerik kuralları
- Konu sayfaları için ana kaynak: `notlar/hilmi-keskin-video-notlari.md` (Dr. Hilmi Keskin YouTube kanalı notları/transkriptleri; sahibi bu bilgilerin kullanılmasını istedi). Kendi cümlelerinle yaz, otomatik altyazı hatalarını düzelt, sayfada kaynağı belirt; ham transkripti yayınlama. `notlar/` ve `CLAUDE.md` yayına dahil edilmez (`.assetsignore`).
- Anatomi için ikinci kaynak: `notlar/netter-toraks-ozet.md` (Netter Atlas 8. baskı toraks levhalarından Türkçe özet). Kitap telifli: PDF'i, ham metnini veya levhalarını depoya/siteye koyma; çizim gerekirse kendi SVG şemanı yap. Kitabın tamamı gerekirse sahibinden Drive bağlantısını iste.
- Üçüncü kaynak (sahibi onayladı): Türk Göğüs Cerrahisi Derneği e-kitapları (https://tgcd.org.tr/e-kitaplar/), ör. *Her Yönüyle Plevra ve Hastalıkları* (2018) ve *Plevranın Malign Hastalıkları*. PDF'ler büyük; `curl` ile indirip `pdftotext -layout` ile okunur. Bilgiyi kendi cümlenle yaz, sayfada kaynak göster, PDF'i depoya koyma.
- Tıbbi görüntülerde hasta bilgisi (ad, tarih, protokol no) varsa yayınlamadan önce kapat. Hasta listesi içeren fotoğrafları depoya koyma.
- İlaç dozlarında el yazısı nottaki tutarsızlıkları sayfada açıkça işaretle; dozları sessizce değiştirme.
- **Görseller:** Her konu sayfasına anlaşılırlığı artıran kendi SVG şemalarını koy (sahibi özellikle istedi). Ek olarak serbest lisanslı görseller kullanılabilir: Servier Medical Art (CC BY 4.0, `images/servier/`), OpenStax (CC BY), telifi dolmuş Gray's Anatomy (1918). Her birinin altına lisansına uygun kaynak yaz. Netter vb. telifli atlas çizimlerini kaynak gösterilse bile kullanma. (Wikimedia API bu ortamda zaman zaman 429 veriyor.)
- Video/görsel için telif: başkasının görüntülerini kopyalama; gerekiyorsa gömme ve kaynak gösterme.
