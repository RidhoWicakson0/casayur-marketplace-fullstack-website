# Admin Dashboard Visual Refresh

## Intent
Gunakan referensi dashboard collapsible sidebar untuk membuat area admin Casayur lebih hidup, tanpa mengubah desain frontend customer/public.

## Goals
- Admin shell memiliki sidebar desktop yang dapat collapse.
- Mobile tetap memiliki topbar dan menu.
- Dashboard memakai stat cards, activity panel, quick stats, dan grafik existing.
- Warna mengikuti token landing page Casayur: `paper`, `surface`, `ink`, `leaf`, `leaf-deep`, `turmeric`, dan `line`.
- Navigasi tetap terhubung ke route admin existing.
- Data tetap berasal dari Laravel/Inertia; tidak ada data dummy atau random value.

## Non-goals
- Tidak mengubah halaman landing, produk publik, detail produk, checkout, auth, navbar customer, atau footer.
- Tidak mengganti backend, route, query, atau authorization admin.
- Tidak menambah dependency chart atau UI.
- Tidak memakai warna biru/abu generik dari referensi.

## Approach
Refactor `resources/js/layouts/admin/admin-shell.tsx` menjadi shell admin collapsible dengan state lokal, active route styling, account section, theme toggle, dan logout. Refactor halaman admin dashboard untuk visual hierarchy referensi sambil mempertahankan props statistik, monthly, recent orders, dan low stock. Produk, pesanan, dan laporan hanya menerima styling admin token bila diperlukan.

## Visual tokens
Light: `--paper #f3f7f1`, `--surface #ffffff`, `--ink #17231b`, `--leaf #1f6b47`, `--leaf-deep #145033`, `--turmeric #d4931f`, `--line #d6e0d2`.
Dark: gunakan token dark mode existing.

## Accessibility
Sidebar toggle memiliki `aria-expanded` dan `aria-controls`. Semua navigasi memakai link semantik. Tombol dan link memiliki focus ring leaf. Mobile menu tetap keyboard accessible. Contrast mengikuti token existing.

## Verification
`npm run build`, full Laravel test suite, and `git diff --check`. Review diff untuk memastikan file public/customer tidak berubah.
