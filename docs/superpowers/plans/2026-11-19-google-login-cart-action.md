# Google Login Cart Action Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Require customer Google login before detail-page cart actions, then resume original action once.

**Architecture:** Add authenticated-user prop through shared Inertia props. Product detail intercepts actions for guests, stores pending action in session through a backend endpoint, then starts existing Google OAuth. OAuth callback redirects to a continuation URL; frontend performs add-to-cart or checkout once and clears the continuation.

**Tech Stack:** Laravel, Inertia React, existing Socialite Google integration, existing client cart context.

**Spec:** `docs/superpowers/specs/2026-11-19-google-login-cart-action-design.md`

## Global Constraints

- Customer Google OAuth only; never assign admin role.
- No dependency additions.
- Validate product ID and action server-side.
- Pending action is single-use.
- Preserve public design and existing cart behavior for authenticated users.

## Review Focus

- Guest action resumes exactly once after OAuth.
- Invalid action/product cannot enter session.
- OAuth cancellation does not add product or redirect checkout.
- Existing authenticated customer action bypasses OAuth.
- Admin role remains unchanged by Google callback.

---

### Task 1: Backend pending-action endpoint and continuation

**Files:**
- Modify: `routes/web.php`
- Create/modify: existing Google auth controller
- Test: `tests/Feature/Auth/GoogleCartActionTest.php`

- [ ] Add POST endpoint for pending product action with `product_id` and `action` (`cart` or `buy`), protected by guest/auth-compatible middleware.
- [ ] Validate product existence and action allowlist; store one pending action in session.
- [ ] Update Google callback to redirect to `/products/{id}?resume=cart` or `/products/{id}?resume=buy` after successful customer login, then forget session value.
- [ ] Keep Google callback role assignment customer-only.
- [ ] Add tests for valid storage, invalid input, callback continuation, and admin role preservation.
- [ ] Run targeted auth tests.

### Task 2: Product detail action gate

**Files:**
- Modify: `resources/js/pages/ProductDetail.tsx`
- Modify: shared Inertia auth props provider if needed

- [ ] Read authenticated-user state from Inertia props.
- [ ] For guest action, POST pending action endpoint then redirect to existing Google redirect URL.
- [ ] For authenticated user, preserve current cart and checkout behavior.
- [ ] On `resume=cart`, add current product once and remove query state.
- [ ] On `resume=buy`, add current product once and navigate to `/checkout`.
- [ ] Handle unavailable products without starting OAuth.
- [ ] Add no duplicate action on refresh.
- [ ] Run build.

### Task 3: Full verification

- [ ] Run `php artisan test --no-coverage`.
- [ ] Run `npm run build`.
- [ ] Run `git diff --check`.
- [ ] Confirm public product, detail, cart, and checkout routes remain available.
