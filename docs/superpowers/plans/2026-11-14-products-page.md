# Products Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans.

**Goal:** Add dedicated `/products` catalog page with Casayur navbar, footer, filtering, search, sorting, and responsive product grid.

**Architecture:** Reuse existing `ProductCard`, `SiteHeader`, `SiteFooter`, `CartContext`, and backend product payload. Add page-only derived filtering state; split route controller response from landing page.

**Tech Stack:** Laravel, Inertia, React, TypeScript, Tailwind CSS, Framer Motion.

**Spec:** User-approved product page design in conversation checkpoint.

## Global Constraints
- Do not modify `Pesanin.tsx` or `Checkout.jsx`.
- No new dependencies.
- Use real backend `Product[]`; no dummy data.
- Preserve theme, accessibility, responsive behavior, and cart interactions.

## Review Focus
- Empty product payload renders actionable empty state.
- PO filter respects existing `poOpen` behavior through `ProductCard`.
- Search is case-insensitive and whitespace-safe.
- Mobile grid remains usable.

### Task 1: Product page and route

**Files:**
- Create: `resources/js/pages/Products.tsx`
- Modify: `app/Http/Controllers/LandingController.php`
- Modify: `routes/web.php`
- Modify: `resources/js/app.tsx`

**Interfaces:**
- Page consumes `products: Product[]`, `poOpen: boolean`.
- Route returns Inertia page `Products`.

- [ ] Add page with search, category filter, stock toggle, sort, reset, empty state, existing cards, header/footer.
- [ ] Route `/products` to dedicated controller method/page.
- [ ] Register `Products` as no-layout Inertia page.
- [ ] Run `npm run types:check` and `npm run build`.
- [ ] Commit `feat: add dedicated products page`.
