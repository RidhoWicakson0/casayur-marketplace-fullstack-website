# Admin Product CRUD and Analytics Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add secure product CRUD, local image uploads, and monthly order/revenue charts while preserving public frontend design.

**Architecture:** Extend products with nullable description/image path. Admin controller owns validation and storage lifecycle. Dashboard controller sends 12-month completed-order aggregates; React renders native SVG/CSS charts. Public card/detail consume new fields without layout redesign.

**Tech Stack:** Laravel, Eloquent, SQLite/MySQL, Laravel Storage, Inertia React, Tailwind CSS, native SVG.

**Spec:** `docs/superpowers/specs/2026-11-18-admin-product-crud-analytics-design.md`

## Global Constraints

- Public frontend design stays unchanged.
- Photos use `public` disk, jpeg/png/webp, max 2 MB.
- Completed orders only count toward omzet.
- All admin endpoints remain auth + EnsureAdmin protected.
- No chart or storage dependency added.

## Review Focus

- Invalid image MIME/size is rejected.
- Replacing image deletes only previous stored product image.
- Deleting product removes its stored image.
- Customer cannot access CRUD endpoints.
- Monthly chart includes zero-value months and excludes non-completed orders.

---

### Task 1: Product fields and storage lifecycle

**Files:**
- Create: `database/migrations/*_add_description_and_image_path_to_products.php`
- Modify: `app/Models/Product.php`
- Modify: `app/Http/Controllers/Admin/ProductController.php`
- Test: `tests/Feature/Admin/ProductManagementTest.php`

- [ ] Add failing tests for description/image upload, invalid file rejection, update replacement, and delete cleanup.
- [ ] Run targeted tests and confirm failure.
- [ ] Add nullable fields and fillable attributes.
- [ ] Validate text, numeric fields, and image MIME/size.
- [ ] Store uploaded image under `products/`, delete previous path on replacement, delete path on destroy.
- [ ] Add destroy route/controller action if absent.
- [ ] Run targeted tests and confirm pass.

### Task 2: Admin product UI

**Files:**
- Modify: `resources/js/pages/Admin/Products/Index.jsx`

- [ ] Add create/edit form fields for name, category, price, stock, description, and photo.
- [ ] Submit multipart form through Inertia with correct create/update method.
- [ ] Add edit and delete controls with confirmation.
- [ ] Display image preview/current image, validation errors, processing state, and empty state.
- [ ] Keep existing admin shell and public design untouched.
- [ ] Run `npm run build`.

### Task 3: Monthly dashboard analytics

**Files:**
- Modify: `app/Http/Controllers/Admin/DashboardController.php`
- Modify: `resources/js/pages/Admin/Dashboard.jsx`
- Test: `tests/Feature/Admin/DashboardAnalyticsTest.php`

- [ ] Add failing test with completed and pending orders across months.
- [ ] Assert 12 monthly points, completed-only omzet, and completed-only order count.
- [ ] Implement database-appropriate monthly aggregation with zero-filled months.
- [ ] Add native responsive SVG/CSS charts for omzet and pesanan per month.
- [ ] Keep existing stat cards and recent/low-stock sections.
- [ ] Run analytics tests and build.

### Task 4: Public frontend data integration

**Files:**
- Modify: `app/Http/Controllers/LandingController.php` only if serialization is needed.
- Modify: `resources/js/components/casayur/product-card.tsx` only for image fallback.
- Modify: `resources/js/pages/ProductDetail.tsx` only for image/description fallback.

- [ ] Add `image_url` and description data to existing product props without changing public layout.
- [ ] Render uploaded image when present; retain existing ProduceMark/fallback when absent.
- [ ] Render description where existing detail content supports it; no redesign.
- [ ] Run existing product and landing tests.

### Task 5: Final verification

- [ ] Run `php artisan migrate`.
- [ ] Run `php artisan storage:link` if link is absent.
- [ ] Run `php artisan test`.
- [ ] Run `npm run build`.
- [ ] Run `git diff --check`.
- [ ] Audit all admin product routes for auth + EnsureAdmin.
- [ ] Confirm no public frontend layout redesign occurred.
