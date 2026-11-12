# Testimonial Marquee Design

## Intent
Add testimonial section to Casayur landing page using 3D vertical marquee cards. Build trust without inventing real customer claims; content remains clearly sample content until replaced with verified reviews.

## Goals
- Add responsive `#testimoni` section before services/footer.
- Use reusable shadcn-style `Marquee`, `Card`, and `Avatar` components.
- Support light/dark theme tokens and keyboard focus.
- Pause marquee on hover/focus and respect reduced motion.

## Non-goals
- No backend review model or submission form.
- No new animation library; use existing Tailwind keyframes.
- No decorative emoji or unverifiable social-proof claims.

## Approach
Use four vertical marquee columns based on supplied component, adapted to Casayur colors, Indonesian sample copy, and existing `cn` utility. This best matches requested reference. Horizontal/static alternatives lose requested 3D marquee behavior.

## Files
- `resources/js/components/ui/3d-testimonails.tsx`
- `resources/js/components/ui/card.tsx`
- `resources/js/components/ui/avatar.tsx`
- `resources/css/app.css`
- `resources/js/pages/welcome.tsx`
- `package.json` / lockfile

## Content
Use clearly labeled sample testimonials with initials and no fake identities presented as verified customers. Replace content later with real reviewed data.

## Verification
Run `npm run build`; inspect JSX and TypeScript errors.
