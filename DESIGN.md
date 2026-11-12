# Project Design Context

## Project

- Name: Casayur
- Product type: Neighborhood produce stall for sayur, lotek, gorengan, and sembako
- Stack: Laravel 12, Inertia, React 19, Tailwind CSS v4, MySQL
- Color mode: Light and dark, with system preference
- Density: Comfortable, readable at 360 px

## Direction

**Papan warung pagi.** Casayur is designed like the noticeboard at a small morning produce stall: what is available today, when preorder opens, how far delivery reaches, and how much it costs. Information comes first, decoration second. The page should feel like a trusted neighborhood shop, not a software landing page.

## Dials

| Dial | Value | Reason |
|---|---|---|
| ENERGY | 2 | Confident enough to feel alive, calm enough to feel trustworthy. |
| RHYTHM | 3 | Asymmetric hero, product grid, ledger rows, and a real sequence. |
| MOTION | 2 | One page-load moment, one slow marquee, and feedback on action. |

## Palette

| Token | Light | Dark | Use |
|---|---|---|---|
| `--paper` | `#F3F7F1` | `#0E1511` | Page background |
| `--surface` | `#FFFFFF` | `#141D17` | Cards and panels |
| `--ink` | `#17231B` | `#EDF4EE` | Primary text |
| `--muted-ink` | `#5A6B5E` | `#9DB0A2` | Secondary text |
| `--leaf` | `#1F6B47` | `#6FC596` | Primary action |
| `--leaf-deep` | `#145033` | `#3E8F63` | Hover and dark fields |
| `--turmeric` | `#D4931F` | `#F0B64B` | Only preorder and urgency |
| `--line` | `#D6E0D2` | `#26342A` | Borders and rules |
| `--danger` | `#B3402C` | `#E07A63` | Errors and cancellation |

Green is action. Turmeric is time. Red is only an error.

## Typography

- Display: Bricolage Grotesque. Organic, slightly irregular, and confident at large sizes.
- Body and UI: Instrument Sans. Neutral, friendly, and legible at small sizes.
- Amounts: Instrument Sans with tabular numerals.

Do not use Inter, Geist, or Space Grotesk as the display face.

## Layout

- Content width: 1200 px maximum.
- Gutters: `clamp(20px, 5vw, 48px)`.
- Header: 64 px, sticky, no glass blur.
- Hero: two columns 7/5, height `clamp(520px, 64vh, 640px)`.
- Catalog: 2 columns on phones, 3 on tablets, 4 on desktop.
- Services: one ledger with rows, not four identical cards.
- How to order: an ordered three-step sequence.
- Checkout: receipt-style summary with inline errors.

## Motion

- Page load: header settles in, three hero elements rise 10 px, PO board scales from 0.98 to 1. 600 ms total, 60 ms stagger.
- Marquee: 50 seconds per loop, pauses on hover and focus, stops under reduced motion.
- Product card: 2 px lift on hover, 2 degree mark rotation, no large shadow.
- Add to cart: cart count pops to 1.15 and returns, button shows a check for 1.2 seconds.
- Theme change: 150 ms color transition only.

## Must

- Show PO hours as 09.00 - 12.00 WIB from the server.
- Show shipping and COD rules that the backend actually applies.
- Keep all primary actions at least 44 px tall and keyboard reachable.
- Respect `prefers-reduced-motion`.
- Include text with every status color.

## Avoid

- Centered hero with an eyebrow pill, giant title, and decorative marquee.
- Identical rounded cards for every section.
- Ratings, review counts, testimonials, or product photos that are not real.
- Hover-only actions.
- Decorative gradients, glows, and infinite floating elements.
- Em dashes in interface copy.

## Decisions

- The testimonial section is replaced by a factual "Cara pesan" sequence until real reviews exist.
- Product visuals are original category marks, not stock photos pretending to be the product.
- The shared cart lives in `localStorage` for the front end. Order persistence is still a known gap.
- COD is available up to 5 km for both Ready and PO. The Ready limit is a builder decision.
