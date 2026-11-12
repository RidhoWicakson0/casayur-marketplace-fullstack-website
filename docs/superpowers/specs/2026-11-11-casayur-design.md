# Desain Sistem: Casayur App

## 1. Tujuan
Toko online pribadi (Sayur, Lotek, Gorengan, Sembako). Fitur: Preorder (PO) & Marketplace (Ready Stock).

## 2. Fitur Utama
*   **Katalog:** Kategori Ready & PO.
*   **Logika PO:** Aktif otomatis 09.00-12.00, stok dikurangi otomatis.
*   **Checkout & Radius:**
    *   Radius maks: 20 km.
    *   PO: Pickup (Gratis), COD (<= 5km), Delivery (<= 5km tarif standar, > 5km +2.000/km).
    *   Ready: Pickup (Gratis), Delivery (<= 3km Gratis, > 3km +2.000/km).
*   **Pembayaran:** Payment Gateway (VA, E-Wallet) & COD.
*   **Admin Dashboard:** Kelola produk, stok, pesanan, dan koordinat toko.
*   **User Flow:** React JS (Responsive), Split Order otomatis untuk PO & Ready.

## 3. Arsitektur Teknis
*   **Framework:** Laravel 12 (Backend), React JS + Inertia (Frontend).
*   **Database:** MySQL.
*   **Validasi:** Backend (Server-side) untuk jarak.

## 4. Logika Bisnis Kritis
*   **Split Order:** Jika keranjang campur PO & Ready, sistem otomatis pecah jadi 2 pesanan berbeda dengan shipping terpisah.
*   **Audit COD:** Wajib verifikasi WhatsApp/Akun untuk opsi COD guna mencegah pembatalan sepihak.

## 5. Rencana Pengerjaan (Plan)
1.  **Setup Environment:** Laravel 12 + Vite + React + Inertia (Selesai).
2.  **Database Design:** Migration users, products, orders, order_items, shipping (Selesai).
3.  **Core Backend:** Implementasi Haversine (Spatial) untuk jarak & Logic PO (09.00-12.00) (Selesai).
4.  **Frontend (React) Checkout:** Layouting & Form Checkout Dinamis (Selesai).
5.  **Admin Panel:** CRUD Product & Dashboard Order (Selesai).
6.  **Landing Page:** Hero section, Carousel, Katalog, Filter, Informasi Layanan.
7.  **Checkout & Split Logic:** Implementasi penyimpanan order dan split order PO vs Ready.
8.  **Payment/COD Integration:** Setup Midtrans & Logic verifikasi COD.

## 6. Status Development (Update Per 11 Nov 2026)
### Selesai
- Scaffolding & Setup.
- Database Schema (users, products, orders, order_items).
- Backend (Distance check, PO Time-gating, Inventory decrement).
- Checkout UI (Integration radius calculation, split summary).
- Admin Product CRUD (Index, Store).
- Admin Order Dashboard (List, Update status).

### Belum Selesai (Next Steps)
- Landing Page (Catalog, Banner, Search).
- Order Storage & Split Logic (Database persistence).
- Payment/COD Integration (Midtrans & WA Verification).
- Admin Dashboard UI/UX Refinement.

## 7. Spesifikasi Frontend Landing Page
*   **Header:** Logo Casayur, Navigasi (Home, Katalog, Status), Login/Register, Keranjang (Badge).
*   **Hero Section:** Split-screen, Carousel (Promo/Info), CTA "Belanja Sekarang", Indikator PO otomatis (PO Buka/PO Tutup).
*   **Katalog:** Tab Filter (Ready/PO), Pencarian, Grid card produk, Tombol tambah keranjang, Disable tombol PO di luar jam.
*   **Info Layanan:** Radius 20km, Jam PO 09.00-12.00, info Pickup/Delivery/COD.
*   **Footer:** Jam operasional, Kontak WhatsApp verifikasi COD, Sosial media.
*   **Interaksi:** Floating/Sticky Cart, Loading state, Empty state, Error handling radius (inline).

