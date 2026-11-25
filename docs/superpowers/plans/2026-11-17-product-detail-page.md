# Casayur Product Detail Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build real product detail page at `/products/{product}` using existing Casayur Inertia, Tailwind, tokens, navbar, footer, and cart behavior.

**Architecture:** Laravel route/controller supplies one `Product` record and `poOpen`. Inertia page renders reference-inspired two-column product content with Casayur tokens. Cart action calls existing `CartContext`; no Next.js, shadcn dependency, new image asset, or visual redesign of existing pages.

**Tech Stack:** Laravel, Inertia React, TypeScript, Tailwind CSS, existing Lucide and Casayur components.

**Spec:** User-provided ecommerce5 reference, adapted to existing Casayur design.

## Global Constraints

- Do not modify `resources/js/pages/Pesanin.tsx`.
- Do not modify `resources/js/pages/Checkout.jsx` in this feature.
- Preserve existing navbar, footer, product card, cart context, colors, spacing language, and dark mode.
- Do not install `next`, `@radix-ui/react-slot`, or duplicate shadcn `Badge`/`Button`; repo is Laravel Inertia, not Next.js.
- Do not invent rating, review count, warranty, original price, or product image data.
- Product detail must use real backend `Product` data.
- Product with stock zero or closed PO cannot be added to cart.
- Add visible keyboard focus and disabled states.
- Responsive layout must work at mobile and desktop widths.
- Use existing Casayur tokens: `bg-paper`, `bg-surface`, `text-ink`, `text-muted-ink`, `text-leaf`, `text-turmeric`, `border-line`.
- Visual direction: ENERGY 2, RHYTHM 2, MOTION 1. Product information is focal point; no decorative motion beyond existing interaction states.

## Review Focus

- Unknown product ID returns 404 instead of rendering empty content. Test in Task 1.
- Closed PO and zero stock cannot add to cart. Test in Task 2.
- Product price and stock display real DB values, with Rupiah formatting. Test in Task 2.
- Direct navigation and browser back remain valid through Inertia route. Test route/controller in Task 1.
- Existing product catalog and `Pesanin.tsx` remain unchanged. Verify diff in Task 3.

---

### Task 1: Product Detail Route and Backend Props

**Files:**
- Modify: `routes/web.php`
- Modify: `app/Http/Controllers/LandingController.php`
- Create or modify: `tests/Feature/ProductDetailPageTest.php`

**Interfaces:**
- Produces named route `products.show` at `GET /products/{product}`.
- Inertia page name: `ProductDetail`.
- Props: `product: Product`, `poOpen: bool`, `serverTime: string`.

- [ ] **Step 1: Write failing feature tests**

Test names:

- `test_product_detail_page_returns_product_props`
- `test_product_detail_page_returns_not_found_for_unknown_product`

Assert successful response uses Inertia page `ProductDetail`, includes product name and ID, and unknown ID returns 404.

- [ ] **Step 2: Run focused test and verify expected failure**

```bash
php artisan test tests/Feature/ProductDetailPageTest.php
```

Expected: route or page assertion fails because `products.show` does not exist.

- [ ] **Step 3: Add route and controller method**

Add `Route::get('/products/{product}', [LandingController::class, 'show'])->name('products.show');`. Use route model binding and return `inertia('ProductDetail', ['product' => $product, 'poOpen' => ..., 'serverTime' => ...])`.

- [ ] **Step 4: Run focused test and verify pass**

```bash
php artisan test tests/Feature/ProductDetailPageTest.php
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add routes/web.php app/Http/Controllers/LandingController.php tests/Feature/ProductDetailPageTest.php
git commit -m "feat: add product detail route"
```

### Task 2: Product Detail Inertia Page

**Files:**
- Create: `resources/js/pages/ProductDetail.tsx`
- Modify: `resources/js/app.tsx`
- Modify: `resources/js/types/casayur.ts` only if existing `Product` type needs no new fields; prefer no change.

**Interfaces:**
- Consumes `product: Product`, `poOpen: boolean`, optional `serverTime: string`.
- Uses `SiteHeader`, `SiteFooter`, `useCart`, `ProduceMark`, `kindFromName`, and `sonner`.
- Renders no fake `rating`, `reviewCount`, `originalPrice`, image, warranty, or feature claims.

- [ ] **Step 1: Add failing page contract check**

Add a focused static/type or existing project test only if the project has a supported frontend test runner. Otherwise verify the missing page by running the build after registering the page; do not add a test framework.

Required behavior checklist:

- Page imports and renders as `ProductDetail`.
- Product name, category, stock, and formatted price render from props.
- Add button calls `addItem(product)` once when enabled.
- Add button disabled for stock zero or closed PO.
- Disabled and focus-visible states exist.

- [ ] **Step 2: Implement minimum page**

Use reference-inspired two-column layout: product mark/media panel on one side, product information and CTA on the other. Use existing Casayur classes and tokens. Add `Head title={product.name}`. Add toast success/error feedback through existing `sonner`. Keep CTA label Indonesian and specific: `Tambah ke keranjang`.

- [ ] **Step 3: Register page layout exception**

Add `name === 'ProductDetail'` beside existing public pages in `resources/js/app.tsx` so it renders without app dashboard layout.

- [ ] **Step 4: Run build and inspect type output**

```bash
npm run build
```

Expected: build passes. Existing unrelated `types:check` errors remain separately documented if present.

- [ ] **Step 5: Commit**

```bash
git add resources/js/pages/ProductDetail.tsx resources/js/app.tsx
 git commit -m "feat: build product detail page"
```

### Task 3: Catalog Link and Final Verification

**Files:**
- Modify: `resources/js/components/casayur/product-card.tsx`
- Modify only if required: `resources/js/pages/Products.tsx`, `resources/js/pages/welcome.tsx`
- Do not modify: `resources/js/pages/Pesanin.tsx`

**Interfaces:**
- Product card product name/media links to `products.show` URL `/products/{id}`.
- Add-to-cart button remains a separate native button and does not navigate.

- [ ] **Step 1: Write failing route-link assertion or inspect existing component test support**

If no frontend test runner exists, use build plus source inspection. Ensure the intended change is limited to navigation behavior.

- [ ] **Step 2: Add detail link without nested interactive controls**

Wrap only product media/name in `Link` or use an explicit `Link` adjacent to the button. Preserve existing card classes and layout.

- [ ] **Step 3: Run verification**

```bash
npm run build
php artisan test
 git diff --check
 git status --short
```

Expected: build and tests pass; only intended files changed plus preserved pre-existing `resources/js/pages/Pesanin.tsx` modification.

- [ ] **Step 4: Commit**

```bash
git add resources/js/components/casayur/product-card.tsx
 git commit -m "feat: link catalog cards to product detail"
```
