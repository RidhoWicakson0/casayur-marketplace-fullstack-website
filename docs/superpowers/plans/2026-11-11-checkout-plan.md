# Frontend Checkout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the checkout page with dynamic shipping calculation and radius validation based on customer coordinates.

**Architecture:** React/Inertia component fetching calculation from `CheckoutController`.

**Tech Stack:** React, Inertia, Tailwind CSS.

**Spec:** casayur-app/docs/superpowers/specs/2026-11-11-casayur-design.md

## Global Constraints
- Radius maksimal: 20 km.
- PO Time-gating: 09.00 - 12.00.
- Delivery: 2.000/km untuk jarak di luar radius gratis.
- Laravel 12, React, Inertia, Vite.

## Review Focus
1. User provides outside 20km range -> Checkout form should display error and disable order placement.
2. User tries to buy PO outside 09.00-12.00 -> Checkout UI should disable PO items/checkout.
3. Cart with mixed PO/Ready -> UI should clearly split order summary.

---

### Task 1: Checkout Page Scaffolding

**Files:**
- Create: `casayur-app/resources/js/Pages/Checkout.jsx`
- Test: `casayur-app/tests/Feature/CheckoutPageTest.php`

**Interfaces:**
- Produces: Checkout UI component accessible at `/checkout`.

- [ ] **Step 1: Create basic Checkout.jsx with Inertia layout**
- [ ] **Step 2: Add Route in `routes/web.php`**
- [ ] **Step 3: Create Feature Test to verify page loads**
- [ ] **Step 4: Commit**

### Task 2: Shipping & Radius Logic

**Files:**
- Modify: `casayur-app/resources/js/Pages/Checkout.jsx`
- Modify: `casayur-app/app/Http/Controllers/CheckoutController.php`

**Interfaces:**
- Consumes: User coordinates via POST request to `checkout.calculate`.
- Produces: JSON response with shipping cost, radius validity.

- [ ] **Step 1: Implement client-side location capture**
- [ ] **Step 2: Implement `CheckoutController@calculate` method**
- [ ] **Step 3: Add logic for distance calculation (using Haversine/Spatial)**
- [ ] **Step 4: Commit**

### Task 3: Split Order & Final Checkout UI

**Files:**
- Modify: `casayur-app/resources/js/Pages/Checkout.jsx`

**Interfaces:**
- Consumes: Cart state from global store.
- Produces: Validated order split summary.

- [ ] **Step 1: Implement Cart Splitter (PO vs Ready) in React**
- [ ] **Step 2: Implement Dynamic Shipping Cost display**
- [ ] **Step 3: Implement Order Submission with COD verification logic**
- [ ] **Step 4: Commit**
