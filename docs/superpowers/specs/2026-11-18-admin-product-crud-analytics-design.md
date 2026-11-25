# Admin Product CRUD and Analytics Design

## Intent
Lengkapi admin dengan CRUD produk, detail, harga, stok, upload foto, serta grafik pesanan dan omzet bulanan tanpa mengubah desain frontend publik.

## Goals
- Admin dapat create, read, update, delete produk.
- Produk memiliki nama, kategori, harga, stok, deskripsi, dan foto.
- Foto diunggah melalui Laravel Storage lokal, divalidasi jpeg/png/webp maksimal 2 MB.
- Foto lama dihapus saat diganti atau produk dihapus.
- Card dan detail produk existing membaca `description` dan `image_url` jika tersedia.
- Dashboard admin menampilkan grafik jumlah pesanan dan omzet per bulan.
- Omzet hanya menghitung order berstatus `completed`.
- UI publik existing tetap sama; hanya data dan rendering foto/deskripsi diperluas tanpa redesign.

## Non-goals
- Tidak memakai cloud storage.
- Tidak menambah dependency chart; grafik dibuat dengan CSS/SVG native.
- Tidak mengubah checkout, navbar, atau layout publik.
- Tidak mengubah aturan role admin.

## Approach
Tambahkan kolom nullable `description` dan `image_path` pada products. `ProductController` menangani validasi, upload, replacement, deletion, dan resource data. Admin product page memakai form create/edit dan table existing style. Dashboard controller mengirim agregasi 12 bulan terakhir; Dashboard.jsx menampilkan grafik SVG sederhana. Public product card/detail memakai field baru secara backward-compatible.

## Storage
Gunakan `Storage::disk('public')`, path `products/{filename}`, dan URL melalui `/storage/...`. Jalankan `php artisan storage:link` saat setup/deployment.

## Security
- Semua endpoint produk tetap di bawah auth + EnsureAdmin.
- Validasi MIME, ukuran file, angka, kategori, dan teks dilakukan server-side.
- Tidak menerima path file dari client sebagai sumber penghapusan.
- Delete hanya menghapus file yang tercatat pada produk.

## Verification
- Feature tests CRUD, validation, upload, replacement, delete, and role access.
- Dashboard aggregation test completed-only monthly data.
- Existing public product tests remain green.
- `npm run build`, `php artisan test`, and `git diff --check`.
