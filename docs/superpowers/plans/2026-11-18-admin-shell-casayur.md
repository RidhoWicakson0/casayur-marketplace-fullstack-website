# Admin Shell Casayur Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Laravel starter shell on admin pages with Casayur admin navigation.

**Architecture:** Create a small Inertia React `AdminLayout` with desktop sidebar and mobile menu. Select it for `Admin/*` pages in `app.tsx`; keep admin controllers and existing page props unchanged.

**Tech Stack:** React, TypeScript, Inertia React, Tailwind CSS, Lucide React.

**Spec:** `docs/superpowers/specs/2026-11-18-admin-shell-casayur-design.md`

## Global Constraints

- Only `Admin/*` pages use new shell.
- Customer/public pages keep existing layouts.
- Admin authorization remains backend `EnsureAdmin`.
- Navigation uses existing URLs and logout POST route.
- No new dependency.

## Review Focus

- Admin pages no longer render Laravel sidebar.
- Mobile menu exposes all admin links and closes after navigation.
- Logout remains POST, not GET.
- Keyboard focus and `aria-expanded` work on mobile toggle.

---

### Task 1: Admin layout shell

**Files:**
- Create: `resources/js/layouts/admin-layout.tsx`
- Create: `resources/js/layouts/admin/admin-shell.tsx`
- Modify: `resources/js/app.tsx`

- [ ] Build sidebar with Casayur logo, Dashboard, Produk, Pesanan, Laporan Penjualan, and POST logout form.
- [ ] Build mobile topbar/menu with `aria-expanded` and `aria-controls`.
- [ ] Use existing route URLs and token classes.
- [ ] Route `name.startsWith('Admin/')` to `AdminLayout` before default `AppLayout`.
- [ ] Run `npm run build`.
- [ ] Run `php artisan test tests/Feature/Admin tests/Feature/Auth/AdminRoleTest.php`.
- [ ] Run `git diff --check`.
