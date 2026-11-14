# Cart Hover Preview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans.

**Goal:** Show current cart products in an accessible navbar popover on hover/focus.

**Architecture:** Add small local popover component inside `site-header.tsx`, consuming existing `useCart()` state. Keep cart trigger navigation and checkout unchanged.

**Tech Stack:** React, TypeScript, Tailwind CSS, existing Lucide icons.

**Spec:** `docs/superpowers/specs/2026-11-14-cart-hover-preview-design.md`

## Global Constraints
- No new dependency.
- Do not modify `Checkout.jsx` or `Pesanin.tsx`.
- Use existing cart context and Casayur tokens.
- Preserve keyboard access and responsive behavior.

## Review Focus
- Empty cart state.
- Many items scroll without overflowing viewport.
- Hovering from trigger into popover keeps it open.
- Keyboard focus opens popover and trigger remains a real link.

### Task 1: Navbar cart preview

**Files:**
- Modify: `resources/js/components/casayur/site-header.tsx`
- Create: `resources/js/components/casayur/cart-preview.tsx`

**Interfaces:**
- `CartPreview` consumes `items: CartItem[]` and `count: number` from `useCart()`.
- Existing cart link remains `/checkout`.

- [ ] Add `CartPreview` with product rows, quantities, line totals, total, empty state, and checkout link.
- [ ] Wrap navbar cart control in hover/focus container; keep popover open while pointer enters preview.
- [ ] Add accessible labels, focus styles, max-height scrolling, and responsive width.
- [ ] Run `npm run build`.
- [ ] Commit `feat: preview cart from navbar`.
