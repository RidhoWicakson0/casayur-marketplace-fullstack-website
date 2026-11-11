# PO Time-gating & Inventory Logic Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement time-gating for PO orders (09.00-12.00) and automatic inventory reduction upon order creation.

**Architecture:** Laravel service layer for business logic, with validation both at API level and UI level.

**Tech Stack:** Laravel 12, MySQL, React/Inertia.

**Spec:** casayur-app/docs/superpowers/specs/2026-11-11-casayur-design.md

## Global Constraints
- Radius maksimal: 20 km.
- PO Time-gating: 09.00 - 12.00.
- Delivery: 2.000/km untuk jarak di luar radius gratis.
- Laravel 12, React, Inertia, Vite.

## Review Focus
1. PO Order placed at 12:01 -> Should be rejected by backend.
2. Product stock 0 -> Should be rejected during checkout.
3. Order creation -> Should atomically decrement stock.

---

### Task 1: Backend PO Time-gating Logic

**Files:**
- Modify: `casayur-app/app/Http/Controllers/CheckoutController.php`
- Test: `casayur-app/tests/Feature/POTimeGatingTest.php`

**Interfaces:**
- Consumes: Request data with cart items.
- Produces: 422 error if PO time is outside 09:00-12:00.

- [ ] **Step 1: Write test `test_po_cannot_be_ordered_outside_hours`**
- [ ] **Step 2: Run test to verify failure**
- [ ] **Step 3: Implement time-gating logic in `CheckoutController`**
- [ ] **Step 4: Run test to verify pass**
- [ ] **Step 5: Commit**

### Task 2: Inventory Reduction Logic

**Files:**
- Modify: `casayur-app/app/Http/Controllers/CheckoutController.php`
- Test: `casayur-app/tests/Feature/InventoryReductionTest.php`

**Interfaces:**
- Consumes: Cart items.
- Produces: Decremented stock in `products` table.

- [ ] **Step 1: Write test `test_product_stock_is_decremented_after_order`**
- [ ] **Step 2: Run test to verify failure**
- [ ] **Step 3: Implement DB transaction for stock reduction in `store` method**
- [ ] **Step 4: Run test to verify pass**
- [ ] **Step 5: Commit**

### Task 3: Frontend PO Visibility

**Files:**
- Modify: `casayur-app/resources/js/Pages/Checkout.jsx`

**Interfaces:**
- Consumes: Current time server-side or client-side check.
- Produces: Disabled state for PO items if outside hours.

- [ ] **Step 1: Implement current time check in `Checkout.jsx`**
- [ ] **Step 2: Add visual feedback for disabled PO items**
- [ ] **Step 3: Commit**
