# Admin Product CRUD Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add authenticated admin product management for name, category, price, and stock.

**Architecture:** Laravel resource controller validates and persists products; Inertia React page provides list, create, edit, and delete actions. No new dependency.

**Tech Stack:** Laravel 12, Inertia, React, Tailwind, MySQL.

**Spec:** `docs/superpowers/specs/2026-11-11-casayur-design.md`

## Global Constraints
- Product category is `ready` or `po`.
- Stock cannot be negative.
- Price must be numeric and non-negative.
- Admin routes require authentication.

## Review Focus
1. Invalid category or negative stock -> validation error, no product saved.
2. Unauthenticated admin request -> rejected by auth middleware.
3. Delete product referenced by order items -> database must reject or preserve order integrity.

---

### Task 1: Product Model and Resource Controller

**Files:**
- Create: `app/Http/Controllers/Admin/ProductController.php`
- Modify: `app/Models/Product.php`
- Test: `tests/Feature/Admin/ProductManagementTest.php`

**Interfaces:**
- Produces resource methods `index`, `store`, `update`, `destroy`.

- [ ] Write failing feature tests for listing, validation, creation, update, and delete.
- [ ] Run tests and confirm failure.
- [ ] Implement controller with validation rules: `name required|string|max:255`, `category in:ready,po`, `price numeric|min:0`, `stock integer|min:0`.
- [ ] Run feature tests and confirm pass.
- [ ] Commit.

### Task 2: Admin Routes and Inertia Page

**Files:**
- Modify: `routes/web.php`
- Create: `resources/js/Pages/Admin/Products/Index.jsx`

**Interfaces:**
- Routes: `admin.products.index`, `.store`, `.update`, `.destroy`.

- [ ] Add auth-protected resource routes.
- [ ] Build product table and create/edit form with Inertia `useForm`.
- [ ] Add delete confirmation and validation error rendering.
- [ ] Run `npm run build`.
- [ ] Commit.

### Task 3: Audit and Progress

**Files:**
- Modify: `docs/superpowers/plans/progress.md`

- [ ] Run full PHP test suite.
- [ ] Run frontend build.
- [ ] Audit routes, validation, authorization, and destructive actions.
- [ ] Record results and known gaps in progress ledger.
- [ ] Commit.
