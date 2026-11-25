# Product Card CTA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Simplify product cards to one clear add-to-cart CTA.

**Architecture:** Keep existing `ProductCard` cart behavior and replace its two-button grid with one full-width button using existing Casayur tokens and a cart icon.

**Tech Stack:** React, TypeScript, Tailwind CSS, Lucide React, Inertia cart context.

**Spec:** `docs/superpowers/specs/2026-11-18-product-card-cta-design.md`

## Global Constraints

- Keep `Tambah ke keranjang` behavior unchanged.
- Remove `Beli sekarang` from product cards.
- Preserve disabled, success, toast, stock, and preorder behavior.
- Keep minimum 44px tap target and focus visibility.

## Review Focus

- Out-of-stock products keep CTA disabled.
- Closed preorder products keep CTA disabled.
- Successful add still shows `Ditambahkan`.
- Product detail link remains independent from CTA.

---

### Task 1: Simplify ProductCard CTA

**Files:**
- Modify: `resources/js/components/casayur/product-card.tsx`

- [ ] Replace `Plus` import with `ShoppingCart` while retaining `Check`.
- [ ] Remove `router` import and `Beli sekarang` handler/button.
- [ ] Replace two-column button grid with one full-width button.
- [ ] Keep `handleAdd`, disabled state, toast, success label, and PO message unchanged.
- [ ] Run `npm run build`.
- [ ] Run `git diff --check`.
