# Desain UI: Casayur App

## 1. Konsep Visual (Referensi: Superly Marketplace)
*   **Filosofi:** "Fresh, Honest, & Accessible". Menghindari kesan "toko kaku".
*   **Palette:**
    *   *Primary:* Hijau Muda/Segar (Representasi sayur/segar).
    *   *Accent:* Kuning hangat/Oranye lembut (Representasi semangat/keranjang).
    *   *Neutral:* Off-white (Background) & Dark Slate (Teks, agar kontras namun nyaman di mata).
*   **Tipografi:** Sans-serif bulat (Rounded) untuk kesan ramah dan modern.
*   **Elevasi:** Penggunaan *card* dengan *drop shadow* tipis untuk hierarki produk.

## 2. Komponen Utama

### A. Hero Section
*   **Layout:** *Split-screen*. Kiri: Judul & CTA utama ("Belanja Segar Harian"). Kanan: Ilustrasi 2D/3D *high-quality* sayur atau keranjang belanja.
*   **Info PO:** *Banner* kecil atau *badge* dinamis di bawah hero yang menunjukkan status PO: "PO Buka 09.00 - 12.00" (otomatis berubah warna jika di luar jam).

### B. Katalog Produk (Ready vs PO)
*   **Tampilan:** *Grid card* responsif.
*   **State Produk:**
    *   *Ready Stock:* Tombol "Tambah ke Keranjang" standar.
    *   *PO:* Tombol "Preorder" dengan indikator sisa stok PO.
*   **Hover Effect:** *Card* sedikit terangkat (*subtle lift*) untuk meningkatkan *interactivity*.

### C. Checkout & Cart (Split Logic)
*   **Cart Drawer/Page:** Otomatis mendeteksi item PO vs Ready. Tampilan keranjang dibagi dua kolom/bagian: "Siap Kirim" dan "Preorder".
*   **Checkout Form:**
    *   Input koordinat (integrasi *map* untuk validasi radius 20km).
    *   *Dynamic Pricing:* Biaya kirim otomatis muncul setelah alamat divalidasi.
    *   *COD Warning:* *Alert* halus jika memilih COD, mengarahkan verifikasi via WhatsApp.

### D. Admin Dashboard
*   **Fokus:** *High-density data*. Tabel pesanan dengan *tag* status (PO/Ready) yang mencolok.

## 3. Komponen UX Khusus
*   **PO Time-gating:** Jika di luar jam 09.00-12.00, tombol PO di semua *card* berubah menjadi *disabled* dengan *tooltip* "PO tutup".
*   **Radius Error:** *Feedback* visual saat alamat di luar 20km (tampilan *error* lembut, bukan *blocking popup* kasar).
