# drmustafaturker-web: çalışma notları

Ass. Dr. Mustafa Türker'in (göğüs cerrahisi) kişisel/eğitim sitesi. Düz HTML, derleme adımı yok; Vercel'den yayınlanıyor.

## Yayınlama
- Site sahibi değişikliklerin **onay beklemeden doğrudan canlıya** (main dalına) gönderilmesini istedi. Değişikliği test et, commit'le, `main`'e gönder; sonra sahibine Türkçe ve sade bir dille ne yaptığını anlat.
- Göndermeden önce `git fetch origin main` yap: başka oturumlar da main'e yazıyor. Onların değişikliklerini silme; birleştir (merge), force push yapma.
- Geri alınması zor işlemlerden (dosya silme, geçmişi değiştirme) önce sor.

## Şifre koruması (bekliyor)
- `middleware.js` + `package.json` ile Vercel tabanlı şifre koruması hazırlandı (commit 553bec3), sonra ana yayından geri alındı (revert).
- Sahibi Vercel'de `SITE_USER` ve `SITE_PASSWORD` ortam değişkenlerini tanımladığını söylemeden **yayınlama**; yoksa site 503 verir. Yeniden eklemek için revert'ü geri al.

## Yapı
- `index.html`: giriş (bayrak, "Göğüs Cerrahisi", "Ass. Dr. Mustafa Türker", hamburger menü: Vaka Örnekleri, Konular).
- `pnomotoraks.html`, `akciger-grafileri.html`: vaka ve konu sayfaları. `images/`: anonimleştirilmiş görüntüler.
- Kök PWA "Göğüs Cerrahisi": `manifest.webmanifest`, `sw.js`, `icons/`.
- `pediatri/`: sahibinin eşi (Ass. Dr. Merve Türker) için ayrı PWA "Pediatri" (ilaç dozları, kiloya göre hesaplama). Ana menüde **gösterilmiyor** ama silinmemeli; geliştirilmeye devam ediyor. `pediatri-ilac-dozlari.html` eski adres yönlendirmesi.
- Görsel dil: arka plan #edf2f5, lacivert #1f3a52, bayrak kırmızısı #E30A17; kartlar beyaz, yuvarlak köşe.

## İçerik kuralları
- Konu sayfaları için ana kaynak: `notlar/hilmi-keskin-video-notlari.md` (Dr. Hilmi Keskin YouTube kanalı notları/transkriptleri; sahibi bu bilgilerin kullanılmasını istedi). Kendi cümlelerinle yaz, otomatik altyazı hatalarını düzelt, sayfada kaynağı belirt; ham transkripti yayınlama. `notlar/` ve `CLAUDE.md` yayına dahil edilmez (`.vercelignore`, `.assetsignore`).
- Tıbbi görüntülerde hasta bilgisi (ad, tarih, protokol no) varsa yayınlamadan önce kapat. Hasta listesi içeren fotoğrafları depoya koyma.
- İlaç dozlarında el yazısı nottaki tutarsızlıkları sayfada açıkça işaretle; dozları sessizce değiştirme.
- Video/görsel için telif: başkasının görüntülerini kopyalama; gerekiyorsa gömme ve kaynak gösterme.
