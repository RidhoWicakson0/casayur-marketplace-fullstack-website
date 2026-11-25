# Casayur Auth Design

## Intent
Perbaiki bug login, buat register konsisten dengan desain Casayur, dan hapus identitas logo Laravel dari alur auth.

## Goals
- Login admin email/password langsung ke `/admin`.
- Login customer tetap memakai alur customer existing.
- Register memakai layout visual Casayur yang sama dengan login.
- Google hanya tersedia untuk customer.
- Tampilkan error validasi dan status proses dengan benar.
- Ganti `AppLogoIcon` auth dengan mark Casayur.
- Pertahankan Fortify/Inertia untuk CSRF, validasi, rate limit, dan session.

## Non-goals
- Tidak mengganti backend Fortify.
- Tidak membuat auth handler manual.
- Tidak mengubah desain dashboard, checkout, atau halaman publik lain.
- Tidak mengaktifkan Google untuk admin.

## Approaches
1. Satu desain auth Casayur: pertahankan Fortify/Inertia, buat login/register custom, ganti logo bersama. Dipilih karena perubahan kecil dan risiko auth rendah.
2. Auth frontend manual: ditolak karena menduplikasi keamanan Fortify.
3. Hanya ganti warna/logo: ditolak karena register masih tidak konsisten.

## Design
Login dan register memakai layout responsive dengan panel branding Casayur di desktop dan card form di semua ukuran. Komponen submit tetap memakai route Fortify/Inertia existing. Login menyediakan email, password, remember me, reset password, Google customer, dan register link. Register menyediakan nama, email, password, konfirmasi password, Google customer, dan login link.

Admin login ditentukan backend berdasarkan `users.role`; frontend tidak menerima atau mengirim role. Admin diarahkan ke `/admin` oleh `LoginResponse`. Customer Google callback tidak boleh menerima role dari request.

Logo memakai SVG mark Casayur sederhana tanpa aset atau teks Laravel. Komponen logo bersama dipakai pada auth layout dan area login/register.

## Constraints
- UI existing selain auth tetap.
- Keyboard focus, label, error, loading, reduced motion, dan responsive layout harus dipertahankan.
- Password tidak pernah ditampilkan atau disimpan frontend.

## Verification
- Feature tests login/register dan role redirect.
- Build frontend.
- `git diff --check`.
- Audit referensi logo Laravel dan route auth.
