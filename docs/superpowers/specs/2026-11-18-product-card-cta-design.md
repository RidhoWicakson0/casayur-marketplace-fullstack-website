# Product Card CTA Design

## Intent
Ringankan card produk Casayur yang terlalu padat karena dua tombol besar.

## Design
Pertahankan satu tombol utama `Tambah ke keranjang` selebar card. Hapus `Beli sekarang` dari card. Tambahkan ikon keranjang di CTA tanpa mengubah behavior: stok habis dan preorder tutup tetap disabled, state sukses tetap menampilkan `Ditambahkan`, toast tetap muncul, dan checkout tetap dapat diakses dari keranjang/navbar.

## Constraints
- Pertahankan layout card, harga, stok, kategori, dan detail product link.
- Jangan mengubah API backend atau cart context.
- Tombol tetap minimum 44px, keyboard accessible, dan disabled state jelas.
- Gunakan token warna Casayur existing.

## Alternatives
- Dua tombol existing: ditolak karena terlalu berat.
- Tombol ikon `+` saja: ditolak karena kurang jelas.
