# Google Login Before Cart Actions

## Intent
Customer wajib login Google sebelum `Tambah ke keranjang` atau `Beli sekarang` dari detail produk. Setelah OAuth selesai, aksi awal dilanjutkan otomatis.

## Flow

```text
ProductDetail action
→ cek authenticated user
→ guest: simpan pending action + product ID di session
→ redirect Google OAuth
→ callback customer login
→ ambil pending action
→ add to cart / redirect checkout
```

## Goals
- Guest tidak dapat menambah item atau membeli langsung tanpa login.
- Admin tetap tidak mendapat role dari Google OAuth.
- Login Google customer existing tetap dipakai.
- Pending action hanya dipakai sekali lalu dihapus.
- `Beli sekarang` berakhir di checkout; `Tambah ke keranjang` kembali ke detail dengan item tersimpan.

## Constraints
- Gunakan session Laravel dan route existing.
- Jangan menambah dependency.
- Jangan mengubah desain publik selain state/error login bila perlu.
- Cart saat ini client-side; callback perlu mengirim sinyal pending action ke frontend atau menjalankan aksi server-side yang kompatibel.

## Approach
Gunakan endpoint backend untuk memulai action. Endpoint mengecek auth, menyimpan `product_id` dan `action` ke session untuk guest, lalu redirect ke Google. Callback menyelesaikan login customer dan redirect ke URL continuation. Frontend membaca continuation dan menjalankan aksi sekali. Backend memvalidasi product ID dan action sebelum menyimpan session.

## Non-goals
- Mengubah checkout guest policy di luar action detail.
- Membuat akun admin lewat Google.
- Mengganti cart architecture.

## Acceptance
- Guest klik tambah keranjang → Google login → item masuk cart satu kali.
- Guest klik beli sekarang → Google login → item masuk cart satu kali → `/checkout`.
- User login klik aksi → aksi berjalan tanpa OAuth.
- OAuth gagal/cancel → kembali aman tanpa item palsu.
- Admin OAuth tetap customer-only.
