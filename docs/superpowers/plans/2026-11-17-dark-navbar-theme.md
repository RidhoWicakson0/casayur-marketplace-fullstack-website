# Dark Navbar Theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans.

**Goal:** Normalize navbar dark-theme colors to existing Casayur design tokens.

**Architecture:** Keep existing navbar structure and behavior. Replace inconsistent hardcoded/dark utility colors in header and dropdown with shared Casayur tokens already defined in `app.css`.

**Tech Stack:** React, TypeScript, Tailwind CSS, CSS custom properties.

**Spec:** `docs/superpowers/specs/2026-11-17-dark-navbar-theme-design.md`

## Global Constraints
- Do not add new color tokens.
- Do not change navbar layout or interactions.
- Preserve light theme and dark theme.
- No new dependencies.

## Review Focus
- Header surface and border remain visible in dark mode.
- Dropdown hover uses paper surface, not light red/white colors.
- Mobile menu matches desktop navbar.
- Focus rings remain visible in both themes.

### Task 1: Normalize navbar tokens

**Files:**
- Modify: `resources/js/components/casayur/site-header.tsx`
- Modify: `resources/js/components/casayur/cart-preview.tsx`

**Interfaces:**
- Preserve existing `SiteHeader`, `CartPreview`, and cart/theme APIs.

- [ ] Replace remaining non-token navbar colors and hover states with Casayur tokens.
- [ ] Ensure dropdown, mobile menu, controls, and cart preview share surface/text/border hierarchy.
- [ ] Run `npm run build`.
- [ ] Review light/dark class diff for unintended layout changes.
- [ ] Commit `fix: align navbar dark theme colors`.
