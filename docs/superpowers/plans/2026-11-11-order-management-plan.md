# Admin Order Management Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create Admin Order Management dashboard to list orders, update status, and manage split-order logic for COD/Delivery.

**Architecture:** Laravel OrderController handles query filtering and status updates. Inertia React page renders list view and detail modal.

**Tech Stack:** Laravel 12, Inertia, React, Tailwind, MySQL.

**Spec:** `docs/superpowers/specs/2026-11-11-casayur-design.md`

## Global Constraints
- Admin access only (auth middleware).
- Orders must be categorized by type (`ready` or `po`).
- Statuses allowed: `pending`, `processing`, `completed`, `cancelled`.

## Review Focus
1. Invalid status update -> Returns validation error.
2. Unauthorized user -> Redirected/403.
3. Order list pagination/filtering -> Correctly filters PO vs Ready orders.

---

### Task 1: Admin Order Controller & Feature Test

**Files:**
- Create: `app/Http/Controllers/Admin/OrderController.php`
- Test: `tests/Feature/Admin/OrderManagementTest.php`

**Interfaces:**
- Produces: `admin.orders.index`, `admin.orders.updateStatus`.

- [ ] Write failing test for viewing order list and updating order status.
- [ ] Run test to verify failure.
- [ ] Implement `OrderController` with `index` and `updateStatus` methods.
- [ ] Run test to verify pass.
- [ ] Commit.

### Task 2: Admin Orders UI Page

**Files:**
- Modify: `routes/web.php`
- Create: `resources/js/Pages/Admin/Orders/Index.jsx`

**Interfaces:**
- Route: `/admin/orders` rendering Inertia page with order list.

- [ ] Add `/admin/orders` routes in `web.php`.
- [ ] Build React Order Dashboard page displaying PO and Ready orders.
- [ ] Add interactive Status Update dropdown/buttons.
- [ ] Run `npm run build`.
- [ ] Commit.

### Task 3: Audit & Complete

**Files:**
- Modify: `docs/superpowers/plans/progress.md`

- [ ] Run full test suite.
- [ ] Record task completions in progress ledger.
- [ ] Commit.
