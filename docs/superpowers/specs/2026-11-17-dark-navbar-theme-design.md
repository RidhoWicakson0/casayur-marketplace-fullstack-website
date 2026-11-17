# Dark Navbar Theme Design

## Intent
Samakan warna navbar tema gelap dengan token visual Casayur yang dipakai footer, halaman produk, dan section landing.

## Approach
Normalisasi navbar ke token existing: `bg-surface`, `text-ink`, `border-line`, `hover:bg-paper`, `text-leaf`, dan `text-muted-ink`. Hindari token navbar baru dan hardcoded warna dark mode.

## Scope
- Header desktop.
- Mobile menu.
- Cart trigger dan cart preview.
- Account dropdown.
- Theme control.
- Focus, hover, active, dan disabled states.

## Non-goals
- Tidak mengubah palette token global.
- Tidak mengubah layout navbar.
- Tidak mengubah landing page, checkout, atau cart behavior.
- Tidak menambah dependency.

## Success
Navbar light dan dark memakai hirarki warna sama: surface sebagai bidang, paper sebagai hover, ink sebagai teks utama, muted-ink sebagai teks sekunder, line sebagai border, leaf sebagai aksen.
