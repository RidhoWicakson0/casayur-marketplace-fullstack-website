# Casayur Marquee Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrasikan hero marquee terkontrol dengan dukungan tema terang/gelap serta aksesibilitas.

**Architecture:** Menggunakan komponen `hero-3.tsx` yang dipindahkan ke `resources/js/components/ui/` agar dikenali alias `@/components/ui/`. Integrasi ke `welcome.tsx` akan menggantikan hero lama dengan komponen baru yang mendukung state tema dan `reduced-motion`.

**Tech Stack:** React, Tailwind CSS, Framer Motion, Typescript.

**Spec:** `docs/superpowers/specs/2026-11-11-casayur-controlled-marquee-design.md`

## Global Constraints

- Gunakan palet Casayur (Hijau/Amber), bukan warna merah demo.
- Tidak ada dependency baru kecuali `framer-motion` (sudah terpasang).
- Semua animasi wajib menghormati `prefers-reduced-motion`.
- Landing page harus tetap responsif dan keyboard-accessible.

## Review Focus

- **Tema Tidak Berubah:** Pengguna berpindah tema, warna hero tidak mengikuti. (Test: toggle theme, assert classes on main element)
- **Animasi Agresif:** Marquee tidak berhenti saat fokus. (Test: focus marquee, check pause state)
- **Aksesibilitas:** Gambar marquee tidak punya alt. (Test: inspect image alt)
- **Layout Mobile:** Marquee overflow di layar kecil. (Test: shrink viewport, assert overflow-hidden)
- **Performance:** Gambar berat dimuat sekaligus. (Test: check eager/lazy loading behavior)

---

### Task 1: Setup Komponen Marquee

**Files:**
- Modify: `components/ui/hero-3.tsx` (sesuaikan palet warna, hapus warna merah)
- Move: `components/ui/hero-3.tsx` to `resources/js/components/ui/hero-3.tsx`

**Interfaces:**
- Produces: `AnimatedMarqueeHero`

- [ ] **Step 1: Edit `hero-3.tsx` untuk palet Casayur**
      Ganti bg-red-500/red-600 menjadi bg-emerald-600/emerald-700.
- [ ] **Step 2: Pindahkan komponen**
      `mv components/ui/hero-3.tsx resources/js/components/ui/hero-3.tsx`
- [ ] **Step 3: Commit**

### Task 2: Integrasi Landing Page

**Files:**
- Modify: `resources/js/pages/welcome.tsx`
- Test: `tests/Feature/LandingPageTest.php`

**Interfaces:**
- Consumes: `AnimatedMarqueeHero`

- [ ] **Step 1: Tambahkan State Tema dan Marquee**
      Import `framer-motion` dan `AnimatedMarqueeHero`. Tambahkan state `theme` dan logika `systemDark`.
- [ ] **Step 2: Ganti Hero Section**
      Hapus bagian hero lama, pasang `AnimatedMarqueeHero`.
- [ ] **Step 3: Tambahkan Toggle Tema**
      Pasang `<select>` untuk pemilihan tema di header.
- [ ] **Step 4: Run Tests**
      `php artisan test tests/Feature/LandingPageTest.php`
- [ ] **Step 5: Run Build**
      `npm run build`
- [ ] **Step 6: Commit**
