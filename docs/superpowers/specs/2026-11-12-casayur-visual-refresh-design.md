# Casayur Visual Refresh Design

## Intent

Casayur adalah toko sayur, lotek, gorengan, dan sembako untuk rumah di radius 20 km. Ada dua ritme belanja: Ready Stock yang bisa langsung dipesan, dan Preorder yang hanya terbuka 09.00 sampai 12.00 WIB.

Desain yang ada sekarang sudah lengkap secara fitur, tetapi bahasa visualnya masih mengikuti pola landing page AI yang umum: hero tengah setinggi 80vh, badge pil di atas judul, CTA pil, marquee gambar miring, empat kartu layanan identik, rating dan testimoni yang dibuat-buat, serta tombol tambah-ke-keranjang yang hanya muncul saat hover. Beberapa kontrol juga mati: CTA hero mengabaikan `onCtaClick`, tombol favorit tidak menyimpan apa pun, dan checkout memakai `alert()`.

Refresh ini memberi Casayur identitas yang berasal dari subjeknya sendiri, yaitu papan warung pagi dan ritme preorder, lalu memaksimalkan animasi yang punya fungsi. Hasilnya harus terasa seperti warung sayur yang rapi dan tepercaya, bukan templat SaaS.

## Why now

`DESIGN.md` belum berisi arah desain. `SKILLS.md` meminta arah yang spesifik, tipografi yang dipilih dengan alasan, motion yang tidak tersebar, dan bukti nyata. Dokumen ini mencatat arah yang hilang itu dan keputusan yang mengikutinya.

## Goals

- Memberi identitas visual yang tidak bisa ditukar dengan produk lain hanya dengan mengganti logo.
- Membuat katalog terlihat cepat setelah halaman dibuka.
- Mengganti motion dekoratif dengan satu momen muat halaman, satu marquee terkontrol, dan umpan balik interaksi yang punya fungsi.
- Menghapus bukti sosial fiktif, rating palsu, dan kontrol mati.
- Menyatukan bahasa visual landing page dan checkout.
- Menjaga semua klaim tetap faktual: jam PO, radius, ongkir, stok.
- Menyatukan keranjang landing page dan checkout lewat state front-end yang persisten.
- Menyelaraskan perhitungan ongkir dan kelayakan COD di backend dengan aturan yang ditampilkan.

## Non-goals

- Tidak menambah payment gateway. Pembayaran non-COD tetap dikonfirmasi manual, dan itu ditulis apa adanya.
- Tidak mengerjakan persistensi order atau split order ke database.
- Tidak menambah library animasi baru.
- Tidak membuat testimonials, rating, atau foto produk palsu.
- Tidak merombak halaman admin pada iterasi ini.
- Tidak menghapus komponen lama yang mungkin masih dipakai halaman lain. Komponen lama berhenti diimpor, bukan dihapus.

## Anti-goals

- Hero tengah dengan badge pil di atas judul, judul besar, satu CTA pil, dan marquee dekoratif.
- Semua elemen berbentuk pil dan semua kartu berukuran sama.
- Animasi infinite yang tidak bisa dijeda dan mengabaikan `prefers-reduced-motion`.
- Testimoni dengan nama, wajah, atau jabatan yang direkayasa.
- Aksi penting yang hanya bisa dijangkau lewat hover.
- Hero yang mendorong katalog lebih dari satu layar.

## Constraints

- Laravel 12, Inertia, React 19, Tailwind CSS v4, Vite.
- Alias `@/` sudah dipakai. Komponen baru mengikuti alias itu.
- Jam PO adalah 09.00 sampai 12.00 WIB, bukan UTC.
- Radius maksimal 20 km.
- Ongkir PO: pickup gratis, delivery sampai 5 km gratis, di atas 5 km dikenakan Rp2.000 per km kelebihan.
- Ongkir Ready: pickup gratis, delivery sampai 3 km gratis, di atas 3 km dikenakan Rp2.000 per km kelebihan.
- COD tersedia sampai 5 km untuk PO dan Ready. Batas 5 km untuk Ready adalah keputusan builder karena spec hanya menyebut COD PO. COD wajib dikonfirmasi lewat WhatsApp.
- Tema terang dan gelap harus sama-sama berfungsi. Mode sistem juga tersedia.
- Motion non-esensial berhenti saat `prefers-reduced-motion: reduce`.

## Approaches

1. **Poles permukaan.** Ganti font dan warna, perbaiki bug, tambah micro-interaction. Risiko paling kecil, tetapi struktur generik tetap terasa.
2. **Rombak terarah.** Pertahankan struktur informasi, ganti bahasa visual dengan identitas papan warung pagi, perbaiki kontrol mati dan konten palsu, lalu satukan checkout. Menyentuh lebih banyak file, tetapi hasilnya koheren. **Dipilih.**
3. **Eksperimen total.** Struktur baru dengan narasi scroll dan section pinned. Paling dramatis, tetapi berisiko mendorong katalog jauh ke bawah dan membuat motion berat.

## Design Direction

### Identity

Arahnya adalah **papan warung pagi**: papan pengumuman kecil di depan warung yang menuliskan apa yang tersedia hari ini, jam preorder, dan jangkauan antar. Strukturnya informatif, bukan dekoratif. Garis tipis dipakai seperti garis buku catatan, label harga terasa seperti kertas tag, dan ilustrasi produk digambar sendiri sebagai tanda kategori, bukan foto stok yang menyamar sebagai produk asli.

Yang membuatnya khas Casayur:

- Papan PO sebagai elemen utama hero, bukan badge kecil.
- Ilustrasi garis sayur, lotek, gorengan, dan sembako sebagai penanda kategori.
- Angka dan ongkir ditampilkan seperti struk warung, dengan angka tabular.
- Warna kunyit hanya dipakai untuk hal yang memang mendesak: PO dan status tutup.

### Dials

| Dial | Nilai | Alasan |
|---|---|---|
| ENERGY | 2 | Cukup percaya diri untuk terasa seperti warung yang hidup, tidak sampai seperti portofolio agency. |
| RHYTHM | 3 | Hero asimetris, katalog grid, layanan berbentuk buku catatan, dan cara pesan berbentuk urutan. Setiap section punya komposisi berbeda. |
| MOTION | 2 | Satu momen muat halaman, satu marquee lambat, dan umpan balik saat pengguna bertindak. Tidak ada parallax atau animasi yang berjalan tanpa alasan. |

### Palette

| Token | Light | Dark | Fungsi |
|---|---|---|---|
| `--paper` | `#F3F7F1` | `#0E1511` | Latar halaman, hijau pucat seperti kertas sayur |
| `--surface` | `#FFFFFF` | `#141D17` | Kartu, papan, dan panel |
| `--ink` | `#17231B` | `#EDF4EE` | Teks utama |
| `--muted-ink` | `#5A6B5E` | `#9DB0A2` | Teks sekunder |
| `--leaf` | `#1F6B47` | `#6FC596` | Aksi utama dan identitas |
| `--leaf-deep` | `#145033` | `#3E8F63` | Hover dan bidang gelap |
| `--turmeric` | `#D4931F` | `#F0B64B` | Hanya PO, urgensi, dan status tutup |
| `--line` | `#D6E0D2` | `#26342A` | Garis dan border |
| `--danger` | `#B3402C` | `#E07A63` | Error dan pembatalan |

Aturan pakai: hijau adalah aksi, kunyit adalah waktu, merah hanya kesalahan. Tidak ada gradient dekoratif. Tidak ada glow.

### Typography

- **Display: Bricolage Grotesque Variable.** Dipilih karena bentuknya organik dan sedikit tidak rapi, cocok untuk warung segar, tetapi tetap tegas untuk angka dan judul besar. Bukan Inter, Geist, atau Space Grotesk.
- **Body dan UI: Instrument Sans Variable.** Netral, ramah, dan sangat terbaca di ukuran kecil. Dipakai untuk label, tombol, tabel, dan paragraf.
- **Angka:** Instrument Sans dengan `font-variant-numeric: tabular-nums` untuk harga, ongkir, dan struk.

Skala:

| Peran | Ukuran | Line height | Tracking |
|---|---|---|---|
| Display besar | `clamp(2.75rem, 6vw, 4.5rem)` | 0.98 | `-0.035em` |
| Judul section | `clamp(1.9rem, 3.4vw, 2.75rem)` | 1.05 | `-0.025em` |
| Judul kartu | `1.125rem` | 1.25 | `-0.01em` |
| Body | `1rem` | 1.6 | `0` |
| Label kecil | `0.8125rem` | 1.35 | `0.01em` |

Tidak ada label ALL CAPS dengan tracking lebar. Tidak ada eyebrow dekoratif di atas setiap judul.

### Layout

- Lebar konten maksimum 1200 px, gutter `clamp(20px, 5vw, 48px)`.
- Header 64 px, sticky, tanpa blur kaca.
- Hero dua kolom 7/5, tinggi `clamp(520px, 64vh, 640px)`. Katalog mulai terlihat di layar pertama pada desktop.
- Katalog grid 2 kolom di ponsel, 3 di tablet, 4 di desktop.
- Layanan berbentuk daftar bergaris, bukan empat kartu identik.
- Cara pesan berbentuk urutan tiga langkah, karena isinya memang berurutan.
- Footer ringkas dengan jam, WhatsApp, radius, dan tautan yang benar-benar ada.

Wireframe kasar:

```
┌──────────────────────────────────────────────────────────┐
│ casayur.   Katalog  Layanan  Cara pesan   [PO buka]  cart │
├──────────────────────────────────────────────────────────┤
│ Sayur segar untuk dapur hari ini.   │  Papan hari ini     │
│ Pilih ready stock atau preorder     │  09.00 - 12.00      │
│ antara 09.00 dan 12.00.             │  Radius 20 km       │
│ [Lihat etalase hari ini]            │  Ongkir mulai ...   │
│                                     │  ┌──┬──┬──┬──┐      │
│                                     │  │daun│lotek│...│   │
├──────────────────────────────────────────────────────────┤
│ Etalase hari ini            [Semua][Ready][Preorder]  🔎 │
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐                              │
│ │produk│ │produk│ │produk│ │produk│                        │
│ └────┘ └────┘ └────┘ └────┘                              │
├──────────────────────────────────────────────────────────┤
│ Papan layanan: jam PO, radius, ongkir, pickup/COD         │
├──────────────────────────────────────────────────────────┤
│ Cara pesan: 1 Pilih  2 Cek alamat  3 Bayar                │
├──────────────────────────────────────────────────────────┤
│ Footer                                                    │
└──────────────────────────────────────────────────────────┘
```

### Components

**Header**

- Wordmark teks `casayur.` dengan tanda daun kecil dari SVG, bukan logo asumsi.
- Navigasi hanya ke section yang ada: `#katalog`, `#layanan`, `#cara-pesan`.
- Status PO berupa teks dan titik warna, bukan pil dekoratif.
- Keranjang dengan jumlah yang terbaca pembaca layar.
- Akun: tautan Masuk dan Daftar yang selalu terlihat, bukan dropdown hover.
- Pemilih tema tiga mode memakai `useAppearance` yang sudah ada.

**Keranjang**

- Satu `CartProvider` di level aplikasi menyimpan item `{ productId, name, category, price, qty }` di `localStorage`.
- Badge header, ringkasan di landing page, dan halaman checkout membaca state yang sama.
- Menambah produk yang sama menaikkan `qty`, bukan menduplikasi baris.
- Item PO dan Ready dipisah saat dihitung, tanpa mengubah urutan item.
- Keranjang kosong menampilkan ajakan kembali ke etalase, bukan angka nol yang menggantung.

**Hero**

- Kiri: judul, satu paragraf, CTA utama `Lihat etalase hari ini`, CTA sekunder `Cara pesan`.
- Kanan: Papan PO berisi status buka/tutup, jam, radius, dan ringkasan ongkir.
- Di bawah papan: strip ilustrasi kategori yang bergerak lambat.
- Tidak ada badge pil di atas judul. Tidak ada animasi per kata.

**Product card**

- Penanda kategori berupa ilustrasi SVG asli, bukan foto stok.
- Nama, harga, stok, dan label kategori.
- Tombol `Tambah ke keranjang` selalu terlihat, termasuk di perangkat sentuh.
- Untuk PO di luar jam: tombol nonaktif dengan alasan tertulis di kartu, bukan tooltip.
- Tidak ada rating, jumlah ulasan, atau tombol favorit.
- Tidak ada overlay yang menutupi tombol saat hover.

**Layanan**

- Satu papan bergaris dengan empat baris: jam PO, radius, aturan ongkir, pickup/COD.
- Angka dan aturan ditulis faktual, bukan slogan.

**Cara pesan**

- Tiga langkah nyata: pilih produk, cek alamat, konfirmasi pesanan.
- Nomor dipakai karena urutannya nyata.
- Menggantikan section testimoni fiktif.
- Langkah ketiga menyebut COD lewat WhatsApp bila memenuhi radius, dan konfirmasi manual untuk pembayaran lain. Tidak ada klaim payment gateway.

**Checkout**

- Header dan token yang sama dengan landing page.
- Ringkasan keranjang bergaya struk, dengan subtotal Ready dan PO terpisah.
- Pilihan metode: ambil di warung (gratis) atau delivery (ongkir dihitung per kategori).
- COD hanya bisa dipilih bila jarak maksimal 5 km untuk kedua kategori. Di luar itu, pilihan COD nonaktif dengan alasan tertulis.
- Validasi inline, tanpa `alert()`.
- Menampilkan produk dari controller, bukan array kosong.
- Tombol checkout menjelaskan apa yang terjadi: `Buat pesanan`, lalu hasilnya ditampilkan sebagai pesan sukses atau error di halaman.

### Motion

- **Muat halaman:** header turun 8 px, tiga elemen hero naik 10 px, papan PO muncul dengan scale 0.98 ke 1. Total 600 ms, stagger 60 ms, ease-out. Hanya sekali.
- **Marquee:** strip ilustrasi kategori bergerak 50 detik per loop. Berhenti saat hover atau fokus. Berhenti total saat reduced motion.
- **Kartu produk:** naik 2 px dan border menguat saat hover. Ilustrasi berotasi 2 derajat. Tidak ada shadow besar.
- **Tambah ke keranjang:** angka keranjang membesar 1.15 lalu kembali, tombol menampilkan centang selama 1.2 detik.
- **Tema:** transisi warna 150 ms. Tidak ada animasi layout.
- **Reduced motion:** semua transisi non-esensial menjadi 0 ms, marquee statis.

### Content Rules

- Tidak ada testimoni, rating, jumlah ulasan, atau statistik tanpa sumber.
- Ilustrasi produk adalah penanda kategori, bukan klaim foto produk asli.
- Status PO diambil dari server, bukan jam perangkat.
- CTA menyebut tindakan: `Lihat etalase hari ini`, `Tambah ke keranjang`, `Cek ongkir`.
- Error menjelaskan apa yang salah dan cara memperbaikinya.
- Empty state mengajak bertindak, bukan sekadar kosong.

### Accessibility

- Skip link ke konten utama.
- Semua kontrol memakai elemen native (`button`, `a`, `input`, `select`) dengan nama aksesibel.
- Fokus terlihat dengan ring hijau 2 px dan offset 2 px.
- Target sentuh minimal 44 px.
- Kontras teks minimal 4.5:1, teks besar minimal 3:1.
- Status tidak disampaikan lewat warna saja, selalu ada teks.
- Gambar dekoratif memakai `alt=""`, ilustrasi bermakna punya label.
- Motion menghormati `prefers-reduced-motion`.

### Responsive

- 360 px: header menyusut, nav menjadi menu ringkas, hero satu kolom, papan PO di bawah teks, katalog dua kolom.
- 640 px: katalog tiga kolom, filter dan pencarian sejajar.
- 1024 px: hero dua kolom, katalog empat kolom, papan layanan dua kolom.
- Tidak ada overflow horizontal di semua breakpoint.

## Technical Decisions

- Font memakai mekanisme `fonts` yang sudah ada di `vite.config.ts` lewat `bunny()`. Instrument Sans sudah terpasang di konfigurasi; Bricolage Grotesque ditambahkan ke daftar yang sama. `@fonts` di Blade menyajikan berkas font, jadi tidak ada permintaan font ke pihak ketiga saat runtime.
- Token warna dan tipografi ditulis sebagai CSS variable di `resources/css/app.css`, lalu dipetakan ke `@theme`.
- Tema memakai hook `useAppearance` yang sudah ada, bukan state lokal baru.
- `LandingController` mengirim `poOpen` dan `serverTime` agar papan PO tidak bergantung pada jam perangkat.
- `config/app.php` memakai zona waktu `Asia/Jakarta`. Tes PO yang sudah ada tetap memakai `Carbon::parse` sehingga tidak berubah.
- `OrderService` menjadi sumber tunggal untuk jam PO dan ongkir. Method baru: `shippingCost(string $category, float $distanceKm, string $method): int` dan `codAvailable(float $distanceKm): bool`.
- Aturan `shippingCost`: pickup selalu 0. Ready delivery menghitung kelebihan di atas 3 km. PO delivery menghitung kelebihan di atas 5 km. Tarif Rp2.000 per km kelebihan, dibulatkan ke rupiah terdekat.
- `codAvailable` mengembalikan `true` untuk jarak maksimal 5 km, untuk kedua kategori. Batas ini adalah keputusan builder karena spec hanya menyebut COD PO.
- `CheckoutController` mendapat method `index` yang mengirim produk, dan route `/checkout` diarahkan ke method itu.
- `CheckoutController@calculate` menerima `items`, `lat`, `lng`, dan `method` (`pickup` atau `delivery`). Respons berisi jarak, ongkir per kategori, total ongkir, dan `cod_available`.
- Ilustrasi kategori diturunkan dari nama produk lewat peta kata kunci di front-end: sayur, lotek, gorengan, sembako. Tidak ada perubahan skema. Nama yang tidak cocok memakai tanda daun netral.
- `CartProvider` ditempatkan di `resources/js/contexts/cart-context.tsx` dan dipasang di `app.tsx`.
- Komponen baru ditempatkan di `resources/js/components/casayur/`.
- Komponen lama `hero-3`, `product-reveal-card`, `stagger-testimonials`, `fluid-dropdown`, dan `service-bento` tidak dihapus. Setelah tidak diimpor, file itu tetap ada sebagai arsip sampai pemilik memutuskan.

## Files

- `resources/css/app.css`
- `resources/js/app.tsx`
- `resources/js/contexts/cart-context.tsx`
- `resources/js/pages/welcome.tsx`
- `resources/js/pages/Checkout.jsx`
- `resources/js/components/casayur/site-header.tsx`
- `resources/js/components/casayur/po-board.tsx`
- `resources/js/components/casayur/produce-mark.tsx`
- `resources/js/components/casayur/produce-marquee.tsx`
- `resources/js/components/casayur/product-card.tsx`
- `resources/js/components/casayur/service-ledger.tsx`
- `resources/js/components/casayur/how-to-order.tsx`
- `resources/js/components/casayur/site-footer.tsx`
- `app/Http/Controllers/LandingController.php`
- `app/Http/Controllers/CheckoutController.php`
- `app/Services/OrderService.php`
- `config/app.php`
- `routes/web.php`
- `vite.config.ts`
- `tests/Unit/POAvailabilityTest.php`
- `tests/Unit/ShippingCostTest.php`
- `tests/Feature/CheckoutPageTest.php`
- `docs/superpowers/specs/2026-11-12-casayur-visual-refresh-design.md`
- `DESIGN.md`

## Verification

- `npm run build` berhasil tanpa error TypeScript atau JSX.
- `php artisan test tests/Feature/LandingPageTest.php` lulus.
- `php artisan test tests/Unit/POAvailabilityTest.php` lulus.
- `php artisan test tests/Unit/ShippingCostTest.php` lulus.
- `php artisan test tests/Feature/CheckoutPageTest.php` lulus.
- Cek manual di browser: tema terang, gelap, sistem, keyboard, reduced motion, lebar 360 px, 768 px, dan 1440 px.
- Cek konsol browser tanpa error.
- Setiap kontrol diklik satu per satu: nav, CTA hero, filter, pencarian, tambah keranjang, badge keranjang, tema, tautan checkout, pilihan pickup/delivery, pilihan COD, tombol checkout.
- Verifikasi angka ongkir dengan tiga kasus: Ready 2 km (0), Ready 5 km (Rp4.000), PO 7 km (Rp4.000).
- Verifikasi COD nonaktif di 6 km dan aktif di 4 km.
- Screenshot sebelum dan sesudah untuk perbandingan.

## Left to the Builder

- Bentuk akhir ilustrasi SVG untuk empat kategori.
- Variasi mikrocopy yang tetap memenuhi aturan konten.
- Apakah perlu seeder produk contoh untuk verifikasi lokal. Ini bukan bagian dari deliverable.
- Nilai easing dan durasi akhir boleh disesuaikan selama tetap dalam dial MOTION 2.

## Known Risks

- Dua variable font menambah ukuran aset. Hanya dua keluarga, tanpa varian italic.
- Checkout masih bergantung pada backend yang belum menyimpan order. Refresh ini memperbaiki tampilan, validasi, ongkir, dan kelayakan COD, bukan persistensi order.
- Keranjang di `localStorage` tidak tersinkron antar perangkat dan bisa hilang bila penyimpanan dibersihkan. Untuk toko satu perangkat, ini cukup.
- Menghapus testimoni akan mengurangi panjang halaman. Itu disengaja karena bukti asli belum ada.
- Batas COD Ready 5 km adalah keputusan builder. Pemilik bisa mengubahnya tanpa mengubah struktur UI.
- `DESIGN.md` harus diperbarui agar arah ini tidak hilang di sesi berikutnya.
