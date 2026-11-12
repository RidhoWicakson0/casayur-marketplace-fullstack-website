# Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the default Laravel `welcome.tsx` into a functional, responsive Landing Page for Casayur, including hero carousel, dynamic product catalog, and service information, aligned with the Superly-inspired UI design.

**Architecture:** Replace the existing `welcome.tsx` with a new component structure. Use backend endpoints to fetch banners and products. Implement responsive design with Tailwind CSS, ensuring accessibility and correct empty/loading states.

**Tech Stack:** Laravel 12 (Controller/Routes), Inertia, React, Tailwind CSS.

**Spec:** `casayur-app/docs/superpowers/specs/2026-11-11-casayur-design.md`

## Global Constraints

- Radius: 20 km max.
- PO Time-gating: 09:00 - 12:00.
- Design: Clean, whitespace-focused, 4px/8px spacing, rounded corners.
- Tech: Laravel/Inertia/React.

## Review Focus

1. **PO Time-gating:** Does the "Add to Cart" button for PO products disable correctly when outside 09:00-12:00?
2. **Empty Catalog:** How does the page handle a zero-product database?
3. **Responsive Grid:** Do product cards stack properly on mobile and expand on desktop?
4. **Data Sync:** Do dynamic banners and products actually update from the DB?
5. **Accessibility:** Are keyboard navigation and focus states maintained?

---

### Task 1: Backend Infrastructure for Landing Page

**Files:**
- Create: `app/Http/Controllers/LandingController.php`
- Modify: `routes/web.php`
- Test: `tests/Feature/LandingPageTest.php`

**Interfaces:**
- Produces: `LandingController@index` (returns inertia 'Welcome')

- [ ] **Step 1: Write test for Landing Page routes**
- [ ] **Step 2: Run test (expected fail)**
- [ ] **Step 3: Create `LandingController` and add `orders.index` route alias if needed**
- [ ] **Step 4: Update `routes/web.php` to point `/` to `LandingController@index`**
- [ ] **Step 5: Run tests (expected pass)**
- [ ] **Step 6: Commit**

### Task 2: Landing Page Layout (Hero & Info)

**Files:**
- Modify: `resources/js/Pages/Welcome.jsx` (rename from `.tsx` if needed for consistency, or keep as `.tsx` as per current file)
- Test: Manual visual verification via `npm run dev`

**Interfaces:**
- Consumes: Landing Page data

- [ ] **Step 1: Scaffold basic hero section and service info layout**
- [ ] **Step 2: Implement dynamic PO status indicator**
- [ ] **Step 3: Implement banner carousel logic**
- [ ] **Step 4: Verify visually**
- [ ] **Step 5: Commit**

### Task 3: Product Catalog & Interaction

**Files:**
- Modify: `resources/js/Pages/Welcome.tsx`
- Test: `tests/Feature/LandingPageTest.php` (update to check for product display)

**Interfaces:**
- Consumes: Product list from backend

- [ ] **Step 1: Implement product grid with filter pills**
- [ ] **Step 2: Implement "Add to Cart" with loading/success states**
- [ ] **Step 3: Add Empty/Loading states**
- [ ] **Step 4: Verify tests**
- [ ] **Step 5: Commit**

### Task 4: Polish & Integration

**Files:**
- Modify: `resources/js/Pages/Welcome.tsx`, `resources/css/app.css`
- Test: Full `npm run build`

- [ ] **Step 1: Implement sticky cart and footer**
- [ ] **Step 2: Ensure responsiveness**
- [ ] **Step 3: Build frontend**
- [ ] **Step 4: Commit**
