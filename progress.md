# Progress Casayur Visual Refresh

## Tanggal: 13 November 2026

### Selesai

- [x] Refresh Hero landing page dengan font dan token Casayur.
- [x] Tambah carousel produk berbasis `embla-carousel-react`.
- [x] Ubah navbar:
  - [x] Menu Produk, Pesanin, Layanan, Tentang.
  - [x] Theme toggle satu ikon.
  - [x] Avatar dropdown.
  - [x] Background navbar solid.
- [x] Tambah section Layanan dengan lima layanan:
  - [x] Pre-Order (PO).
  - [x] Jangkauan Pengiriman.
  - [x] Gratis Ongkir 5 KM.
  - [x] Pesanin.
  - [x] Pembayaran Fleksibel.
- [x] Hapus `ServiceLedger` dari landing page.
- [x] Tambah section Tentang Casayur dengan penjelasan singkat.
- [x] Tambah `community-testimonial.tsx` dengan animasi testimonial horizontal.
- [x] Hapus testimonial lama dari landing page.
- [x] Refresh footer landing page.
- [x] Hapus section Cara Pesan dari landing page.
- [x] Pertahankan `how-to-order.tsx` untuk penggunaan halaman lain.
- [x] Verifikasi `npm run build` sukses.
- [x] Commit perubahan:
  - `b8512f1 feat: refresh footer and remove order guide`
  - `52600df feat: add landing page visual refresh`

## Status Saat Ini

- Working tree terakhir sudah bersih setelah commit.
- Footer baru memakai struktur brand, navigasi, bantuan, kontak, dan copyright.
- Landing page tidak lagi menampilkan section `#cara-pesan`.
- Testimonial tampil di bawah penjelasan Tentang dalam section `#tentang`.

## Perlu Dilanjutkan

- Review visual di browser pada desktop dan mobile.
- Uji theme toggle dan avatar dropdown secara manual.
- Pastikan Vite aktif pada port yang benar sebelum browser refresh.
