# Community Testimonials Integration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace existing testimonial animation with community testimonial rows inside the single Tentang Casayur section.

**Architecture:** Add typed reusable testimonial component under `resources/js/components/ui`, reuse existing Tailwind 4 styles and Casayur tokens, then render it below concise Tentang copy. Remove old `StaggerTestimonials` usage.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, existing CSS animations.

**Spec:** Conversation-approved Tentang + testimonial design.

## Global Constraints

- Keep one `#tentang` section.
- Keep Casayur fonts and color tokens.
- No new dependency.
- Testimonial copy must describe Casayur services.
- Respect reduced motion.

## Review Focus

- Cards duplicate content for seamless scrolling and remain clipped horizontally.
- Reduced-motion users see no forced movement.
- Mobile cards do not overflow the page.
- Images have meaningful alt text.
- Existing old testimonial component is no longer rendered.

---

### Task 1: Community testimonial component

**Files:**
- Create: `resources/js/components/ui/community-testimonial.tsx`
- Modify: `resources/css/app.css`

- [ ] Add typed `TestimonialCard`, `HorizontalScroller`, and default `TestimonialsSection` using Casayur tokens, responsive cards, and reduced-motion CSS.
- [ ] Add `fadeInUp`, horizontal scroll keyframes, and mask utility in `app.css`.
- [ ] Verify TypeScript build accepts component.

### Task 2: Wire Tentang section

**Files:**
- Modify: `resources/js/pages/welcome.tsx`

- [ ] Replace `StaggerTestimonials` import and render with `TestimonialsSection`.
- [ ] Keep concise Tentang heading and description above animated testimonial rows.
- [ ] Remove old testimonial component usage.

### Task 3: Verify

- [ ] Run `npm run build`.
- [ ] Confirm no `StaggerTestimonials` reference remains in `welcome.tsx`.
- [ ] Confirm output contains one `id="tentang"` section and testimonial component render.
