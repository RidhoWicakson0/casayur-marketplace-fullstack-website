# Cart Hover Preview Design

## Intent
Show cart contents when user hovers or focuses cart control in navbar, so user sees selected products without leaving current page.

## Behavior
- Desktop: popover opens on pointer hover over cart trigger.
- Keyboard: popover opens on focus and remains keyboard reachable.
- Mobile: popover opens on tap/focus; cart trigger remains navigable to `/checkout`.
- Empty cart: show clear empty state and checkout action remains available.
- Popover lists product name, quantity, line total, and cart total.
- Existing `CartContext` remains source of truth.

## UI
- Reuse Casayur tokens: `bg-surface`, `border-line`, `text-ink`, `text-muted-ink`, `text-leaf`.
- Position popover below navbar cart control, aligned to end.
- Limit list height and allow scrolling for many products.
- Use visible focus states and accessible labels.
- No new dependency.

## Non-goals
- No quantity editing inside preview.
- No change to checkout page or cart persistence.
- No change to `Pesanin.tsx` or `Checkout.jsx`.
