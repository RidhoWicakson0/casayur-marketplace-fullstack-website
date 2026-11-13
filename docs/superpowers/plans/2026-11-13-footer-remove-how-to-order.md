# Footer Refresh and Cara Pesan Removal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Casayur landing-page footer with reference-inspired responsive footer and remove Cara Pesan section from landing page.

**Architecture:** Adapt existing `SiteFooter` in place to preserve its public API and routes. Remove only `HowToOrder` rendering from `welcome.tsx`; retain component file for other pages.

**Tech Stack:** React, TypeScript, Tailwind CSS 4, Inertia.

**Spec:** Approved footer and landing-page cleanup plan from conversation.

## Global Constraints

- Preserve Casayur tokens, fonts, theme support, and existing valid routes.
- Footer must remain responsive and keyboard accessible.
- Remove `Cara pesan` footer link because section no longer exists.
- Do not delete `how-to-order.tsx`.
- Do not change `Pesanin.tsx` or `Checkout.jsx`.

## Review Focus

- Footer links point to existing routes or anchors.
- Dark mode keeps footer text readable.
- Mobile footer columns stack without horizontal overflow.
- Landing page has no `cara-pesan` section.
- Footer remains rendered once.

---

### Task 1: Adapt SiteFooter

**Files:**
- Modify: `resources/js/components/casayur/site-footer.tsx`

- [ ] Replace current footer layout with reference-inspired brand block, navigation columns, contact details, and bottom copyright row.
- [ ] Preserve `Link`, `login`, and `register` destinations.
- [ ] Remove `Cara pesan` anchor.

### Task 2: Remove Cara Pesan from landing page

**Files:**
- Modify: `resources/js/pages/welcome.tsx`

- [ ] Remove `HowToOrder` import.
- [ ] Remove `<HowToOrder />` render.
- [ ] Keep `HowToOrder` component file untouched.

### Task 3: Verify

- [ ] Run `npm run build`.
- [ ] Confirm `welcome.tsx` has no `HowToOrder` reference.
- [ ] Confirm `site-footer.tsx` has no `cara-pesan` or `Cara pesan` link.
