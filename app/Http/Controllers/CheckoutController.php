<?php

namespace App\Http\Controllers;

use App\Services\OrderService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CheckoutController extends Controller
{
    public function calculate(Request $request)
    {
        $request->validate([
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
            'items' => 'required|array',
        ]);

        // PO Time-gating validation
        $hasPO = collect($request->items)->contains(fn($i) => \App\Models\Product::find($i['product_id'])->category === 'po');
        if ($hasPO && !(new OrderService())->isPOAvailable(\Carbon\Carbon::now())) {
            return response()->json(['error' => 'Preorder hanya tersedia jam 09.00-12.00'], 422);
        }

        $storeLat = -6.2000;
        $storeLng = 106.8166;

        $distance = DB::selectOne(
            "SELECT ST_Distance_Sphere(POINT(?, ?), POINT(?, ?)) / 1000 as distance_km",
            [$request->lng, $request->lat, $storeLng, $storeLat]
        )->distance_km;

        if ($distance > 20) {
            return response()->json(['error' => 'Alamat di luar radius 20km'], 422);
        }

        return response()->json([
            'distance' => round($distance, 2),
            'shipping_cost' => $distance > 3 ? round(($distance - 3) * 2000) : 0
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|integer|exists:products,id',
            'items.*.qty' => 'required|integer|min:1',
        ]);

        return DB::transaction(function () use ($validated) {
            $products = \App\Models\Product::whereIn(
                'id',
                collect($validated['items'])->pluck('product_id')
            )->lockForUpdate()->get()->keyBy('id');

            foreach ($validated['items'] as $item) {
                $product = $products[$item['product_id']];
                if ($product->stock < $item['qty']) {
                    return back()->withErrors(['error' => "Stok {$product->name} tidak cukup."]);
                }
                $product->decrement('stock', $item['qty']);
            }

            return back()->with('success', 'Order created');
        });
    }
}
