# Casayur Visual Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Casayur's generic landing and checkout visuals with a specific papan warung pagi identity, make the cart and shipping facts real, and add one controlled set of motion.

**Architecture:** New design tokens and self-hosted variable fonts live in `app.css`. Landing page is rebuilt from small components under `resources/js/components/casayur/`. A `CartProvider` in `app.tsx` persists cart state to `localStorage`. Backend `OrderService` becomes the single source for PO time, shipping cost, and COD eligibility.

**Tech Stack:** Laravel 12, Inertia, React 19, Tailwind CSS v4, Framer Motion, Fontsource variable fonts, MySQL.

**Spec:** `docs/superpowers/specs/2026-11-12-casayur-visual-refresh-design.md`

## Global Constraints

- Jam PO: 09.00 sampai 12.00 WIB.
- Zona waktu aplikasi: `Asia/Jakarta`.
- Radius maksimal: 20 km.
- Ongkir PO: pickup gratis, delivery sampai 5 km gratis, di atas 5 km Rp2.000 per km kelebihan.
- Ongkir Ready: pickup gratis, delivery sampai 3 km gratis, di atas 3 km Rp2.000 per km kelebihan.
- COD: maksimal 5 km untuk PO dan Ready, dikonfirmasi lewat WhatsApp.
- Font: Bricolage Grotesque Variable untuk display, Instrument Sans Variable untuk UI.
- Palet: `--paper`, `--surface`, `--ink`, `--muted-ink`, `--leaf`, `--leaf-deep`, `--turmeric`, `--line`, `--danger`.
- Tidak ada rating, jumlah ulasan, testimoni fiktif, atau foto produk palsu.
- Tidak ada em dash di teks UI.
- Motion non-esensial berhenti saat `prefers-reduced-motion: reduce`.
- Tema terang, gelap, dan sistem harus berfungsi.
- Jangan hapus komponen lama. Berhenti mengimpor saja.

## Review Focus

1. **Keranjang lintas halaman:** Menambah produk di landing lalu membuka checkout harus menampilkan item dan jumlah yang sama setelah reload. Test: manual, tambah 2 produk, reload, buka `/checkout`.
2. **Batas ongkir:** Ready 3 km harus Rp0, Ready 5 km harus Rp4.000, PO 5 km harus Rp0, PO 7 km harus Rp4.000. Test: `ShippingCostTest`.
3. **PO di luar jam di server:** Menempatkan PO pukul 08.00 atau 12.01 harus ditolak dan stok tidak berubah. Test: `CheckoutStoreTest`.
4. **COD di luar radius:** COD pada 6 km harus ditolak server dan tidak bisa dipilih di UI. Test: `ShippingCostTest`, `CheckoutCalculationTest`, dan `CheckoutStoreTest`.
5. **Kontrol mati:** CTA hero, filter, pencarian, tambah keranjang, tema, dan tombol checkout harus benar-benar bekerja. Test: manual click-through.
6. **Tema dan reduced motion:** Kedua tema harus terbaca dan marquee harus berhenti saat reduced motion. Test: manual di browser.

---

### Task 1: Design Foundation

**Files:**
- Modify: `vite.config.ts`
- Modify: `resources/js/app.tsx`
- Modify: `resources/css/app.css`
- Modify: `DESIGN.md`

**Interfaces:**
- Produces: CSS tokens `--paper`, `--surface`, `--ink`, `--muted-ink`, `--leaf`, `--leaf-deep`, `--turmeric`, `--line`, `--danger`; Tailwind classes `bg-paper`, `text-ink`, `border-line`, `bg-leaf`, `text-turmeric`, `font-display`, `font-sans`.
- Produces: `@keyframes produce-marquee` and `.produce-marquee-track`.

- [ ] **Step 1: Add Bricolage Grotesque to the existing font pipeline**

The project already serves Instrument Sans through `bunny()` and `@fonts`. Do not add Fontsource.

In `vite.config.ts`, change the `fonts` array to:

```ts
fonts: [
    bunny('Instrument Sans', {
        weights: [400, 500, 600],
    }),
    bunny('Bricolage Grotesque', {
        weights: [600, 700],
    }),
],
```

- [ ] **Step 2: Replace the font stack in `resources/css/app.css`**

In `@theme`, replace the existing `--font-sans` value with:

```css
--font-sans: 'Instrument Sans', ui-sans-serif, system-ui, sans-serif;
--font-display: 'Bricolage Grotesque', ui-sans-serif, sans-serif;
```

- [ ] **Step 3: Add tokens and base rules to `resources/css/app.css`**

Keep the existing shadcn tokens for admin pages. Add the Casayur tokens below them.

In `@theme`, add:

```css
--color-paper: var(--paper);
--color-surface: var(--surface);
--color-ink: var(--ink);
--color-muted-ink: var(--muted-ink);
--color-leaf: var(--leaf);
--color-leaf-deep: var(--leaf-deep);
--color-turmeric: var(--turmeric);
--color-line: var(--line);
--color-danger: var(--danger);
```

In `:root`, add:

```css
--paper: #f3f7f1;
--surface: #ffffff;
--ink: #17231b;
--muted-ink: #5a6b5e;
--leaf: #1f6b47;
--leaf-deep: #145033;
--turmeric: #d4931f;
--line: #d6e0d2;
--danger: #b3402c;
```

In `.dark`, add:

```css
--paper: #0e1511;
--surface: #141d17;
--ink: #edf4ee;
--muted-ink: #9db0a2;
--leaf: #6fc596;
--leaf-deep: #3e8f63;
--turmeric: #f0b64b;
--line: #26342a;
--danger: #e07a63;
```

Add to `@layer base`:

```css
:focus-visible {
    outline: 2px solid var(--leaf);
    outline-offset: 2px;
}

::selection {
    background: var(--leaf);
    color: #ffffff;
}
```

Add the marquee keyframes and utility:

```css
@keyframes produce-marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
}

.produce-marquee-track {
    animation: produce-marquee 50s linear infinite;
}

.produce-marquee:hover .produce-marquee-track,
.produce-marquee:focus-within .produce-marquee-track {
    animation-play-state: paused;
}

@media (prefers-reduced-motion: reduce) {
    .produce-marquee-track {
        animation: none;
    }

    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}
```

- [ ] **Step 4: Give checkout its own layout**

In `resources/js/app.tsx`, add a case before `default`:

```ts
case name === 'Checkout':
    return null;
```

Checkout has its own header and must not inherit the admin `AppLayout` sidebar.

- [ ] **Step 5: Fill `DESIGN.md` with the approved direction**

Replace the empty generated sections with the content from the spec's `Design Direction` section: identity, dials ENERGY 2 / RHYTHM 3 / MOTION 2, palette table, typography, layout, motion, and constraints. Keep the file short enough to scan, under 120 lines.

- [ ] **Step 6: Verify the build**

Run: `npm run build`

Expected: build succeeds, no missing font or CSS errors.

- [ ] **Step 7: Commit**

```bash
git add vite.config.ts resources/js/app.tsx resources/css/app.css DESIGN.md docs/superpowers/specs/2026-11-12-casayur-visual-refresh-design.md
git commit -m "feat: add casayur design tokens and fonts"
```

---

### Task 2: Shipping, COD, and PO Truth in Backend

**Files:**
- Modify: `config/app.php`
- Modify: `app/Services/OrderService.php`
- Modify: `app/Http/Controllers/LandingController.php`
- Modify: `app/Http/Controllers/CheckoutController.php`
- Modify: `routes/web.php`
- Test: `tests/Unit/ShippingCostTest.php`
- Test: `tests/Feature/CheckoutCalculationTest.php`
- Test: `tests/Feature/CheckoutStoreTest.php`
- Test: `tests/Feature/LandingPageTest.php`
- Test: `tests/Feature/CheckoutPageTest.php`

**Interfaces:**
- Produces: `OrderService::shippingCost(string $category, float $distanceKm, string $method): int`
- Produces: `OrderService::codAvailable(float $distanceKm): bool`
- Produces: `LandingController@index` Inertia props `products`, `poOpen`, `serverTime`.
- Produces: `CheckoutController@index` Inertia page `Checkout` with `products` and `poOpen`.
- Produces: `POST /checkout/calculate` JSON `{ distance: float, shipping: { ready: int, po: int }, total_shipping: int, cod_available: bool, po_available: bool }`.

- [ ] **Step 1: Write the failing shipping unit test**

Create `tests/Unit/ShippingCostTest.php`:

```php
<?php

namespace Tests\Unit;

use App\Services\OrderService;
use Tests\TestCase;

class ShippingCostTest extends TestCase
{
    public function test_pickup_is_always_free(): void
    {
        $service = new OrderService();

        self::assertSame(0, $service->shippingCost('ready', 12.4, 'pickup'));
        self::assertSame(0, $service->shippingCost('po', 12.4, 'pickup'));
    }

    public function test_ready_delivery_is_free_up_to_three_km(): void
    {
        $service = new OrderService();

        self::assertSame(0, $service->shippingCost('ready', 2.0, 'delivery'));
        self::assertSame(0, $service->shippingCost('ready', 3.0, 'delivery'));
        self::assertSame(4000, $service->shippingCost('ready', 5.0, 'delivery'));
        self::assertSame(34000, $service->shippingCost('ready', 20.0, 'delivery'));
    }

    public function test_po_delivery_is_free_up_to_five_km(): void
    {
        $service = new OrderService();

        self::assertSame(0, $service->shippingCost('po', 4.0, 'delivery'));
        self::assertSame(0, $service->shippingCost('po', 5.0, 'delivery'));
        self::assertSame(4000, $service->shippingCost('po', 7.0, 'delivery'));
        self::assertSame(30000, $service->shippingCost('po', 20.0, 'delivery'));
    }

    public function test_cod_is_available_up_to_five_km(): void
    {
        $service = new OrderService();

        self::assertTrue($service->codAvailable(4.99));
        self::assertTrue($service->codAvailable(5.0));
        self::assertFalse($service->codAvailable(5.01));
    }
}
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `php artisan test tests/Unit/ShippingCostTest.php`

Expected: FAIL because `shippingCost` and `codAvailable` do not exist.

- [ ] **Step 3: Implement the methods in `app/Services/OrderService.php`**

Add:

```php
public function shippingCost(string $category, float $distanceKm, string $method): int
{
    if ($method === 'pickup') {
        return 0;
    }

    $freeKm = $category === 'ready' ? 3.0 : 5.0;
    $excessKm = max(0, $distanceKm - $freeKm);

    return (int) round($excessKm * 2000);
}

public function codAvailable(float $distanceKm): bool
{
    return $distanceKm <= 5.0;
}
```

- [ ] **Step 4: Run the test and confirm it passes**

Run: `php artisan test tests/Unit/ShippingCostTest.php`

Expected: PASS.

- [ ] **Step 5: Set the application timezone**

In `config/app.php`, change:

```php
'timezone' => 'UTC',
```

to:

```php
'timezone' => 'Asia/Jakarta',
```

- [ ] **Step 6: Send PO truth from `LandingController`**

Replace `index` with:

```php
public function index(OrderService $orders)
{
    return inertia('welcome', [
        'products' => Product::all(),
        'poOpen' => $orders->isPOAvailable(now()),
        'serverTime' => now()->toIso8601String(),
    ]);
}
```

Add `use App\Services\OrderService;` at the top.

- [ ] **Step 7: Add `CheckoutController@index` and replace the route**

Add:

```php
public function index(OrderService $orders)
{
    return inertia('Checkout', [
        'products' => \App\Models\Product::all(),
        'poOpen' => $orders->isPOAvailable(now()),
    ]);
}
```

In `routes/web.php`, replace:

```php
Route::inertia('/checkout', 'Checkout')->name('checkout');
```

with:

```php
Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout');
```

- [ ] **Step 8: Replace `CheckoutController@calculate`**

Use this contract:

```php
$data = $request->validate([
    'lat' => 'required|numeric',
    'lng' => 'required|numeric',
    'method' => 'required|in:pickup,delivery',
    'items' => 'required|array|min:1',
    'items.*.product_id' => 'required|integer|exists:products,id',
    'items.*.qty' => 'required|integer|min:1',
]);

$service = new OrderService();
$products = \App\Models\Product::whereIn('id', collect($data['items'])->pluck('product_id'))
    ->get()
    ->keyBy('id');

$hasPO = $products->contains(fn ($product) => $product->category === 'po');

if ($hasPO && ! $service->isPOAvailable(now())) {
    return response()->json(['error' => 'Preorder hanya tersedia jam 09.00-12.00'], 422);
}

$storeLat = -6.2000;
$storeLng = 106.8166;

$distance = DB::selectOne(
    'SELECT ST_Distance_Sphere(POINT(?, ?), POINT(?, ?)) / 1000 as distance_km',
    [$data['lng'], $data['lat'], $storeLng, $storeLat]
)->distance_km;

if ($distance > 20) {
    return response()->json(['error' => 'Alamat di luar radius 20km'], 422);
}

$shipping = [
    'ready' => $products->contains(fn ($product) => $product->category === 'ready')
        ? $service->shippingCost('ready', $distance, $data['method'])
        : 0,
    'po' => $hasPO
        ? $service->shippingCost('po', $distance, $data['method'])
        : 0,
];

return response()->json([
    'distance' => round($distance, 2),
    'shipping' => $shipping,
    'total_shipping' => array_sum($shipping),
    'cod_available' => $service->codAvailable($distance),
    'po_available' => $service->isPOAvailable(now()),
]);
```

- [ ] **Step 9: Harden `CheckoutController@store`**

Validate `lat`, `lng`, `method`, and `payment_method` in addition to items:

```php
$validated = $request->validate([
    'items' => 'required|array|min:1',
    'items.*.product_id' => 'required|integer|exists:products,id',
    'items.*.qty' => 'required|integer|min:1',
    'lat' => 'required|numeric',
    'lng' => 'required|numeric',
    'method' => 'required|in:pickup,delivery',
    'payment_method' => 'required|in:cod,manual',
]);
```

Inside the transaction:

1. Load products with `lockForUpdate`.
2. Reject PO outside hours with `back()->withErrors(['error' => 'Preorder hanya tersedia jam 09.00-12.00'])`.
3. Compute distance with `ST_Distance_Sphere` and reject above 20 km with `back()->withErrors(['error' => 'Alamat di luar radius 20km'])`.
4. Reject COD above 5 km with `back()->withErrors(['error' => 'COD hanya tersedia sampai 5 km'])`.
5. Reject insufficient stock with the existing message.
6. Decrement stock.

Do not persist an order yet. That remains a known gap.

- [ ] **Step 10: Write failing calculation and store tests**

Create `tests/Feature/CheckoutCalculationTest.php` with four tests:

```php
public function test_calculate_returns_per_category_shipping_and_cod_eligibility(): void
{
    $ready = Product::create(['name' => 'Bayam', 'category' => 'ready', 'price' => 10000, 'stock' => 5]);
    $po = Product::create(['name' => 'Lotek', 'category' => 'po', 'price' => 15000, 'stock' => 5]);

    $this->travelTo(Carbon::parse('2026-11-11 10:00'));

    $response = $this->postJson(route('checkout.calculate'), [
        'lat' => -6.2100,
        'lng' => 106.8166,
        'method' => 'delivery',
        'items' => [
            ['product_id' => $ready->id, 'qty' => 1],
            ['product_id' => $po->id, 'qty' => 1],
        ],
    ]);

    $response->assertOk()
        ->assertJsonPath('cod_available', true)
        ->assertJsonStructure(['distance', 'shipping' => ['ready', 'po'], 'total_shipping', 'cod_available', 'po_available']);
}

public function test_calculate_marks_cod_unavailable_above_five_km(): void
{
    $ready = Product::create(['name' => 'Bayam', 'category' => 'ready', 'price' => 10000, 'stock' => 5]);

    $response = $this->postJson(route('checkout.calculate'), [
        'lat' => -6.2600,
        'lng' => 106.8166,
        'method' => 'delivery',
        'items' => [['product_id' => $ready->id, 'qty' => 1]],
    ]);

    $response->assertOk()->assertJsonPath('cod_available', false);
}

public function test_calculate_rejects_po_outside_hours(): void
{
    $po = Product::create(['name' => 'Lotek', 'category' => 'po', 'price' => 15000, 'stock' => 5]);

    $this->travelTo(Carbon::parse('2026-11-11 08:00'));

    $response = $this->postJson(route('checkout.calculate'), [
        'lat' => -6.2100,
        'lng' => 106.8166,
        'method' => 'delivery',
        'items' => [['product_id' => $po->id, 'qty' => 1]],
    ]);

    $response->assertStatus(422)->assertJson(['error' => 'Preorder hanya tersedia jam 09.00-12.00']);
}

public function test_calculate_rejects_address_outside_twenty_km(): void
{
    $ready = Product::create(['name' => 'Bayam', 'category' => 'ready', 'price' => 10000, 'stock' => 5]);

    $response = $this->postJson(route('checkout.calculate'), [
        'lat' => -6.5000,
        'lng' => 106.8166,
        'method' => 'delivery',
        'items' => [['product_id' => $ready->id, 'qty' => 1]],
    ]);

    $response->assertStatus(422)->assertJson(['error' => 'Alamat di luar radius 20km']);
}
```

Create `tests/Feature/CheckoutStoreTest.php` with:

```php
public function test_store_rejects_po_outside_hours_without_changing_stock(): void
{
    $po = Product::create(['name' => 'Lotek', 'category' => 'po', 'price' => 15000, 'stock' => 5]);

    $this->travelTo(Carbon::parse('2026-11-11 08:00'));

    $response = $this->post(route('checkout.store'), [
        'lat' => -6.2100,
        'lng' => 106.8166,
        'method' => 'pickup',
        'payment_method' => 'manual',
        'items' => [['product_id' => $po->id, 'qty' => 1]],
    ]);

    $response->assertSessionHasErrors('error');
    self::assertSame(5, $po->fresh()->stock);
}

public function test_store_rejects_cod_above_five_km(): void
{
    $ready = Product::create(['name' => 'Bayam', 'category' => 'ready', 'price' => 10000, 'stock' => 5]);

    $response = $this->post(route('checkout.store'), [
        'lat' => -6.2600,
        'lng' => 106.8166,
        'method' => 'delivery',
        'payment_method' => 'cod',
        'items' => [['product_id' => $ready->id, 'qty' => 1]],
    ]);

    $response->assertSessionHasErrors('error');
    self::assertSame(5, $ready->fresh()->stock);
}

public function test_store_decrements_stock_on_success(): void
{
    $ready = Product::create(['name' => 'Bayam', 'category' => 'ready', 'price' => 10000, 'stock' => 5]);

    $response = $this->post(route('checkout.store'), [
        'lat' => -6.2100,
        'lng' => 106.8166,
        'method' => 'delivery',
        'payment_method' => 'manual',
        'items' => [['product_id' => $ready->id, 'qty' => 2]],
    ]);

    $response->assertRedirect();
    self::assertSame(3, $ready->fresh()->stock);
}
```

- [ ] **Step 11: Update existing page tests**

In `tests/Feature/LandingPageTest.php`, add assertions:

```php
->has('poOpen')
->has('serverTime')
```

In `tests/Feature/CheckoutPageTest.php`, seed one product and assert the Inertia page:

```php
$product = \App\Models\Product::create(['name' => 'Bayam', 'category' => 'ready', 'price' => 10000, 'stock' => 5]);

$response->assertInertia(fn ($page) => $page
    ->component('Checkout')
    ->has('products', 1)
);
```

Add `use RefreshDatabase;` and `use App\Models\Product;` where needed.

- [ ] **Step 12: Run the backend tests**

Run:

```bash
php artisan test tests/Unit/ShippingCostTest.php tests/Unit/POAvailabilityTest.php tests/Feature/CheckoutCalculationTest.php tests/Feature/CheckoutStoreTest.php tests/Feature/LandingPageTest.php tests/Feature/CheckoutPageTest.php
```

Expected: all PASS.

- [ ] **Step 13: Commit**

```bash
git add config/app.php app/Services/OrderService.php app/Http/Controllers/LandingController.php app/Http/Controllers/CheckoutController.php routes/web.php tests/Unit/ShippingCostTest.php tests/Feature/CheckoutCalculationTest.php tests/Feature/CheckoutStoreTest.php tests/Feature/LandingPageTest.php tests/Feature/CheckoutPageTest.php
git commit -m "feat: align shipping, cod, and po status with spec"
```

---

### Task 3: Shared Cart

**Files:**
- Create: `resources/js/types/casayur.ts`
- Create: `resources/js/contexts/cart-context.tsx`
- Modify: `resources/js/app.tsx`

**Interfaces:**
- Produces: `Product`, `CartItem`, `ShippingBreakdown` types.
- Produces: `CartProvider`, `useCart()` with `{ items, count, addItem, setQty, removeItem, clear, subtotalFor }`.
- Consumes: nothing from earlier tasks.

- [ ] **Step 1: Create shared types**

`resources/js/types/casayur.ts`:

```ts
export type ProductCategory = 'ready' | 'po';

export type Product = {
    id: number;
    name: string;
    category: ProductCategory;
    price: number;
    stock: number;
};

export type CartItem = {
    productId: number;
    name: string;
    category: ProductCategory;
    price: number;
    qty: number;
    stock: number;
};

export type ShippingBreakdown = {
    distance: number;
    shipping: { ready: number; po: number };
    total_shipping: number;
    cod_available: boolean;
    po_available: boolean;
};
```

- [ ] **Step 2: Create the cart context**

`resources/js/contexts/cart-context.tsx` exports:

```ts
type CartContextValue = {
    items: CartItem[];
    count: number;
    addItem: (product: Product, qty?: number) => void;
    setQty: (productId: number, qty: number) => void;
    removeItem: (productId: number) => void;
    clear: () => void;
    subtotalFor: (category: ProductCategory) => number;
};
```

Rules:
- Storage key `casayur.cart.v1`.
- Read storage in `useEffect` after mount, guard with `typeof window`.
- Persist in a second `useEffect` after the first load.
- `addItem` merges by `productId`, clamps total qty to `product.stock`.
- `setQty` clamps between 1 and `stock`, removes the item when qty is 0.
- `count` is the sum of `qty`.
- `subtotalFor` sums `price * qty` for one category.

- [ ] **Step 3: Wrap the app**

In `resources/js/app.tsx`, import `CartProvider` and wrap the existing provider tree:

```tsx
<CartProvider>
    <TooltipProvider delayDuration={0}>
        {app}
        <Toaster />
    </TooltipProvider>
</CartProvider>
```

- [ ] **Step 4: Verify the build**

Run: `npm run build`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add resources/js/types/casayur.ts resources/js/contexts/cart-context.tsx resources/js/app.tsx
git commit -m "feat: add persistent shared cart"
```

---

### Task 4: Produce Marks and Marquee

**Files:**
- Create: `resources/js/components/casayur/produce-mark.tsx`
- Create: `resources/js/components/casayur/produce-marquee.tsx`

**Interfaces:**
- Produces: `kindFromName(name: string): ProduceKind`
- Produces: `ProduceMark({ kind, className }: { kind: ProduceKind; className?: string })`
- Produces: `ProduceMarquee()` with no props.
- `ProduceKind = 'sayur' | 'lotek' | 'gorengan' | 'sembako' | 'lainnya'`.

- [ ] **Step 1: Create the produce mark component**

`produce-mark.tsx` exports `kindFromName` and `ProduceMark`.

Keyword map:
- `sayur`: sayur, bayam, kangkung, wortel, tomat, cabai, brokoli, selada, timun, terong, buncis, labu, jagung, sawi.
- `lotek`: lotek, gado, pecel, rujak.
- `gorengan`: goreng, bakwan, tempe, tahu, pisang, cireng, risol.
- `sembako`: beras, telur, minyak, gula, tepung, mie, kecap, garam, sabun.
- Fallback: `lainnya`.

Each mark is an inline SVG with `viewBox="0 0 64 64"`, `fill="none"`, `stroke="currentColor"`, `strokeWidth="2"`, `strokeLinecap="round"`, `strokeLinejoin="round"`, and `aria-hidden="true"`. Draw four simple, recognizable line marks:
- sayur: a leafy bunch with a stem.
- lotek: a bowl with shredded lines.
- gorengan: a fritter with three dots.
- sembako: a rice sack tied at the top.
- lainnya: a simple leaf.

- [ ] **Step 2: Create the marquee**

`produce-marquee.tsx` renders a section:

```tsx
<div className="produce-marquee overflow-hidden border-y border-line bg-surface py-4">
    <div className="produce-marquee-track flex w-max items-center gap-10 px-6">
        {[...items, ...items].map((item, index) => (
            <div key={`${item.kind}-${index}`} aria-hidden={index >= items.length} className="flex items-center gap-3">
                <ProduceMark kind={item.kind} className="h-7 w-7 text-leaf" />
                <span className="whitespace-nowrap text-sm font-medium text-muted-ink">{item.label}</span>
            </div>
        ))}
    </div>
</div>
```

`items` contains Sayur segar, Lotek, Gorengan, Sembako. The duplicated half is `aria-hidden`.

- [ ] **Step 3: Verify the build**

Run: `npm run build`

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add resources/js/components/casayur/produce-mark.tsx resources/js/components/casayur/produce-marquee.tsx
git commit -m "feat: add original produce marks and marquee"
```

---

### Task 5: Landing Page Rebuild

**Files:**
- Create: `resources/js/components/casayur/site-header.tsx`
- Create: `resources/js/components/casayur/po-board.tsx`
- Create: `resources/js/components/casayur/product-card.tsx`
- Create: `resources/js/components/casayur/service-ledger.tsx`
- Create: `resources/js/components/casayur/how-to-order.tsx`
- Create: `resources/js/components/casayur/site-footer.tsx`
- Modify: `resources/js/pages/welcome.tsx`
- Test: `tests/Feature/LandingPageTest.php`

**Interfaces:**
- Consumes: `Product`, `useCart`, `kindFromName`, `ProduceMark`, `ProduceMarquee`.
- Produces: `SiteHeader({ poOpen }: { poOpen: boolean })`
- Produces: `PoBoard({ poOpen }: { poOpen: boolean })`
- Produces: `ProductCard({ product, poOpen, index }: { product: Product; poOpen: boolean; index: number })`
- Produces: `ServiceLedger()`, `HowToOrder()`, `SiteFooter()`.

- [ ] **Step 1: Build `SiteHeader`**

- Wordmark `casayur.` in `font-display`, with a small leaf SVG. Text link to `/`.
- Desktop nav: `#katalog` (Katalog), `#layanan` (Layanan), `#cara-pesan` (Cara pesan).
- PO status text: `PO buka` or `PO tutup`, with a dot. Use `text-leaf` and `bg-leaf` when open, `text-turmeric` and `bg-turmeric` when closed. Always include text, never color only.
- Cart link to `/checkout` with accessible label `Keranjang, N item`.
- Account links `Masuk` and `Daftar` always visible on desktop.
- Theme control: three native buttons using `useAppearance` with `appearance`, `updateAppearance`, labels `Sistem`, `Terang`, `Gelap`, and `aria-pressed`.
- Mobile: a menu button with `aria-expanded`, `aria-controls`, and `aria-label="Buka menu"`. The panel closes on Escape and on link click. Include nav, account links, and theme control in the panel.
- All targets at least 44 px high.

- [ ] **Step 2: Build `PoBoard`**

- Panel `rounded-[18px] border border-line bg-surface p-6`.
- Header: `Papan hari ini` in `font-display`.
- Status row: dot plus `PO buka` or `PO tutup`, and `09.00 - 12.00 WIB`.
- Fact rows with `dl`/`dt`/`dd`:
  - `Radius antar` / `Maksimal 20 km`
  - `Ongkir ready` / `Gratis sampai 3 km, lalu Rp2.000/km`
  - `Ongkir PO` / `Gratis sampai 5 km, lalu Rp2.000/km`
  - `COD` / `Sampai 5 km, konfirmasi via WhatsApp`
- Use tabular numbers for all amounts.
- Do not add a decorative badge or gradient.

- [ ] **Step 3: Build `ProductCard`**

- `motion.article` with `initial={false}` when reduced motion, otherwise opacity 0 and y 12; `whileInView` opacity 1 and y 0; `viewport={{ once: true, margin: '-60px' }}`; `transition={{ duration: 0.4, delay: Math.min(index, 5) * 0.04 }}`.
- Top area: `ProduceMark` inside a `bg-paper` frame with `aspect-[4/3]`.
- Category label: `Ready stock` or `Preorder`.
- Name in `font-display`.
- Price with `tabular-nums`.
- Stock: `Stok N` or `Stok habis`.
- Add button: `Tambah ke keranjang`, always visible, min height 44 px.
- Disabled when `stock === 0` or (`category === 'po' && !poOpen`).
- When PO is closed, show inline text `PO tutup. Buka lagi 09.00.` under the button.
- No rating, review count, favorite, or hover overlay.

- [ ] **Step 4: Build `ServiceLedger`**

A section with `id="layanan"`. Heading `Papan layanan`. Four rows separated by `border-line`:

1. `Preorder` / `Setiap hari 09.00 - 12.00 WIB. Di luar jam itu tombol PO nonaktif.`
2. `Jangkauan` / `Maksimal 20 km dari titik Casayur.`
3. `Ongkir` / `Pickup gratis. Delivery gratis 3 km untuk ready stock dan 5 km untuk PO. Setelah itu Rp2.000 per km.`
4. `COD` / `Tersedia sampai 5 km untuk ready stock dan PO, dikonfirmasi lewat WhatsApp.`

Use `dl` with visible `dt` labels, no cards.

- [ ] **Step 5: Build `HowToOrder`**

Section with `id="cara-pesan"`. Heading `Cara pesan`. Three ordered steps:

1. `Pilih produk` / `Tambahkan ready stock atau preorder ke keranjang. Preorder hanya terbuka 09.00 - 12.00.`
2. `Cek alamat` / `Masukkan koordinat. Ongkir dan kelayakan COD muncul sebelum pesanan dibuat.`
3. `Konfirmasi pesanan` / `Pilih pickup atau delivery. Untuk COD, konfirmasi lewat WhatsApp.`

Use an `<ol>` with numbered markers. Numbers are legitimate because the content is a sequence.

- [ ] **Step 6: Build `SiteFooter`**

- Wordmark and one sentence: `Sayur, lotek, gorengan, dan sembako untuk dapur sekitar.`
- Facts: `Jam PO 09.00 - 12.00 WIB`, `Radius 20 km`, `WhatsApp +62 812-3456-7890`.
- Links that exist: `#katalog`, `#layanan`, `#cara-pesan`, `/checkout`, `/login`, `/register`.
- Copyright `© 2026 Casayur.`
- No fake social links.

- [ ] **Step 7: Rewrite `welcome.tsx`**

Props: `{ products?: Product[]; poOpen?: boolean; serverTime?: string }`.

State: `filter`, `query`. No cart state, no theme state, no toast state.

Composition:

0. Wrap in `<main id="main">`, add `<Head title="Casayur, sayur segar untuk dapur hari ini" />`, and a skip link `Lewati ke konten` pointing to `#main`.
1. `SiteHeader`.
2. Hero section: two columns `lg:grid-cols-[7fr_5fr]`. Left: `h1` `Sayur segar untuk dapur hari ini.`, paragraph `Pilih ready stock atau preorder antara 09.00 dan 12.00. Kami antar dalam radius 20 km dari Casayur.`, primary link to `#katalog` `Lihat etalase hari ini`, secondary link to `#cara-pesan` `Cara pesan`. Right: `PoBoard`. Below both: `ProduceMarquee`.
3. Catalog section `#katalog`: heading `Etalase hari ini`, description `Harga dan stok diperbarui dari data produk Casayur.`, filter buttons `Semua`, `Ready stock`, `Preorder`, search input with label `Cari produk`.
4. Product grid: use `ProductCard`. Empty state:
   - If `products.length === 0`: `Etalase belum diisi.` and `Produk akan muncul di sini setelah ditambahkan.`
   - If filtered result is empty: `Belum ada produk yang cocok.` and button `Tampilkan semua`.
5. `ServiceLedger`.
6. `HowToOrder`.
7. `SiteFooter`.
8. Mobile sticky cart bar when `count > 0`: link to `/checkout`, text `N item`, `Lihat keranjang`.

Motion:
- Header and hero use one load sequence. Use `useReducedMotion`.
- Hero left children: three `motion.div` with `initial={reduce ? false : { opacity: 0, y: 10 }}`, `animate={{ opacity: 1, y: 0 }}`, `transition={{ duration: 0.5, delay: 0.06 * index }}`.
- PoBoard: `initial={reduce ? false : { opacity: 0, scale: 0.98 }}`, `animate={{ opacity: 1, scale: 1 }}`, `transition={{ duration: 0.6 }}`.
- Do not animate every word.

Cart:
- `const { addItem, count } = useCart()`.
- `onAdd` calls `addItem(product)` and `toast.success(\`${product.name} ditambahkan ke keranjang.\`)`.
- Use `toast` from `sonner`.

- [ ] **Step 8: Verify the landing page test and build**

Run:

```bash
php artisan test tests/Feature/LandingPageTest.php
npm run build
```

Expected: both PASS.

- [ ] **Step 9: Commit**

```bash
git add resources/js/components/casayur resources/js/pages/welcome.tsx tests/Feature/LandingPageTest.php
git commit -m "feat: rebuild landing page with casayur identity"
```

---

### Task 6: Checkout Rebuild

**Files:**
- Modify: `resources/views/app.blade.php`
- Modify: `resources/js/pages/Checkout.jsx`
- Test: `tests/Feature/CheckoutPageTest.php`

**Interfaces:**
- Consumes: `Product`, `ShippingBreakdown`, `useCart`.
- Consumes: `POST /checkout/calculate` contract from Task 2.
- Consumes: Inertia props `products` and `poOpen` from `CheckoutController@index`.
- Produces: checkout page with shared cart, inline errors, pickup/delivery, COD eligibility.

- [ ] **Step 1: Add the CSRF meta tag**

In `resources/views/app.blade.php`, inside `<head>`, add:

```blade
<meta name="csrf-token" content="{{ csrf_token() }}">
```

- [ ] **Step 2: Rewrite `Checkout.jsx`**

Structure:

- `SiteHeader` with the `poOpen` prop from `CheckoutController@index`.
- Main two columns: `lg:grid-cols-[7fr_5fr]`.
- Left:
  - `Keranjang` heading.
  - If empty: `Keranjang masih kosong.` and link `Kembali ke etalase`.
  - Item rows with name, category, price, qty controls `-` and `+`, remove button. All controls at least 44 px and labelled.
  - `Tambah produk lain` grid from `products`, using compact buttons that call `addItem`.
  - Address form: `Latitude`, `Longitude`, `Metode` select (`pickup`, `delivery`). Visible labels.
  - Button `Cek ongkir` calls the calculate endpoint.
  - COD checkbox or radio `Bayar di tempat (COD)`. Disabled unless `shipping.cod_available`. If disabled, show `COD tersedia sampai 5 km.` or `Cek alamat dulu.`
  - Inline error area with `role="alert"`.
- Right:
  - Receipt panel `border border-line bg-surface`.
  - Subtotal Ready, subtotal PO, ongkir Ready, ongkir PO, total.
  - Submit button `Buat pesanan`, disabled when cart empty or processing.
  - Success message `Pesanan diterima.` with `role="status"`.

Behavior:
- Fetch `/checkout/calculate` with `items`, `lat`, `lng`, `method`, and `X-CSRF-TOKEN` from the meta tag. No `alert()`.
- On error, set an inline message.
- Use `useForm` for submit with `{ items, lat, lng, method, payment_method }`.
- Keep `items` in sync with the cart through `useEffect` and `setData('items', ...)` whenever the cart changes.
- On success, `clear()` the cart and show the success message.
- `onError` leaves the inline error visible.
- Use the same tokens and fonts as landing. No emerald/slate classes that bypass the tokens.

- [ ] **Step 3: Verify checkout test and build**

Run:

```bash
php artisan test tests/Feature/CheckoutPageTest.php
npm run build
```

Expected: both PASS.

- [ ] **Step 4: Commit**

```bash
git add resources/views/app.blade.php resources/js/pages/Checkout.jsx tests/Feature/CheckoutPageTest.php app/Http/Controllers/CheckoutController.php
git commit -m "feat: rebuild checkout with shared cart and inline shipping"
```

---

### Task 7: Verification and Progress Record

**Files:**
- Modify: `docs/superpowers/plans/progress.md`

**Interfaces:**
- Consumes: everything above.

- [ ] **Step 1: Run the full backend suite**

Run: `php artisan test`

Expected: all PASS. If any pre-existing unrelated test fails, record it separately in the progress ledger instead of hiding it.

- [ ] **Step 2: Run the production build**

Run: `npm run build`

Expected: PASS, no TypeScript or JSX errors.

- [ ] **Step 3: Run the app and click through**

Start the app:

```bash
php artisan serve
```

If the local database is empty, add two temporary products for verification only:

```bash
php artisan tinker --execute="\App\Models\Product::firstOrCreate(['name' => 'Bayam segar'], ['category' => 'ready', 'price' => 8000, 'stock' => 20]); \App\Models\Product::firstOrCreate(['name' => 'Lotek sayur'], ['category' => 'po', 'price' => 15000, 'stock' => 10]);"
```

Open `http://127.0.0.1:8000` in the browser. Verify:

- Header: nav links scroll to existing sections, theme changes all three modes, cart badge updates.
- Hero: primary CTA scrolls to `#katalog`, secondary CTA scrolls to `#cara-pesan`.
- Catalog: filter buttons change results, search filters by name, add button increases the badge and shows a toast.
- PO card outside 09.00-12.00 shows disabled button and the reason.
- Cart persists after reload.
- Open `/checkout`: same items appear, qty controls work, remove works.
- Enter coordinates inside 5 km: COD enabled, shipping correct.
- Enter coordinates above 5 km: COD disabled with reason.
- Submit: success message appears and cart clears.
- Resize to 360 px: no horizontal overflow, mobile menu opens and closes, sticky cart bar works.
- Enable reduced motion in the OS or DevTools: marquee stops, no entrance motion.
- Check the browser console: no errors.

- [ ] **Step 4: Record results in the progress ledger**

Append to `docs/superpowers/plans/progress.md`:

```markdown
## 2026-11-12: Visual Refresh
- [x] Design tokens, fonts, and base accessibility.
- [x] Backend shipping, COD eligibility, and Asia/Jakarta PO truth.
- [x] Shared localStorage cart.
- [x] Landing page rebuild with produce marks and controlled motion.
- [x] Checkout rebuild with inline errors and receipt summary.
- [x] Tests: <paste exact commands and results>.
- [x] Build: `npm run build` passed.
- [x] Manual click-through: <list verified items>.
- Known gap: order persistence and split order are still not implemented.
```

- [ ] **Step 5: Commit**

```bash
git add docs/superpowers/plans/progress.md
git commit -m "docs: record visual refresh progress"
```

---

## Self-Review Notes

- Spec coverage: tokens and fonts (Task 1), PO/shipping/COD truth (Task 2), shared cart (Task 3), produce marks and marquee (Task 4), landing page and content honesty (Task 5), checkout and CSRF (Task 6), verification (Task 7).
- Type consistency: `Product`, `CartItem`, and `ShippingBreakdown` are defined once in Task 3 and consumed by name afterward.
- Known gap carried forward: order persistence and split order remain outside this plan and are recorded in the progress ledger.
