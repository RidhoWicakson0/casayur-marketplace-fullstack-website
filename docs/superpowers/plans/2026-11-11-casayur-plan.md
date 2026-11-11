# Casayur App Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Build a Preorder (PO) & Marketplace (Ready) application for a personal store with 20km radius limit and dynamic shipping.

**Architecture:** Laravel 12 (Backend/Inertia) + React JS (Frontend). MySQL Spatial for location validation. Split-order logic for PO/Ready.

**Tech Stack:** Laravel 12, React, Inertia, Vite, MySQL.

**Spec:** casayur-app/docs/superpowers/specs/2026-11-11-casayur-design.md

## Global Constraints
- Radius maksimal: 20 km.
- PO Time-gating: 09.00 - 12.00.
- Delivery: 2.000/km untuk jarak di luar radius gratis.
- Laravel 12, React, Inertia, Vite.

## Review Focus
1. Invalid coordinates: User provides outside 20km range -> Should be rejected.
2. PO Outside hours: User tries to buy PO outside 09.00-12.00 -> Button should be disabled.
3. Split Order Logic: Cart with mixed PO/Ready -> Must produce 2 distinct orders.
4. Database Performance: Haversine on high volume -> Using SQL Spatial ST_Distance_Sphere.
5. COD Fraud: User selects COD -> Requires WhatsApp verification.

---

### Task 1: Scaffolding & Setup
**Files:**
- Modify: casayur-app/package.json
- Modify: casayur-app/vite.config.ts

**Interfaces:**
- Produces: Inertia/React setup.

- [ ] Step 1: Install Inertia & React dependencies
- [ ] Step 2: Configure Vite for React
- [ ] Step 3: Commit

### Task 2: Database Schema
**Files:**
- Create: casayur-app/database/migrations/xxxx_create_casayur_tables.php

**Interfaces:**
- Produces: users, products, orders, order_items.

- [ ] Step 1: Write migration for Spatial coordinates and tables
- [ ] Step 2: Migrate
- [ ] Step 3: Commit

### Task 3: Backend Logic (Distance & PO)
**Files:**
- Create: casayur-app/app/Services/OrderService.php

**Interfaces:**
- Consumes: coordinates from frontend.
- Produces: calculateDistance, isPOAvailable.

- [ ] Step 1: Implement Spatial Distance SQL logic
- [ ] Step 2: Implement Time-gating for PO
- [ ] Step 3: Commit

### Task 4: Checkout & Split Logic
**Files:**
- Create: casayur-app/app/Http/Controllers/CheckoutController.php

- [ ] Step 1: Implement Cart Splitter (PO vs Ready logic)
- [ ] Step 2: Implement Dynamic Shipping Cost calculation
- [ ] Step 3: Commit

### Task 5: Frontend React Integration
**Files:**
- Create: casayur-app/resources/js/Pages/Checkout.jsx

- [ ] Step 1: Build Checkout UI
- [ ] Step 2: Integrate Radius check on client-side
- [ ] Step 3: Commit
