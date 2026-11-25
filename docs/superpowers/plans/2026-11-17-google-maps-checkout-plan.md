# Google Maps Checkout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace visible latitude/longitude inputs with Google Places address selection and align checkout colors with Casayur tokens.

**Architecture:** Load Google Maps JavaScript API only when `VITE_GOOGLE_MAPS_API_KEY` exists. Autocomplete writes selected formatted address and hidden coordinates to checkout state; backend contract keeps coordinates for radius and shipping validation. Reuse existing checkout layout and CSS variables.

**Tech Stack:** Laravel Inertia, React JSX, Google Maps JavaScript API Places library, Tailwind CSS.

**Spec:** Existing approved checkout Maps design.

## Global Constraints
- User never types or sees latitude/longitude.
- Backend remains source of truth for distance, shipping, stock, and totals.
- Google API key comes from `VITE_GOOGLE_MAPS_API_KEY`; no hardcoded key.
- Preserve `resources/js/pages/Pesanin.tsx`.
- Use existing Casayur CSS tokens; no new color palette.

## Review Focus
- Missing API key keeps manual address fallback usable.
- Google script failure keeps checkout usable with manual address.
- Selecting place sends hidden coordinates to backend.
- Existing COD, pickup, delivery, and cart behavior remains intact.

### Task 1: Add address picker
- Modify `resources/js/pages/Checkout.jsx`.
- Add script loader and Places Autocomplete with address fallback.
- Remove visible lat/lng fields; retain hidden `lat/lng` state.
- Add failing backend/page assertion only if contract changes.

### Task 2: Align visual tokens
- Modify `resources/js/pages/Checkout.jsx`.
- Replace direct emerald/slate palette classes with existing Casayur token classes.
- Preserve layout, spacing, and interaction states.

### Task 3: Verify
- Run `php artisan test`.
- Run `npm run build`.
- Run `git diff --check`.
