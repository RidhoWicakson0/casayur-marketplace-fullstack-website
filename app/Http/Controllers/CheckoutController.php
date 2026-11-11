<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CheckoutController extends Controller
{
    public function calculate(Request $request)
    {
        $request->validate([
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
        ]);

        $storeLat = -6.2000; // Contoh koordinat toko
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
        // TODO: Implement order storage
        return back()->with('success', 'Order created');
    }
}
