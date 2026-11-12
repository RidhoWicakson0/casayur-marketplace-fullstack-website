# Desain UI: Casayur App

## 1. Konsep Visual (Referensi: Superly Marketplace)
*   **Filosofi:** "Fresh, Honest, & Accessible". Desain *clean*, *open*, dengan *whitespace* yang luas untuk kenyamanan visual.
*   **Palette:**
    *   *Primary:* Hijau Muda/Segar (`#10B981` atau setara).
    *   *Accent:* Oranye lembut (`#F59E0B`) untuk *urgency* PO.
    *   *Neutral:* Off-white (`#FDFDFC`) untuk background, Dark Slate (`#1E293B`) untuk teks utama agar keterbacaan tinggi.
*   **Tipografi:** *Sans-serif* dengan sudut *rounded* (Inter atau Instrument Sans) untuk kesan ramah dan modern.
*   **Sistem Spasi:** Skala konsisten (4px/8px *spacing rhythm*) untuk menjaga keseragaman layout.
*   **Elevasi:** *Card* menggunakan *border* halus dan *drop shadow* sangat tipis (*subtle*) untuk kedalaman visual tanpa kesan berat.

## 2. Komponen Utama
### A. Hero Section
*   **Layout:** *Split-screen* responsif. Kiri: Judul & CTA utama. Kanan: Ilustrasi 2D/3D *high-quality*.
*   **Carousel:** Banner dinamis untuk promo, status PO, dan informasi radius.
*   **Info PO:** *Badge* status dinamis: "PO Buka 09.00 - 12.00" (hijau) atau "PO Tutup" (abu-abu/merah).

### B. Katalog Produk & Discovery
*   **Search & Filter:** *Search bar* menonjol, filter kategori menggunakan *horizontal scrollable pills*.
*   **Product Card:**
    *   Visual: Gambar dengan *aspect-ratio* seragam.
    *   Kategori: *Badge* semi-transparan.
    *   Interaksi: *Card lift* saat *hover*, tombol *Add to Cart* dengan *loading state*.
*   **Empty State:** Ilustrasi ramah saat hasil pencarian tidak ditemukan atau keranjang kosong.

### C. Checkout & Cart
*   **Floating/Sticky Cart:** Ikon keranjang dengan *badge* jumlah yang selalu terlihat atau *drawer* akses cepat.
*   **Pemisahan:** Otomatis deteksi "Siap Kirim" vs "Preorder" dengan subtotal terpisah.
*   **Form Dinamis:** Input koordinat dengan validasi *inline* (radius 20km).
*   **Trust Signals:** *Alert* halus verifikasi WhatsApp untuk COD, bukan *popup* kasar.

### D. Micro-interactions & Accessibility
*   **Loading:** *Skeleton screen* untuk katalog produk sebelum data dimuat.
*   **Feedback:** *Toast notification* (bukan *alert* browser) untuk aksi sukses (tambah keranjang, update status).
*   **State:** Status *disabled* untuk tombol PO di luar jam operasional dengan *tooltip* penjelas.
*   **Responsiveness:** Mobile-first, *touch-friendly* untuk elemen *click*.
