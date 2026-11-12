# Casayur Controlled Marquee Hero Design

## Intent

Buat hero landing page Casayur yang mengikuti referensi `hero-3`, tetapi tetap terasa seperti marketplace: produk dan katalog tetap mudah ditemukan, motion tidak mengganggu, dan tema visual mendukung terang, gelap, serta sistem.

## Goals

- Tampilkan status PO, pesan utama Casayur, deskripsi singkat, dan CTA nyata menuju katalog.
- Tampilkan strip marquee gambar produk lokal di bawah hero.
- Gunakan motion lambat dan terkontrol.
- Hormati `prefers-reduced-motion`.
- Pertahankan katalog, service highlights, footer, dan data produk yang sudah ada.
- Sediakan pilihan tema Terang, Gelap, dan Sistem.
- Pastikan keyboard focus, alt text, dan responsive layout tetap benar.

## Non-goals

- Tidak membuat landing page video penuh.
- Tidak memindahkan katalog ke halaman lain.
- Tidak menambah state management atau dependency baru selain dependency motion yang sudah terpasang.
- Tidak memakai gambar demo 21st yang tidak relevan dengan Casayur.

## Anti-goals

- Marquee cepat atau memenuhi seluruh viewport.
- Animasi tanpa fungsi.
- CTA mati.
- Hero yang mendorong katalog terlalu jauh ke bawah.
- Duplikasi komponen UI pada folder yang tidak dipakai alias proyek.

## Approaches

1. **Marquee penuh** — paling dekat dengan demo, tetapi terlalu dominan dan mengurangi akses cepat ke katalog.
2. **Marquee terkontrol** — strip gambar pendek di bawah hero, gerak lambat, pause saat interaksi, nonaktif saat reduced motion. Dipilih karena menjaga karakter referensi tanpa merusak UX marketplace.
3. **Hero statis** — paling stabil, tetapi tidak memenuhi permintaan visual marquee.

## Implementation

- Komponen hero ditempatkan pada `resources/js/components/ui/hero-3.tsx`, mengikuti alias `@/*` proyek.
- Integrasi dilakukan di `resources/js/pages/welcome.tsx`.
- Hero menerima data gambar relevan Casayur dan callback CTA menuju `#katalog`.
- Marquee menggunakan `framer-motion`; reduced motion menghapus perpindahan kontinu.
- Tema memakai state lokal `system | light | dark` dan `matchMedia('(prefers-color-scheme: dark)')` untuk mode sistem.
- Style memakai token/palet Casayur yang sudah ada, bukan warna merah demo.
- Gambar memiliki `alt`, ukuran eksplisit, dan loading yang sesuai.

## Verification

- `npm run build`
- `php artisan test tests/Feature/LandingPageTest.php`
- `git diff --check`
- Inspeksi manual responsive, keyboard focus, theme modes, hover/focus marquee, dan reduced motion.
