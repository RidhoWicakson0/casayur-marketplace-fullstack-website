# Customer Custom Profile and Avatar Specification

## Goal
Replace default Laravel `/settings/profile` with dedicated customer-facing Profile page (`/profile`), allowing customers to view profile details, edit their name, and update profile photo (defaulting to Google OAuth profile picture on initial login).

## Scope & Requirements
1. **Database**:
   - Add `avatar` column (`text`, nullable) to `users` table.
   - `User` model appends `avatar_url` accessor (`http...` as is, or `asset('storage/' . $this->avatar)`).
2. **Google OAuth**:
   - In `GoogleController::callback()`, store `$google->getAvatar()` into `users.avatar` if not already set.
3. **Customer Profile Page (`/profile`)**:
   - Route: `GET /profile` and `POST /profile` (with `_method=PATCH` for multipart form file upload).
   - Dedicated Casayur frontend view (`resources/js/pages/Profile.tsx`) using `SiteHeader` and `SiteFooter`.
   - UI elements:
     - Avatar preview (displays Google photo or custom uploaded photo; fallback to user initials if none).
     - File input for uploading photo (image formats: jpeg, png, jpg, webp; max 2MB).
     - Form to edit `name`.
     - Readonly `email` (login identity).
     - Member badge & quick link to Riwayat Pesanan (`/history`).
4. **Header Avatar Navigation**:
   - In `SiteHeader`, avatar displays `user.avatar_url` via `<AvatarImage src={user.avatar_url} />`.
   - Displays real photo instead of initials when present.
   - Menu link "Edit Profil" points directly to `/profile`.

## Non-Goals
- Changing admin profile or admin authentication flow.
- Adding third-party storage or crop dependencies (use native browser preview + native Laravel storage).
