<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Services\OrderService;

class LandingController extends Controller
{
    private function catalogProps(OrderService $orders): array
    {
        return [
            'products' => Product::all(),
            'poOpen' => $orders->isPOAvailable(now()),
            'serverTime' => now()->toIso8601String(),
        ];
    }

    public function index(OrderService $orders)
    {
        return inertia('welcome', $this->catalogProps($orders));
    }

    public function products(OrderService $orders)
    {
        return inertia('Products', $this->catalogProps($orders));
    }
}
