# Admin Role and Google Login Design

## Intent
Pisahkan akses admin dari customer. Admin masuk memakai email/password. Google OAuth hanya membuat atau menghubungkan akun customer.

## Goals
- Tambah role database `customer` atau `admin`.
- Lindungi seluruh route `/admin/*` berdasarkan `users.role`.
- Pertahankan login email/password existing.
- Cegah Google OAuth membuat atau menaikkan user menjadi admin.
- Pertahankan desain UI frontend existing.

## Non-goals
- Tidak membuat tabel permission kompleks.
- Tidak menambah username terpisah; email tetap menjadi identifier login.
- Tidak mengubah alur checkout atau halaman publik.

## Approach
Gunakan kolom enum/string `users.role` dengan default `customer`. Middleware `EnsureAdmin` hanya menerima user dengan `role = admin`. Google callback selalu memakai role `customer` untuk user baru dan tidak pernah mengubah role user existing.

Pendekatan email whitelist ditinggalkan karena role harus tersimpan di database, dapat diaudit, dan tidak bergantung konfigurasi email.

## Admin provisioning
Admin dibuat melalui seeder atau command internal dengan email dan password yang diberikan operator. Password diproses melalui hashing Laravel. Tidak ada admin default hardcoded di production.

## Security rules
- Customer email/password: tidak boleh membuka admin.
- Customer Google: tidak boleh membuka admin.
- Admin email/password: boleh membuka admin.
- Google callback untuk email admin existing: login tetap sebagai admin hanya jika role sudah admin; callback tidak mengubah role.
- Google callback tidak boleh menerima role dari request/provider.

## Tests
- default user role customer;
- admin middleware menerima admin;
- admin middleware menolak customer;
- Google user baru mendapat customer;
- Google existing admin tidak turun role;
- Google callback tidak dapat membuat admin;
- admin route terlindungi.
