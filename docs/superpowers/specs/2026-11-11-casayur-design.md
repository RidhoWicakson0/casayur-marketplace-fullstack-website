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
1.  **Setup Environment:** Laravel 12 + Vite + React + Inertia.
2.  **Database Design:** Migration users, products, orders, order_items, shipping.
3.  **Core Backend:** Implementasi Haversine (Spatial) untuk jarak & Logic PO (09.00-12.00).
4.  **Frontend (React):** Layouting & Form Checkout Dinamis.
5.  **Payment/COD Integration:** Setup Midtrans & Logic verifikasi COD.
6.  **Admin Panel:** CRUD Product & Dashboard Order.
