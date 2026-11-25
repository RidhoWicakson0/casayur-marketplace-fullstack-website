# Admin Role and Google Login Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans or superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox syntax.

**Goal:** Pisahkan admin dan customer memakai role database; admin hanya login email/password, Google hanya customer.

**Architecture:** Tambahkan `users.role` dengan default `customer`. Middleware admin membaca role database. Google callback tidak pernah menerima role dari request/provider dan hanya membuat user baru sebagai customer.

**Tech Stack:** Laravel, Eloquent, Fortify, Laravel Socialite, PHPUnit project suite, Inertia React.

**Spec:** `docs/superpowers/specs/2026-11-18-admin-role-google-login-design.md`

## Global Constraints

- Role valid hanya `customer` dan `admin`.
- Admin login memakai email/password existing.
- Google OAuth hanya customer.
- Google callback tidak boleh menaikkan role user.
- Jangan mengubah desain UI existing.
- Jangan hardcode credential Google atau password admin production.

## Review Focus

- User biasa membuka `/admin`; middleware harus menolak.
- Admin email/password membuka `/admin`.
- Google user baru tidak boleh menjadi admin.
- Google callback untuk admin existing tidak boleh menurunkan role.
- Request/provider tidak boleh menyuntikkan role admin.

---

### Task 1: Role database

**Files:**
- Create: `database/migrations/*_add_role_to_users_table.php`
- Modify: `app/Models/User.php`
- Test: `tests/Feature/Auth/AdminRoleTest.php`

- [ ] Tulis test bahwa user factory/default memiliki role `customer`.
- [ ] Jalankan test; expected fail karena kolom role belum ada.
- [ ] Tambah kolom `role` default `customer`, index bila sesuai schema.
- [ ] Tambahkan role ke model fillable/casts sesuai pola project.
- [ ] Jalankan test; expected pass.

### Task 2: Middleware admin berbasis role

**Files:**
- Modify: `app/Http/Middleware/EnsureAdmin.php`
- Modify: `routes/web.php`
- Modify: `config/casayur.php`
- Test: `tests/Feature/Auth/AdminRoleTest.php`, `tests/Feature/Admin/OrderManagementTest.php`, `tests/Feature/Admin/ProductManagementTest.php`

- [ ] Tulis test customer menerima 403 dari `/admin`.
- [ ] Tulis test admin menerima akses `/admin`.
- [ ] Jalankan test; expected fail karena middleware masih email whitelist.
- [ ] Ubah middleware menjadi `role === 'admin'`.
- [ ] Hapus ketergantungan `CASAYUR_ADMIN_EMAILS` dari authorization.
- [ ] Update fixture admin test menjadi user `role=admin`.
- [ ] Jalankan test admin/auth; expected pass.

### Task 3: Provision admin tanpa Google

**Files:**
- Create: `database/seeders/AdminUserSeeder.php` atau command existing yang paling kecil
- Modify: `database/seeders/DatabaseSeeder.php` bila diperlukan
- Modify: `.env.example`
- Test: `tests/Feature/Auth/AdminRoleTest.php`

- [ ] Tulis test admin provisioning menghasilkan role admin dan password ter-hash.
- [ ] Jalankan test; expected fail.
- [ ] Implementasikan provisioning memakai env `CASAYUR_ADMIN_EMAIL`, `CASAYUR_ADMIN_PASSWORD`, dan nama admin.
- [ ] Jangan menjalankan seeder admin otomatis tanpa credential env.
- [ ] Jalankan test; expected pass.

### Task 4: Google callback customer-only

**Files:**
- Modify: `app/Http/Controllers/Auth/GoogleController.php`
- Modify: `tests/Feature/Auth/GoogleAuthenticationTest.php`

- [ ] Tulis test Google user baru mendapat role `customer`.
- [ ] Tulis test Google existing admin tetap role `admin`.
- [ ] Tulis test input/request role tidak mengubah role.
- [ ] Jalankan test; expected fail/tergantung provider mock.
- [ ] Pastikan `firstOrCreate` user baru selalu mengisi role `customer`.
- [ ] Pastikan callback hanya update `google_id` dan verification fields, bukan role.
- [ ] Jalankan Google auth tests; expected pass.

### Task 5: Login UI dan konfigurasi

**Files:**
- Modify: `resources/js/pages/auth/login.tsx` hanya bila label/route perlu.
- Modify: `config/services.php`, `.env.example`.
- Test: `tests/Feature/Auth/AuthenticationTest.php`, `tests/Feature/Auth/GoogleAuthenticationTest.php`.

- [ ] Pastikan admin tetap memakai form email/password existing.
- [ ] Pastikan Google button tidak menawarkan admin role.
- [ ] Pastikan callback route tidak menerima role dari query/body.
- [ ] Jalankan auth tests dan build.

### Task 6: Audit final

- [ ] Jalankan `php artisan migrate:fresh --env=testing` atau suite project sesuai konfigurasi.
- [ ] Jalankan `php artisan test`.
- [ ] Jalankan `npm run build`.
- [ ] Jalankan `git diff --check`.
- [ ] Audit seluruh `/admin` route memiliki middleware auth + EnsureAdmin.
- [ ] Audit tidak ada `CASAYUR_ADMIN_EMAILS` yang masih menentukan authorization.
- [ ] Audit Google callback tidak menerima role dari user/provider.
