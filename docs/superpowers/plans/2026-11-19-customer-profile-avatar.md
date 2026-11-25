# Customer Custom Profile and Avatar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a standalone customer Profile page (`/profile`) with photo upload and Google avatar synchronization, replacing the default Laravel settings profile.

**Architecture:** Add `avatar` column to `users` table and `avatar_url` accessor on `User` model. Update Google OAuth callback to persist Google picture into `avatar`. Create `Customer/ProfileController` for handling profile view and updates. Create `resources/js/pages/Profile.tsx` styled with Casayur theme tokens. Update `SiteHeader` to display `avatar_url` and link "Edit Profil" to `/profile`.

**Tech Stack:** Laravel, Eloquent, Inertia React, Tailwind CSS, Lucide icons.

**Spec:** `docs/superpowers/specs/2026-11-19-customer-profile-avatar-design.md`

## Global Constraints

- No third-party dependencies added.
- Customer avatar upload validates max 2048KB, mime types: jpeg, png, jpg, webp.
- Existing admin auth and profile flows remain intact.
- Standalone profile page uses Casayur header, footer, and theme tokens.

## Review Focus

- Initial Google login stores Google photo URL in `avatar`.
- Subsequent custom upload updates `avatar` to stored path in `storage/avatars`.
- Avatar in `SiteHeader` displays image when `avatar_url` is present, falling back to initials/icon.
- Name updates succeed with validation.
- Unauthenticated access redirects to `/login`.

---

### Task 1: Database Migration and Model Avatar Accessor

**Files:**
- Create: `database/migrations/2026_11_19_000001_add_avatar_to_users_table.php`
- Modify: `app/Models/User.php`
- Modify: `app/Http/Controllers/Auth/GoogleController.php`
- Test: `tests/Feature/CustomerProfileTest.php`

- [ ] Write migration adding nullable `avatar` text column to `users` table.
- [ ] Run `php artisan migrate`.
- [ ] Add `avatar` to `#[Fillable]` and `avatar_url` accessor + `$appends` on `User.php`.
- [ ] Update `GoogleController::callback` to save `$google->getAvatar()` into `users.avatar` if empty.
- [ ] Write unit/feature tests for `avatar_url` accessor and Google callback avatar persistence.

### Task 2: Customer Profile Controller and Routes

**Files:**
- Create: `app/Http/Controllers/Customer/ProfileController.php`
- Modify: `routes/web.php`
- Test: `tests/Feature/CustomerProfileTest.php`

- [ ] Create `Customer/ProfileController.php` with `show` (renders `Profile`) and `update` (validates name & optional avatar image, stores file, deletes old storage file if local, updates user).
- [ ] Register `GET /profile` and `POST /profile` in `routes/web.php` under `auth` middleware.
- [ ] Test profile view, update name, and update photo with uploaded file.

### Task 3: Standalone Profile View and Header Avatar Rendering

**Files:**
- Create: `resources/js/pages/Profile.tsx`
- Modify: `resources/js/components/casayur/site-header.tsx`

- [ ] Create `Profile.tsx` with identity card, avatar preview, file picker with instant preview, name form, email display, and quick links.
- [ ] In `site-header.tsx`, pass `user.avatar_url` to `AvatarImage src` and update "Edit Profil" link to `/profile`.
- [ ] Run `npm run build`.

### Task 4: Full Verification

- [ ] Run `php artisan test --no-coverage`.
- [ ] Run `npm run build`.
- [ ] Run `git diff --check`.
