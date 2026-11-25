# Casayur Auth Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Audit and fix login, build Casayur register screen, and replace Laravel branding in auth.

**Architecture:** Keep Laravel Fortify and Inertia form submissions. Share Casayur visual language and logo across login/register, while backend controls role redirects and OAuth restrictions.

**Tech Stack:** Laravel Fortify, Inertia React, TypeScript, Tailwind CSS, PHPUnit.

**Spec:** `docs/superpowers/specs/2026-11-18-casayur-auth-design.md`

## Global Constraints

- Admin login uses email/password and redirects to `/admin`.
- Google remains customer-only.
- Preserve CSRF, validation, rate limiting, and session behavior from Fortify.
- Do not change non-auth page design.
- No Laravel logo or Laravel branding in auth UI.

## Review Focus

- Invalid login shows server errors without losing form usability.
- Admin login does not hit email verification route.
- Customer registration creates `customer` role.
- Register password confirmation and validation errors render correctly.
- Google link does not send role input or expose admin flow.

---

### Task 1: Add auth regression coverage

**Files:**
- Modify: `tests/Feature/Auth/AuthenticationTest.php`
- Modify: `tests/Feature/Auth/AdminRoleTest.php`
- Create or modify: `tests/Feature/Auth/RegistrationTest.php`

- [ ] Add test that admin login redirects to `admin.dashboard`.
- [ ] Add test that customer registration succeeds and persists `role=customer`.
- [ ] Add test that registration validation rejects mismatched passwords.
- [ ] Run targeted tests and confirm new tests fail only where behavior/UI contract is missing.

### Task 2: Shared Casayur logo

**Files:**
- Modify: `resources/js/components/app-logo-icon.tsx`
- Modify: `resources/js/layouts/auth/auth-simple-layout.tsx`
- Search and update auth-only Laravel branding references.

- [ ] Replace Laravel mark paths with Casayur SVG mark.
- [ ] Keep component props and existing imports compatible.
- [ ] Ensure accessible label/title remains available through surrounding link or `aria-hidden` icon behavior.

### Task 3: Casayur register page

**Files:**
- Modify: `resources/js/pages/auth/register.tsx`
- Reuse: `resources/js/pages/auth/login.tsx`, existing UI primitives and route helpers.

- [ ] Preserve existing Inertia `Form` and registration route.
- [ ] Build responsive Casayur layout matching login.
- [ ] Include name, email, password, password confirmation, field errors, processing state, login link, and Google customer link only if existing flow supports it.
- [ ] Remove Laravel-specific copy and branding.
- [ ] Keep keyboard labels, focus styles, and mobile layout.

### Task 4: Login audit and fixes

**Files:**
- Modify: `resources/js/pages/auth/login.tsx`
- Modify: `app/Http/Responses/LoginResponse.php` only if tests expose redirect bug.
- Modify: `app/Http/Controllers/Auth/GoogleController.php` only if audit exposes role injection or admin OAuth issue.

- [ ] Verify form field names match Fortify: `email`, `password`, `remember`.
- [ ] Verify errors map to server field names.
- [ ] Verify Google URL matches registered route.
- [ ] Verify login status and processing states remain visible.
- [ ] Fix only confirmed defects.

### Task 5: Verification and branding audit

- [ ] Run `php artisan test tests/Feature/Auth`.
- [ ] Run `php artisan test`.
- [ ] Run `npm run build`.
- [ ] Run `git diff --check`.
- [ ] Search auth source for `Laravel` and `AppLogoIcon` references; remove only branding references, not required framework code.
- [ ] Audit role and Google routes for unauthorized role input.
