<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Services\OrderService;

class LandingController extends Controller
{
    public function index(OrderService $orders)
    {
        return inertia('welcome', [
            'products' => Product::all(),
            'poOpen' => $orders->isPOAvailable(now()),
            'serverTime' => now()->toIso8601String(),
        ]);
    }
}
