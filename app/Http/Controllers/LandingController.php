<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class LandingController extends Controller
{
    public function index()
    {
        return inertia('welcome', [
            'products' => Product::all(),
        ]);
    }
}
