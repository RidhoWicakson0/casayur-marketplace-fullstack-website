# Testimonial Marquee Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add themed, accessible 3D vertical testimonial marquee to Casayur landing page.

**Architecture:** Reusable `Marquee`, shadcn-style `Card` and `Avatar`, plus a landing-page testimonial section. Existing Tailwind v4 tokens and `cn` utility remain source of truth.

**Tech Stack:** React, TypeScript, Inertia, Tailwind CSS v4, Radix Avatar.

**Spec:** `docs/superpowers/specs/2026-11-11-testimonial-marquee-design.md`

## Global Constraints
- Components live in `resources/js/components/ui`.
- Styles live in `resources/css/app.css`.
- No decorative emoji.
- Theme classes must support light and dark modes.
- Motion must pause on hover/focus and honor reduced motion.
- Testimonial copy remains sample content until replaced by verified reviews.

## Review Focus
- Reduced-motion users see a non-moving usable testimonial layout; verify CSS media behavior.
- Keyboard users can focus marquee; verify focus and pause behavior.
- Dark mode keeps cards, text, overlays readable; verify theme classes.
- Missing avatar image falls back to initials; verify `AvatarFallback`.
- Small screens do not overflow horizontally; verify responsive container.

### Task 1: Dependencies and shadcn primitives

**Files:**
- Modify: `package.json`, lockfile
- Create/modify: `resources/js/components/ui/card.tsx`
- Create/modify: `resources/js/components/ui/avatar.tsx`

- [ ] Install `@radix-ui/react-avatar`.
- [ ] Add shadcn-compatible `Card`, `CardContent`, and related exports.
- [ ] Add shadcn-compatible `Avatar`, `AvatarImage`, and `AvatarFallback`.
- [ ] Run TypeScript/build check.

### Task 2: Marquee component and animations

**Files:**
- Create: `resources/js/components/ui/3d-testimonails.tsx`
- Modify: `resources/css/app.css`

- [ ] Implement typed `Marquee` with `vertical`, `reverse`, `pauseOnHover`, `repeat`, ARIA props, and keyboard focus.
- [ ] Add `marquee` and `marquee-vertical` keyframes and Tailwind v4 animation tokens.
- [ ] Ensure reduced-motion media query disables animation.
- [ ] Run `npm run build`.

### Task 3: Landing-page testimonial section

**Files:**
- Modify: `resources/js/pages/welcome.tsx`

- [ ] Add Casayur sample testimonial data with initials and no fabricated verification claims.
- [ ] Render four vertical marquee columns using `Card`, `Avatar`, and `Marquee`.
- [ ] Add `#testimoni` heading and place section before services.
- [ ] Apply existing light/dark tokens, responsive sizing, and gradient overlays.
- [ ] Run `npm run build` and inspect browser console.

### Task 4: Final verification

- [ ] Run `npm run build`.
- [ ] Verify light/dark theme, hover pause, keyboard focus, reduced motion, and mobile layout.
- [ ] Confirm no JSX/runtime errors.
