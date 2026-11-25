# Admin Dashboard Visual Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh admin shell and dashboard using Casayur landing tokens without changing public frontend.

**Architecture:** Refactor existing admin shell only. Keep Laravel/Inertia props, routes, and backend unchanged. Add collapsible desktop sidebar, mobile menu, admin header, and token-based dashboard visual hierarchy.

**Tech Stack:** React, TypeScript/JSX, Inertia React, Tailwind, lucide-react.

**Spec:** `docs/superpowers/specs/2026-11-19-admin-dashboard-visual-refresh-design.md`

## Global Constraints

- Do not modify customer/public pages.
- Use existing Casayur tokens only.
- No new dependency.
- Preserve existing routes, props, and admin authorization.
- No dummy or random data.

## Review Focus

- Public frontend files remain unchanged.
- Sidebar collapse does not hide keyboard focus or navigation labels incorrectly.
- Mobile navigation remains accessible and closes after navigation.
- Dark mode uses existing token values, not hard-coded blue/gray palette.
- Existing dashboard data still renders when arrays are empty.

---

### Task 1: Admin shell refresh

**Files:**
- Modify: `resources/js/layouts/admin/admin-shell.tsx`

- [ ] Add collapsible desktop sidebar state with `aria-expanded` and `aria-controls`.
- [ ] Add active route styling using Casayur tokens.
- [ ] Add admin header with page context, theme toggle, and profile indicator without changing auth behavior.
- [ ] Keep mobile menu and POST logout functional.
- [ ] Run `npm run build`.

### Task 2: Dashboard visual hierarchy

**Files:**
- Modify: `resources/js/pages/Admin/Dashboard.jsx`

- [ ] Keep existing `statistics`, `monthly`, `recent_orders`, and `low_stock_products` props.
- [ ] Restyle stat cards, charts, activity, and low-stock sections using `paper`, `surface`, `ink`, `leaf`, `turmeric`, and `line`.
- [ ] Add non-dummy activity presentation from existing recent orders.
- [ ] Preserve empty states and responsive layout.
- [ ] Run `npm run build`.

### Task 3: Admin page consistency

**Files:**
- Modify only if needed: `resources/js/pages/Admin/Products/Index.jsx`, `resources/js/pages/Admin/Orders/Index.jsx`, `resources/js/pages/Admin/Reports/Sales.jsx`

- [ ] Align admin-only surfaces with Casayur tokens.
- [ ] Do not alter forms, routes, backend props, or public pages.
- [ ] Run full Laravel tests and `npm run build`.

### Task 4: Final verification

- [ ] Run `php artisan test --no-coverage`.
- [ ] Run `npm run build`.
- [ ] Run `git diff --check`.
- [ ] Confirm `git diff --name-only` contains no public/customer files.
