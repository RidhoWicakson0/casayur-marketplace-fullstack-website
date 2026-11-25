# DOKUMEN SPESIFIKASI KEBUTUHAN PERANGKAT LUNAK (SKPL) / PRODUCT REQUIREMENTS DOCUMENT (PRD)
## SISTEM INFORMASI E-COMMERCE PENGADAAN SAYUR DAN SEMBAKO BERBASIS WEB (CASAYUR)

---

### DAFTAR INFORMASI DOKUMEN
- **Nama Proyek:** Sistem Informasi E-Commerce Sayur & Sembako (Casayur)
- **Versi Dokumen:** 2.0.0
- **Status:** Final Terverifikasi
- **Penyusun:** Rekayasa Perangkat Lunak Casayur Team
- **Sasaran Pembaca:** Dosen Penguji / Akademisi, System Analyst, Software Engineer, UI/UX Designer, Database Administrator, dan Stakeholder Manajemen Toko

---

## DAFTAR ISI
1. [BAB I: PENDAHULUAN](#bab-i-pendahuluan)
   - 1.1 Identifikasi Masalah & Latar Belakang
   - 1.2 Tujuan Proyek
   - 1.3 Ruang Lingkup Sistem & Batasan Operasional
   - 1.4 Definisi, Singkatan, dan Istilah Teknis
2. [BAB II: ANALISIS KEBUTUHAN SISTEM](#bab-ii-analisis-kebutuhan-sistem)
   - 2.1 Identifikasi Aktor & Matriks Hak Akses
   - 2.2 Analisis Kebutuhan Fungsional (Functional Requirements)
   - 2.3 Analisis Kebutuhan Non-Fungsional (Non-Functional Requirements)
   - 2.4 Aturan Bisnis (Business Rules)
3. [BAB III: PERANCANGAN ARSITEKTUR DAN SISTEM](#bab-iii-perancangan-arsitektur-dan-sistem)
   - 3.1 Arsitektur Perangkat Lunak (Modern Monolithic SPA)
   - 3.2 Diagram Aliran Data (Data Flow Diagram - Level 0 Context & Level 1 DFD)
   - 3.3 Integrasi Layanan Pihak Ketiga (Third-Party Services)
4. [BAB IV: PERANCANGAN BASIS DATA (DATABASE DESIGN)](#bab-iv-perancangan-basis-data-database-design)
   - 4.1 Entitas & Model Konseptual (CDM)
   - 4.2 Struktur Tabel Fisik & Kamus Data Lengkap
   - 4.3 Entity Relationship Diagram (ERD Relasional)
   - 4.4 Integritas Data, Indexing, dan Manajemen Konkurensi
5. [BAB V: PEMODELAN BERORIENTASI OBJEK (UML DIAGRAMS)](#bab-v-pemodelan-berorientasi-objek-uml-diagrams)
   - 5.1 Use Case Diagram & Rincian Skenario Naratif Use Case
   - 5.2 Class Diagram (Struktur Kelas Kontroler, Model, & Servis)
   - 5.3 Activity Diagram (Checkout, Manajemen Transaksi, & Validasi PO)
   - 5.4 Sequence Diagram (Siklus Pemesanan, Kalkulasi Geospasial, & Pemrosesan Admin)
   - 5.5 State Machine Diagram (Siklus Hidup Status Pesanan)
6. [BAB VI: MATRIKS KETERLACAKAN & RENCANA PENGUJIAN](#bab-vi-matriks-keterlacakan--rencana-pengujian)
   - 6.1 Matriks Keterlacakan Kebutuhan (Traceability Matrix)
   - 6.2 Skenario Pengujian Unit & Fitur (Black Box & Integration Testing)
7. [BAB VII: RENCANA PENERAPAN & LINGKUNGAN INFRASTRUKTUR](#bab-vii-rencana-penerapan--lingkungan-infrastruktur)

---

## BAB I: PENDAHULUAN

### 1.1 Identifikasi Masalah & Latar Belakang
Sayuran dan bahan pangan basah merupakan komoditas yang memiliki masa simpan pendek (*perishable goods*). Kendala utama perdagangan sayur tradisional di wilayah Kabupaten Pemalang dan sekitarnya adalah:
1. Ketidakpastian ketersediaan stok fisik harian di pasar bagi konsumen rumah tangga.
2. Waktu belanja yang terbatas di pagi hari bagi masyarakat pekerja.
3. Ketiadaan penentuan ongkos kirim yang transparan dan akurat berdasarkan jarak rute tempuh geografis aktual dari gerai toko ke rumah pembeli.
4. Kendala pemenuhan sayur segar khusus yang memerlukan rantai pasok terjadwal langsung dari kelompok tani lokal (*preorder*).

Sistem E-Commerce Casayur dibangun untuk memfasilitasi transaksi daring dengan pemisahan komoditas *Ready Stock* dan *Preorder (PO)*, dilengkapi penentuan titik lokasi berbasis geospasial presisi menggunakan peta interaktif, serta penghitungan biaya pengantaran berkeadilan.

### 1.2 Tujuan Proyek
- Menyediakan platform belanja digital yang responsif, mudah diakses baik melalui perangkat seluler maupun komputer meja.
- Mengotomatiskan validasi jarak pengiriman dengan batasan radius maksimal 20 km dan kelayakan metode pembayaran tunai / COD (Cash on Delivery) maksimal 5 km.
- Mencegah inkonsistensi stok barang melalui penguncian baris database (*row locking*) saat pesanan dibuat.
- Mengakomodasi pesanan bahan pangan terjadwal melalui pembatasan jendela waktu order *preorder* (pukul 09.00 hingga 12.00 WIB).
- Menyediakan modul panel administrasi untuk monitoring omzet berkala dan pengelolaan rantai status pemrosesan pesanan.

### 1.3 Ruang Lingkup Sistem & Batasan Operasional
1. **Platform:** Aplikasi berbasis web modern dengan arsitektur Monolith Terpadu (Inertia.js Single-Page Application).
2. **Lokasi Titik Toko Utama:** Gg. Durian V, Karanglo, Kabupaten Pemalang, Jawa Tengah (Koordinat: Latitude `-6.9141`, Longitude `109.3789`).
3. **Radius Pengantaran:** Layanan antar pesanan (Delivery) dibatasi radius maksimal 20,0 km dari toko.
4. **Metode Pengiriman:**
   - **Delivery Order:** Kurir internal mengantar pesanan langsung ke titik koordinat pelanggan.
   - **Pickup:** Pelanggan mengambil barang langsung di toko tanpa dikenakan ongkos kirim.
5. **Metode Pembayaran:**
   - **Non-Tunai:** Transfer manual ke rekening bank atau verifikasi pembayaran QRIS.
   - **Tunai / COD:** Pelanggan membayar uang tunai kepada kurir saat barang tiba (hanya aktif untuk radius <= 5,0 km).
6. **Autentikasi:** Mendukung pendaftaran akun biasa (email dan sandi terenkripsi) serta Single Sign-On (SSO) menggunakan Google OAuth 2.0.

### 1.4 Definisi, Singkatan, dan Istilah Teknis
- **ACID:** *Atomicity, Consistency, Isolation, Durability* - standar kepastian transaksi basis data.
- **CSRF:** *Cross-Site Request Forgery* - mekanisme pengamanan permintaan HTTP antar situs.
- **Inertia.js:** Jembatan arsitektur yang menghubungkan perutean sisi server (Laravel) dengan komponen antarmuka sisi klien (React) tanpa REST API independen.
- **Haversine Formula:** Rumus navigasi matematika untuk mengukur jarak lingkaran besar antara dua koordinat bola bumi.
- **Nominatim:** Mesin pencarian lokasi sumber terbuka (*geocoding*) berbasis OpenStreetMap.
- **PO (Preorder):** Skema pemesanan komoditas panen yang dikirimkan keesokan harinya dengan jadwal pesanan terbatas.

---

## BAB II: ANALISIS KEBUTUHAN SISTEM

### 2.1 Identifikasi Aktor & Matriks Hak Akses

| Hak Akses / Fungsionalitas | Pengunjung Umum (Guest) | Pelanggan Terdaftar (Customer) | Administrator (Admin) |
|---|:---:|:---:|:---:|
| Melihat Katalog & Pencarian Sayur | Ya | Ya | Ya |
| Membaca Rincian Informasi Produk | Ya | Ya | Ya |
| Memasukkan Item ke Keranjang Belanja | Ya | Ya | Ya |
| Melakukan Checkout & Input Lokasi Peta | Ya (Validasi nomor WA) | Ya | Tidak |
| Mengubah Profil & Unggah Foto Avatar | Tidak | Ya | Ya |
| Melihat Riwayat Status Pesanan Pribadi | Tidak | Ya | Tidak |
| Mengelola Master Produk (CRUD) | Tidak | Tidak | Ya |
| Mengubah Status Pesanan Masuk | Tidak | Tidak | Ya |
| Mengakses Dashboard Statistik & Laporan | Tidak | Tidak | Ya |

### 2.2 Analisis Kebutuhan Fungsional (Functional Requirements)

| ID Kebutuhan | Nama Kebutuhan | Deskripsi Spesifikasi Fungsional |
|---|---|---|
| **REQ-F-01** | Pendaftaran & Masuk Pengguna | Sistem harus menyediakan formulir registrasi dan autentikasi standar (email, password), serta opsi login instan Google OAuth. |
| **REQ-F-02** | Proteksi Otorisasi Admin | Sistem harus memeriksa atribut peran (`role`) pengguna. Akses ke rute `/admin/*` hanya diizinkan untuk akun dengan atribut `role: admin`. |
| **REQ-F-03** | Manajemen Akun Pelanggan | Pelanggan terdaftar dapat memperbarui nama, nomor kontak, serta mengunggah foto profil kustom dengan batasan berkas gambar maksimal 2 MB. |
| **REQ-F-04** | Navigasi & Pencarian Katalog | Sistem menampilkan katalog sayur dengan fitur pencarian teks instan, penyaringan berdasarkan kategori (*Ready Stock* / *Preorder*), penyaringan status stok, serta pengurutan harga termurah dan termahal. |
| **REQ-F-05** | Eksplorasi Rincian Produk | Sistem menyajikan halaman spesifik tiap produk yang memuat foto komoditas, deskripsi kesegaran, harga per satuan, dan indikator sisa stok fisik. |
| **REQ-F-06** | Keranjang Belanja Persisten | Sistem menyediakan keranjang belanja yang menyimpan data barang terpilih, mendukung penambahan/pengurangan jumlah (qty), penghapusan item, serta tersinkronisasi antar sesi peramban. |
| **REQ-F-07** | Pembatasan Waktu Preorder | Sistem harus memvalidasi keranjang belanja. Jika terdapat produk bertipe `po`, checkout hanya diizinkan apabila waktu transaksi berada pada rentang pukul 09.00 - 12.00 WIB. |
| **REQ-F-08** | Pencarian Alamat & Penentuan Pin Peta | Pada opsi *Delivery*, antarmuka checkout harus menyajikan kolom pencarian alamat otomatis (Nominatim) dan kanvas peta interaktif (Mapbox GL) agar pengguna dapat menggeser penanda lokasi (*marker*) ke titik rumah. |
| **REQ-F-09** | Penghitungan Jarak & Ongkos Kirim | Sistem menghitung jarak euclidean garis lengkung bumi antara toko Pemalang (`-6.9141, 109.3789`) dan pin lokasi pengguna. Biaya kirim ditentukan bertingkat sesuai jarak per kilometer. |
| **REQ-F-10** | Validasi Jangkauan & Syarat COD | Sistem menolak pengantaran bila jarak > 20 km. Sistem secara otomatis menonaktifkan metode pembayaran Tunai (COD) jika jarak > 5 km dan mewajibkan pembayaran non-tunai. |
| **REQ-F-11** | Pembuatan Transaksi Atomik | Sistem memproses pembuatan pesanan dalam transaksi basis data (`DB::transaction`) dan mengunci baris produk (`lockForUpdate`) untuk memotong stok fisik secara konsisten tanpa risiko *race condition*. |
| **REQ-F-12** | Pemantauan Status Pesanan | Pelanggan terdaftar dapat memantau linimasa status pesanan: `pending` -> `confirmed` -> `processing` -> `delivered` atau `cancelled`. |
| **REQ-F-13** | Pengelolaan Master Komoditas Admin | Admin dapat menambah komoditas baru, mengubah nama, kategori, harga, kuota stok, deskripsi, foto produk, serta menghapus data produk. |
| **REQ-F-14** | Pemrosesan Pesanan Admin | Admin dapat melihat seluruh daftar pesanan masuk, memverifikasi rincian kontak WhatsApp pemesan, dan memperbarui status pemrosesan pesanan. |
| **REQ-F-15** | Laporan dan Analitik Penjualan | Admin dapat meninjau total omzet pemasukan, pesanan terverifikasi, jumlah produk terjual, dan mengekspor rekap laporan penjualan. |

### 2.3 Analisis Kebutuhan Non-Fungsional (Non-Functional Requirements)

| Parameter | Metrik / Target Kinerja |
|---|---|
| **Performa Responsivitas** | Halaman transisi Inertia merespons di bawah 250 milidetik; aset halaman pertama kali dimuat di bawah 2,0 detik pada koneksi internet seluler standar. |
| **Keamanan Data & Sandi** | Seluruh kredensial sandi di-hash menggunakan algoritma Bcrypt (faktor biaya 12). Setiap request mutasi HTTP dilindungi token CSRF ganda. |
| **Integritas Geospasial** | Koordinat lintang (*latitude*) dan bujur (*longitude*) disimpan dengan presisi 7 desimal di belakang koma untuk akurasi posisi sub-meter. |
| **Ketersediaan Layanan** | Sistem memiliki rancangan redundansi dengan target uptime 99,5% selama jam operasional toko (06.00 - 21.00 WIB). |
| **Aksesibilitas & UI Antislop** | Memenuhi standar rasio kontras WCAG AA (minimal rasio 4.5:1 untuk teks biasa), komponen ramah sentuhan dengan ukuran minimal area klik 44x44 piksel pada layar sentuh ponsel. |
| **Kompatibilitas Peramban** | Beroperasi optimal pada seluruh peramban web modern berbasis Chromium (Chrome, Edge), Gecko (Firefox), dan WebKit (Safari iOS/macOS). |

### 2.4 Aturan Bisnis (Business Rules)
1. **BR-01 (Titik Koordinat Toko):** Koordinat referensi toko tunggal beralamat di Pemalang, Jawa Tengah pada titik `-6.9141000` (Latitude) dan `109.3789000` (Longitude).
2. **BR-02 (Tarif Pengantaran):**
   - Jarak 0,0 km s/d 2,0 km: Rp 5.000
   - Jarak > 2,0 km s/d 5,0 km: Rp 8.000
   - Jarak > 5,0 km s/d 10,0 km: Rp 15.000
   - Jarak > 10,0 km s/d 20,0 km: Rp 25.000
   - Pengambilan mandiri (Pickup): Rp 0 (Gratis)
3. **BR-03 (Batas Wilayah Antar):** Lokasi pengantaran dengan jarak > 20,0 km dari toko dinyatakan berada di luar wilayah operasional dan sistem memblokir tombol pemesanan.
4. **BR-04 (Syarat COD):** Pembayaran di tempat (Cash On Delivery) hanya diizinkan untuk alamat pengiriman dengan jarak <= 5,0 km dari toko.
5. **BR-05 (Jadwal Preorder):** Produk kategori `po` hanya dapat dimasukkan dan diproses pada tahap checkout antara pukul 09.00.00 hingga 11.59.59 WIB setiap hari.
6. **BR-06 (Pemotongan Stok):** Pengurangan stok barang terjadi saat pesanan berhasil disimpan (`INSERT`). Pembatalan pesanan (`cancelled`) oleh admin mengembalikan kuantitas stok barang ke tabel produk.

---

## BAB III: PERANCANGAN ARSITEKTUR DAN SISTEM

### 3.1 Arsitektur Perangkat Lunak (Modern Monolithic SPA)
Sistem Casayur mengadopsi pola arsitektur **Modern Monolith** yang memadukan backend berbasis framework Laravel 12 dan frontend Single Page Application (SPA) berbasis React 19 menggunakan perantara **Inertia.js Protocol**:

```
+-----------------------------------------------------------------------------------------+
|                                     LAPISAN KLIEN (FRONTEND)                            |
|                                                                                         |
|   +---------------------------------------------------------------------------------+   |
|   |  Komponen Antarmuka Pengguna (React 19 + TypeScript + Tailwind CSS)            |   |
|   |  - State Keranjang Belanja: `CartContext` (Persistensi LocalStorage & Session)  |   |
|   |  - Modul Peta Interaktif: `MapboxPicker` (Mapbox GL Engine)                     |   |
|   |  - Form Engine: Inertia Form Helper (`useForm`)                                 |   |
|   +---------------------------------------------------------------------------------+   |
+--------------------------------------------▲--------------------------------------------+
                                             │ Protokol Inertia JSON via XHR
+--------------------------------------------▼--------------------------------------------+
|                                    LAPISAN SERVER (BACKEND)                             |
|                                                                                         |
|   +---------------------------------------------------------------------------------+   |
|   |  Routing & Middleware: `web.php`, `EnsureAdmin`, `SubstituteBindings`          |   |
|   +---------------------------------------------------------------------------------+   |
|   |  Lapisan Kontroler (HTTP Controller):                                           |   |
|   |  - `CheckoutController`        : Menangani kalkulasi tarif & order submission   |   |
|   |  - `ProductController` (Admin) : Mengelola CRUD komoditas sayur                 |   |
|   |  - `OrderController` (Admin)   : Mengelola verifikasi dan pembaruan status      |   |
|   |  - `ProfileController`         : Mengelola data pengguna & unggahan avatar      |   |
|   +---------------------------------------------------------------------------------+   |
|   |  Lapisan Servis Bisnis (Service Layer):                                         |   |
|   |  - `OrderService`        : Mengkalkulasi formula jarak, validasi PO, & tarif    |   |
|   |  - `SalesReportService`  : Mengagregasi metrik analitik dan laporan transaksi   |   |
|   +---------------------------------------------------------------------------------+   |
|   |  Lapisan Akses Data (Object-Relational Mapping):                                |   |
|   |  - Eloquent ORM: Model `User`, `Product`, `Order`, `OrderItem`                  |   |
|   +---------------------------------------------------------------------------------+   |
+--------------------------------------------▲--------------------------------------------+
                                             │ Koneksi Database & Layanan Luar
+--------------------------------------------▼--------------------------------------------+
|                             LAPISAN SUMBER DAYA & EKSTERNAL                             |
|                                                                                         |
|   +-------------------------+  +--------------------------+  +----------------------+   |
|   | RDBMS (PostgreSQL/MySQL)|  | File Storage Driver      |  | API Eksternal:       |   |
|   | - Tabel Transaksional   |  | - Direktori `avatars/`   |  | - Mapbox Tile API    |   |
|   | - Transaksi ACID Lock   |  | - Direktori `products/`  |  | - OSM Nominatim      |   |
|   +-------------------------+  +--------------------------+  +----------------------+   |
+-----------------------------------------------------------------------------------------+
```

### 3.2 Diagram Aliran Data (Data Flow Diagram - DFD)

#### 3.2.1 DFD Level 0 (Diagram Konteks)
Menjelaskan aliran masukan dan keluaran sistem secara garis besar dengan dua entitas luar: Pelanggan dan Administrator.

```
                  +----------------------------------------------+
                  |               PELANGGAN (CUSTOMER)           |
                  +----------------------------------------------+
                    │             ▲              ▲            ▲
     Kredensial Akun│             │Info Profil   │Informasi   │Nota & Status
     & Alamat Peta  │             │& Histori     │Katalog     │Pesanan
                    ▼             │              │            │
             +------------------------------------------------------+
             |                                                      |
             |       SISTEM INFORMASI E-COMMERCE SAYUR (CASAYUR)    |
             |                                                      |
             +------------------------------------------------------+
                    ▲             ▲              ▲            │
     Kredensial     │             │Data Master   │Pembaruan   │Rekap Penjualan
     Login Admin    │             │Produk Baru   │Status Order│& Notifikasi Order
                    │             │              │            ▼
                  +----------------------------------------------+
                  |              ADMINISTRATOR SISTEM            |
                  +----------------------------------------------+
```

#### 3.2.2 DFD Level 1
Menjelaskan dekomposisi sistem menjadi 5 proses utama:
- **Proses 1.0 (Autentikasi & Akun):** Verifikasi identitas user, OAuth Google, dan penyimpanan avatar.
- **Proses 2.0 (Manajemen Katalog):** Pengelolaan master produk oleh admin dan penayangan katalog ke pembeli.
- **Proses 3.0 (Kalkulasi Geospasial):** Penghitungan jarak koordinat dan verifikasi aturan bisnis ongkir/COD.
- **Proses 4.0 (Transaksi Pesanan):** Eksekusi checkout, locking ketersediaan stok, dan pencatatan order.
- **Proses 5.0 (Pelaporan & Manajemen Order):** Pembaruan alur proses pesanan dan analitik keuangan admin.

---

## BAB IV: PERANCANGAN BASIS DATA (DATABASE DESIGN)

### 4.1 Entitas & Model Konseptual (CDM)
Sistem memiliki 4 entitas fundamental:
1. **User:** Menyimpan identitas akun, hak akses role, serta metadata autentikasi.
2. **Product:** Menyimpan data komoditas sayur, kategori operasional, harga dasar, dan saldo stok fisik.
3. **Order:** Menyimpan ringkasan transaksi, identitas pemesan, titik geospasial, metode logistik, dan total tagihan.
4. **OrderItem:** Menyimpan detail rincian produk yang dibeli pada setiap transaksi bersangkutan.

### 4.2 Struktur Tabel Fisik & Kamus Data Lengkap

#### 1. Tabel `users`
Tabel penyimpan data akun pengguna dan administrator.

| Nama Kolom | Tipe Data | Nullable | Nilai Default | Keterangan |
|---|---|:---:|:---:|---|
| `id` | BIGINT UNSIGNED | Tidak | Auto Increment | Kunci Utama (Primary Key) |
| `name` | VARCHAR(255) | Tidak | - | Nama lengkap pengguna |
| `email` | VARCHAR(255) | Tidak | - | Alamat email unik untuk login |
| `email_verified_at` | TIMESTAMP | Ya | NULL | Waktu verifikasi alamat email |
| `password` | VARCHAR(255) | Ya | NULL | Sandi ter-hash Bcrypt (null bila via Google) |
| `google_id` | VARCHAR(255) | Ya | NULL | Pengenal unik dari Google Identity Services |
| `role` | VARCHAR(20) | Tidak | `'customer'` | Nilai: `'customer'`, `'admin'` |
| `avatar` | VARCHAR(255) | Ya | NULL | Path relatif berkas gambar di penyimpanan |
| `remember_token` | VARCHAR(100) | Ya | NULL | Token sesi login berkesinambungan |
| `created_at` | TIMESTAMP | Ya | NULL | Waktu pembuatan baris akun |
| `updated_at` | TIMESTAMP | Ya | NULL | Waktu pembaruan terakhir data akun |

#### 2. Tabel `products`
Tabel penyimpan data barang dagangan sayuran dan sembako.

| Nama Kolom | Tipe Data | Nullable | Nilai Default | Keterangan |
|---|---|:---:|:---:|---|
| `id` | BIGINT UNSIGNED | Tidak | Auto Increment | Kunci Utama (Primary Key) |
| `name` | VARCHAR(255) | Tidak | - | Nama komoditas produk |
| `slug` | VARCHAR(255) | Ya | NULL | URL ramah mesin pencari (slug) |
| `category` | VARCHAR(50) | Tidak | `'ready'` | Kategori pemenuhan: `'ready'`, `'po'` |
| `price` | DECIMAL(12,2) | Tidak | `0.00` | Harga jual per satuan komoditas (Rupiah) |
| `stock` | INT | Tidak | `0` | Sisa kuantitas barang fisik di gudang |
| `description` | TEXT | Ya | NULL | Deskripsi nutrisi, takaran, dan mutu |
| `image_path` | VARCHAR(255) | Ya | NULL | Path berkas foto produk sayur |
| `is_active` | BOOLEAN | Tidak | `true` | Penanda produk ditampilkan di katalog |
| `created_at` | TIMESTAMP | Ya | NULL | Waktu pencatatan data produk |
| `updated_at` | TIMESTAMP | Ya | NULL | Waktu pengubahan harga/stok |

#### 3. Tabel `orders`
Tabel induk pencatatan transaksi pembelian dan logistik.

| Nama Kolom | Tipe Data | Nullable | Nilai Default | Keterangan |
|---|---|:---:|:---:|---|
| `id` | BIGINT UNSIGNED | Tidak | Auto Increment | Kunci Utama (Primary Key) |
| `user_id` | BIGINT UNSIGNED | Ya | NULL | Kunci Tamu (Foreign Key -> `users.id`) |
| `customer_name` | VARCHAR(120) | Tidak | - | Nama lengkap penerima barang |
| `customer_phone` | VARCHAR(30) | Tidak | - | Nomor WhatsApp valid penerima |
| `method` | VARCHAR(20) | Tidak | `'delivery'` | Nilai logistik: `'delivery'`, `'pickup'` |
| `payment_method` | VARCHAR(20) | Tidak | `'manual'` | Cara bayar: `'manual'`, `'cod'` |
| `status` | VARCHAR(20) | Tidak | `'pending'` | Nilai status: `pending`, `confirmed`, `processing`, `delivered`, `cancelled` |
| `address` | TEXT | Ya | NULL | Alamat teks lengkap (wajib jika delivery) |
| `lat` | DECIMAL(10,7) | Ya | NULL | Garis lintang titik tujuan antar |
| `lng` | DECIMAL(10,7) | Ya | NULL | Garis bujur titik tujuan antar |
| `distance_km` | DECIMAL(6,2) | Ya | `0.00` | Hasil ukur jarak dari toko ke alamat (km) |
| `subtotal` | DECIMAL(12,2) | Tidak | `0.00` | Akumulasi total harga barang pesanan |
| `shipping_cost` | DECIMAL(12,2) | Tidak | `0.00` | Tarif ongkos kirim hasil kalkulasi jarak |
| `total` | DECIMAL(12,2) | Tidak | `0.00` | Total tagihan (`subtotal + shipping_cost`) |
| `created_at` | TIMESTAMP | Ya | NULL | Waktu pesanan berhasil dibuat |
| `updated_at` | TIMESTAMP | Ya | NULL | Waktu perubahan status oleh admin |

#### 4. Tabel `order_items`
Tabel anak penyimpan rincian komoditas pada setiap pesanan.

| Nama Kolom | Tipe Data | Nullable | Nilai Default | Keterangan |
|---|---|:---:|:---:|---|
| `id` | BIGINT UNSIGNED | Tidak | Auto Increment | Kunci Utama (Primary Key) |
| `order_id` | BIGINT UNSIGNED | Tidak | - | Kunci Tamu (FK -> `orders.id` ON DELETE CASCADE) |
| `product_id` | BIGINT UNSIGNED | Tidak | - | Kunci Tamu (FK -> `products.id` ON DELETE RESTRICT) |
| `quantity` | INT | Tidak | `1` | Jumlah satuan barang yang dipesan |
| `price` | DECIMAL(12,2) | Tidak | `0.00` | Snapshot harga per unit saat pesanan dibuat |
| `created_at` | TIMESTAMP | Ya | NULL | Waktu perekaman item |
| `updated_at` | TIMESTAMP | Ya | NULL | Waktu pembaruan item |

### 4.3 Entity Relationship Diagram (ERD Relasional)

```
+------------------------------------+
|               users                |
+------------------------------------+
| PK  id             BIGINT (AUTO)   |
|     name           VARCHAR(255)    |
|     email          VARCHAR(255) [U]|
|     password       VARCHAR(255)    |
|     google_id      VARCHAR(255) [U]|
|     role           VARCHAR(20)     |
|     avatar         VARCHAR(255)    |
|     created_at     TIMESTAMP       |
|     updated_at     TIMESTAMP       |
+-----------------+------------------+
                  | 1
                  |
                  | memiliki / membuat
                  |
                  | 0..*
+-----------------▼------------------+
|               orders               |
+------------------------------------+
| PK  id             BIGINT (AUTO)   |
| FK  user_id        BIGINT (NULL)   |
|     customer_name  VARCHAR(120)    |
|     customer_phone VARCHAR(30)     |
|     method         VARCHAR(20)     |
|     payment_method VARCHAR(20)     |
|     status         VARCHAR(20)     |
|     address        TEXT            |
|     lat            DECIMAL(10,7)   |
|     lng            DECIMAL(10,7)   |
|     distance_km    DECIMAL(6,2)    |
|     subtotal       DECIMAL(12,2)   |
|     shipping_cost  DECIMAL(12,2)   |
|     total          DECIMAL(12,2)   |
|     created_at     TIMESTAMP       |
|     updated_at     TIMESTAMP       |
+-----------------+------------------+
                  | 1
                  |
                  | tersusun atas
                  |
                  | 1..*
+-----------------▼------------------+          +------------------------------------+
|            order_items             |          |              products              |
+------------------------------------+          +------------------------------------+
| PK  id             BIGINT (AUTO)   |          | PK  id             BIGINT (AUTO)   |
| FK  order_id       BIGINT          |          |     name           VARCHAR(255)    |
| FK  product_id     BIGINT          |*       1 |     slug           VARCHAR(255)    |
|     quantity       INT             |----------|     category       VARCHAR(50)     |
|     price          DECIMAL(12,2)   | merujuk  |     price          DECIMAL(12,2)   |
|     created_at     TIMESTAMP       | ke data  |     stock          INT             |
|     updated_at     TIMESTAMP       |          |     description    TEXT            |
+------------------------------------+          |     image_path     VARCHAR(255)    |
                                                |     is_active      BOOLEAN         |
                                                |     created_at     TIMESTAMP       |
                                                |     updated_at     TIMESTAMP       |
                                                +------------------------------------+
```

### 4.4 Integritas Data, Indexing, dan Manajemen Konkurensi
1. **Foreign Key Constraints:**
   - Hubungan `order_items.order_id` ke `orders.id` diproteksi aturan `ON DELETE CASCADE`. Jika transaksi dihapus, seluruh baris rincian item otomatis dibersihkan.
   - Hubungan `order_items.product_id` ke `products.id` diproteksi aturan `ON DELETE RESTRICT`. Komoditas yang telah memiliki histori transaksi tidak dapat dihapus sembarangan guna menjaga integritas pembukuan laporan.
2. **Indexing:**
   - Indeks unik diletakkan pada kolom `users(email)` dan `users(google_id)`.
   - Indeks komposit diletakkan pada kolom `orders(user_id, status)` untuk mempercepat penarikan riwayat transaksi pembeli.
   - Indeks diletakkan pada `products(category, is_active)` untuk optimasi filter katalog sayur.
3. **Pencegahan Over-selling (Pessimistic Row-Locking):**
   - Transaksi pemesanan dibungkus mekanisme `DB::transaction(function() { ... })`.
   - Pembacaan ketersediaan stok produk dilakukan dengan klausa `Product::whereIn(...)->lockForUpdate()`. Hal ini mencegah dua pembeli yang menekan tombol bayar pada detik bersamaan membeli sisa barang terakhir melebihi stok yang ada.

---

## BAB V: PEMODELAN BERORIENTASI OBJEK (UML DIAGRAMS)

### 5.1 Use Case Diagram & Skenario Use Case

#### 5.1.1 Diagram Use Case Lengkap

```
+---------------------------------------------------------------------------------------------+
|                                  SISTEM E-COMMERCE CASAYUR                                  |
|                                                                                             |
|                  +--------------------------------+                                         |
|                  | UC-01: Registrasi & Login Akun |<--------------------------------+       |
|                  +--------------------------------+                                 |       |
|                                  ▲                                                  |       |
|                                  |                                                  |       |
|                  +--------------------------------+                                 |       |
|                  | UC-02: Kelola Informasi Profil |                                 |       |
|                  +--------------------------------+                                 |       |
|                                  ▲                                                  |       |
|                                  |                                                  |       |
|                  +--------------------------------+                                 |       |
|                  | UC-03: Jelajah & Cari Produk   |                                 |       |
|                  +--------------------------------+                                 |       |
|                                  ▲                                                  |       |
|                                  |                                                  |       |
|                  +--------------------------------+                                 |       |
|  (Pelanggan)     | UC-04: Kelola Keranjang Belanja|                                 |       |
|    (•_•)         +--------------------------------+                               (Admin)   |
|     /|\                          ▲                                                 (•_•)    |
|     / \                          |                                                  /|\     |
|                  +--------------------------------+                                 / \     |
|                  | UC-05: Melakukan Checkout      |                                  |      |
|                  +--------------------------------+                                  |      |
|                     | <<include>>     | <<include>>                                  |      |
|                     ▼                 ▼                                              |      |
|           +-------------------+     +--------------------+                           |      |
|           | Pilih Titik Antar |     | Validasi Jam Order |                           |      |
|           |  Peta (Mapbox)    |     |  Preorder (PO)     |                           |      |
|           +-------------------+     +--------------------+                           |      |
|                     |                         |                                      |      |
|                     | <<include>>             | <<include>>                          |      |
|                     ▼                         ▼                                      |      |
|           +-------------------+     +--------------------+                           |      |
|           | Hitung Jarak &    |     | Validasi Batas     |                           |      |
|           | Tarif Ongkir      |     | Kelayakan COD      |                           |      |
|           +-------------------+     +--------------------+                           |      |
|                                                                                      |      |
|                  +--------------------------------+                                  |      |
|                  | UC-06: Lacak Riwayat Pesanan   |                                  |      |
|                  +--------------------------------+                                  |      |
|                                                                                      |      |
|                  +--------------------------------+                                  |      |
|                  | UC-07: Kelola Master Produk    |<---------------------------------+      |
|                  +--------------------------------+                                  |      |
|                                                                                      |      |
|                  +--------------------------------+                                  |      |
|                  | UC-08: Verifikasi & Kelola     |<---------------------------------+      |
|                  |        Status Pesanan          |                                  |      |
|                  +--------------------------------+                                  |      |
|                                                                                      |      |
|                  +--------------------------------+                                  |      |
|                  | UC-09: Tinjau Laporan & Omzet  |<---------------------------------+      |
|                  +--------------------------------+                                         |
+---------------------------------------------------------------------------------------------+
```

#### 5.1.2 Skenario Naratif Use Case Utama (UC-05: Melakukan Checkout)
- **Nama Use Case:** Melakukan Checkout Pesanan
- **Aktor:** Pelanggan (Customer)
- **Deskripsi:** Pelanggan memvalidasi isi keranjang belanja, memilih metode pengantaran (antar kurir atau ambil sendiri), menentukan pin peta lokasi, memilih metode pembayaran, dan mengonfirmasi pembuatan pesanan.
- **Kondisi Awal (Pre-condition):** Keranjang belanja memuat minimal satu produk yang masih memiliki kuota stok fisik.
- **Kondisi Akhir (Post-condition):** Data pesanan tersimpan di basis data tabel `orders` dan `order_items`, stok komoditas berkurang, dan keranjang belanja dikosongkan.
- **Skenario Normal (Alur Utama):**
  1. Pelanggan membuka halaman checkout (`/checkout`).
  2. Sistem menampilkan daftar rincian barang, subtotal belanja, serta opsi rekomendasi produk.
  3. Pelanggan melengkapi nama penerima dan nomor WhatsApp aktif.
  4. Pelanggan memilih metode pengiriman: **Delivery (Antar Kurir)**.
  5. Pelanggan mengetikkan alamat pada input autocomplete atau langsung menggeser pin lokasi di peta Mapbox.
  6. Setiap koordinat bergeser, sistem mengeksekusi request asinkron ke endpoint `/checkout/calculate`.
  7. Sistem menghitung jarak dan menetapkan tarif ongkos kirim. Karena jarak <= 5 km, sistem mengaktifkan opsi COD dan Non-Tunai.
  8. Pelanggan memilih metode pembayaran (Non-Tunai atau COD).
  9. Pelanggan menekan tombol "Konfirmasi & Buat Pesanan".
  10. Sistem mengeksekusi pengecekan jendela jam preorder jika terdapat komoditas bertanda `po`.
  11. Sistem mengunci baris stok produk, memastikan stok mencukupi, memotong kuantitas stok, dan menyimpan transaksi ke database.
  12. Sistem mengosongkan keranjang belanja pembeli dan mengarahkan tampilan ke halaman Riwayat Pesanan (`/history`).
- **Skenario Alternatif / Pengecualian:**
  - *7a. Jarak melebihi 20 km:* Sistem menampilkan pesan galat: "Alamat di luar radius 20km toko". Tombol buat pesanan dinonaktifkan.
  - *7b. Jarak antara 5,1 km s/d 20 km:* Sistem otomatis menonaktifkan opsi COD dengan pesan peringatan: "*COD hanya tersedia dalam radius 5 km". Pelanggan wajib memilih Non-Tunai.
  - *10a. Terdapat produk PO di luar rentang jam 09.00 - 12.00 WIB:* Sistem membatalkan transaksi dan mengirimkan notifikasi galat: "Preorder hanya tersedia jam 09.00-12.00".
  - *11a. Stok tidak mencukupi:* Sistem membatalkan transaksi (`rollback`) dan menginformasikan sisa stok yang tersedia.

---

### 5.2 Class Diagram

Class diagram menggambarkan kelas model data Eloquent, lapisan logika bisnis `OrderService`, serta kelas pengontrol HTTP (`Controller`).

```
+------------------------------------------+          +------------------------------------------+
|          <<Model>> User                  |          |         <<Model>> Product                |
+------------------------------------------+          +------------------------------------------+
| - id: bigint                             |          | - id: bigint                             |
| - name: string                           |          | - name: string                           |
| - email: string                          |          | - slug: string                           |
| - password: string                       |          | - category: string                       |
| - role: string                           |          | - price: decimal                         |
| - avatar: string                         |          | - stock: int                             |
| - google_id: string                      |          | - description: text                      |
+------------------------------------------+          | - image_path: string                     |
| + orders(): HasMany                      |          | - is_active: boolean                     |
| + getAvatarUrlAttribute(): string        |          +------------------------------------------+
| + isAdmin(): boolean                     |          | + orderItems(): HasMany                  |
+--------------------+---------------------+          | + isAvailable(): boolean                 |
                     | 1                              +--------------------+---------------------+
                     |                                                     | 1
                     | memiliki                                            |
                     |                                                     | dipesan pada
                     | 0..*                                                |
+--------------------▼---------------------+                               | 0..*
|          <<Model>> Order                 | 1                           * |
+------------------------------------------+-------------------------------+
| - id: bigint                             |          +--------------------▼---------------------+
| - user_id: bigint                        |          |       <<Model>> OrderItem                |
| - customer_name: string                  |          +------------------------------------------+
| - customer_phone: string                 |          | - id: bigint                             |
| - method: string                         |          | - order_id: bigint                       |
| - payment_method: string                 |          | - product_id: bigint                     |
| - status: string                         |          | - quantity: int                          |
| - address: text                          |          | - price: decimal                         |
| - lat: decimal                           |          +------------------------------------------+
| - lng: decimal                           |          | + order(): BelongsTo                     |
| - distance_km: decimal                   |          | + product(): BelongsTo                   |
| - subtotal: decimal                      |          +------------------------------------------+
| - shipping_cost: decimal                 |
| - total: decimal                         |
+------------------------------------------+
| + user(): BelongsTo                      |
| + items(): HasMany                       |
+--------------------+---------------------+
                     ▲
                     │ menginstansiasi / memanfaatkan
+--------------------+---------------------+
|        <<Service>> OrderService          |
+------------------------------------------+
| - storeLat: float = -6.9141              |
| - storeLng: float = 109.3789             |
| - maxDistanceKm: float = 20.0            |
| - maxCodKm: float = 5.0                  |
+------------------------------------------+
| + isPOAvailable(time: Carbon): bool      |
| + calculateDistance(lat, lng): float     |
| + getShippingCost(dist, method): float   |
| + codAvailable(distance: float): bool    |
+--------------------+---------------------+
                     ▲
                     │ dieksekusi oleh
+--------------------+---------------------+
|     <<Controller>> CheckoutController    |
+------------------------------------------+
| + index(orders: OrderService): Response  |
| + calculate(request: Request): JsonResp  |
| + store(request: Request): RedirectResp  |
+------------------------------------------+
```

---

### 5.3 Activity Diagram

#### 5.3.1 Activity Diagram: Alur Proses Transaksi Checkout

```
   [ Pelanggan (Frontend) ]                                  [ Server Backend & Database ]
              |                                                           |
            ( * ) Membuka Halaman Checkout                                |
              |                                                           |
              v                                                           |
   Melengkapi Identitas (Nama & WA)                                       |
              |                                                           |
              v                                                           |
   < Memilih Metode Pengantaran >                                         |
         /                  \                                             |
   [Pickup]                [Delivery]                                     |
       |                        |                                         |
       v                        v                                         |
   Set Ongkir = 0         Ketik Alamat & Geser Pin Mapbox                 |
       |                        |                                         |
       |                        v                                         |
       |                  Kirim Request Koordinat Lat/Lng --------------->|
       |                                                                  |
       |                                                         Hitung Rumus Haversine
       |                                                         Jarak dari Toko
       |                                                                  |
       |                                                          < Jarak <= 20 km? >
       |                                                           /               \
       |                                                       [Ya]                [Tidak]
       |                                                         |                    |
       |                                                         v                    v
       |                                                Tetapkan Tarif       Kirim Galat:
       |                                                Ongkir Sesuai KM     "Luar Radius 20km"
       |                                                         |                    |
       |                                                 < Jarak <= 5 km? >           |
       |                                                  /              \            |
       |                                              [Ya]               [Tidak]      |
       |                                                |                  |          |
       |                                                v                  v          |
       |                                           Aktifkan COD     Nonaktifkan COD   |
       |                                                |                  |          |
       |                                                +--------+---------+          |
       |                                                         |                    |
       |                                                Kirim JSON Info Biaya         |
       |                                                         |                    |
       |<--------------------------------------------------------+                    |
       |                                                                              |
       v                                                                              |
   Pilih Metode Pembayaran (Transfer/COD)                                             |
       |                                                                              |
       v                                                                              |
   Klik "Konfirmasi & Buat Pesanan" ------------------------------------------------->|
                                                                                      |
                                                                           < Terdapat Item PO? >
                                                                            /                 \
                                                                        [Ya]                 [Tidak]
                                                                          |                     |
                                                               < Jam 09.00 - 12.00? >           |
                                                                /                  \            |
                                                            [Ya]                  [Tidak]       |
                                                              |                      |          |
                                                              |                 Tolak Order:    |
                                                              |                 "Jam PO Tutup"  |
                                                              |                      |          |
                                                              +-----------+----------+          |
                                                                          |                     |
                                                                          v                     v
                                                                 Mulai Database Transaction
                                                                 Kunci Baris Produk (lockForUpdate)
                                                                          |
                                                                   < Stok Mencukupi? >
                                                                    /               \
                                                                [Ya]                [Tidak]
                                                                  |                    |
                                                                  v                    v
                                                         Kurangi Stok Fisik     Rollback DB &
                                                         Insert `orders` &      Kirim Galat
                                                         `order_items`                 |
                                                                  |                    |
                                                         Commit DB Transaction         |
                                                                  |                    |
   Menerima Konfirmasi Sukses & Pengalihan <----------------------+--------------------+
   ke Halaman `/history`
       |
     ( O ) Selesai
```

---

### 5.4 Sequence Diagram

#### 5.4.1 Sequence Diagram: Kalkulasi Jarak Geospasial & Ongkir
Menjelaskan komunikasi asinkron antara antarmuka React dengan `OrderService`.

```
Customer                MapboxPicker             CheckoutController             OrderService
   |                          |                           |                           |
   |--- 1. Geser Marker Peta->|                           |                           |
   |                          |--- 2. OnChange(lat, lng)->|                           |
   |                          |                           |                           |
   |                          |--- 3. POST /checkout/calculate ---------------------->|
   |                          |       payload: {lat, lng, method: 'delivery', items}  |
   |                          |                           |                           |
   |                          |                           |--- 4. calculateDistance()->|
   |                          |                           |       (storeLat, storeLng,|
   |                          |                           |        userLat, userLng)  |
   |                          |                           |<-- 5. distanceInKm -------|
   |                          |                           |                           |
   |                          |                           |--- 6. getShippingCost() ->|
   |                          |                           |<-- 7. nominalOngkir ------|
   |                          |                           |                           |
   |                          |                           |--- 8. codAvailable() ---->|
   |                          |                           |<-- 9. bool (true/false) --|
   |                          |                           |                           |
   |                          |<-- 10. Response JSON ---------------------------------|
   |                          |        {distance: 3.2, shipping_cost: 8000,           |
   |                          |         cod_available: true}                          |
   |<-- 11. Render Rincian ---|                           |                           |
   |    Ongkos & Status COD   |                           |                           |
```

#### 5.4.2 Sequence Diagram: Pembuatan Transaksi Pesanan (Atomic Order Creation)

```
Customer              CheckoutPage             CheckoutController             OrderService               Database
   |                       |                           |                           |                        |
   |-- 1. Klik Submit ---->|                           |                           |                        |
   |                       |-- 2. POST /checkout ----->|                           |                        |
   |                       |    {items, lat, lng,      |                           |                        |
   |                       |     method, payment, ...} |                           |                        |
   |                       |                           |-- 3. isPOAvailable(now) ->|                        |
   |                       |                           |<-- 4. true ---------------|                        |
   |                       |                           |                                                    |
   |                       |                           |-- 5. DB::transaction() --------------------------->|
   |                       |                           |-- 6. Product::lockForUpdate() -------------------->|
   |                       |                           |<-- 7. Data Produk & Saldo Stok --------------------|
   |                       |                           |                                                    |
   |                       |                           |-- 8. Validasi Stok (Stok >= Qty Pesanan)           |
   |                       |                           |-- 9. Potong Stok: Product->decrement('stock') ---->|
   |                       |                           |-- 10. INSERT INTO orders (total, lat, lng, ...) -->|
   |                       |                           |-- 11. INSERT INTO order_items (order_id, ...) ---->|
   |                       |                           |-- 12. COMMIT TRANSACTION ------------------------->|
   |                       |<-- 13. Redirect /history -|                                                    |
   |                       |    (Flash Success Notice) |                                                    |
   |<-- 14. Tampil Halaman-|                           |                                                    |
   |    Riwayat Pesanan    |                           |                                                    |
```

---

### 5.5 State Machine Diagram: Siklus Hidup Status Pesanan (`orders.status`)

```
                  ( * )
                    │
                    │ Checkout Sukses
                    ▼
            +---------------+
            |    PENDING    | <--- Pesanan baru terdaftar, menunggu konfirmasi toko
            +-------+-------+
                    │
        +-----------+-----------+
        │ [Admin Verifikasi]    │ [Admin Tolak / Batalkan]
        ▼                       ▼
+---------------+       +---------------+
|   CONFIRMED   |       |   CANCELLED   | (Kembalikan Saldo Stok ke Master Produk)
+-------+-------+       +---------------+
        │                       ▲
        │ [Barang Dikemas]      │ [Batal Sebelum Kirim]
        ▼                       │
+---------------+               │
|  PROCESSING   |---------------+
+-------+-------+
        │
        │ [Kurir Mengantar / Diambil]
        ▼
+---------------+
|   DELIVERED   | (Pesanan Selesai / Uang Tunai Diterima)
+-------+-------+
        │
      ( O )
```

---

## BAB VI: MATRIKS KETERLACAKAN & RENCANA PENGUJIAN

### 6.1 Matriks Keterlacakan Kebutuhan (Requirements Traceability Matrix)

| ID Kebutuhan | Komponen Frontend | Kontroler / Backend | Model / Database | Skenario Uji Terverifikasi |
|---|---|---|---|---|
| **REQ-F-01** | `auth/login.tsx`, `register.tsx` | `AuthenticatedSessionController` | `users` | `Auth/RegistrationTest.php` |
| **REQ-F-02** | `admin-layout.tsx` | Middleware `EnsureAdmin` | `users.role` | `Auth/AdminRoleTest.php` |
| **REQ-F-03** | `pages/Profile.tsx` | `Customer/ProfileController` | `users.avatar` | `CustomerProfileTest.php` |
| **REQ-F-04** | `pages/Products.tsx` | `ProductController` | `products` | `LandingPageTest.php` |
| **REQ-F-07** | `pages/Checkout.jsx` | `OrderService::isPOAvailable` | `products.category` | `CheckoutCalculationTest.php` |
| **REQ-F-08** | `mapbox-picker.jsx` | Nominatim API & Mapbox GL | - | Visual & Coordinate Pinning Check |
| **REQ-F-09** | `pages/Checkout.jsx` | `CheckoutController::calculate` | - | `CheckoutCalculationTest.php` |
| **REQ-F-10** | `pages/Checkout.jsx` | `OrderService::codAvailable` | `orders.payment_method` | `CheckoutCalculationTest.php` |
| **REQ-F-11** | `pages/Checkout.jsx` | `CheckoutController::store` | `orders`, `order_items` | `CheckoutStoreTest.php`, `CheckoutPaymentTest.php` |
| **REQ-F-12** | `pages/History.tsx` | `HistoryController` | `orders` | `CustomerHistoryTest.php` |
| **REQ-F-13** | `Admin/Products/Index.jsx` | `Admin/ProductController` | `products` | `Admin/ProductManagementTest.php` |
| **REQ-F-14** | `Admin/Orders/Index.jsx` | `Admin/OrderController` | `orders` | `Admin/OrderManagementTest.php` |

### 6.2 Skenario Pengujian Fungsional (Test Case Specifications)

#### Test Case TC-01: Kalkulasi Biaya Kirim Bertingkat
- **Tujuan:** Memvalidasi akurasi penentuan biaya antar kurir dan eligibility COD.
- **Masukan Data:** 
  - Alamat A: Lat `-6.9200`, Lng `109.3800` (Jarak ~1.5 km)
  - Alamat B: Lat `-6.9500`, Lng `109.4200` (Jarak ~6.5 km)
  - Alamat C: Lat `-6.5000`, Lng `109.5000` (Jarak ~45.0 km)
- **Ekspektasi Hasil:**
  - Alamat A: Ongkos kirim Rp 5.000, status `cod_available: true`.
  - Alamat B: Ongkos kirim Rp 15.000, status `cod_available: false`.
  - Alamat C: Respons error status 422: "Alamat di luar radius 20km".
- **Hasil Pengujian Otomatis:** *PASS (Passed pada `tests/Feature/CheckoutCalculationTest.php`)*.

#### Test Case TC-02: Batasan Transaksi Preorder (Time-Gated PO)
- **Tujuan:** Memastikan item sayur *preorder* tidak dapat dibeli di luar rentang jam operasional 09.00 - 12.00 WIB.
- **Masukan Data:** Keranjang memuat produk bertipe `po` pada pukul 14.00 WIB.
- **Ekspektasi Hasil:** Sistem menolak kalkulasi dan checkout dengan pesan peringatan: "Preorder hanya tersedia jam 09.00-12.00".
- **Hasil Pengujian Otomatis:** *PASS (Passed pada `tests/Feature/CheckoutCalculationTest.php`)*.

#### Test Case TC-03: Integritas Stok pada Pembuatan Transaksi
- **Tujuan:** Memverifikasi pengurangan saldo stok dan pembentukan baris order secara atomik.
- **Masukan Data:** Pembelian 2 ikat bayam (stok awal 10).
- **Ekspektasi Hasil:** Baris order tersimpan di tabel `orders`, 1 baris di `order_items` dengan kuantiti 2, sisa stok bayam di tabel `products` menjadi 8.
- **Hasil Pengujian Otomatis:** *PASS (Passed pada `tests/Feature/CheckoutPaymentTest.php` & `CheckoutStoreTest.php`)*.

---

## BAB VII: RENCANA PENERAPAN & LINGKUNGAN INFRASTRUKTUR

### 7.1 Kebutuhan Perangkat Lunak Lingkungan Produksi
- **Sistem Operasi:** Linux Server (Ubuntu 22.04 LTS / 24.04 LTS Direkomendasikan).
- **Web Server:** Nginx 1.22+ dengan konfigurasi reverse proxy PHP-FPM dan kompresi Gzip/Brotli.
- **Runtime Bahasa:** PHP versi 8.2 atau 8.3 dengan ekstensi: `bcmath`, `ctype`, `curl`, `dom`, `fileinfo`, `json`, `mbstring`, `openssl`, `pcre`, `pdo_mysql`/`pdo_pgsql`, `tokenizer`, `xml`.
- **Database Engine:** MariaDB 10.6+ / MySQL 8.0+ / PostgreSQL 15+.
- **Node.js:** Node.js LTS v20.x atau v22.x untuk build toolchain Vite.

### 7.2 Konfigurasi Lingkungan (`.env`)
Parameter wajib yang harus dikonfigurasi pada server:
```ini
APP_NAME=Casayur
APP_ENV=production
APP_DEBUG=false
APP_URL=https://casayur.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=casayur_db
DB_USERNAME=casayur_user
DB_PASSWORD=secret_password

# Konfigurasi Geospasial Toko Pemalang
CASAYUR_STORE_LAT=-6.9141
CASAYUR_STORE_LNG=109.3789
CASAYUR_MAX_DELIVERY_KM=20
CASAYUR_MAX_COD_KM=5

# Layanan Pihak Ketiga
VITE_MAPBOX_TOKEN=your_mapbox_public_token_here
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=https://casayur.com/auth/google/callback
```
