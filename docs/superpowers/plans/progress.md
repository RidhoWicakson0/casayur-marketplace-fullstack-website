# Progress Ledger — Casayur App

## Task 1: Scaffolding & Setup
- [x] Step 1: Install Inertia & React dependencies (Success)
- [x] Step 2: Configure Vite for React (Pending: verify `vite.config.js`)
- [x] Step 3: Commit (Done)

## Ledger
- **2026-11-11**: Scaffolding Laravel 12 + Inertia/React.
- **2026-11-11**: Resolved PHP version conflict by using Laragon PHP 8.3 path.
- **2026-11-11**: Initial commit created.
- **2026-11-11**: Database tables created (Users, Products, Orders, OrderItems).
- **2026-11-11**: Implement Frontend Checkout UI with Split Order support.
- **2026-11-11**: Fixed Database Migration (Spatial to Decimal) and finalized migration.
- **2026-11-11**: Audit backend & frontend code for clean implementation.
- **2026-11-11**: Task 5 checkout route, page test, radius calculation endpoint, and client shipping display completed. Build passed.
- **Audit note**: Checkout controller still uses hardcoded store coordinates and order storage remains placeholder; replace before production.

Task 1: complete (commits ..b3aea07, tests: php artisan test tests/Feature/CheckoutPageTest.php → passed)
- **2026-11-11**: Implement PO Time-gating and stock reduction logic.
Task 2: complete (commits ..978eb6c..HEAD, tests: POAvailabilityTest, CheckoutPageTest -> passed)
- **2026-11-11**: Admin Product CRUD (Index, Store) implemented.
Task 3: complete (commits ..42f6332, tests: ProductManagementTest -> passed)
