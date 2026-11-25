# Admin Shell Casayur Design

## Intent
Ganti shell Laravel starter kit pada seluruh area admin dengan shell Casayur yang konsisten dengan navbar landing.

## Goals
- Semua `/admin/*` memakai layout admin Casayur khusus.
- Desktop punya sidebar navigasi.
- Mobile punya topbar dan menu yang bisa dibuka.
- Logo memakai brand `casayur.` dengan ikon Leaf dan token warna landing.
- Navigasi tersedia untuk Dashboard, Produk, Pesanan, Laporan Penjualan, dan Logout.
- Dashboard statistik, stok rendah, dan pesanan terbaru tetap memakai data backend existing.
- Customer pages tetap memakai layout existing.

## Non-goals
- Tidak mengubah API admin, controller, middleware role, atau query statistik.
- Tidak mengubah desain halaman publik/customer.
- Tidak menambah library UI baru.
- Tidak membuat permission selain role admin yang sudah ada.

## Approach
Buat `AdminLayout` dan `AdminShell` khusus berbasis React/Inertia. `app.tsx` memilih layout ini untuk page names `Admin/*`, sehingga admin tidak lagi masuk `AppLayout` Laravel. Komponen navigasi memakai route URL existing dan `Link` Inertia. Logout memakai route logout existing.

## Visual
Desktop: sidebar fixed-width di kiri dengan logo `casayur.`, menu vertikal, dan logout di bawah. Konten memakai background landing dan surface token existing. Mobile: topbar dengan logo dan tombol menu; navigasi tampil sebagai panel sederhana saat dibuka. Tidak memakai gradient/glass berlebihan atau sidebar starter kit.

## Accessibility
- Semua menu memakai link/button semantik.
- Tombol mobile menu punya `aria-expanded` dan `aria-controls`.
- Focus ring terlihat.
- Logout tetap berupa form POST melalui route existing.
- Sidebar tidak menghalangi keyboard navigation.

## Constraints
- Gunakan Tailwind dan komponen/icon yang sudah terpasang.
- Preserve Inertia page props dan route behavior.
- Admin authorization tetap backend `EnsureAdmin`.
